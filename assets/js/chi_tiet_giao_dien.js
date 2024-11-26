$(document).ready(function () {
  // Chiều cao rút gọn của nội dung
  var collapsedHeight = $(".content-blog__forms").outerHeight(true);

  // Ẩn lớp overlay và tính chiều cao đầy đủ sau khi đã loại bỏ overlay
  var fullHeight = $(".content-blog__wrap").outerHeight(true);

  // Đặt chiều cao ban đầu là rút gọn
  $(".content-blog__wrap").height(collapsedHeight);

  // Xử lý khi nhấn nút
  $("#blog-btn").on("click", function () {
    if ($(this).hasClass("active")) {
      // Nếu nút đã active (trạng thái "Rút gọn")
      // Thu gọn lại nội dung
      $(".content-blog__wrap").removeClass("expanded").height(collapsedHeight);
      $(".overlay").css("display", "block");
      $(".content__btn-wrap").css("position", "absolute");
      // Loại bỏ lớp active và thay đổi văn bản nút
      $(this).removeClass("active").text("Xem thêm");
    } else {
      // Nếu nút chưa active (trạng thái "Xem thêm")
      // Hiển thị toàn bộ nội dung
      $(".overlay").css("display", "none");
      $(".content-blog__wrap").addClass("expanded").css("height", "100%");
      $(".content__btn-wrap").css("position", "initial");
      // Thêm lớp active và thay đổi văn bản nút
      $(this).addClass("active").text("Rút gọn");
    }
  });
});
