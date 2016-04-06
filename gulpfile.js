'use strict';

const gulp = require('gulp');
const sass = require('gulp-sass');
const browserSync = require('browser-sync').create();

function onError(err) {
  console.log(err);
  this.emit('end');
}

gulp.task('browser-sync', () => {
  const files = [
    'index.html',
    'js/**/*.js',
    'css/**/*.css',
    'img/**/*'
  ];

  browserSync.init(files, {
    server: {
        baseDir: './'
    },
    startPath: '?me=true'
  });
});

gulp.task('watch', () => {
  gulp.watch('index.html').on('change', browserSync.reload);

  gulp.watch('./src/sass/**/*.scss', (event, cb) => {
    setTimeout(() => {
      gulp.start('sass');
    }, 1000);
  });
});

gulp.task('sass', () => {
  gulp
    .src('src/sass/main.scss')
    .pipe(sass())
    .on('error', onError)
    .pipe(gulp.dest('build/css'))
    .pipe(browserSync.stream());
});

gulp.task('default', ['sass', 'watch', 'browser-sync']);
