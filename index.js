var through = require('through2');
var beautify = require('js-beautify');
var hasBufferFrom = typeof Buffer.from !== 'undefined'

function createBeautifyPlugin(beautifier) {
  return function gulpBeautify(opts) {
    function modifyFile(file, enc, cb) {
      if (file.isNull()) return cb(null, file); // pass along
      if (file.isStream()) return cb(new Error('gulp-beautify: Streaming not supported'));
      var str = file.contents.toString('utf8');
      var result = beautifier(str, opts)
      // support Node version 0.10/0.12
      // while preventing deprecation warning on newer versions 
      file.contents = hasBufferFrom ? new Buffer.from(result) : new Buffer(result);
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
