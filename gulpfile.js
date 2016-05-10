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
var imagemin = require('gulp-imagemin');
var cache = require('gulp-cache');

// Concatenate & minify  JS files
gulp.task('scripts', function() {
	// copy main file for reference...
	gulp.src('src/js/app.js')
        .pipe(gulp.dest('build/js'));
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

// font awesome
gulp.task('icons', function() {
	return gulp.src('src/scss/font-awesome/fonts/**.*')
		.pipe(gulp.dest('build/fonts'));
});

// Watch for changes in files
gulp.task('watch', function() {
	// watch js files
	gulp.watch(src + 'js/*.js', ['scripts']);
	// watch css files
	gulp.watch(src + 'scss/*.scss', ['sass']);
});

// copy and minify images
gulp.task('images', function(){
	return gulp.src('src/img/**/*.+(png|jpg|jpeg|gif|svg)')
	// caching images that ran through imagemin
	.pipe(cache(imagemin({
		interlaced: true
	})))
	.pipe(gulp.dest('build/img'))
});


// Copy index.html to build
/*
gulp.task('copy-index', function() {
	gulp.src('./index.html')
	.pipe(gulp.dest('build'));
});
*/
// Default Task
gulp.task('default', ['scripts', 'sass', 'images', 'icons']);

