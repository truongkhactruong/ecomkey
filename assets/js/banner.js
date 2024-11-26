document.addEventListener("DOMContentLoaded", function () {});
$(document).ready(function () {
  let currentSlide = 0;
  const totalSlides = $(".carousel-inner .carousel-item").length;

  function showSlide(index) {
    // const slideWidth = $(".carousel-item").width();
    // const offset = -index * slideWidth;
    // $(".carousel-inner").css("transform", `translateX(${offset}px)`);
    // Remove active class from all items
    $(".carousel-item").removeClass("active");
    // Add active class to the current item
    $(".carousel-item").eq(index).addClass("active");
  }

  $(".btn-next").click(function () {
    currentSlide = (currentSlide + 1) % totalSlides;
    showSlide(currentSlide);
    updateIndicators();
  });

  $(".btn-prev").click(function () {
    currentSlide = (currentSlide - 1 + totalSlides) % totalSlides;
    showSlide(currentSlide);
    updateIndicators();
  });

  $(".carousel-indicators button").click(function () {
    currentSlide = $(this).data("bs-slide-to");
    showSlide(currentSlide);
    updateIndicators();
  });

  function updateIndicators() {
    $(".carousel-indicators button").removeClass("active");
    $(".carousel-indicators button").eq(currentSlide).addClass("active");
  }
});
