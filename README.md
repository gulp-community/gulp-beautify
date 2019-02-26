# gulp-beautify

[![status](https://secure.travis-ci.org/gulp-community/gulp-beautify.png?branch=master)](https://travis-ci.org/gulp-community/gulp-beautify)

<table><tr><td>Package</td><td>gulp-beautify</td></tr><tr><td>Description</td><td>Asset beautification using js-beautify</td></tr><tr><td>Node Version</td><td>>= 0.10</td></tr></table>

## Usage

This is a gulp plugin for js-beautify.

```javascript
var beautify = require('gulp-beautify');

gulp.task('beautify', function() {
  return gulp
    .src('./src/*.js')
    .pipe(beautify.js({ indent_size: 2 }))
    .pipe(gulp.dest('./public/'));
});
```

As with js-beautify you can use it for [HTML & CSS](https://github.com/beautify-web/js-beautify#css--html):

```javascript
var beautify = require('gulp-beautify');

gulp.task('beautify-html', function() {
  return gulp
    .src('./src/*.html')
    .pipe(beautify.html({ indent_size: 2 }))
    .pipe(gulp.dest('./public/'));
});
gulp.task('beautify-css', function() {
  return gulp
    .src('./src/*.css')
    .pipe(beautify.css({ indent_size: 2 }))
    .pipe(gulp.dest('./public/'));
});

gulp.task('beautify-js', function() {
  // gulp-beautify exports are identical to js-beautify programmatic access
  // so beautify() is the old pattern for beautify.js()
  return gulp
    .src('./src/*.js')
    .pipe(beautify({ indent_size: 2 }))
    .pipe(gulp.dest('./public/'));
});
```

## Options

Any options will be passed directly to [js-beautify](https://github.com/beautify-web/js-beautify).

## LICENSE

MIT
