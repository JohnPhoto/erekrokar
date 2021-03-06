// register service worker

if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('/sw.js').then(function (reg) {

    if (reg.installing) {
      console.log('Service worker installing');
    } else if (reg.waiting) {
      console.log('Service worker installed');
    } else if (reg.active) {
      console.log('Service worker active');
    }

  }).catch(function (error) {
    // registration failed
    console.log('Registration failed with ' + error);
  });
}
// Kroktajm
(function () {

  var SUNDAY = 0;
  var MONDAY = 1;
  var TUESDAY = 2;
  var WEDNESDAY = 3;
  var THURSDAY = 4;
  var FRIDAY = 5;
  var SATURDAY = 6;

  var overridden = false;

  var heartClicks = 0;

  function isTimeForKroks() {
    var now = new Date();
    var hour = now.getHours();
    var dayOfWeek = now.getDay();
    return hour >= 20 && (dayOfWeek === FRIDAY || dayOfWeek === SATURDAY);
  }

  function updateAnswer(answer) {
    var elem = document.getElementById('a');
    elem.textContent = answer;
  }

  function updateBodyClass(className) {
    document.body.className = className;
  }

  function doMagic() {
    var timeForKroks = overridden || isTimeForKroks();
    if (timeForKroks) {
      updateBodyClass('yes');
      updateAnswer('Japp!');
    } else {
      updateBodyClass('no');
      updateAnswer('Nepp!');
    }
  }

  function override(force) {
    overridden = typeof force !== 'undefined' ? force : true;
    doMagic();
  }

  function heartClick(){
    heartClicks += 1;
    if(heartClicks >= 10){
      heartClicks = 0;
      override(!overridden);
    }
  }

  function setUpHeartClicker(){
    document.querySelector('#heart').addEventListener('click', heartClick);
  }

  function init() {
    window.Konami(override)
    setUpHeartClicker();
    doMagic();
    setInterval(function () {
      doMagic();
    }, 1000);
  }

  init();
})();