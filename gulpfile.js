var gulp = require('gulp');
var clean = require('gulp-clean');
var webpack = require('webpack-stream');
var sass = require('gulp-sass');
var minifyCss = require('gulp-cssnano');
var sourcemaps = require('gulp-sourcemaps');
var autoprefixer = require('gulp-autoprefixer');

var paths = {
  css: ['app/**/*.scss', 'app/**/*.sass'],
  html: ['app/**/*.html'],
  js: ['app/**/*.js'],
  static: ['img/*', 'vendor/*'],
  test: ['test/testSpec.js']
};

gulp.task('build:css', function() {
  gulp.src('app/scss/app.scss')
    .pipe(sourcemaps.init())
    .pipe(sass())
    .pipe(autoprefixer())
    .pipe(minifyCss())
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('build/'));
});

gulp.task('build:html', function() {
  gulp.src('app/**/*.html')
  .pipe(gulp.dest('build/'));
});

gulp.task('build:js', function() {
  return gulp.src('app/js/entry.js')
  .pipe(webpack({
    output: {
      filename: 'bundle.js'
    }
  }))
  .pipe(gulp.dest('build/'));
});

gulp.task('build:static', function() {
  gulp.src('img/*')
  .pipe(gulp.dest('build/img'));

  gulp.src('vendor/*')
  .pipe(gulp.dest('build/vendor'));
});

gulp.task('build:test', function() {
  return gulp.src(paths.test)
    .pipe(webpack({output: {filename: 'testBundle.js'}}))
    .pipe(gulp.dest('./test'))
})

gulp.task('clean', function() {
  return gulp.src('build', {read: false})
        .pipe(clean({force: true}));
})

gulp.task('watch:css', function() {
	gulp.watch(paths.css, ['build:css']);
});

gulp.task('watch:html', function() {
	gulp.watch(paths.html, ['build:html']);
});

gulp.task('watch:js', function() {
	gulp.watch(paths.js, ['build:js']);
});

gulp.task('watch:static', function() {
  gulp.watch(paths.static, ['build:static'])
});

gulp.task('watch:test', function() {
  gulp.watch(paths.test, ['build:test'])
})

gulp.task('build:all', ['build:css', 'build:html', 'build:js', 'build:static']);
gulp.task('test:all', ['test:mocha']);
gulp.task('watch:all', ['watch:css', 'watch:html', 'watch:js', 'watch:test']);
gulp.task('default', ['build:all', 'watch:all']);
