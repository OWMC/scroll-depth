const articleDiv = document.querySelector('article');
const articleLength = articleDiv.scrollHeight; //ex: 2000px. Not directly used.

const articleTopLocation = { message: "0% to 25% read!", location: articleDiv.offsetTop };
const quarterWayPoint = { message: "25% to 50% read!", location: articleLength * 0.25 + articleTopLocation.location };
const halfWayPoint = { message: "50% to 75% read!", location: articleLength * 0.5 + articleTopLocation.location };
const threeQuarterWayPoint = { message: "75% to 100% read!", location: articleLength * 0.75 + articleTopLocation.location };
const articleBottomLocation = { message: "100% read!", location: articleLength + articleTopLocation.location };

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

// Check scroll depth through article and fire events at checkpoints
window.addEventListener("scroll", debounce(() => {
  window.addEventListener("checkpoint", checkpointArrival);
  window.dispatchEvent(scrollCheckPoint);
}, 1500)); // Long timeout because we want to know that the user has actually read (or at least skimmed) the article (and to improve browser performance by minimising compute effort on scroll)

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
  } else if (scrollY >= 0) { // Arguably we should use `articleTopLocation.location` instead of 0, but with 0 the message is still true.
    console.log(articleTopLocation.message, articleTopLocation.location);
  }
}

// the events trigger on scroll, but theoretically a user could visit the page at an anchor point, and read some of the article. so articleTopLocation.location may be not as good as running the event on page load. or when the article div renders. perhpas a bit pedantic.
// maximum utility - context/content neutral/agnostic
// depends on an article element
// considers the scroll depth in relation to the article element, not the entirety of the window
// some checkpoints can be skipped due to the long time out. in these cases we might want to log that while the user may have read later parts of the article, they may have skipped some.