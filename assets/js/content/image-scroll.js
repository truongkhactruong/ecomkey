let scrollPosition = 0;

function scrollImages(direction) {
  const container = document.querySelector(".image-scroll");
  const images = document.querySelectorAll(".image-scroll img");
  const imageWidth = images[0].clientWidth; // Chiều rộng của hình ảnh

  if (direction === "left") {
    scrollPosition -= imageWidth;
  } else {
    scrollPosition += imageWidth;
  }

  // Giới hạn vị trí cuộn
  scrollPosition = Math.max(
    0,
    Math.min(scrollPosition, (images.length - 1) * imageWidth)
  );

  container.style.transform = `translateX(-${scrollPosition}px)`;
}

// Gọi hàm này khi bạn cần cuộn
// scrollImages('left') hoặc scrollImages('right');
