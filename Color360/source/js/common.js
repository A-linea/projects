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
});

