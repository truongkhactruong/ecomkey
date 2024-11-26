// $(document).ready(function () {
//   let notifyBtn = $(".notify-btn");
//   let notifyBanner = $(".notify-banner");
//   notifyBtn.on("click", function () {
//     if (notifyBanner.hasClass("active")) {
//       notifyBanner.removeClass("active");
//     } else {
//       notifyBanner.addClass("active");
//     }
//   });
// });
$(document).ready(function () {
  let notifyBtn = $(".notify-btn");
  let notifyBanner = $(".notify-banner"); // Sửa lỗi chính tả từ "notify-baner" thành "notify-banner"
  notifyBtn.on("click", function () {
    notifyBanner.toggleClass("active"); // Sử dụng toggleClass để đơn giản hóa mã
  });
});
