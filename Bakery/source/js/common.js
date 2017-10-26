$( document ).ready(function() {

   $('.favourite__carousel').owlCarousel({
     navText: ['<button class="favourite__carousel-nav--right"></button>', '<button class="favourite__carousel-nav--left"></button>'],
     loop:true,
     smartSpeed: 700,
     margin: 0,
     responsiveClass: true,
     responsive:{
       0:{
         items:2,
         nav: false
       },
       600:{
         items:3
       },
       700:{
         items:3,
         nav: true
       },
       1000:{
         items:3
       }
     }

  });
  $('.main-nav__toggle').click(function () {
    $(this).toggleClass('on');
    $('.main-nav').slideToggle();
    return false;
  });
});



