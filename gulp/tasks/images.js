import webp from "gulp-webp";
import imagemin from "gulp-imagemin";

export const images = () => {
    return app.gulp.src(app.path.src.images)
        .pipe(app.plugins.plumber(
            app.plugins.notify.onError({
                title: "IMAGES",
                message: "Error: <%= error.message %>"
            })))
        // Проверяем картинки в папке с результатом для того чтобы обраьатывать только те, которые изменились, либо которых там нет       
        .pipe(app.plugins.newer(app.path.build.images))


        
        .pipe(
            app.plugins.if(
                app.isBuild,
                webp()
            )
        )
        .pipe(
            app.plugins.if(
                app.isBuild,
                app.gulp.dest(app.path.build.images)
            )
        )
        .pipe(
            app.plugins.if(
                app.isBuild,
                app.gulp.src(app.path.src.images)
            )
        )
        
        .pipe(
            app.plugins.if(
                app.isBuild,
                app.plugins.newer(app.path.build.images)
            )
        )
        .pipe(
            app.plugins.if(
                app.isBuild,
                imagemin({
                    progressive: true,
                    svgoPlugins: [{ removeViewBox: false }],
                    interlaced: true,
                    optimizationLevel: 3 //0 to 7
                })
            )
        )
        // выгружаем папку с результатом
        .pipe(app.gulp.dest(app.path.build.images)) 
        .pipe(app.gulp.src(app.path.src.svg)) 
        .pipe(app.gulp.dest(app.path.build.images)) 
        // обновляем браузер
        .pipe(app.plugins.browsersync.stream());
}