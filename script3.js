document.addEventListener("DOMContentLoaded", () => {
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
        zeroPercentCheckpoint: { percentage: "0%", message: "0% to 25% read!", location: getTheArticle().offsetTop },
        twentyFivePercentCheckpoint: { percentage: "25%", message: "25% to 50% read!", location: articleLength * 0.25 + getTheArticle().offsetTop },
        fiftyPercentCheckpoint: { percentage: "50%", message: "50% to 75% read!", location: articleLength * 0.5 + getTheArticle().offsetTop },
        seventyFivePercentCheckpoint: { percentage: "75%", message: "75% to 100% read!", location: articleLength * 0.75 + getTheArticle().offsetTop },
        hundredPercentCheckpoint: { percentage: "100%", message: "100% read!", location: articleLength + getTheArticle().offsetTop }
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
      
    function offsetEvent(percentage) {
        return new CustomEvent("checkpoint", {detail: {percentage: percentage}});
    };

    function dispatchScrollOffset(offset) {
        window.dispatchEvent(offsetEvent(offset.percentage)); // <- this is really it
        console.log(offset.message + " Past the " + offset.location + "px checkpoint."); // <- to let the user know
        console.log("Dispatched: ", offsetEvent(offset.percentage).detail); // <- to show what was dispatched
    };

    function handleScroll() {
        const userScrollLocation = document.documentElement.scrollTop;
        if (userScrollLocation >= offsets.hundredPercentCheckpoint.location) {
            dispatchScrollOffset(offsets.hundredPercentCheckpoint);
        } else if (userScrollLocation >= offsets.seventyFivePercentCheckpoint.location) {
            dispatchScrollOffset(offsets.seventyFivePercentCheckpoint);
        } else if (userScrollLocation >= offsets.fiftyPercentCheckpoint.location) {
            dispatchScrollOffset(offsets.fiftyPercentCheckpoint);
        } else if (userScrollLocation >= offsets.twentyFivePercentCheckpoint.location) {
            dispatchScrollOffset(offsets.twentyFivePercentCheckpoint);
        } else if (userScrollLocation >= offsets.zeroPercentCheckpoint.location) {
            dispatchScrollOffset(offsets.zeroPercentCheckpoint);
        }
        // else if not even begun reading
    };

    // Check scroll depth through article and fire events at offsets
    window.addEventListener("scroll", debounce(() => {
        handleScroll();
    }, 1500));
});