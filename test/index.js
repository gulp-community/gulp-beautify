var beautify = require('../');
var should = require('should');
var File = require('vinyl');
require('mocha');

describe('gulp-beautify', function() {
  describe('beautify() – javascript', function() {
    it('should concat two files', function(done) {
      var stream = beautify({ indent_size: 2 });
      var fakeFile = new File({
        path: '/home/contra/test/file.js',
        base: '/home/contra/test/',
        cwd: '/home/contra/',
        contents: new Buffer.from('function test(){console.log("test");}')
      });

      var expected = 'function test() {\n  console.log("test");\n}';
      stream.on('error', done);
      stream.on('data', function(newFile) {
        should.exist(newFile);
        should.exist(newFile.path);
        should.exist(newFile.relative);
        should.exist(newFile.contents);

        newFile.path.should.equal('/home/contra/test/file.js');
        newFile.relative.should.equal('file.js');
        String(newFile.contents).should.equal(expected);
        done();
      });
      stream.write(fakeFile);
    });
  });

  describe('beautify() – html', function() {
    var getHtmlFile = function(ext) {
      return new File({
        path: `/home/contra/test/file.${ext}`,
        base: '/home/contra/test/',
        cwd: '/home/contra/',
        contents: new Buffer.from('<html><body><h1>foo</h1><h2>bar</h2></body></html>')
      });
    };
    var expected = `<html>

<body>
  <h1>foo</h1>
  <h2>bar</h2>
</body>

</html>`;

    it('should beautify .html', function(done) {
      var stream = beautify({ indent_size: 2 });
      var fakeFile = getHtmlFile(`html`);

      stream.on('error', done);
      stream.on('data', function(newFile) {
        should.exist(newFile);
        should.exist(newFile.path);
        should.exist(newFile.relative);
        should.exist(newFile.contents);

        newFile.path.should.equal('/home/contra/test/file.html');
        newFile.relative.should.equal('file.html');
        String(newFile.contents).should.equal(expected);
        done();
      });
      stream.write(fakeFile);
    });

    it('should beautify .htm', function(done) {
      var stream = beautify({ indent_size: 2 });
      var fakeFile = getHtmlFile(`htm`);

      stream.on('error', done);
      stream.on('data', function(newFile) {
        should.exist(newFile);
        should.exist(newFile.path);
        should.exist(newFile.relative);
        should.exist(newFile.contents);

        newFile.path.should.equal('/home/contra/test/file.htm');
        newFile.relative.should.equal('file.htm');
        String(newFile.contents).should.equal(expected);
        done();
      });
      stream.write(fakeFile);
    });
  });

  describe('beautify() – css', function() {
    it('should beautify .css', function(done) {
      var stream = beautify({ indent_size: 2 });
      var fakeFile = new File({
        path: '/home/contra/test/file.css',
        base: '/home/contra/test/',
        cwd: '/home/contra/',
        contents: new Buffer.from(`.foo { color: red; }`)
      });

      var expected = `.foo {
  color: red;
}`;
      stream.on('error', done);
      stream.on('data', function(newFile) {
        should.exist(newFile);
        should.exist(newFile.path);
        should.exist(newFile.relative);
        should.exist(newFile.contents);

        newFile.path.should.equal('/home/contra/test/file.css');
        newFile.relative.should.equal('file.css');
        String(newFile.contents).should.equal(expected);
        done();
      });
      stream.write(fakeFile);
    });
  });
});
