//класс занимает высоту экрана
$(document).ready(function() {
  function heightAligment() {
    $('.main-header').css('height',$(window).height());
  };
  //при изменении размера окна занимает область просмотра
  heightAligment();
  $(window).resize(function () {
    heightAligment();
  });
  //добавляем параллакс
  $('.main-header').parallax({imageSrc:'img/bg-dark-grey-brickwall-1.jpg'});

  //анимация  меню
  $('.main-nav__btn').click(function() {
    $('.main-nav__btn').toggleClass('main-nav__sandwich--active');
  });

  $('.main-nav__btn').click(function() {
    if ($('.main-nav__list--wrapper').is(':visible')) {
      $('.main-nav__list--wrapper').fadeOut(800);
    } else {
      $('.main-nav__list--wrapper').fadeIn(800);
    }
  });
});

$(window).on('load',function() {
  $('.loader').delay(300).fadeIn('slow');
  $('.loader-text').delay(200).fadeIn('slow');
  $('.loader-outter').delay(200).fadeIn('slow');
  $('.loader-inner').delay(200).fadeIn('slow');
  $('.loader').delay(300).fadeOut('slow');
  $('.loader-text').delay(250).fadeOut('slow');
  $('.loader-outter').delay(250).fadeOut('slow');
  $('.loader-inner').delay(50).fadeOut('slow');
});




