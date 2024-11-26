$(document).ready(function () {
  if ($(window).width() <= 768) {
    $(".tab-btn").click(function () {
      const tabId = $(this).data("tab");
      const isActive = $(this).hasClass("active");

      // Remove active class from all tab buttons and content items
      $(".tab-btn").removeClass("active");
      $(".content-item__list").removeClass("active");

      // If the clicked tab is not active, activate it
      if (!isActive) {
        $(this).addClass("active");
        $(`#tab-${tabId}`).addClass("active");
      }
    });
  } else {
    $(".tab-btn").click(function () {
      const tabId = $(this).data("tab");
      $(".tab-btn").removeClass("active");
      $(".content-item__list").removeClass("active");
      $(this).addClass("active");
      $(`#tab-${tabId}`).addClass("active");
    });
  }
});

$(document).ready(function () {
  let isDown = false;
  let startX;
  let scrollLeft;

  const carousel = $(".image-scroll");

  // Xử lý sự kiện chuột
  carousel.on("mousedown", function (e) {
    isDown = true;
    carousel.addClass("active");
    startX = e.pageX - carousel.offset().left;
    scrollLeft = carousel.scrollLeft();
  });

  carousel.on("mouseleave", function () {
    isDown = false;
    carousel.removeClass("active");
  });

  carousel.on("mouseup", function () {
    isDown = false;
    carousel.removeClass("active");
  });

  carousel.on("mousemove", function (e) {
    if (!isDown) return;
    e.preventDefault();
    const x = e.pageX - carousel.offset().left;
    const walk = x - startX; // Tốc độ kéo
    carousel.scrollLeft(scrollLeft - walk);
  });

  // Xử lý sự kiện cảm ứng (touch)
  carousel.on("touchstart", function (e) {
    isDown = true;
    carousel.addClass("active");
    startX = e.touches[0].pageX - carousel.offset().left; // Lấy vị trí cảm ứng
    scrollLeft = carousel.scrollLeft();
  });

  carousel.on("touchend", function () {
    isDown = false;
    carousel.removeClass("active");
  });

  carousel.on("touchmove", function (e) {
    if (!isDown) return;
    e.preventDefault();
    const x = e.touches[0].pageX - carousel.offset().left;
    const walk = x - startX; // Tốc độ kéo
    carousel.scrollLeft(scrollLeft - walk);
  });
});
$(document).ready(function () {
  $(".tab-btn--secondary").on("click", function () {
    var value = $(this).data("tap");
    $(this).addClass("active").siblings().removeClass("active");
  });
});
