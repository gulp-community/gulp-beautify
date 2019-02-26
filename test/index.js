var beautify = require('../');
var should = require('should');
var File = require('vinyl');
require('mocha');

function createBuffer(string) {
  return Buffer.from ? new Buffer.from(string) : new Buffer(string);
}

describe('gulp-beautify', function() {
  describe('beautify() – javascript', function() {
    var jsSource = createBuffer('function test(){console.log("test");}');
    var jsExpected = 'function test() {\n  console.log("test");\n}';

    it('should concat two files', function(done) {
      var stream = beautify({ indent_size: 2 });
      var fakeFile = new File({
        path: '/home/contra/test/file.js',
        base: '/home/contra/test/',
        cwd: '/home/contra/',
        contents: jsSource
      });

      stream.on('error', done);
      stream.on('data', function(newFile) {
        should.exist(newFile);
        should.exist(newFile.path);
        should.exist(newFile.relative);
        should.exist(newFile.contents);

        newFile.path.should.equal('/home/contra/test/file.js');
        newFile.relative.should.equal('file.js');
        String(newFile.contents).should.equal(jsExpected);
        done();
      });
      stream.write(fakeFile);
    });

    it('should be the same with the js export', function(done) {
      var stream = beautify.js({ indent_size: 2 });
      var fakeFile = new File({
        path: '/home/contra/test/file.js',
        base: '/home/contra/test/',
        cwd: '/home/contra/',
        contents: jsSource
      });

      stream.on('error', done);
      stream.on('data', function(newFile) {
        should.exist(newFile);
        should.exist(newFile.path);
        should.exist(newFile.relative);
        should.exist(newFile.contents);

        newFile.path.should.equal('/home/contra/test/file.js');
        newFile.relative.should.equal('file.js');
        String(newFile.contents).should.equal(jsExpected);
        done();
      });
      stream.write(fakeFile);
    });
  });

  describe('beautify() – html', function() {
    var htmlSource = createBuffer('<html><body><h1>foo</h1><h2>bar</h2></body></html>');
    // don't use template string for Node < 6 support
    var htmlExpected = '<html>\n\n<body>\n  <h1>foo</h1>\n  <h2>bar</h2>\n</body>\n\n</html>';

    var getHtmlFile = function(ext) {
      return new File({
        path: '/home/contra/test/file.' + ext,
        base: '/home/contra/test/',
        cwd: '/home/contra/',
        contents: htmlSource
      });
    };

    it('should beautify .html', function(done) {
      var stream = beautify.html({ indent_size: 2 });
      var fakeFile = getHtmlFile('html');

      stream.on('error', done);
      stream.on('data', function(newFile) {
        should.exist(newFile);
        should.exist(newFile.path);
        should.exist(newFile.relative);
        should.exist(newFile.contents);

        newFile.path.should.equal('/home/contra/test/file.html');
        newFile.relative.should.equal('file.html');
        String(newFile.contents).should.equal(htmlExpected);
        done();
      });
      stream.write(fakeFile);
    });

    it('should beautify .htm', function(done) {
      var stream = beautify.html({ indent_size: 2 });
      var fakeFile = getHtmlFile('htm');

      stream.on('error', done);
      stream.on('data', function(newFile) {
        should.exist(newFile);
        should.exist(newFile.path);
        should.exist(newFile.relative);
        should.exist(newFile.contents);

        newFile.path.should.equal('/home/contra/test/file.htm');
        newFile.relative.should.equal('file.htm');
        String(newFile.contents).should.equal(htmlExpected);
        done();
      });
      stream.write(fakeFile);
    });
  });

  describe('beautify() – css', function() {
    var cssSource = createBuffer('.foo { color: red; }');
    // don't use template string for Node < 6 support
    var cssExpected = '.foo {\n  color: red;\n}';

    it('should beautify .css', function(done) {
      var stream = beautify.css({ indent_size: 2 });
      var fakeFile = new File({
        path: '/home/contra/test/file.css',
        base: '/home/contra/test/',
        cwd: '/home/contra/',
        contents: cssSource
      });

      stream.on('error', done);
      stream.on('data', function(newFile) {
        should.exist(newFile);
        should.exist(newFile.path);
        should.exist(newFile.relative);
        should.exist(newFile.contents);

        newFile.path.should.equal('/home/contra/test/file.css');
        newFile.relative.should.equal('file.css');
        String(newFile.contents).should.equal(cssExpected);
        done();
      });
      stream.write(fakeFile);
    });
  });
});
