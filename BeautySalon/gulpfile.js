'use strict';

var gulp = require('gulp');  // Подключаем Gulp
var sass = require('gulp-sass');   //Подключаем Sass пакет
var plumber = require('gulp-plumber');//Подключаем plumber для слежения за ошибками
var postcss = require('gulp-postcss');
var rigger = require('gulp-rigger'); //Позволяет include HTML
var autoprefixer = require('autoprefixer');  // Подключаем библиотеку для автоматического добавления префиксов
var server = require('browser-sync').create(); // Подключаем Browser Sync
var mqpacker = require('css-mqpacker');
var minify = require('gulp-csso');  // Подключаем gulp-csso (для сжатия и минификации css)
var imagemin = require('gulp-imagemin');  // Подключаем библиотеку для работы с изображениями
var spritesmith = require('gulp.spritesmith'); //Библиотека спрайтов из png
var rename = require('gulp-rename');  // Подключаем библиотеку для переименования файлов
var svgstore = require('gulp-svgstore');//Создание sprite из svg
var svgmin = require('gulp-svgmin'); //Подключаем плагин для минификации svg
var uglify = require('gulp-uglify');  // Подключаем gulp-uglify (для сжатия и минификации JS)
var del = require('del');  // Подключаем библиотеку для удаления файлов и папок
var run = require('run-sequence'); //Плагин позволяющий последовательно запускать задачи (работа gulp по умолчанию асинхронно)
var concat = require('gulp-concat');  // Подключаем gulp-concat (для конкатенации файлов)
var cache = require('gulp-cache'); //Используем для кеширования повторяющихся изображений
var stylefmt = require('gulp-stylefmt');

/* ------------ Delete build folder ------------- */

gulp.task('clean', function() {
  return del('build'); 
});

/* ------------ Clear cache ------------- */

gulp.task('clear', function() {
  return cache.clearAll(); 
});

/* ------------ Copy script ------------- */

gulp.task('copy', function() {
  return gulp.src([
    'source/fonts/**/*.{woff,woff2}',
    'source/img/**'
    ], {
    base: 'source'
  })
  .pipe(gulp.dest('build'));
});

/* ------------ Style compile ------------- */

gulp.task('style', function() {
  gulp.src('source/sass/style.scss') // Берем источник
  .pipe(plumber()) // Задаем слежение за ошибками в scss файлах
  .pipe(sass()) // Преобразуем scss в CSS посредством gulp-sass
  .pipe(postcss([
    autoprefixer({browsers: [
      'last 2 versions'   // Создаем префиксы на две последние версии каждого браузера
    ]}),
    mqpacker({
      sort: true  //Сортируем медиавыражения от меньшего к большему
    })
  ]))
  .pipe(stylefmt()) //приводим css к единому стилю
  .pipe(gulp.dest('build/css')) // Выгружаем результат в папку build/css
  .pipe(minify()) // Минифицируем
  .pipe(rename('style.min.css')) // Переименовываем оригинальный файл css после минификации
  .pipe(gulp.dest('build/css'))  // Сохраняем min.css
  .pipe(server.stream()); //Перезапускаем сборку при изменении файлов *.scss
});

/* ------------ HTML compile ------------- */

gulp.task('html', function () {
  gulp.src('source/template/*.html') //Выберем файлы по нужному пути
  .pipe(plumber())
  .pipe(rigger())
  .pipe(gulp.dest('build')) //Выплюнем их в папку build
  .pipe(server.stream()); //И перезагрузим наш сервер для обновлений
});

/* ------------ Scripts compile ------------- */

gulp.task('script', function () {
  gulp.src('source/js/common.js') //Выберем файлы по нужному пути
  .pipe(plumber())
  .pipe(gulp.dest('build/js')) // Выгружаем результат в папку build/css
  .pipe(uglify())  // Минифицируем
  .pipe(rename('common.min.js')) // Сжимаем JS файл
  .pipe(gulp.dest('build/js')) //Выплюнем их в папку build
  .pipe(server.stream()); //И перезагрузим наш сервер для обновлений
});

/* ------------ Libs compile ------------- */

