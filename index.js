var es = require('event-stream'),
  beautify = require('node-beautify');

module.exports = function(opt){
  function modifyFile(file, cb){
    file.contents = new Buffer(beautify.beautifyJs(String(file.contents), opt));
    cb(null, file);
  }

  return es.map(modifyFile);
};
