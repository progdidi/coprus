const { src, dest, watch, parallel, series }  = require('gulp'); //создаем переменную, которая запрашивает возможности плагин
const scss = require('gulp-sass')(require('sass'));//создаем переменную, которая имеет возможности плагина
const concat = require('gulp-concat'); //плагин который делает конкатинацию
const browserSync = require('browser-sync').create(); //задаем немного иначе, это мы нашли на сайте браузер синк
const uglify = require('gulp-uglify-es').default; //работает с файлами жс
const autoprefixer = require('gulp-autoprefixer');
const imagemin = require('gulp-imagemin');
const del = require('del');

// const $ = require('jquery');


function styles() {
  return src('app/scss/style.scss') //находим исходный файл
    .pipe(scss({outputStyle:'compressed'})) //стиль в котором выйдет файл - сжатый
    .pipe(concat('style.min.css')) // плагин переименовывает исходный файл
    .pipe(autoprefixer({
        overrideBrowserslist: ['last 10 version'],
        grid: true
    }))
    .pipe(dest('app/css')) //куда отправляем
    .pipe(browserSync.stream()); //типа изменения в этом файле стилей scss мы отправляем в переменную браузер синг
}

function cleanDist(){
    return del('dist')
}

function build() {
    return src([
        'app/css/style.min.css',
        'app/fonts/**/*',
        'app/js/main.min.js',
        'app/*.html'
    ], {base: 'app'})
     .pipe(dest('dist'));
}

function watching(){
    watch(['app/scss/**/*.scss'], styles);//файлы, за которыми следит прога and make action
    watch(['app/js/**/*js', '!app/js/main.min.js'], scripts);
    watch(['app/*.html']).on('change', browserSync.reload);
}

function browsersync(){
    browserSync.init({
        server : {
            baseDir: 'app/'   //мы создали сервер
        }
    });
}

function scripts(){
    return src([
        'node_modules/jquery/dist/jquery.js', //обращаемся ко всем файлам js 
        'app/js/main.js'
    ])
    .pipe(concat('main.min.js')) //объединяем файлы в один с таким названием 
    .pipe(uglify()) //сжимаем
    .pipe(dest('app/js')) //отправляем файл в эту папку
    .pipe(browserSync.stream()); //типа изменения в этом файле js мы отправляем в переменную браузер синг
}

function images(){
    return src('app/images/**/*')
        .pipe(imagemin([
            
                imagemin.gifsicle({interlaced: true}),
                imagemin.mozjpeg({quality: 75, progressive: true}),
                imagemin.optipng({optimizationLevel: 5}),
                imagemin.svgo({
                    plugins: [
                        {removeViewBox: true},
                        {cleanupIDs: false}
                    ]
                })
            
        ]))
        .pipe(dest('dist/images'))

}


exports.styles = styles;
exports.watching = watching;
exports.browsersync = browsersync;

exports.scripts = scripts;

exports.cleanDist = cleanDist;


exports.images = images;

exports.build = series(cleanDist, images, build);

exports.default = parallel(styles, scripts, browsersync, watching); //действует по умолчанию при нажатии в консоль gulp 