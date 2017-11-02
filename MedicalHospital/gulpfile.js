'use strict';

const gulp = require('gulp');  // Подключаем Gulp
const sass = require('gulp-sass');   //Подключаем Sass пакет
const plumber = require('gulp-plumber');//Подключаем plumber для слежения за ошибками
const postcss = require('gulp-postcss');
const rigger = require('gulp-rigger'); //Позволяет include HTML
const autoprefixer = require('autoprefixer');  // Подключаем библиотеку для автоматического добавления префиксов
const server = require('browser-sync').create(); // Подключаем Browser Sync
const mqpacker = require('css-mqpacker'); // для автоматической сортировки медиавыражений
const minify = require('gulp-csso');  // Подключаем gulp-csso (для сжатия и минификации css)
const imagemin = require('gulp-imagemin');  // Подключаем библиотеку для работы с изображениями
const pngquant = require('imagemin-pngquant'); // Подключаем библиотеку для работы с png
const webp = require('gulp-webp'); // Подключаем библиотеку для изображений в формате webp
const spritesmith = require('gulp.spritesmith'); //Библиотека спрайтов из png
const rename = require('gulp-rename');  // Подключаем библиотеку для переименования файлов
const svgstore = require('gulp-svgstore');//Создание sprite из svg
const svgmin = require('gulp-svgmin'); //Подключаем плагин для минификации svg
const uglify = require('gulp-uglify');  // Подключаем gulp-uglify (для сжатия и минификации JS)
const del = require('del');  // Подключаем библиотеку для удаления файлов и папок
const size = require('gulp-size'); // Для отображения размера продакшн файлов 
const run = require('run-sequence'); //Плагин позволяющий последовательно запускать задачи (работа gulp по умолчанию асинхронно)
const concat = require('gulp-concat');  // Подключаем gulp-concat (для конкатенации файлов)
const stylefmt = require('gulp-stylefmt');
const sourcemaps = require('gulp-sourcemaps');
const critical = require('critical');//создание критического css для первого отображения страницы

/* ------------ Delete build folder ------------- */

gulp.task('clean', function() {
  console.log('*********** Очистка папки сборки');
  return del('build'); 
});

/* ------------ Copy script ------------- */

gulp.task('copy', function() {
  return gulp.src([
    'source/fonts/**/*.{woff,woff2}',
    'source/img/**',
    'source/js/picturefill.min.js',
    'source/js/lazysizes.min.js'
    ], {
    base: 'source'
  })
  .pipe(gulp.dest('build'));
});

/* ------------ Style compile ------------- */

gulp.task('style', function() {
  console.log('*********** Компиляция стилей');
  gulp.src('source/sass/style.scss') // Берем источник
  .pipe(plumber()) // Задаем слежение за ошибками в scss файлах
  .pipe(sourcemaps.init())
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
  .pipe(sourcemaps.write('/'))
  .pipe(size({
      title: 'Размер',
      showFiles: true,
      showTotal: false,
    }))
  .pipe(gulp.dest('build/css'))  // Сохраняем min.css
  .pipe(server.stream()); //Перезапускаем сборку при изменении файлов *.scss
});

/* ------------ HTML compile ------------- */

gulp.task('html', function () {
  console.log('*********** Компиляция HTML');
  gulp.src('source/*.html') //Выберем файлы по нужному пути
  .pipe(plumber())
  .pipe(rigger())
  .pipe(gulp.dest('build')) //Выплюнем их в папку build
  .pipe(server.stream()); //И перезагрузим наш сервер для обновлений
});

/* ------------ Scripts compile ------------- */

gulp.task('rigger', function () {
  console.log('*********** сборка скриптов в script.js');
  gulp.src('source/js/common.js')
    .pipe(rigger())
    .pipe(rename('script.js'))
    .pipe(gulp.dest('source/js'));
});

