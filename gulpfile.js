var gulp = require('gulp'),
	sass = require('gulp-ruby-sass'),
	autoprefixer = require('gulp-autoprefixer'),
	minifycss = require('gulp-minify-css'),
	clean = require('gulp-clean'),
	rename = require('gulp-rename'),
	livereload = require('gulp-livereload'),
	lr = require('tiny-lr'),
	server = lr();

function handleError(err){
	console.log(err.toString());
	this.emit('end');
}

gulp.task('styles', function(){
	return gulp.src('scss/style.scss')
		.pipe(sass({ style: 'expanded' }))
		.on('error', handleError)
		.pipe(autoprefixer('last 2 version', 'safari 6', 'ie 10'))
		.pipe(gulp.dest('css'))
		.pipe(rename({ suffix: '.min' }))
		.pipe(minifycss())
		.pipe(gulp.dest('css'))
		.pipe(livereload(server));
});

gulp.task('clean', function() {
	return gulp.src(['css'], {read: false})
		.pipe(clean());
});

gulp.task('default', ['clean'], function(){
	gulp.start('styles');
});

function notifyLivereload(event) {

  return gulp.src('index.html').pipe(livereload(server));
}

gulp.task('watch', function(){
	server.listen(35729, function(err){
		console.log("Livereload is on.");
		if(err){
			return console.log(err);
		};

		gulp.watch('scss/*.scss', ['styles']);
		gulp.watch('index.html', notifyLivereload);
	});

})