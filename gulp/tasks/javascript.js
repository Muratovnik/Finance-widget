const path = require('path');

module.exports = () => {

	app.gulp.task('js', function () {
		return app.gulp.src(`${app.template}/src/js/index.js`)
			.pipe(app.gulpPlugins.plumber())
			.pipe(app.gulpWebpack({
				output: {
					path: path.resolve(__dirname, `${app.template}/dist`),
					filename: 'js/[name].bundle.js',
					chunkFilename: 'js/[name].[contenthash:7].bundle.js',
					publicPath: app.mode == 'production' ? app.path : ''
				},
				mode: global.app.mode,
				devtool: 'source-map',
			}, app.webpack))
			.pipe(app.gulp.dest(`${app.template}/dist/`))
			.on('end', app.browserSync.reload);
	});

}