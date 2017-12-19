
var bar = new ProgressBar.Line('.progressbar__bar', {
  strokeWidth: 4,
  easing: 'easeInOut',
  duration: 1400,
  color: '#10c9c3',
  trailColor: '#eee',
  trailWidth: 1,
  svgStyle: {width: '100%', height: '100%'},
  text: {
    className: 'progressbar__text',
    style: {
      color : '#000000',
      transform: null
    },
    autoStyleContainer: false
  },
  step: (state, bar) => {
    bar.setText(Math.round(bar.value() * 100) + ' %');
  }
});

bar.animate(1.0);  // Number from 0.0 to 1.0