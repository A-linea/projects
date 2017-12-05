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
});

