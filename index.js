var es = require('event-stream'),
  beautify = require('node-beautify'),
  RcFinder = require('rcfinder'),
  path = require('path');

var rcFinder = new RcFinder('.jsbeautifyrc', { loader: 'async' });

module.exports = function(opt){
  opt = opt || {};
  var findConfigFiles = true;

  if (typeof opt.auto === 'boolean') {
    findConfigFiles = opt.auto;
  }

  function modifyFile(file, cb){
    if (file.isNull()) return cb(null, file); // pass along
    if (file.isStream()) return cb(new Error("gulp-beautify: Streaming not supported"));

    var str = file.contents.toString('utf8');
    var fileOpts = opt;

    function lint() {
      file.contents = new Buffer(beautify.beautifyJs(str, fileOpts));
      cb(null, file);
    }

    if (findConfigFiles) {
      rcFinder.find(path.dirname(file.path), function (err, opts) {
        if (err) return cb(err);
        fileOpts = opts;
        lint();
      });
      return;
    }

    lint();
  }

  return es.map(modifyFile);
};
