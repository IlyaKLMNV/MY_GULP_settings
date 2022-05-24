import fileInclude from "gulp-file-include";
import webpHtmlNosvg from "gulp-webp-html-nosvg";
import versionNumber from "gulp-version-number";
import pug from "gulp-pug";


export const html = () => {
    return app.gulp.src(app.path.src.html)
        // Обработка и уведомление об ошибке
        .pipe(app.plugins.plumber(
            app.plugins.notify.onError({
                title: "Html",
                message: "Error: <%= error.message %>"
            })))
        .pipe(fileInclude()) //- включить при работе с html без pug
        /*.pipe(pug({
            // Сжатие HTML файла
            pretty: true,
            // Показывать в терминале какой файл обработан
            verbose: true
        })) 
        */
        // обработка алеасов
        .pipe(app.plugins.replace(/@img\//g, 'img/'))
        .pipe(
            app.plugins.if(
                app.isBuild,
                webpHtmlNosvg()
            )
        )
        .pipe(
            app.plugins.if(
                app.isBuild,
                versionNumber({
                    'value': '%DT%',
                    'append': {
                        'key': '_v',
                        'cover': 0,
                        'to': [
                            'css',
                            'js',
                        ]
                    },
                    'output': {
                        'file': 'gulp/version.json'
                    }
                })
            )
        )
        // выгружаем папку с результатом
        .pipe(app.gulp.dest(app.path.build.html))
        // обновляем браузер
        .pipe(app.plugins.browsersync.stream());
}
