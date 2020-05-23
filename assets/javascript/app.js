// find all video tags
const videos = document.querySelectorAll('video');
console.log(videos);

const flag = (video, isPaused) => {
  // entries are an array

  return (entries) => {
    entries.forEach((entry) => {
      /*
    The IntersectionObserverEntry interface's read-only intersectionRatio property 
    tells you how much of the target element is currently visible within the root's intersection ratio,
     as a value between 0.0 and 1.0.
  */

      // if video is not is full view and isn't paused
      if (entry.intersectionRatio !== 1 && !video.paused) {
        // pause the video
        video.pause();
        // set paused flag to true
        isPaused = true;
      } else if (isPaused) {
        // if video is paused already
        // play video
        video.play();
        // set flag back to false
        isPaused = false;
      }
    });
    console.log(entries);
  };
};

// function for autoPlay/pause will return observer
const auto = (video) => {
  // set a flag for pausing
  let isPaused = false;

  const videoFlag = flag(video, isPaused);

  // create new instance of IntersectionObserver
  // run when target element has intersectionRatio of 1
  let observer = new IntersectionObserver(videoFlag, { threshold: 1 });

  return observer;
};

// check for browser support
if ('IntersectionObserver' in window) {
  // run the observe method of the observer object with the video tag as it's argument.
  videos.forEach((video) => {
    const observer = auto(video);
    observer.observe(video);
  });
}
