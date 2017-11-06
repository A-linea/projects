$('.main-nav__toggle').click(function () {
  $(this).toggleClass('on');
  $('.main-nav').slideToggle();
  return false;
});
$("a[href*='#about']").mPageScroll2id();
$("a[href*='#services']").mPageScroll2id();
$("a[href*='#gallery']").mPageScroll2id();
$("a[href*='#ourTeam']").mPageScroll2id();
$("a[href*='#contacts']").mPageScroll2id();



