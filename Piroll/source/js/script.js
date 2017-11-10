 $( document ).ready(function() {

   $(window).scroll(function () {
       if ($(this).scrollTop() > $(this).height()) {
         $('.btn__top').addClass('btn__active');
       } else {
         $('.btn__top').removeClass('btn__active');
       }
       $('.btn__top').click(function () {
         $('html, body').stop().animate({scrollTop:0}, 'slow', 'swing')
       });
     });
   $('.main-nav__toggle').click(function () {
     $(this).toggleClass('on');
     $('.main-nav').slideToggle();
     return false;
     //return false;
   });
    var options = {
     useEasing: true,
     useGrouping: true,
     separator: '.',
     decimal: '.',
     suffix: ''
   };
   
    var projects = new CountUp('projects', 0, 548, 0, 3.2, options);
    var hours = new CountUp('hours', 0, 1465, 0, 3.2, options);
    var feedback = new CountUp('feedback', 0, 612, 0, 3.2, options);
    var clients = new CountUp('clients', 0, 735, 0, 3.2, options);

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

     // Открытие/закрытие блока с фото
     $('.gallery__wrapper').click(function () {
     $(this).toggleClass('on');
     $('.gallery__card--hidden').slideToggle('fast','swing');
     return false;
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


   // $(function() {
   //   var owl = $('.__list'),
   //     owlOptions = {
   //       loop: false,
   //       smartSpeed: 500,
   //       margin: 10,
   //       responsive: {
   //         0: {
   //           items: 1,
   //           loop: true
   //         },
   //         420: {
   //           items: 2
   //         }
   //       }
   //     };
     // if ( $(window).width() < 768 ) {
     //   var owlActive = owl.owlCarousel(owlOptions);
     // } else {
     //   owl.addClass('off');
     // }
     // $(window).resize(function() {
     //   if ( $(window).width() < 768 ) {
     //     if ( $('.owl-carousel').hasClass('off') ) {
     //       var owlActive = owl.owlCarousel(owlOptions);
     //       owl.removeClass('off');
     //     }
     //   } else {
     //     if ( !$('.owl-carousel').hasClass('off') ) {
     //       owl.addClass('off').trigger('destroy.owl.carousel');
     //       owl.find('.owl-stage-outer').children(':eq(0)').unwrap();
     //     }
     //   }
     // });
   // });

 });
 //this.closest('.blocks-library__code-wrapper')