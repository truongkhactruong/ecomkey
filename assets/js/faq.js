$(document).ready(function () {
  $(".faq-btn").click(function () {
    const tabId = $(this).data("btn"); // Lấy giá trị data-btn từ nút bấm
    const isActive = $(this).hasClass("active"); // Kiểm tra xem nút đã có lớp "active" hay chưa

    if (isActive) {
      // Nếu nút đã active, thì remove "active" khỏi cả nút và phần tử .faq-paragraph tương ứng
      $(this).removeClass("active");
      $(`.faq-paragraph[data-content="${tabId}"]`).removeClass("active");
    } else {
      // Nếu chưa active, thêm "active" cho nút và .faq-paragraph tương ứng
      $(this).addClass("active");
      $(`.faq-paragraph[data-content="${tabId}"]`).addClass("active");
    }
  });
});
