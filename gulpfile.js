'use strict';

const gulp = require('gulp');
const sass = require('gulp-sass');
const fractal = require('./fractal');
var bs = require('browser-sync').create(); // create a browser sync instance.

const logger = fractal.cli.console;

gulp.task('browser-sync', ['sass'], function() {
  bs.init({
      server: {
          baseDir: "./"
      }
  });
});

gulp.task('sass', function () {
  return gulp.src('stylesheets/**/*.scss')
              .pipe(sass({includePaths: ['node_modules', 'stylesheets']}))
              .pipe(gulp.dest('public'))
              .pipe(bs.reload({stream: true})); // prompts a reload after compilation
});

gulp.task('watch', function () {
  gulp.watch("stylesheets/**/*.scss", ['sass']);
  gulp.watch("components/*").on('change', bs.reload);
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


gulp.task('fractal:build', function(){
  const builder = fractal.web.builder();
  builder.on('progress', (completed, total) => logger.update(`Exported ${completed} of ${total} items`, 'info'));
  builder.on('error', err => logger.error(err.message));
  return builder.build().then(() => {
      logger.success('Fractal build completed!');
  });
});
