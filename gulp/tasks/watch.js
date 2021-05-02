module.exports = () => {

	app.gulp.task('watch', () => {
		app.gulp.watch(`${app.template}/src/images/**/*.+(jpg|png|jpeg|gif|svg|webp)`, app.gulp.series('images'));
		app.gulp.watch(
			[
				`${app.template}/src/pages/**/*.+(html|njk)`,
				`${app.template}/src/components/**/*.+(html|njk)`
			],
			app.gulp.series('nunjucks')
		);
		app.gulp.watch(
			[
				`${app.template}/src/styles/**/*.scss`,
				`${app.template}/src/components/**/*.scss`,
				`${app.template}/src/js/**/*.scss`
			],
			app.gulp.series('scss')
		);
		app.gulp.watch(
			[
				`${app.template}/src/js/**/*.js`,
				`!${app.template}/src/js/static/**/*.js`,
			],
			app.gulp.series('js')
		);
	});

}
