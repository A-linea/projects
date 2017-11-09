$('.main-nav__toggle').click(function () {
  $(this).toggleClass('on');
  $('.main-nav').slideToggle();
  return false;
  //return false;
});
