$(document).ready(function() {
	$('#my-menu').mmenu({
    extensions: ['theme-black', 'effect-menu-slide', 'pagedim-black','border-none', 'fx-listitems-slide'],
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
  });
  //фикс разных высот при изменении ширины
  $('.services__carousel').on('initialized.owl.carousel', function () {
    setTimeout(function () {
      carouselService();
    }, 100);
  });
  //ининциализация карусели
  $('.services__carousel').owlCarousel({
    loop: true,
    nav: true,
    smartSpeed: 700, //время прокрутки
    //стилизуем навигацию
    navText: ['<div class="services__carousel-nav--right"></div>', '<div class="services__carousel-nav--left"></div>'],
    responsiveClass: true,
    dots: false,
    responsive: {
      0: {
        items:1
      },
      800: {
        items:2
      },
      1100: {
        items:3
      }
    }
  });
  //одинаковая ширина по содержимому по самой высокой
  $('.services__content').equalHeights();

  function carouselService() {
    $('.services__item').each(function () {
      var ths = $(this),
        thsHeight = ths.find('.services__content').outerHeight();
        ths.find('.services__image').css('min-height', thsHeight);
    });
  }carouselService();

  $('.reviews__list').owlCarousel({
    loop: true,
    dots:true,
    autoplay:true,
    autoplayTimeout: 3000,
    smartSpeed: 700, //время прокрутки
    responsiveClass: true,
    responsive: {
      0: {
        items:1
      }
    }
  });

   // $('select').selectize({
   //
   // });
  //E-mail Ajax Send
  $(".callback__form").submit(function() { //Change
    var th = $(this);
    $.ajax({
      type: "POST",
      url: "mail.php", //Change
      data: th.serialize()
    }).done(function() {
      $(th).find('.callback__success').addClass('active').css("display", "flex").hide().fadeIn();
      setTimeout(function() {
        $(th).find('.callback__success').removeClass('active').fadeOut();
        th.trigger("reset");
      }, 1000);
    });
    return false;
  });
});


