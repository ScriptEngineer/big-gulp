const { dest, src, task, series } = require('gulp');
const babel = require('gulp-babel');
const babelify = require('babelify');
const browserify = require('browserify');
const rename = require("gulp-rename");
const source = require('vinyl-source-stream');
const sass = require('gulp-sass');

sass.compiler = require('node-sass');

const project = 'MaxiAdvanced';
const targetFile = 'history';

//Use builder for front-end, and babler for back-end

function browserifier () {

	return browserify([`../${project}/${targetFile}.js`]).bundle()
			.pipe(source(`${targetFile}.js`))
			.pipe(dest(`../${project}/`));

}

function babler() {

	console.log(`Transpiling ${targetFile} in ${project}`);
	return src(`../${project}/src/js/${targetFile}.jsx`)
	.pipe(babel({
		presets: ['@babel/react']
	}))
	.pipe(babel({
		presets: ['@babel/env']
	}))
	.pipe(dest(`../${project}/`));

}

function styles () {

	return src(`../${project}/src/scss/main.scss`)
		.pipe(sass().on('error', sass.logError))
		.pipe(rename('app.css'))
		.pipe(dest(`../${project}/`));

}

exports.styles = task(styles);
exports.babler = task(babler);
exports.browserifier = task(browserifier);
exports.builder = series(styles, babler, browserifier);

