function getTheArticle() {
  const postContentContainer = document.getElementById('post-content');
  if (postContentContainer === null) {
    console.log("The current page does not have the required container `div` with an ID of `post-content`. Ergo this script will not do much work.", postContentContainer);
    return;
  }
  var firstArticleElement = postContentContainer.querySelectorAll('article')[0];
  if (firstArticleElement === null) {
    console.log("The current page does not have the required `article` element. Ergo this script will not do much work.");
    return;
  }
  return firstArticleElement;
};
  
const articleLength = getTheArticle().scrollHeight;
  
const offsets = [
  { percentage: "0%", message: "0% to 25% read!", location: getTheArticle().offsetTop },
  { percentage: "25%", message: "25% to 50% read!", location: articleLength * 0.25 + getTheArticle().offsetTop },
  { percentage: "50%", message: "50% to 75% read!", location: articleLength * 0.5 + getTheArticle().offsetTop },
  { percentage: "75%", message: "75% to 100% read!", location: articleLength * 0.75 + getTheArticle().offsetTop },
  { percentage: "100%", message: "100% read!", location: articleLength + getTheArticle().offsetTop }
];

// Debounce function (from Underscore.js)
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

function checkpointEvents(per) {
    return new CustomEvent("checkpoint", {detail: {percentage: per}});
};

function dispatch(num) {
  window.dispatchEvent(checkpointEvents(offsets[num].percentage)); // <- this is really it
  alert(offsets[num].message + " Past the " + offsets[num].location + "px checkpoint."); // <- to let the user know
  console.log("Dispatched: ", checkpointEvents(offsets[num].percentage)); // <- to show what was dispatched
};

// Check scroll depth through article and fire events at offsets
window.addEventListener("scroll", debounce(() => {
  checkScrollDepth();
}, 1500));

function checkScrollDepth() {
  const scrollY = document.documentElement.scrollTop;
  if (scrollY >= offsets[4].location) {
    dispatch(4);
  } else if (scrollY >= offsets[3].location) {
    dispatch(3);
  } else if (scrollY >= offsets[2].location) {
    dispatch(2);
  } else if (scrollY >= offsets[1].location) {
    dispatch(1);
  } else if (scrollY >= offsets[0].location) {
    dispatch(0);
  }
  // else if not even begun reading
};
