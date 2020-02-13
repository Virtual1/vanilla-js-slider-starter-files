document.addEventListener("DOMContentLoaded", () => {
  // START HERE

  const SLIDETIME = 500; // HALF A SECOND PER SLIDE
  const backButton = document.querySelector(".wbn-slider-back-btn");
  const forwardButton = document.querySelector(".wbn-slider-next-btn");
  const allSlides = [...document.querySelectorAll(".wbn-slide")];

  let clickable = true;
  let active = null;
  let newActive = null;
  /// info: init function
  function initSlider() {
    allSlides.forEach(slide => {
      slide.setAttribute(
        "style",
        `transition: transform ${SLIDETIME}ms ease;
                    animation-duration: ${SLIDETIME}ms
                    ` /// info: template literals uses backticks
      );
    });
  }

  function changeSlide(forward) {
    if (clickable) {
      clickable = false; // we don't want them to be able to click while animating
      active = document.querySelector(".active");
      const activeSlideIndex = allSlides.indexOf(active);

      if (forward) {
        console.log("active slide index: ", activeSlideIndex);
        console.log("allSlides length: ", allSlides.length);
        console.log("new Slide: ", (activeSlideIndex + 1) % allSlides.length);

        newActive = allSlides[(activeSlideIndex + 1) % allSlides.length];
        active.classList.add("slideOutLeft");
        newActive.classList.add("slideInRight", "active");
      } else {
        newActive =
          allSlides[
            (activeSlideIndex - 1 + allSlides.length) % allSlides.length
          ];
        active.classList.add("slideOutRight");
        newActive.classList.add("slideInLeft", "active");
      }
    }
  }

  allSlides.forEach(slide => {
    slide.addEventListener("transitionend", e => {
      if (slide === active && !clickable) {
        clickable = true;
        active.className = "wbn-slide";
      }
    });
  });
  //Event Listeners
  forwardButton.addEventListener("click", () => {
    changeSlide(true);
  });
  backButton.addEventListener("click", () => {
    changeSlide(false);
  });
  // init the slider
  initSlider();
});
