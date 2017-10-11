$(document).ready(function() {
	$('#my-menu').mmenu({
    extensions: ['theme-black', 'effect-menu-slide','pagedim-black','border-none', 'fx-listitems-slide',],
    navbar: {
      title: 'Cалон красоты'
    },
    'offCanvas': {
      position: 'right'
    }
  });
  var api = $('#my-menu').data('mmenu');
  api.bind('open:finish', function () {
    $('.main-nav__toggle').addClass('is-active');
  });
  api.bind('close:finish', function () {
    $('.main-nav__toggle').removeClass('is-active');
  })
});


