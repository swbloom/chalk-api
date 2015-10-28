'use strict';

let gulp = require('gulp');
let mocha = require('gulp-mocha');
let eslint = require('gulp-eslint');
let notify = require('gulp-notify');
let plumber = require('gulp-plumber');

gulp.task('lint', () => {
	gulp.src('./api/**/*.js')
		.pipe(eslint({
			useEslintrc: true
		}))
		.pipe(eslint.format());
});

gulp.task('test', () => {
	gulp.src('./tests/**/*.js')
		.pipe(mocha({reporter: 'spec'}))
		.on('error', (err) => {
			console.log(err.message);
		});
});


gulp.task('default', ['lint','test'],() => {
	gulp.watch('./api/**/*.js', ['lint','test']);
	gulp.watch('./tests/**/*.js', ['test']);
});