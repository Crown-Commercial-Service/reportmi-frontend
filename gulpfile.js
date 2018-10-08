'use strict';

const gulp = require('gulp');
const sass = require('gulp-sass');
const fractal = require('./fractal');

const logger = fractal.cli.console;

gulp.task('sass', function () {
  return gulp.src('stylesheets/**/*.scss')
              .pipe(sass({includePaths: ['node_modules', 'stylesheets']}))
              .pipe(gulp.dest('public'))
});

gulp.task('images', function () {
  return gulp.src(['node_modules/govuk-frontend/assets/images/**/*', 'images/'])
              .pipe(gulp.dest('public'))
});

gulp.task('watch', function () {
  gulp.watch('stylesheets/**/*.scss', ['sass']);
});

gulp.task('fractal:develop', ['watch'], function(){
  const server = fractal.web.server({
      sync: true
  });
  server.on('error', err => logger.error(err.message));
  return server.start().then(() => {
      logger.success(`Fractal server is now running at ${server.url}`);
  });
});

gulp.task('fractal:build', ['images','sass'], function(){
  const builder = fractal.web.builder();
  builder.on('progress', (completed, total) => logger.update(`Exported ${completed} of ${total} items`, 'info'));
  builder.on('error', err => logger.error(err.message));
  return builder.build().then(() => {
      logger.success('Fractal build completed!');
  });
});
