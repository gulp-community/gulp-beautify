var through = require('through2');
var beautify = require('js-beautify');

function createBeautifyPlugin(beautifier) {
  return function gulpBeautify(opts) {
    function modifyFile(file, enc, cb) {
      if (file.isNull()) return cb(null, file); // pass along
      if (file.isStream()) return cb(new Error('gulp-beautify: Streaming not supported'));
      var str = file.contents.toString('utf8');
      file.contents = new Buffer.from(beautifier(str, opts));
      cb(null, file);
    }
    return through.obj(modifyFile);
  };
}

// keep the same exports as “js-beautify”
var beautifyExport = createBeautifyPlugin(beautify);
beautifyExport.js = beautifyExport;
beautifyExport.html = createBeautifyPlugin(beautify.html);
beautifyExport.css = createBeautifyPlugin(beautify.css);

module.exports = beautifyExport;
