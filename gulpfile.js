const { dest, src, task, series } = require('gulp');
const babel = require('gulp-babel');
const babelify = require('babelify');
const browserify = require('browserify');

const project = 'MaxiAdvanced';

function babler() {

	return src(`../${project}/src/js/history.jsx`)
		.pipe(babel({
			presets: ['@babel/react']
		}))
		.pipe(babel({
			presets: ['@babel/env']
		}))
		.pipe(dest(`../${project}/`));
	
}

exports.default = task(babler);
