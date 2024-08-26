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
const articleLocation = getTheArticle().offsetTop;

function getOffset(percentage, elementLength, headerGap) {
  return { message: `Passed the ${percentage}% checkpoint of this article!`, location: elementLength * percentage / 100 + headerGap }
};

function offsetEvent(percentage) {
  return new CustomEvent("checkpoint", {detail: {percentageScrolled: percentage}});
};

function dispatchScrollOffset(offset) {
  window.dispatchEvent(offsetEvent(offset)); // <- this is really it
  alert(getOffset(offset, articleLength, articleLocation).message + " (" + getOffset(offset, articleLength, articleLocation).location + "px )"); // <- to let the user know
  console.log("Dispatched: ", offsetEvent(offset).detail); // <- to show what was dispatched
};


function handleScroll() {
  const userScrollLocation = document.documentElement.scrollTop;
  if (userScrollLocation >= getOffset(100, articleLength, articleLocation).location) {
      dispatchScrollOffset(100);
  } else if (userScrollLocation >= getOffset(50, articleLength, articleLocation).location) {
      dispatchScrollOffset(50);
  } else if (userScrollLocation >= getOffset(25, articleLength, articleLocation).location) {
      dispatchScrollOffset(25);
  };
};

// Debounce function (from Underscore.js)
function debounce(func, wait) {
  var timeout = null;
  return function() {
      var context = this;
      clearTimeout(timeout);
      timeout = setTimeout(function() {
          func.apply(context, arguments);
      }, wait);
  };
};

// Check scroll depth through article and fire events at offsets
window.addEventListener("scroll", debounce(() => {
  handleScroll();
}, 1500));
