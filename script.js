// I would want to ensure the document has loaded first. Like this:
// document.addEventListener("DOMContentLoaded", () => { code goes here });
// But this wouldn't work if copying and pasting into the console for the Metro page as it would have already loaded.

function getTheArticle() {
  const postContentContainer = document.getElementById('post-content');
  if (postContentContainer === null) {
      console.log("The current page does not have the required container `div` with an ID of `post-content`. Ergo this script will not do much work.", postContentContainer);
      return;
  }
  const firstArticleElement = postContentContainer.querySelectorAll('article')[0];
  if (firstArticleElement === null) {
      console.log("The current page does not have the required `article` element. Ergo this script will not do much work.");
      return;
  }
  return firstArticleElement;
};

const articleLength = getTheArticle().scrollHeight;

const offsets = {
  twentyFivePercentCheckpoint: { percentage: "25%", message: "Passed the 25% checkpoint of this article!", location: articleLength * 0.25 + getTheArticle().offsetTop },
  fiftyPercentCheckpoint: { percentage: "50%", message: "Passed the 50% checkpoint of this article!", location: articleLength * 0.5 + getTheArticle().offsetTop },
  hundredPercentCheckpoint: { percentage: "100%", message: "Passed the 100% checkpoint of this article!", location: articleLength + getTheArticle().offsetTop }
};

function offsetEvent(percentage) {
  return new CustomEvent("checkpoint", {detail: {percentage: percentage}});
};

function dispatchScrollOffset(offset) {
  window.dispatchEvent(offsetEvent(offset.percentage)); // <- this is really it
  alert(offset.message + " (" + offset.location + "px )"); // <- to let the user know
  console.log("Dispatched: ", offsetEvent(offset.percentage).detail); // <- to show what was dispatched
};

function handleScroll() {
  const userScrollLocation = document.documentElement.scrollTop;
  if (userScrollLocation >= offsets.hundredPercentCheckpoint.location) {
      dispatchScrollOffset(offsets.hundredPercentCheckpoint);
  } else if (userScrollLocation >= offsets.fiftyPercentCheckpoint.location) {
      dispatchScrollOffset(offsets.fiftyPercentCheckpoint);
  } else if (userScrollLocation >= offsets.twentyFivePercentCheckpoint.location) {
      dispatchScrollOffset(offsets.twentyFivePercentCheckpoint);
  };
};

// Debounce function (from Underscore.js)
function debounce(func, wait) {
  var timeout = null;
  return function() {
      var context = this;
      var args = arguments;
      clearTimeout(timeout);
      timeout = setTimeout(function() {
          func.apply(context, args);
      }, wait);
  };
};

// Check scroll depth through article and fire events at offsets
window.addEventListener("scroll", debounce(() => {
  handleScroll();
}, 1500));
