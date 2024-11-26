document.addEventListener("DOMContentLoaded", function () {
  const languageToggle = document.querySelectorAll(".header__language");

  languageToggle.forEach((lang) => {
    lang.addEventListener("click", function () {
      // Xóa class 'active' khỏi tất cả các ngôn ngữ
      languageToggle.forEach((l) => l.classList.remove("active"));

      // Thêm class 'active' vào ngôn ngữ đã chọn
      this.classList.add("active");

      // Lấy ngôn ngữ đã chọn
      const selectedLang = this.getAttribute("data-lang");

      // Thực hiện thao tác thay đổi ngôn ngữ
      changeLanguage(selectedLang);
    });
  });

  function changeLanguage(lang) {
    if (lang === "vi") {
      console.log("Chuyển sang Tiếng Việt");
      // Thực hiện thay đổi ngôn ngữ sang Tiếng Việt
    } else if (lang === "en") {
      console.log("Switch to English");
      // Thực hiện thay đổi ngôn ngữ sang English
    }
  }
});
// $(document).ready(function () {
//   $("#menu__toggle").click(function (e) {
//     e.stopPropagation(); // Ngăn chặn sự kiện click lan truyền lên các phần tử cha
//     $(".header__menu").toggleClass("active");
//   });
//   // Ẩn danh sách tab khi nhấn ra ngoài
//   $(document).on("click", function (e) {
//     if (!$(e.target).closest(".header__menu").length) {
//       $(".header__menu").removeClass("active");
//     }
//   });
// });
$(document).ready(function () {
  $("#menu__toggle").click(function () {
    $(".header__menu").toggleClass("active"); // Thay đổi class của navbar khi nhấn nút hamburger
  });
});
$(document).ready(function () {
  $("#searchBtn").click(function () {
    $(".search-input").toggleClass("active"); // Thay đổi class của navbar khi nhấn nút hamburger
  });
});
document.addEventListener("DOMContentLoaded", function () {
  var navbar = document.getElementById("header");
  var sticky = 90; // Scroll threshold

  function handleScroll() {
    if (window.pageYOffset >= sticky) {
      navbar.classList.add("sticky-top");
    } else {
      navbar.classList.remove("sticky-top");
    }
  }

  window.onscroll = handleScroll;
});
