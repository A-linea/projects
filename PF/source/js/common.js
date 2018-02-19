 $( document ).ready(function() {

   $('.hero__letters').each(function(){
     $(this).html($(this).text().replace(/([^\x00-\x80]|\w)/g, "<span class='letter'>$&</span>"));
     anime.timeline({loop: false})
       .add({
         targets: '.line',
         scaleY: [0,1],
         opacity: [0.5,1],
         easing: "easeOutExpo",
         duration: 700
       })
       .add({
         targets: '.line',
         translateX: [0,$(".hero__letters").width()],
         easing: "easeOutSine",
         duration: 1600,
         delay: 100
       })
       .add({
         targets: '.letter',
         opacity: [0,1],
         easing: "easeOutSine",
         duration: 900,
         offset: '-=1775',
         delay: function(el, i) {
           return 124 * (i+1)
         }
       })
       .add({
         targets: '.line',
         scaleY: [0,0],
         opacity: 0,
         easing: "easeOutExpo",
         duration: 1700
       })
       .add({
         targets: '.hero__text',
         scaleY: [0,1],
         opacity: [0,1],
         duration: 3500,
         easing: 'easeInOutElastic',
         offset: '-=3275',
         delay: 100
       })
       .add({
         targets: '.hero__feautures-line1',
         translateX: [-2000,0],
         opacity: [0,1],
         duration: 2500,
         easing: 'easeInQuad',
         offset: '-=3275',
         delay: 100
       })
       .add({
         targets: '.hero__feautures-line2',
         translateX: [2000,0],
         opacity: [0,1],
         duration: 2500,
         easing: 'easeInQuad',
         offset: '-=3275',
         delay: 100
       })
       .add({
         targets: '.hero__title',
         opacity: 1,
         duration: 1000,
         easing: "easeOutExpo",
         delay: 1000
       });
   });
});

