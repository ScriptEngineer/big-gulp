const { dest, src, task, series } = require('gulp');
const babel = require('gulp-babel');
const babelify = require('babelify');
const browserify = require('browserify');
const source = require('vinyl-source-stream')

const project = 'GonzyPortfolio';

function browserifier () {

	return browserify(`../${project}/app.js`).bundle()
			.pipe(source('app.js'))
			.pipe(dest(`../${project}/`));

}

function babler() {

	return src(`../${project}/src/js/app.jsx`)
		.pipe(babel({
			presets: ['@babel/react']
		}))
		.pipe(babel({
			presets: ['@babel/env']
		}))
		//.pipe(browserified)
		.pipe(dest(`../${project}/`));

}

exports.default = task(babler);
exports.browserifier = task(browserifier);