gulp.task('script', function() {
    console.log('*********** Компиляция js');
  return gulp.src([ // Берем все необходимые библиотеки
    'node_modules/jquery/dist/jquery.min.js', // jQuery библиотека
    'node_modules/magnific-popup/dist/jquery.magnific-popup.min.js', // Берем Magnific Popup
    'node_modules/parallax/parallax.js', //Parallax эффект
    'node_modules/owl.carousel/dist/owl.carousel.js',
    'node_modules/page-scroll-to-id/jquery.malihu.PageScroll2id.js', //скрол страницы по id
    'node_modules/waypoints/lib/jquery.waypoints.js',
    'source/libs/animate/animate-css.js',
	  'source/js/script.js' //подключаем пользовательский скрипт
    ])
    .pipe(plumber())
    .pipe(concat('script.js'))  // Собираем их в новом файле libs.min.js
    .pipe(gulp.dest('build/js'))
    .pipe(uglify()) // Сжимаем JS файл
    .pipe(rename('script.min.js'))
    .pipe(size({
      title: 'Размер',
      showFiles: true,
      showTotal: false,
    }))
    .pipe(gulp.dest('build/js')) // Выгружаем в папку app/js
	.pipe(server.stream());
});

/* ------------ Images ------------- */

gulp.task('images', function() {  // Создаем task для изображений
  console.log('*********** Оптимизация изображений');
  return gulp.src('build/img/**/*.{png,jpg,gif}')  // Исходная папка для изображений
  .pipe(imagemin({
        progressive: true,
        use: [pngquant()]
      }))
  .pipe(gulp.dest('build/img')); // выгружаем все в папку назначения
});

/* ------------ convert to webp images ------------- */

gulp.task('webp', function () {
  console.log('*********** создание webp');
  return gulp.src('build/img/webp/*.{png,jpg}')
    .pipe(webp({
      quality: 50
    }))
    .pipe(gulp.dest("build/img/webp"));
});

/* ------------ png sprite ------------- */

gulp.task('sprite', function(cb) {
  console.log('*********** создание спрайта png');
  const spriteData = gulp.src('source/img/icons_png/*.png')
  .pipe(spritesmith({
    imgName: 'sprite.png',
    imgPath: '../img/sprite.png', 
    cssName: 'sprite-png.scss'
  }));
  spriteData.img.pipe(gulp.dest('build/img/'));
  spriteData.css.pipe(gulp.dest('source/sass/global/'));
  cb();
}); 

/* ------------ svg ------------- */

gulp.task('symbols', function() {    // Создаем task для создания спрайтов из svg
  console.log('*********** создание спрайта svg');
  return gulp.src('source/img/icons_svg/*.svg')
  .pipe(svgmin())
  .pipe(gulp.dest('build/img/icons_svg'))
  .pipe(svgstore({
    inlineSvg: true
  }))
  .pipe(rename('sprite.svg'))
  .pipe(gulp.dest('build/img'));
});                   

/* ------------ Critical css ------------- */

gulp.task('critical', function () {
  critical.generate({
    inline: true,
    base: 'build/',
    src: 'index.html',
    dest: 'index-critical.html',
    minify: true,
    dimensions: [{
      height: 900,
      width: 1600
    }, {
      height: 900,
      width: 1200
    }]
  });
});

/* ------------ Server settings ------------- */

gulp.task('serve', function() {
  console.log('*********** запускаем сервер');
  server.init({
    server: 'build',
    notify: false, 
    tunnel: false,
    logPrefix: 'Alinea'
  });
  gulp.watch('source/**/*.{scss,sass}', ['style']);  // Наблюдение за scss/sass файлами в папке sass
  gulp.watch('source/**/*.html', ['html']);
  gulp.watch('source/js/*.js', ['rigger','script']);
});

/* ------------ Build settings ------------- */

gulp.task('build', function(done) {
  run(
    'clean',
    'copy',
    'html',
    'style',
    'rigger',
    'script',
    'images',
    'webp',
    'symbols',
    'sprite', 
    done
  );
});