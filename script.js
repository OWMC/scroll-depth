const postContentContainer = document.getElementById('post-content'); //Ggets the container div for the article.
if (postContentContainer === null) {
  console.log("The current page does not have the required container `div` with an ID of `post-content`. Ergo this script will not do much work.");
};

const articleDiv = postContentContainer.querySelectorAll('article')[0]; // Gets the first instance of an article element
if (articleDiv === null) {
  console.log("The current page does not have the required `article` element. Ergo this script will not do much work.");
};

const articleLength = articleDiv.scrollHeight; //ex: 2000px. Not directly used.
const articleTopLocation = { message: "0% to 25% read!", location: articleDiv.offsetTop };
const quarterWayPoint = { message: "25% to 50% read!", location: articleLength * 0.25 + articleTopLocation.location };
const halfWayPoint = { message: "50% to 75% read!", location: articleLength * 0.5 + articleTopLocation.location };
const threeQuarterWayPoint = { message: "75% to 100% read!", location: articleLength * 0.75 + articleTopLocation.location };
const articleBottomLocation = { message: "100% read!", location: articleLength + articleTopLocation.location };

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

// Check scroll depth through article and fire events at checkpoints
let scrollCheckPoint = new Event("checkpoint");
window.addEventListener("scroll", debounce(() => {
  window.addEventListener("checkpoint", checkpointArrival);
  window.dispatchEvent(scrollCheckPoint);
  console.log("dispatched: ", window.dispatchEvent(scrollCheckPoint));
}, 1500));

function checkpointArrival(e) {
  const scrollY = document.documentElement.scrollTop;
  if (scrollY >= articleBottomLocation.location) {
    console.log(articleBottomLocation.message, articleBottomLocation.location);
  } else if (scrollY >= threeQuarterWayPoint.location) {
    console.log(threeQuarterWayPoint.message, threeQuarterWayPoint.location);
  } else if (scrollY >= halfWayPoint.location) {
    console.log(halfWayPoint.message, halfWayPoint.location);
  } else if (scrollY >= quarterWayPoint.location) {
    console.log(quarterWayPoint.message, quarterWayPoint.location);
  } else if (scrollY >= 0) { // Arguably we should use `articleTopLocation.location` instead of 0, but with 0 (the top of the window object) the message is still true. Or should we have (also?) the checkpoints run on page load as well as scroll? (TBC BY EMAIL FIRST)
    console.log(articleTopLocation.message, articleTopLocation.location);
  }
};

