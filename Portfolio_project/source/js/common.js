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

  $('.main-header').parallax({imageSrc:'../img/bg-dark-grey-brickwall.jpg'});//добавляем параллакс
});

$(window).on('load',function() {
  $('.loader-outter').delay(200).fadeIn('slow');
  $('.loader-inner').delay(200).fadeIn('slow');
  $('.loader-outter').delay(50).fadeOut('slow');
  $('.loader-inner').delay(50).fadeOut('slow');
});




