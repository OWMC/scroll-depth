function article() {
  const postContentContainer = document.getElementById('post-content'); //Ggets the container div for the article.
  if (postContentContainer === null) {
    console.log("The current page does not have the required container `div` with an ID of `post-content`. Ergo this script will not do much work.", postContentContainer);
    return;
  }
  var articleEl = postContentContainer.querySelectorAll('article')[0]; // Gets the first instance of an article element
  if (articleEl === null) {
    console.log("The current page does not have the required `article` element. Ergo this script will not do much work.");
    return;
  }
  return articleEl;
};

const articleLength = article().scrollHeight; //ex: 2000px. Not directly used.

// const articleTopLocation = { message: "0% to 25% read!", location: articleEl.offsetTop };
// const quarterWayPoint = { message: "25% to 50% read!", location: articleLength * 0.25 + articleTopLocation.location };
// const halfWayPoint = { message: "50% to 75% read!", location: articleLength * 0.5 + articleTopLocation.location };
// const threeQuarterWayPoint = { message: "75% to 100% read!", location: articleLength * 0.75 + articleTopLocation.location };
// const articleBottomLocation = { message: "100% read!", location: articleLength + articleTopLocation.location };

const scrollOffsets = [
    { offset: article().offsetTop, percentage: 0, eventDetails: 'Initial scroll' },
    { offset: articleLength * 0.25 + article().offsetTop, percentage: 25, eventDetails: '25% scrolled' },
    { offset: articleLength * 0.5 + article().offsetTop, percentage: 50, eventDetails: '50% scrolled' },
    { offset: articleLength * 0.75 + article().offsetTop, percentage: 75, eventDetails: '75% scrolled' },
    { offset: articleLength + article().offsetTop, percentage: 100, eventDetails: 'Fully scrolled' }
];  

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


// Add event listener to window's scroll event
window.addEventListener('scroll', debounce(() => {
  const userScrollLevel = document.documentElement.scrollTop;
  // const event = new CustomEvent('scrollOffset', { detail: { percentage: percentage, eventDetails: eventDetails } });
  // window.addEventListener("scrollOffset", logDispatchedEvent);
  scrollOffsets.forEach((scrollOffset) => {
    if (userScrollLevel >= scrollOffset.offset ) {
      // Dispatch event with offset percentage and event details
      const checkpoint = new CustomEvent('checkpoint', { detail: { percentage: scrollOffset.percentage, eventDetails: scrollOffset.eventDetails } });
      window.dispatchEvent(checkpoint);
      console.log("Checkpoint: ", scrollOffset.eventDetails);
      // window.removeEventListener("checkpoint", console.log("Removed checkpoint eventListener"));
    }
  })
}, 1500));
  
  

// Check scroll depth through article and fire events at checkpoints
// let scrollCheckPoint = new Event("checkpoint");
// window.addEventListener("scroll", debounce(() => {
//   window.addEventListener("checkpoint", checkpointArrival);
//   window.dispatchEvent(scrollCheckPoint);
// }, 1500));
// 
// function checkpointArrival(e) {
//   const scrollY = document.documentElement.scrollTop;
//   if (scrollY >= articleBottomLocation.location) {
//     console.log(articleBottomLocation.message, articleBottomLocation.location);
//   } else if (scrollY >= threeQuarterWayPoint.location) {
//     console.log(threeQuarterWayPoint.message, threeQuarterWayPoint.location);
//   } else if (scrollY >= halfWayPoint.location) {
//     console.log(halfWayPoint.message, halfWayPoint.location);
//   } else if (scrollY >= quarterWayPoint.location) {
//     console.log(quarterWayPoint.message, quarterWayPoint.location);
//   } else if (scrollY >= 0) { // Arguably we should use `articleTopLocation.location` instead of 0, but with 0 (the top of the window object) the message is still true. Or should we have (also?) the checkpoints run on page load as well as scroll? (TBC BY EMAIL FIRST)
//     console.log(articleTopLocation.message, articleTopLocation.location);
//   }
// };
