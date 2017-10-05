// Custom JS d
//some function
$(document).ready(function() {
//анимация меню
	$('.main-nav__toggle').click(function () {
	  $(this).toggleClass('on');
	  $('.main-nav').slideToggle();
	  return false;
  });
//анимация нижнего меню
  $('.main-footer .main-nav__toggle').click(function () {
    $('html, body').animate({scrollTop: $(document).height()}, 'slow');
     return false;
  });
//анимация на скролл при нажатии на кнопку
  $('.main-header__arrow-btn').click(function () {
    $('html, body').animate({scrollTop: $('.main-header').height()+130}, 'slow');
    return false;
  });
  //анимация на scrollUp с footer на header
  $('.arrow__top').click(function () {
    $('html, body').animate({scrollTop: 0}, 'slow');
    return false;
  });
//анимация элементов по waypoint необходим animate-css.js
  $('.section .section__text, .section .section__title')
    .animated('fadeInRight');
  $('.reviews__slider .reviews__item').animated('rollIn');

	//анимация карточек
  $('.advantages').waypoint(function () { //добавляем waypoint для анимации с определенного места
    $('.advantages .card--off').each(function (index) {
      var ths = $(this);
      setInterval(function () {
        ths.removeClass('card--off').addClass('card--on');
      },150*index);
    });
  }, {
    offset: '15%'
  });
  $('.support__title').waypoint(function () { //добавляем waypoint для анимации с определенного места
    $('.support .card--off').each(function (index) {
      var ths = $(this);
      setInterval(function () {
        ths.removeClass('card--off').addClass('card--on');
      },150*index);
    });
  }, {
    offset: '15%'
  });


//прописываем анимацию для svg, работает с библиотекой Modernizr
$('.work').waypoint(function (dir) { //добавляем waypoint для анимации с определенного места
  if (dir ==='down') {

    $('.work .work__item').each(function (index) {
      var ths = $(this);
      setTimeout(function () {
        var myAnimation = new DrawFillSVG({
          elementId: 'triangle-' + index
        });
        ths.removeClass('').addClass('');
      }, 300 * index);
    });
  };
  this.destroy();
}, {
  offset: '45%'
});
  $('.reviews__slider').owlCarousel({
    loop: true,
    items:1,
    dots:true,
    autoplay: true
  });
  $('.property__btn').magnificPopup({
    type:'inline',
    midClick: true
  });
//Отправка формы
  $(".form").submit(function() {
    $.ajax({
      type: "POST",
      url: "mail.php",
      data: $(this).serialize()
    }).done(function() {
      alert("Спасибо за заявку!");
      setTimeout(function() {
        $.magnificPopup.close();
        $(".form").trigger("reset");
      }, 1000);
    });
    return false;
  });


});
try {
  $.browserSelector();
  if($("html").hasClass("chrome")) {
    $.smoothScroll();
  }
} catch(err) {

};
// $(window).scroll(function () {
//
// });

