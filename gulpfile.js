'use strict';

const gulp = require('gulp');
const gulpPlugins = require('gulp-load-plugins')();
const browserSync = require('browser-sync').create();
const webpack = require('webpack');
const gulpWebpack = require('webpack-stream');
const tasks = require('./gulp/config/tasks');
const config = require('./config.json');
const template = config.template;
const productionPath = config.path;
const autoprefixer = require('gulp-autoprefixer');

global.app = {}
global.app.gulp = gulp;
global.app.gulpPlugins = gulpPlugins;
global.app.browserSync = browserSync;
global.app.webpack = webpack;
global.app.gulpWebpack = gulpWebpack;
global.app.mode = process.env.NODE_ENV || 'development';
global.app.template = template;
global.app.path = productionPath;
global.app.autoprefixer = autoprefixer;

tasks.forEach(function (taskPath) {
	require(taskPath)();
});

gulp.task('default', gulp.parallel('js', 'watch', 'webserver'));

gulp.task('build', gulp.series(gulp.parallel('js', 'scss', 'images', 'fonts', 'nunjucks')));