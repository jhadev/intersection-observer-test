// check for browser support
const video = document.querySelector('video');

if ('IntersectionObserver' in window) {
  // find video tag

  // set a flag for pausing
  let isPaused = false;

  // create new instance of IntersectionObserver
  let observer = new IntersectionObserver(
    (entries, observer) => {
      // entries are an array
      entries.forEach((entry) => {
        /*
        The IntersectionObserverEntry interface's read-only intersectionRatio property tells you how much of the target element is currently visible within the root's intersection ratio, as a value between 0.0 and 1.0.
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
      console.log(observer);
      // run when target element has intersectionRatio of 1
    },
    { threshold: 1 }
  );
  observer.observe(video);
}
