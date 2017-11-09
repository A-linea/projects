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
   // var optionsPlus = {
   //   useEasing: true,
   //   useGrouping: true,
   //   separator: '.',
   //   decimal: '.',
   //   suffix: '+'
   // };
   //
   // var customers = new CountUp('customers', 0, 1000, 0, 2.2, optionsPlus);
   // var hospitality = new CountUp('hospitality', 0, 2017, 0, 2.2, options);
   // var approach = new CountUp('approach', 0, 1125, 0, 2.2, options);
   //var lung = new CountUp('lung', 0, 400, 0, 2.2, optionsPlus);

      //инициализация appear.js
   appear({
     init:function init () {
       console.log('dom is ready');
     },
     elements: function elements() {
       return document.getElementsByClassName("about__skills-wrapper");
     },
     appear: function appear() {
       console.log('progress start');
       ui.animate(0.72); // Number from 0.0 to 1.0
       web.animate(0.90);
       marketing.animate(0.65);
       console.log('progress finish');
     },

     // elements: function elements() {
     //   return document.getElementsByClassName("achievements__count");
     // },
     // appear: function appear() {
     //   console.log('count start');
     //   customers.start();
     //   hospitality.start();
     //   approach.start();
     //   lung.start();
     //   console.log('count finish');
     // }
   });
});