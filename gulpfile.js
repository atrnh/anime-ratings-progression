'use strict';

const gulp = require('gulp');
const connect = require('gulp-connect');
const open = require('gulp-open');
const browserify = require('browserify');
const source = require('vinyl-source-stream');

const config = {
  port: 5000,
  devBaseUrl: 'http://localhost',
  paths: {
    html: './*.html',
    mainJs: './src/main.js',
    dist: './dist',
  },
};

gulp.task('connect', () => {
  connect.server({
    root: ['.'],
    port: config.port,
    base: config.devBaseUrl,
    livereload: true,
  });
});

gulp.task('open', ['connect'], () => {
  return gulp.src('index.html')
    .pipe(open({uri: `${config.devBaseUrl}:${config.port}/` }));
});

gulp.task('js', () => {
  browserify(config.paths.mainJs)
    .transform('babelify', {presets: ['es2015']})
    .bundle()
    .on('error', console.error.bind(console))
    .pipe(source('bundle.js'))
    .pipe(gulp.dest(`${config.paths.dist}/scripts`))
    .pipe(connect.reload());
});

gulp.task('html', () => {
  gulp.src(config.paths.html)
    .pipe(connect.reload());
});

gulp.task('watch', () => {
  gulp.watch(config.paths.html, ['html']);
  gulp.watch(config.paths.mainJs, ['js']);
});

gulp.task('default', ['html', 'open', 'watch', 'js']);
