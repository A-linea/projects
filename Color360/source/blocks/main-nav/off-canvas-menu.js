$( document ).ready(function() {
  var slideout = new Slideout({
    'panel': document.querySelector('.page__main-content'),
    'menu': document.querySelector('.main-nav'),
    'padding': 256,
    'easing' : 'cubic-bezier(.32,2,.55,.27)',
    'tolerance': 70
  });

//   Toggle button
var toggle = document.querySelector('.main-nav__toggle')
   toggle.addEventListener('click', function() {
   toggle.classList.toggle('is-active')
   slideout.toggle();
  });

});
