// Custom JS d
//some function
$(document).ready(function() {
//анимация меню
	$('.main-nav__toggle').click(function () {
	  $(this).toggleClass('on');
	  $('.main-nav').slideToggle();
  });
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

});
//прописываем анимацию для svg, работает с библиотекой Modernizr
$('.work').waypoint(function () { //добавляем waypoint для анимации с определенного места
  $('.work .work__item').each(function (index) {
    var ths = $(this);
    setTimeout(function () {
      var myAnimation = new DrawFillSVG ({
      elementId: 'triangle-'+ index
    });
      ths.removeClass('').addClass('');
    },300*index);
  });
}, {
  offset: '15%'
});


