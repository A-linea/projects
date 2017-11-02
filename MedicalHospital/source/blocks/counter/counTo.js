/*
  countUp.js
  by @inorganik
*/

// target = id of html element or var of previously selected html element where counting occurs
// startVal = the value you want to begin at
// endVal = the value you want to arrive at
// decimals = number of decimal places, default 0
// duration = duration of animation in seconds, default 2
// options = optional object of options (see below)

var CountUp = function(target, startVal, endVal, decimals, duration, options) {

  var self = this;
  self.version = function () { return '1.9.2'; };
  
  // default options
  self.options = {
    useEasing: true, // toggle easing
    useGrouping: true, // 1,000,000 vs 1000000
    separator: ',', // character to use as a separator
    decimal: '.', // character to use as a decimal
    easingFn: easeOutExpo, // optional custom easing function, default is Robert Penner's easeOutExpo
    formattingFn: formatNumber, // optional custom formatting function, default is formatNumber above
    prefix: '', // optional text before the result
    suffix: '', // optional text after the result
    numerals: [] // optionally pass an array of custom numerals for 0-9
  };

  // extend default options with passed options object
  if (options && typeof options === 'object') {
    for (var key in self.options) {
      if (options.hasOwnProperty(key) && options[key] !== null) {
        self.options[key] = options[key];
      }
    }
  }

  if (self.options.separator === '') {
    self.options.useGrouping = false;
  }
  else {
    // ensure the separator is a string (formatNumber assumes this)
    self.options.separator = '' + self.options.separator;
  }

  // make sure requestAnimationFrame and cancelAnimationFrame are defined
  // polyfill for browsers without native support
  // by Opera engineer Erik Möller
  var lastTime = 0;
  var vendors = ['webkit', 'moz', 'ms', 'o'];
  for(var x = 0; x < vendors.length && !window.requestAnimationFrame; ++x) {
    window.requestAnimationFrame = window[vendors[x]+'RequestAnimationFrame'];
    window.cancelAnimationFrame = window[vendors[x]+'CancelAnimationFrame'] || window[vendors[x]+'CancelRequestAnimationFrame'];
  }
  if (!window.requestAnimationFrame) {
    window.requestAnimationFrame = function(callback, element) {
      var currTime = new Date().getTime();
      var timeToCall = Math.max(0, 16 - (currTime - lastTime));
      var id = window.setTimeout(function() { callback(currTime + timeToCall); }, timeToCall);
      lastTime = currTime + timeToCall;
      return id;
    };
  }
  if (!window.cancelAnimationFrame) {
    window.cancelAnimationFrame = function(id) {
      clearTimeout(id);
    };
  }

  function formatNumber(num) {
    num = num.toFixed(self.decimals);
    num += '';
    var x, x1, x2, x3, i, l;
    x = num.split('.');
    x1 = x[0];
    x2 = x.length > 1 ? self.options.decimal + x[1] : '';
    if (self.options.useGrouping) {
      x3 = '';
      for (i = 0, l = x1.length; i < l; ++i) {
        if (i !== 0 && ((i % 3) === 0)) {
          x3 = self.options.separator + x3;
        }
        x3 = x1[l - i - 1] + x3;
      }
      x1 = x3;
    }
    // optional numeral substitution
    if (self.options.numerals.length) {
      x1 = x1.replace(/[0-9]/g, function(w) {
        return self.options.numerals[+w];
      })
      x2 = x2.replace(/[0-9]/g, function(w) {
        return self.options.numerals[+w];
      })
    }
    return self.options.prefix + x1 + x2 + self.options.suffix;
  }
  // Robert Penner's easeOutExpo
  function easeOutExpo(t, b, c, d) {
    return c * (-Math.pow(2, -10 * t / d) + 1) * 1024 / 1023 + b;
  }
  function ensureNumber(n) {
    return (typeof n === 'number' && !isNaN(n));
  }

  self.initialize = function() { 
    if (self.initialized) return true;
    
    self.error = '';
    self.d = (typeof target === 'string') ? document.getElementById(target) : target;
    if (!self.d) { 
      self.error = '[CountUp] target is null or undefined'
      return false;
    }
    self.startVal = Number(startVal);
    self.endVal = Number(endVal);
    // error checks
    if (ensureNumber(self.startVal) && ensureNumber(self.endVal)) {
      self.decimals = Math.max(0, decimals || 0);
      self.dec = Math.pow(10, self.decimals);
      self.duration = Number(duration) * 1000 || 2000;
      self.countDown = (self.startVal > self.endVal);
      self.frameVal = self.startVal;
      self.initialized = true;
      return true;
    }
    else {
      self.error = '[CountUp] startVal ('+startVal+') or endVal ('+endVal+') is not a number';
      return false;
    }
  };

  // Print value to target
  self.printValue = function(value) {
    var result = self.options.formattingFn(value);

    if (self.d.tagName === 'INPUT') {
      this.d.value = result;
    }
    else if (self.d.tagName === 'text' || self.d.tagName === 'tspan') {
      this.d.textContent = result;
    }
    else {
      this.d.innerHTML = result;
    }
  };

  self.count = function(timestamp) {

    if (!self.startTime) { self.startTime = timestamp; }

    self.timestamp = timestamp;
    var progress = timestamp - self.startTime;
    self.remaining = self.duration - progress;

    // to ease or not to ease
    if (self.options.useEasing) {
      if (self.countDown) {
        self.frameVal = self.startVal - self.options.easingFn(progress, 0, self.startVal - self.endVal, self.duration);
      } else {
        self.frameVal = self.options.easingFn(progress, self.startVal, self.endVal - self.startVal, self.duration);
      }
    } else {
      if (self.countDown) {
        self.frameVal = self.startVal - ((self.startVal - self.endVal) * (progress / self.duration));
      } else {
        self.frameVal = self.startVal + (self.endVal - self.startVal) * (progress / self.duration);
      }
    }

    // don't go past endVal since progress can exceed duration in the last frame
    if (self.countDown) {
      self.frameVal = (self.frameVal < self.endVal) ? self.endVal : self.frameVal;
    } else {
      self.frameVal = (self.frameVal > self.endVal) ? self.endVal : self.frameVal;
    }

    // decimal
    self.frameVal = Math.round(self.frameVal*self.dec)/self.dec;

    // format and print value
    self.printValue(self.frameVal);

    // whether to continue
    if (progress < self.duration) {
      self.rAF = requestAnimationFrame(self.count);
    } else {
      if (self.callback) self.callback();
    }
  };
  // start your animation
  self.start = function(callback) {
    if (!self.initialize()) return;
    self.callback = callback;
    self.rAF = requestAnimationFrame(self.count);
  };
  // toggles pause/resume animation
  self.pauseResume = function() {
    if (!self.paused) {
      self.paused = true;
      cancelAnimationFrame(self.rAF);
    } else {
      self.paused = false;
      delete self.startTime;
      self.duration = self.remaining;
      self.startVal = self.frameVal;
      requestAnimationFrame(self.count);
    }
  };
  // reset to startVal so animation can be run again
  self.reset = function() {
    self.paused = false;
    delete self.startTime;
    self.initialized = false;
    if (self.initialize()) {
      cancelAnimationFrame(self.rAF);
      self.printValue(self.startVal);
    }
  };
  // pass a new endVal and start animation
  self.update = function (newEndVal) {
    if (!self.initialize()) return;
    newEndVal = Number(newEndVal);
    if (!ensureNumber(newEndVal)) {
      self.error = '[CountUp] update() - new endVal is not a number: '+newEndVal;
      return;
    }
    self.error = '';
    if (newEndVal === self.frameVal) return;
    cancelAnimationFrame(self.rAF);
    self.paused = false;
    delete self.startTime;
    self.startVal = self.frameVal;
    self.endVal = newEndVal;
    self.countDown = (self.startVal > self.endVal);
    self.rAF = requestAnimationFrame(self.count);
  };

  // format startVal on initialization
  if (self.initialize()) self.printValue(self.startVal);
};

