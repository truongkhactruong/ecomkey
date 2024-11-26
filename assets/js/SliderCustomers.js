class SliderCustomers {
  constructor(slider, options = {}) {
    this.slider = slider;
    this.slides = slider.querySelectorAll(".content--six__card");
    this.sliderContainer = slider.querySelector(".slider-customers-container");
    this.paginationContainer = slider.querySelector(
      ".slider__pagination__points"
    );
    this.sliderWrapper = slider.querySelector(".slider-customers-wrapper");
    this.btnPrev = slider.querySelector(".btn-prev");
    this.btnNext = slider.querySelector(".btn-next");
    this.currentIndex = 0;
    this.autoScrollInterval = null;
    this.isDragging = false;
    this.startX = 0;
    this.scrollLeft = 0;

    // Options for customization
    this.intervalDurationMs = options.intervalDurationMs || 10000;
    this.intervalDurationSec = this.intervalDurationMs / 1000;

    // Initialize the slider
    this.init();
  }

  init() {
    this.createPagination();
    this.addEventListeners();
    this.startAutoScroll();
  }

  createPagination() {
    this.slides.forEach((slide, index) => {
      const button = document.createElement("button");
      button.classList.add("slider__pagination__point");
      button.setAttribute("id", `${this.slider.id}__slide${index}__button`);

      if (index === 0) {
        button.classList.add("active");
        slide.classList.add("active");
      }

      this.paginationContainer.appendChild(button);
    });

    this.paginationButtons = this.paginationContainer.querySelectorAll(
      ".slider__pagination__point"
    );
  }

  goToSlide(index, fromAutoScroll = false) {
    this.paginationButtons.forEach((btn) => btn.classList.remove("active"));
    this.slides.forEach((slide) => slide.classList.remove("active"));

    this.paginationButtons[index].classList.add("active");
    this.slides[index].classList.add("active");

    const offsetLeft = this.slides[index].offsetLeft;
    this.sliderWrapper.scrollTo({
      left: offsetLeft,
      behavior: "smooth",
    });

    this.currentIndex = index;

    if (fromAutoScroll) {
      this.paginationButtons[this.currentIndex].classList.add("timer");
    }
  }

  startAutoScroll() {
    this.autoScrollInterval = setInterval(() => {
      let nextIndex = this.currentIndex + 1;
      if (nextIndex >= this.slides.length) {
        nextIndex = 0;
      }
      this.goToSlide(nextIndex, true);
    }, this.intervalDurationMs);
  }

  stopAutoScroll() {
    clearInterval(this.autoScrollInterval);
    this.paginationButtons[this.currentIndex].classList.remove("timer");
  }

  addEventListeners() {
    this.paginationButtons.forEach((button, index) => {
      button.addEventListener("click", () => {
        this.stopAutoScroll();
        this.goToSlide(index);
      });
    });

    this.btnPrev.addEventListener("click", () => {
      this.stopAutoScroll();
      let prevIndex = this.currentIndex - 1;
      if (prevIndex < 0) {
        prevIndex = this.slides.length - 1;
      }
      this.goToSlide(prevIndex);
    });

    this.btnNext.addEventListener("click", () => {
      this.stopAutoScroll();
      let nextIndex = this.currentIndex + 1;
      if (nextIndex >= this.slides.length) {
        nextIndex = 0;
      }
      this.goToSlide(nextIndex);
    });

    this.sliderWrapper.addEventListener("mousedown", (e) => {
      this.isDragging = true;
      this.startX = e.pageX - this.sliderWrapper.offsetLeft;
      this.scrollLeft = this.sliderWrapper.scrollLeft;
      this.stopAutoScroll();
    });

    this.sliderWrapper.addEventListener("mouseleave", () => {
      this.isDragging = false;
    });

    this.sliderWrapper.addEventListener("mouseup", () => {
      this.isDragging = false;
      this.goToClosestSlide();
    });

    this.sliderWrapper.addEventListener("mousemove", (e) => {
      if (!this.isDragging) return;
      const x = e.pageX - this.sliderWrapper.offsetLeft;
      const walk = (x - this.startX) * 2;
      this.sliderWrapper.scrollLeft = this.scrollLeft - walk;
    });
  }

  goToClosestSlide() {
    let closestIndex = this.currentIndex;
    let minDifference = Number.MAX_VALUE;

    this.slides.forEach((slide, index) => {
      const difference = Math.abs(
        slide.offsetLeft - this.sliderWrapper.scrollLeft
      );
      if (difference < minDifference) {
        minDifference = difference;
        closestIndex = index;
      }
    });

    if (
      this.sliderWrapper.scrollLeft + this.sliderWrapper.offsetWidth >=
      this.sliderWrapper.scrollWidth
    ) {
      closestIndex = 0;
    }

    this.goToSlide(closestIndex);
  }
}
