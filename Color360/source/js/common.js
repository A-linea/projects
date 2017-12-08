$( document ).ready(function() {

  $('.data__gallery').owlCarousel({
    navText: ['<button class="data__carousel-nav--left"></button>', '<button class="data__carousel-nav--right"></button>'],
    loop:true,
    autoplay: true,
    autoplayTimeout:4000,
    lazyLoad: true,
    margin:10,
    smartSpeed: 500,
    animateOut: 'fadeOut',
    dots: true,
    nav: true,
    responsive:{
      0:{
        items:1
      }
    }
  });

  function accord() {
    var acc = document.getElementsByClassName("faq__question");
    var i;
    for (i = 0; i < acc.length; i++) {
      acc[i].onclick = function() {
        this.classList.toggle("faq__question--is-active");
        var panel = this.nextElementSibling;
        if (panel.style.maxHeight){
          panel.style.maxHeight = null;
        } else {
          panel.style.maxHeight = panel.scrollHeight + "px";
        }
      }
    }
  }
  accord();

  var navBar = $(".nav-bar");

  $(window).scroll(function() {
    if ($(window).scrollTop() > 480) {
      navBar.addClass("nav-bar--is-active");
    } else {
      navBar.removeClass("nav-bar--is-active");
    }
  });

  var toggleBtn = $(".main-nav__toggle");
  var mainMenu = $('.main-nav');
  var mainMenuLink = $('.main-nav__link');
  toggleBtn.click(function() {
    toggleBtn.toggleClass("is-active");
  });
  //animated menu

  toggleBtn.click(function() {
    if (mainMenu.is(':visible')) {
      mainMenu.fadeOut(600);
      mainMenuLink.removeClass('slideInUp animated');
    } else {
      mainMenu.fadeIn(600);
      mainMenuLink.addClass('slideInUp animated');
    }
  });

  //Скрываем меню при клике на ссылку
  $('.main-nav__link').click(function () {
    $('.main-nav').fadeOut(600);
    $('.main-nav__toggle').toggleClass('is-active');
  });

  $(".main-nav ul a").mPageScroll2id();
  $(".nav-bar__item a").mPageScroll2id();

  var modalOverlay = $('.modal');
  var modalBtnPhone = $('.modal__btn--phone');
  var modalBtn3d = $('.modal__btn--3d');
  var modalWindowPhone = $('.modal__window-callback');
  var modalWindow3d = $('.modal__window-3d');
  var modalBtnClose = $('.modal__close');

  modalBtnPhone.click(function(event) {
     event.preventDefault();
    modalOverlay.fadeIn(400);
    modalWindowPhone.addClass('slideInDown animated modal__window--is-active');
    });
  modalBtnClose.click(function(event) {
     event.preventDefault();
    modalOverlay.fadeOut(400);
    modalWindowPhone.removeClass('slideInDown animated modal__window--is-active');
    modalWindow3d.removeClass('slideInDown animated modal__window--is-active');
  });
  modalBtn3d.click(function(event) {
     event.preventDefault();
    modalOverlay.fadeIn(400);
    modalWindow3d.addClass('slideInDown animated modal__window--is-active');
  });
  });

