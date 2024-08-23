const articleDiv = document.querySelector('article');
const articleLength = articleDiv.scrollHeight; //ex: 2000px. Not directly used.
const articleTopLocation = articleDiv.offsetTop; //ex: 150px from the top.
const articleBottomLocation = articleLength + articleTopLocation; //ex 2150px from the top.
const twentyfivepoint = articleLength * 0.25 + articleTopLocation; //ex: 650px from top.
const halfWayPoint = articleLength * 0.5 + articleTopLocation; //ex: 1150px from top.
const seventyfivepoint = articleLength * 0.75 + articleTopLocation; //ex: 1800px from top.

let scrollCheckPoint = new Event("checkpoint");

// Define the debounce function (adopted from Underscore.js)
const debounce = (func, wait, immediate) => {
  var timeout;
  return function () {
    var context = this;
    var args = arguments;
    clearTimeout(timeout);
    timeout = setTimeout(function () {
      if (!immediate) func.apply(context, args);
    }, wait);
  };
};

// Check scroll depth through article
window.addEventListener("scroll", debounce(() => {
  window.addEventListener("checkpoint", checkpointArrival);
  window.dispatchEvent(scrollCheckPoint);
}, 2000));

function checkpointArrival(e) {
  const scrollY = document.documentElement.scrollTop;
  if (scrollY >= articleBottomLocation) {
    console.log("100% read!", articleBottomLocation);
  } else if (scrollY >= seventyfivepoint) {
    console.log("75% to 100% read!", seventyfivepoint);
  } else if (scrollY >= halfWayPoint) {
    console.log("50% to 75% read!", halfWayPoint);
  } else if (scrollY >= twentyfivepoint) {
    console.log("25% to 50% read!", twentyfivepoint);
  } else if (scrollY >= 0) {
    console.log("0% to 25% read!", articleTopLocation);
  }
}