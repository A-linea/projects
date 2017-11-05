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

   // $('.gallery__images').owlCarousel({
   //   loop:true,
   //   smartSpeed: 700,
   //   margin: 0,
   //   responsiveClass: true,
   //   responsive:{
   //     0:{
   //       items:1
   //     },
   //     468:{
   //       items:2
   //     },
   //     768:{
   //       items:3
   //     },
   //     992:{
   //       items:3,
   //       loop:false,
   //     }
   //   }
   //
   // });

   $(function() {
     var owl = $('.gallery__images'),
       owlOptions = {
         loop: false,
         smartSpeed: 500,
         margin: 10,
         responsive: {
           0: {
             items: 1,
             loop: true
           },
           420: {
             items: 2
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

});

 var options = {
   useEasing: true,
   useGrouping: true,
   separator: ',',
   decimal: '.'
 };
 var optionsPlus = {
   useEasing: true,
   useGrouping: true,
   separator: '.',
   decimal: '.',
   suffix: '+'
 };
 var customers = new CountUp('customers', 0, 1000, 0, 2.2, optionsPlus);
 var hospitality = new CountUp('hospitality', 0, 2017, 0, 2.2, options);
 var approach = new CountUp('approach', 0, 1125, 0, 2.2, options);
 var lung = new CountUp('lung', 0, 400, 0, 2.2, optionsPlus);

 appear({
   init:function init () {
     console.log('dom is ready');
   },
   elements: function elements() {
     return document.getElementsByClassName("achievements__count");
   },
   appear: function appear() {
     console.log('count start');
     customers.start();
     hospitality.start();
     approach.start();
     lung.start();
     console.log('count finish');
   }
 });