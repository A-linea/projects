$( document ).ready(function() {
  //= ../blocks/btn/btn__top.js
  //= ../blocks/counter/common.js
  $("a[href*='#home']").mPageScroll2id();
  $("a[href*='#about']").mPageScroll2id();
  $("a[href*='#work']").mPageScroll2id();
  $("a[href*='#process']").mPageScroll2id();
  $("a[href*='#services']").mPageScroll2id();
  $("a[href*='#reviews']").mPageScroll2id();
  $("a[href*='#contacts']").mPageScroll2id();

  var slideout = new Slideout({
    'panel': document.querySelector('.page__main-content'),
    'menu': document.querySelector('.main-nav'),
    'padding': 256,
    'easing' : 'cubic-bezier(.32,2,.55,.27)',
    'tolerance': 70
  });

  //SVG animation
  var iconPorfolio = new Vivus('icon--portfolio', {duration: 200});
  var iconAlarm = new Vivus('icon--alarm', {duration: 200});
  var iconStar = new Vivus('icon--star', {duration: 200});
  var iconLike = new Vivus('icon--like', {duration: 200});
  var logoDark = new Vivus('logo-dark', {duration: 200});

//   Toggle button
  var toggle = document.querySelector('.main-nav__toggle');
  toggle.addEventListener('click', function() {
    toggle.classList.toggle('is-active');
    slideout.toggle();
  });
  //инициализация appear.js
  appear({
    init:function init () {
      console.log('dom is ready');
    },
    elements: function elements() {
      return document.getElementsByClassName("appear");
    },

    appear: function appear() {
      console.log('progress start');
      ui.animate(0.72); // Number from 0.0 to 1.0
      web.animate(0.90);
      marketing.animate(0.65);
      console.log('progress finish');
      console.log('count start');
      projects.start();
      hours.start();
      feedback.start();
      clients.start();
      console.log('count finish');
    }
  });

  //Show gallery button
  $('.gallery__wrapper').click(function () {
      $('.gallery__hidden').toggleClass('gallery__show', 'slow', 'swing');
    $('.gallery__card--hidden').toggleClass('gallery__card--show', 'slow', 'swing');
      return false;
    });

  //Gallery Carousel
  $(function() {
    var owl = $('.gallery__carousel'),
      owlOptions = {
        loop: true,
        smartSpeed: 500,
        autoplay:true,
        autoplayTimeout: 3000,
        center: true,
        mouseDrag: false,
        touchDrag: false,
        animateOut: 'fadeOut',
        lazyLoad: true,
        responsive: {
          0: {
            items: 1
          },
          480: {
            items: 2,
            autoplayTimeout: 4000
          }
        }
      };
  if ( $(window).width() < 768 ) {
    var owlActive = owl.owlCarousel(owlOptions);
  } else {
    owl.addClass('off');
  }
  $(window).resize(function() {
    if ( $(window).width() < 768 ) {
      if ( $('.owl-carousel').hasClass('off') ) {
        var owlActive = owl.owlCarousel(owlOptions);
        owl.removeClass('off');
      }
    } else {
      if ( !$('.owl-carousel').hasClass('off') ) {
        owl.addClass('off').trigger('destroy.owl.carousel');
        owl.find('.owl-stage-outer').children(':eq(0)').unwrap();
        }
      }
    });
  });
  //Services carousel
  $(function() {
    var owlServices = $('.services__inner'),
      owlOptions = {
        loop: true,
        nav:false,
        dots: true,
        smartSpeed: 500,
        autoplay:true,
        autoplayTimeout: 4000,
        responsive: {
          0: {
            items: 1
          },
          480: {
            items: 1,
            autoplayTimeout: 3000
          },
          580: {
            items: 2
          }
        }
      };
    if ( $(window).width() < 768 ) {
      var owlActive = owlServices.owlCarousel(owlOptions);
    } else {
      owlServices.addClass('off');
    }
    $(window).resize(function() {
      if ( $(window).width() < 768 ) {
        if ( $('.services__inner').hasClass('off') ) {
          var owlActive = owlServices.owlCarousel(owlOptions);
          owlServices.removeClass('off');
        }
      } else {
        if ( !$('.services__inner').hasClass('off') ) {
          owlServices.addClass('off').trigger('destroy.owl.carousel');
          owlServices.find('.owl-stage-outer').children(':eq(0)').unwrap();
        }
      }
    });
  });

  // Reviews carousel

  $('.reviews__list').owlCarousel({
    loop:true,
    margin:10,
    smartSpeed: 500,
    // responsiveClass:true,
    nav:false,
    responsive:{
      0:{
        items:1
      }
    }
  });

  $('.clients__inner').owlCarousel({
    loop:true,
    autoplay: true,
    autoplayTimeout:4000,
    lazyLoad: true,
    margin:10,
    smartSpeed: 500,
    dots: false,
    responsiveClass:true,
    nav:false,
    responsive:{
      0:{
        items:1
      },
      480:{
        items:2
      },
      768:{
        items:3
      },
      992:{
        items:5
      }
    }
  });

});
