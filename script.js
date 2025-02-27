const sliderControls = document.querySelector(".slider-controls");
const sliderTabs = sliderControls.querySelectorAll(".slider-tab");
const sliderIndicator = sliderControls.querySelector(".slider-indicator");

// Update the indicator
const updateIndicator = (tab, index) => {
  document.querySelector(".slider-tab.current")?.classList.remove("current");
  tab.classList.add("current");

  sliderIndicator.style.transform = `translateX(${tab.offsetLeft - 20}px)`;
  sliderIndicator.style.width = `${tab.getBoundingClientRect().width}px`;

  // Calculate the scroll position and scroll smoothly
  const scrollLeft = sliderTabs[index].offsetLeft - sliderControls.offsetWidth / 2 + sliderTabs[index].offsetWidth / 2;
  sliderControls.scrollTo({ left: scrollLeft, behavior: "smooth" });
}

// Initialize swiper instance
const swiper = new Swiper(".slider-container", {
  effect: "fade",
  speed: 1300,
  autoplay: { delay: 4000 },
  navigation: {
    prevEl: "#slide-prev",
    nextEl: "#slide-next",
  },
  on: {
    // Update indicator on slide change
    slideChange: () => {
      const currentTabIndex = [...sliderTabs].indexOf(sliderTabs[swiper.activeIndex]);
      updateIndicator(sliderTabs[swiper.activeIndex], currentTabIndex);
    },
    reachEnd: () => swiper.autoplay.stop(),
  },
});

// Update the slide on tab click
sliderTabs.forEach((tab, index) => {
  tab.addEventListener("click", () => {
    swiper.slideTo(index);
    updateIndicator(tab, index);
  });
});

updateIndicator(sliderTabs[0], 0);
window.addEventListener("resize", () => updateIndicator(sliderTabs[swiper.activeIndex], 0));