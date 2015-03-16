var gulp = require('gulp');
var browserSync = require('browser-sync');
var browserify = require('browserify');
var source = require('vinyl-source-stream2')
var uglify = require('gulp-uglify');
var closureCompiler = require('gulp-closure-compiler');


gulp.task('watch', function() {
	gulp.watch('../assets/shaders/*.vert', ['closure', browserSync.reload]);
	gulp.watch('../assets/shaders/*.frag', ['closure', browserSync.reload]);
	gulp.watch('../source/su/*.js', ['closure', browserSync.reload]);
	gulp.watch('../source/su/**/*.js', ['closure', browserSync.reload]);
});

gulp.task('browser-sync', function() {
	browserSync({
			proxy: 'http://localhost:8888/projects/StuvioProjects/su/',
			watchOptions: {
			debounceDelay: 1000
		}
	});
});

gulp.task('su', function() {
  gulp.src('../source/su/**/*.js')
	.pipe(closureCompiler({
	  compilerPath: 'compiler/compiler.jar',
	  fileName: 'su-min.js'
	}))
	.on('error', function(err){
		console.log(err.message);
		this.end();
	})
	.pipe(gulp.dest('../source'));
});


gulp.task('closure', ['su']);
gulp.task('default', ['closure', 'browser-sync', 'watch']);
