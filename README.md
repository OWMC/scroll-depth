# ScrollDepth
================

A piece of vanilla JS to monitor how far through an article a user has scrolled.

The debounce method has a default long timeout (1.5 seconds), because we want to know that the user has actually read (or at least skimmed) the article. This also improves browser performance by minimising compute effort on scroll.

The script considers the scroll depth in relation to the `article` element. Not the entirety of the window. As we are focused on how much of an article a user has seen and we are not interested in if the user has seen other things on the page (out of scope).

## Requirements and potential future refinements

Requires a page containing one `article` element, within a container `div` which has the ID `post-content` (as per the Metro article template). This `article` element should not have overflowing content (causing an extra scroll area within the window object).

The events trigger on scroll, but theoretically a user could visit the page at an anchor point far down in the article. So for example the first checkpoint `articleTopLocation.location` event may not fire. For this reason I have added some extra logic which fires a checkpoint event immediately on page load (check this works with throttling).

Equally in another scenario where the user begins scrolling quickly, some checkpoints can be skipped due to the long timeout. To cover this scenario, the wording of the messages for the checkpoints makes clear that a part of the article has been read, but doesn't assume that the user has cumulatively read everything if a later checkpoint fires without the first previous checkpoint events firing.

I would like to know more context before taking on the job. For example, why are we tracking this behaviour? Users can behave in unexpected ways. Accounting for all those ways could expand the scope of this script a lot. But the reason for tracking the proposed behaviour may limit the scope, saving effort while still delivering the necessary value.

## Installation

### Option 1 (Metro article

1. Copy all of the script file from: `https://github.com/OWMC/scroll-depth/blob/master/script.js`
2. Open [this Metro article](https://metro.co.uk/2024/08/10/pointless-london-gallery-crowned-uks-biggest-tourist-let-down-21393090/) in a browser and open the console in developer tools
3. Paste the script into the console and hit enter.

### Option 2

1. Clone the repository: `git clone https://github.com/your-username/your-project.git`
2. Install and run a local webserver: `npm install serve` in the project directory, then `serve`


## Authors

Oliver Wieland