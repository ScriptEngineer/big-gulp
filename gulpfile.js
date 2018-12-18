const { dest, src, task, series } = require('gulp');
const babel = require('gulp-babel');
const babelify = require('babelify');
const browserify = require('browserify');
const source = require('vinyl-source-stream')

const project = 'MaxiAdvanced';
const targetFile = 'serverReact';

//Use builder for front-end, and babler for back-end

function browserifier () {

	return browserify(`../${project}/${targetFile}.js`).bundle()
			.pipe(source(`${targetFile}.js`))
			.pipe(dest(`../${project}/`));

}

function babler() {

	return src(`../${project}/src/js/${targetFile}.jsx`)
		.pipe(babel({
			presets: ['@babel/react']
		}))
		.pipe(babel({
			presets: ['@babel/env']
		}))
		.pipe(dest(`../${project}/`));

}

exports.babler = task(babler);
exports.browserifier = task(browserifier);
exports.builder = series(babler, browserifier);

