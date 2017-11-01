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

});