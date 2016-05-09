// Include gulp
var gulp = require('gulp');

// define base folders
var src = 'src/';
var dest = 'build/';

// include plugins
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');
var sass = require('gulp-ruby-sass');

// Concatenate & minify  JS files
gulp.task('scripts', function() {
	return gulp.src('src/js/*.js')
		.pipe(concat('main.js'))
			.pipe(rename({suffix: '.min'}))
			.pipe(uglify())
			.pipe(gulp.dest('build/js'));
});

// Compile CSS from Sass file
gulp.task('sass', function() {
	return sass('src/scss/style.scss', {style: 'compressed'})
		.pipe(rename({suffix: '.min'}))
		.pipe(gulp.dest('build/css'));
});

// Watch for changes in files
gulp.task('watch', function() {
	// watch js files
	gulp.watch(src + 'js/*.js', ['scripts']);
	// watch css files
	gulp.watch(src + 'scss/*.scss', ['sass']);
});

// Copy index.html to build
/*
gulp.task('copy-index', function() {
	gulp.src('./index.html')
	.pipe(gulp.dest('build'));
});
*/
// Default Task
gulp.task('default', ['scripts', 'sass', 'copy-index']);

