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
  
const checkpoints = [
    { message: "0% to 25% read!", location: article().offsetTop },
    { message: "25% to 50% read!", location: articleLength * 0.25 + article().offsetTop },
    { message: "50% to 75% read!", location: articleLength * 0.5 + article().offsetTop },
    { message: "75% to 100% read!", location: articleLength * 0.75 + article().offsetTop },
    { message: "100% read!", location: articleLength + article().offsetTop }
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

function checkpointEvents(loc, mes) {
    return new CustomEvent("checkpoint", {detail: {location: loc, message: mes}});
};

function dispatch(num) {
  window.dispatchEvent(checkpointEvents(checkpoints[num].location, checkpoints[num].message));
  alert(checkpoints[num].message + " Past the " + checkpoints[num].location + "px checkpoint.");
  console.log("Dispatched: ", checkpointEvents(checkpoints[num].location, checkpoints[num].message));
};

// Check scroll depth through article and fire events at checkpoints
window.addEventListener("scroll", debounce(() => {
  checkScrollDepth();
}, 1500));

function checkScrollDepth() {
  const scrollY = document.documentElement.scrollTop;
  if (scrollY >= checkpoints[4].location) {
    dispatch(4);
  } else if (scrollY >= checkpoints[3].location) {
    dispatch(3);
  } else if (scrollY >= checkpoints[2].location) {
    dispatch(2);
  } else if (scrollY >= checkpoints[1].location) {
    dispatch(1);
  } else if (scrollY >= checkpoints[0].location) {
    dispatch(0);
  }
  // else if not even begun reading
};
