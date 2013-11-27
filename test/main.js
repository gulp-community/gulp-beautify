var beautify = require('../');
var should = require('should');
var nbeautify = require('node-beautify');
require('mocha');

describe('gulp-beautify', function() {
  describe('beautify()', function() {
    it('should concat two files', function(done) {
      var stream = beautify({indentSize: 2});
      var fakeFile = {
        path: "/home/contra/test/file.js",
        shortened: "file.js",
        contents: new Buffer("function test(){console.log('test');}")
      };

      var expected = nbeautify.beautifyJs(String(fakeFile.contents), {indentSize: 2});
      stream.on('error', done);
      stream.on('data', function(newFile){
        should.exist(newFile);
        should.exist(newFile.path);
        should.exist(newFile.shortened);
        should.exist(newFile.contents);

        newFile.path.should.equal("/home/contra/test/file.js");
        newFile.shortened.should.equal("file.js");
        String(newFile.contents).should.equal(expected);
        done();
      });
      stream.write(fakeFile);
    });
  });
});