appear=function(){"use strict";function e(){var e=window.scrollY||window.pageYOffset;null!=n&&(o.velocity=e-n,o.delta=o.velocity>=0?o.velocity:-1*o.velocity),n=e,i&&clearTimeout(i),i=setTimeout(function(){n=null},30)}function t(e,t){var n=e.getBoundingClientRect();return n.top+n.height>=0&&n.left+n.width>=0&&n.bottom-n.height<=(window.innerHeight||document.documentElement.clientHeight)+t&&n.right-n.width<=(window.innerWidth||document.documentElement.clientWidth)+t}var n=null,i=0,o={};return addEventListener("scroll",e,!1),function(e){return function(e){function n(e,t){return function(){var n=this,i=arguments;clearTimeout(l),l=setTimeout(function(){e.apply(n,i)},t)}}function i(){o.delta<y.delta.speed&&(s||(s=!0,d(),setTimeout(function(){s=!1},y.delta.timeout))),n(function(){d()},y.debounce)()}function r(){d(),addEventListener("scroll",i,!1),addEventListener("resize",i,!1)}function a(){v=[],l&&clearTimeout(l),u()}function u(){removeEventListener("scroll",i,!1),removeEventListener("resize",i,!1)}function d(){f||(v.forEach(function(e,n){e&&t(e,y.bounds)?h[n]&&(h[n]=!1,g++,y.appear&&y.appear(e),y.disappear||y.reappear||(v[n]=null)):(h[n]===!1&&(y.disappear&&y.disappear(e),w++,y.reappear||(v[n]=null)),h[n]=!0)}),y.reappear||y.appear&&(!y.appear||g!==p)||y.disappear&&(!y.disappear||w!==p)||(f=!0,u(),y.done&&y.done()))}function c(){if(!m){m=!0,y.init&&y.init();var e;if(e="function"==typeof y.elements?y.elements():y.elements){p=e.length;for(var t=0;p>t;t+=1)v.push(e[t]),h.push(!0);r()}}}var p,l,s,f,m=!1,v=[],h=[],g=0,w=0,y={};return function(e){e=e||{},y={init:e.init,elements:e.elements,appear:e.appear,disappear:e.disappear,done:e.done,reappear:e.reappear,bounds:e.bounds||0,debounce:e.debounce||50,delta:{speed:e.deltaSpeed||50,timeout:e.deltaTimeout||500}},addEventListener("DOMContentLoaded",c,!1);var t=!1;Function("/*@cc_on return document.documentMode===10@*/")()&&(t=!0);var n="complete"===document.readyState||"loaded"===document.readyState;return t?n&&c():(n||"interactive"===document.readyState)&&c(),{trigger:function(){d()},pause:function(){u()},resume:function(){r()},destroy:function(){a()}}}}()(e)}}();