gulp.task('libs', function() {
  return gulp.src([ // Берем все необходимые библиотеки
    'node_modules/jquery/dist/jquery.min.js', // jQuery библиотека
    'node_modules/magnific-popup/dist/jquery.magnific-popup.min.js', // Берем Magnific Popup
    //'node_modules/mixitup/dist/mixitup.js', //сортировка плиток
    //'node_modules/parallax/parallax.js', //Parallax эффект
    'source/libs/selectize/js/selectize.min.js',
    'source/libs/fotorama/fotorama.js',
    'node_modules/owl.carousel/dist/owl.carousel.js',
    //'node_modules/page-scroll-to-id/jquery.malihu.PageScroll2id.js', //скрол страницы по id
    //'node_modules/waypoints/lib/jquery.waypoints.js',
    'source/libs/animate/animate-css.js' //
    ])
    .pipe(plumber())
    .pipe(concat('libs.js'))  // Собираем их в новом файле libs.min.js
    .pipe(gulp.dest('build/js'))
    .pipe(uglify()) // Сжимаем JS файл
    .pipe(rename('libs.min.js'))
    .pipe(gulp.dest('build/js')) // Выгружаем в папку app/js
});

gulp.task('css-libs', function() {
  return gulp.src('source/sass/libs.scss') // Берем все необходимые библиотеки
    .pipe(plumber()) // Задаем слежение за ошибками в scss файлах
    .pipe(sass()) // Преобразуем scss в CSS посредством gulp-sass
    .pipe(postcss([
      autoprefixer({browsers: [
        'last 2 versions'   // Создаем префиксы на две последние версии каждого браузера
      ]}),
      mqpacker({
        sort: true  //Сортируем медиавыражения от меньшего к большему
      })
    ]))
    .pipe(stylefmt())//приводим css к единому стилю
    .pipe(gulp.dest('build/css')) // Выгружаем в папку app/js
    .pipe(minify()) // Минифицируем
    .pipe(rename('libs.min.css')) //Переименовываем
    .pipe(gulp.dest('build/css'));  // Сохраняем min.css
});

/* ------------ Images ------------- */

gulp.task('images', function() {  // Создаем task для изображений
  return gulp.src('build/img/**/*.{png,jpg,gif}')  // Исходная папка для изображений
  .pipe(cache(imagemin([                                  // Пропускаем через минификатор
    imagemin.optipng({optimizationLevel: 3}),       // оптимизируем png (максимально допустимый без потери качества 3)
    imagemin.jpegtran({progressive: true})          // делаем прогрессивное отображение jpeg
  ])))
  .pipe(gulp.dest('build/img'));                    // выгружаем все в папку назначения
});
/* ------------ png sprite ------------- */
gulp.task('sprite', function(cb) {
  var spriteData = gulp.src('source/img/icons_png/*.png')
  .pipe(spritesmith({
    imgName: 'sprite.png',
    imgPath: '../img/sprite.png', 
    cssName: 'sprite.scss'
  }));
  spriteData.img.pipe(gulp.dest('build/img/'));
  spriteData.css.pipe(gulp.dest('source/sass/global/'));
  cb();
}); 

/* ------------ svg ------------- */

gulp.task('symbols', function() {    // Создаем task для создания спрайтов из svg
  return gulp.src('source/img/icons_svg/*.svg')
  .pipe(svgmin())
  .pipe(gulp.dest('build/img/icons_svg'))
  .pipe(svgstore({
    inlineSvg: true
  }))
  .pipe(rename('sprite.svg'))
  .pipe(gulp.dest('build/img'));
});                   

/* ------------ Server settings ------------- */

gulp.task('serve', function() {
  server.init({
    server: 'build',
    notify: false, 
    tunnel: false,
    logPrefix: 'Alinea'
  });
  gulp.watch('source/sass/**/*.{scss,sass}', ['style']);  // Наблюдение за scss/sass файлами в папке sass
  gulp.watch('source/template/**/*.html', ['html']);
  gulp.watch('source/js/*.js', ['script']);
});

/* ------------ Build settings ------------- */

gulp.task('build', function(fn) {
  run(
    'clean',
    'libs',
    'css-libs',
    'copy',
    'html',
    'style',
    'script',
    'images',
    'symbols',
    'sprite', 
    fn
  );
});