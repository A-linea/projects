$( document ).ready(function() {

   $('.favourite__carousel').owlCarousel({
     navText: ['<button class="favourite__carousel-nav--right"></button>', '<button class="favourite__carousel-nav--left"></button>'],
     responsiveClass: true,
     loop:true,
     smartSpeed: 700,
     nav:true,
     margin: 0,
     animateIn: true,
     responsive:{
       0:{
         items:1
       },
       600:{
         items:3
       },
       1000:{
         items:3
       }
     }

  });

});



