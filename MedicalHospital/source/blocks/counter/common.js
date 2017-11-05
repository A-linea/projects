var optionsPlus = {
  useEasing: true,
  useGrouping: true,
  separator: '.',
  decimal: '.',
  suffix: '+'
};
var customers = new CountUp('customers', 0, 1000, 0, 2.2, optionsPlus);
var hospitality = new CountUp('hospitality', 0, 2017, 0, 2.2, options);
var approach = new CountUp('approach', 0, 1125, 0, 2.2, options);
var lung = new CountUp('lung', 0, 400, 0, 2.2, optionsPlus);

appear({
  init:function init () {
    console.log('dom is ready');
  },
  elements: function elements() {
    return document.getElementsByClassName("achievements__count");
  },
  appear: function appear() {
    console.log('count start');
    customers.start();
    hospitality.start();
    approach.start();
    lung.start();
    console.log('count finish');
  }
});