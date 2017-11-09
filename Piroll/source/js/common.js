 $( document ).ready(function() {

   //= ../blocks/btn/btn__top.js
   //= ../blocks/main-nav/main-nav_dropdown.js
   //= ../blocks/counter/common.js

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
