// I would want to ensure the document has loaded first. Like this:
// document.addEventListener("DOMContentLoaded", () => { code goes here });
// But this wouldn't work if copying and pasting into the console for the Metro page as it would have already loaded.

function getTheArticle() {
  const postContentContainer = document.getElementById('post-content');
  if (postContentContainer === null) {
      return;
  }
  const firstArticleElement = postContentContainer.querySelectorAll('article')[0];
  if (firstArticleElement === null) {
      return;
  }
  return firstArticleElement;
};

function offsetEvent(percentage) {
  return new CustomEvent("checkpoint", {detail: {percentageScrolled: percentage}});
};

function dispatchScrollOffset(percentage) {
  window.dispatchEvent(offsetEvent(percentage)); // <- this is really it
  console.log("Dispatched: ", offsetEvent(percentage).detail); // <- to show what was dispatched
};

function getLocation(percentage, elementLength, headerGap) {
  return elementLength * percentage / 100 + headerGap;
};

function handleScroll() {
  if (getTheArticle() !== undefined) { 
    const articleLength = getTheArticle().scrollHeight;
    const articleLocation = getTheArticle().offsetTop;
    const userScrollLocation = document.documentElement.scrollTop;
    if (userScrollLocation >= getLocation(100, articleLength, articleLocation)) {
        dispatchScrollOffset(100);
    } else if (userScrollLocation >= getLocation(50, articleLength, articleLocation)) {
        dispatchScrollOffset(50);
    } else if (userScrollLocation >= getLocation(25, articleLength, articleLocation)) {
        dispatchScrollOffset(25);
    };
  } else {
    console.log("The current page does not have the required markup. See requirements: https://github.com/OWMC/scroll-depth/blob/master/README.md).");
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

module.exports = { getLocation, offsetEvent };