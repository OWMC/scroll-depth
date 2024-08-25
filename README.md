# ScrollDepth
================

A piece of vanilla JS to monitor how far through an article a user has scrolled.

The debounce method has a default long timeout (1.5 seconds), because we want to know that the user has actually read (or at least skimmed) the article. This also improves browser performance by minimising compute effort on scroll.

The script considers the scroll depth in relation to the `article` element. Not the entirety of the window. As we are focused on how much of an article a user has seen and we are not interested in if the user has seen other things on the page (out of scope).

## Requirements

Requires a page containing one `article` element, within a container `div` which has the ID `post-content` (as per the Metro article template).
This `article` element, or any of it's ancestors, should not have overflowing content (causing an extra scroll area within the window object).

Note: the `article` element can have multiple instances (including nested) on the same page and remain semantic. As is the case with the Metro article. It may seem overkill to require the specific `article` element within a `div` with the ID `post-content` - the script works fine on the Metro page by merely getting the `article` element regardless of the containing `div` or it's ID - but if this script were to be used on a different page, perhaps with long `article` elements instantiated higher up in the DOM than the one contained within the `div` with the `post-content` ID. In this script I sought to insure that no other `article` element would ever trigger the script. Only one instance of an `article` element will trigger the script, and this is guaranteed in semantic markup due to the container's ID which will be unique on the page.

## Potential future refinements

The events trigger on scroll, but theoretically a user could visit the page at an anchor point far down in the article. So for example the first checkpoint `articleTopLocation.location` event may not fire. So we might want to add some extra logic which fires a checkpoint event immediately on page load.

Equally in another scenario where the user begins scrolling quickly, some checkpoints can be skipped due to the long timeout. To cover this scenario, the wording of the messages for the checkpoints makes clear that a checkpoint has been scrolled past, but doesn't assume that the user has cumulatively read everything. Alternatively in this scenario, we could log not just the latest checkpoint, but all of the checkpoints also passed prior. In this case I would change the architecture and use a `forEach` loop on the offsets object instead of using the `else if` series as I have

I would like to know more context before taking on the job. For example, why exactly are we tracking this behaviour? What problem are we trying to solve? This could mean I would make small changes like adjusting the timeout value on the debounce. Or require significant design pattern changes or more. Users can behave in unexpected ways. Accounting for all those ways could expand the scope of this script. Having the reason for tracking the proposed behaviour may limit the scope, saving effort while still delivering the necessary value.

## Installation

### Option 1 (Metro article)

1. Copy all of the script file from: `https://github.com/OWMC/scroll-depth/blob/master/script.js`
2. Open [this Metro article](https://metro.co.uk/2024/08/10/pointless-london-gallery-crowned-uks-biggest-tourist-let-down-21393090/) in a browser and open the console in developer tools
3. Paste the script into the console and hit enter.

### Option 2

1. Clone the repository: `git clone https://github.com/OWMC/scroll-depth.git`
2. Install and run a local webserver: `npm install serve` in the project directory, then `serve`

(The repo contains an html index page with an `article` inside a `div` with an ID of `post-content`)


## Authors

Oliver Wieland