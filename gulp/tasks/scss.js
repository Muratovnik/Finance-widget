module.exports = () => {
    app.gulp.task("scss", () => {
        return app.gulp
            .src(`${app.template}/src/styles/style.scss`)
            .pipe(app.gulpPlugins.plumber())
            .pipe(app.gulpPlugins.sourcemaps.init())
            .pipe(
                app.gulpPlugins.sassGlob({
                    ignorePaths: [
                        `${app.template}/src/styles/base/variables.scss`,
                        `${app.template}/src/styles/base/mixins.scss`,
                    ],
                })
            )
            .pipe(app.gulpPlugins.sass())
            .pipe(app.gulpPlugins.autoprefixer())
            .pipe(app.gulpPlugins.sourcemaps.write("."))
            .pipe(app.gulp.dest(`${app.template}/dist/css/`))
            .pipe(
                app.browserSync.reload({
                    stream: true,
                })
            );
    });
};
