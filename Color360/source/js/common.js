 $( document ).ready(function() {
   // function heightAligment() {
   //   $('body').css('height',$(window).height());
   // };
   // heightAligment();
   // $(window).resize(function () {
   //   heightAligment();
   // });

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

});

