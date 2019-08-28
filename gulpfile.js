const gulp = require('gulp');
const sass = require('gulp-sass');
const sourcemaps = require('gulp-sourcemaps');
const del = require('del');
const autoprefixer = require('gulp-autoprefixer');
const minify = require('gulp-csso');
const rename = require('gulp-rename');
const browserSync = require('browser-sync').create();
const imagemin = require('gulp-imagemin');
const concat = require('gulp-concat');
// const eslint = require('gulp-eslint');
// const babel = require('gulp-babel');
const uglify = require('gulp-uglify');
const newer = require('gulp-newer');
// const pkg = require('./package.json');

gulp.task('styles', () => gulp.src('src/sass/style.sass')
  .pipe(sourcemaps.init())
  .pipe(sass())
  .pipe(autoprefixer({
    cascade: false,
  }))
  .pipe(minify())
  .pipe(sourcemaps.write())
  .pipe(rename('main.min.css'))
  .pipe(gulp.dest('public/css')));

gulp.task('js', () => gulp.src('src/assets/js/**/*.js')
//   .pipe(eslint())
//   .pipe(eslint.failOnError())
//   .pipe(babel({
//     presets: ['@babel/env'],
//   }))
  .pipe(sourcemaps.init())
  .pipe(concat('main.min.js'))
  .pipe(uglify())
  .pipe(sourcemaps.write('.'))
  .pipe(gulp.dest('public/js')));

gulp.task('images', () => gulp.src('src/assets/img/*.{png,jpg,svg}')
  .pipe(newer('public/img'))
  .pipe(imagemin([
    imagemin.optipng({ optimizationLevel: 3 }),
    imagemin.jpegtran({ progressive: true }),
    imagemin.svgo(),
  ]))
  .pipe(gulp.dest('public/img')));

gulp.task('fonts', () => gulp.src('src/assets/fonts/**/*')
  .pipe(newer('public/fonts'))
  .pipe(gulp.dest('public/fonts')));

gulp.task('clean', () => del([
  'public',
]));

// gulp.task('vendor:jquery', () => gulp.src('node_modules/jquery/dist/jquery.min.js')
//   .pipe(gulp.dest('public/assets/vendor/')));

// gulp.task('vendor:inputmask', () => gulp.src('node_modules/inputmask/dist/min/jquery.inputmask.bundle.min.js')
//   .pipe(gulp.dest('public/assets/vendor/')));

// gulp.task('vendor:swiper', () => gulp.src('node_modules/swiper/dist/**/*')
//   .pipe(gulp.dest('public/assets/vendor/swiper/')));

// gulp.task('vendor:bootstrap', () => gulp.src('node_modules/bootstrap/dist/**/*')
//   .pipe(gulp.dest('public/assets/vendor/bootstrap/')));

// gulp.task('vendor:jqueryValidation', () => gulp.src([
//   'node_modules/jquery-validation/dist/jquery.validate.min.js',
//   'node_modules/jquery-validation/dist/additional-methods.min.js',
// ])
//   .pipe(gulp.dest('public/assets/vendor/')));

// gulp.task('vendor:jqueryCountdown', () => gulp.src('node_modules/jquery-countdown/dist/jquery.countdown.min.js')
//   .pipe(gulp.dest('public/assets/vendor/')));

// gulp.task('vendor:jsCookie', () => gulp.src('node_modules/js-cookie/src/js.cookie.js')
//   .pipe(sourcemaps.init())
//   .pipe(uglify())
//   .pipe(sourcemaps.write('.'))
//   .pipe(rename('js.cookie.min.js'))
//   .pipe(gulp.dest('public/assets/vendor/')));

// gulp.task('vendor:sentry', () => gulp.src('node_modules/@sentry/browser/build/bundle.min.js')
//   .pipe(sourcemaps.init())
//   .pipe(uglify())
//   .pipe(sourcemaps.write('.'))
//   .pipe(rename('sentry.min.js'))
//   .pipe(gulp.dest('public/assets/vendor/')));

// gulp.task('vendor', gulp.series('vendor:inputmask', 'vendor:swiper', 'vendor:bootstrap', 'vendor:jquery', 'vendor:jqueryValidation', 'vendor:jqueryCountdown', 'vendor:jsCookie', 'vendor:sentry'));

gulp.task('watch', () => {
  gulp.watch('src/sass/**/*', { usePolling: true }, gulp.series('styles'));
  gulp.watch('src/assets/js/**/*.js', { usePolling: true }, gulp.series('js'));
  gulp.watch('src/assets/img/*.{png,jpg,svg}', { usePolling: true }, gulp.series('images'));
  gulp.watch('src/assets/fonts/**/*', { usePolling: true }, gulp.series('fonts'));
});

gulp.task('build', gulp.series('clean', gulp.parallel('styles', 'js', 'fonts', 'images')));

gulp.task('serve', function() {
    browserSync.init({
        server: ''
    });
    browserSync.watch('src/!**/!*.*').on('change', browserSync.reload);
}); 

gulp.task('dev', gulp.series('build', gulp.parallel('watch', 'serve')));
