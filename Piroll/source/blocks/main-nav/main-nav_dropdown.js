$('.main-nav__toggle').click(function () {
  $(this).toggleClass('is-active');
  $('.main-nav').slideToggle();
  return false;
  //return false;
});
