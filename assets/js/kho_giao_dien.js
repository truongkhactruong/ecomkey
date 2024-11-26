$(document).ready(function () {
  $(".content-tab a").on("click", function (e) {
    e.preventDefault();
    var target = $(this).attr("href");

    // Xóa class 'active' khỏi tất cả các tab và nội dung
    $(".content-tab ").removeClass("active");
    $(".rectangle").remove();

    // Thêm class 'active' vào tab và nội dung được chọn
    $(this).parent(".content-tab").addClass("active");
    $(this).parent(".content-tab").append('<div class="rectangle"></div>');
    $(target).addClass("active");
  });

  $(".btns-color").on("click", function () {
    // Lấy giá trị màu từ thuộc tính data-color của nút được nhấp
    // var color = $(this).data("color");
    $(".btns-color").removeClass("active");

    // Thêm class 'active' cho nút được nhấp
    $(this).addClass("active");
  });
});
$(document).ready(function () {
  $(".btn-hamberger").on("click", function (e) {
    e.stopPropagation(); // Ngăn chặn sự kiện click lan truyền lên các phần tử cha
    $(".content-col__wraper").toggleClass("active");
  });
  // Ẩn danh sách tab khi nhấn ra ngoài
  $(document).on("click", function (e) {
    if (!$(e.target).closest(".content-col__wraper").length) {
      $(".content-col__wraper").removeClass("active");
    }
  });
});
$(document).ready(function () {
  var contentWrapTrigger = $(".conten-wrap__trigger");

  // Sự kiện khi click vào trigger của custom select
  $(".conten-wrap__select").on("click", function () {
    $(this).toggleClass("open");
  });

  // Sự kiện khi click vào một option
  $(".conten-wrap__option").on("click", function () {
    var selectedValue = $(this).data("value"); // Lấy giá trị từ data-value của option
    var selectedText = $(this).text(); // Lấy text của option

    // Đặt giá trị và text cho trigger của select
    contentWrapTrigger.text(selectedText).data("value", selectedValue);

    // Đánh dấu option đã được chọn
    $(this).addClass("selected").siblings().removeClass("selected");

    // Đóng menu sau khi chọn xong
    $(this)
      .parent(".conten-wrap__select")
      .closest(".conten-wrap__select")
      .removeClass("open");

    console.log("Tùy chọn đã chọn: " + selectedValue);
  });

  // Sự kiện click ra ngoài để đóng menu
  $(document).on("click", function (event) {
    if (!$(event.target).closest(".conten-wrap__select").length) {
      $(".conten-wrap__select").removeClass("open");
    }
  });
});

$(document).ready(function () {
  $(".conten-wrap__btn").on("click", function () {
    var value = $(this).data("tap");
    $(this).addClass("active").siblings().removeClass("active");
  });
});
$(document).ready(function () {
  let checkboxList = [
    "Miễn phí",
    "500,000 - 1,000,000 đ",
    "1,000,000 - 2,000,000 đ",
    "2,000,000 - 3,000,000 đ",
  ];
  for (let i = 0; i < checkboxList.length; i++) {
    const checkbox = $("<input />", {
      type: "checkbox",
      id: "checkbox" + i,
      value: checkboxList[i],
      class: " content-category__btn",
    });

    const label = $("<label />", {
      for: "checkbox" + i,
      text: checkboxList[i],
      class: "content-category__btn-label",
    });

    const divContainer = $("<div />", {
      class: "content-category__btns",
    }).append(checkbox, label);

    $("#checkbox-container").append(divContainer);
  }
  $("input[type='checkbox']").change(function () {
    if ($(this).is(":checked")) {
      // Nếu checkbox được chọn, lấy giá trị của nó
      console.log("Selected: " + $(this).val());
    } else {
      // Nếu checkbox bị bỏ chọn, bỏ giá trị của nó
      console.log("Deselected: " + $(this).val());
    }
  });
});
$(document).ready(function () {
  const cardsPerPage = 9;
  const maxVisiblePages = 3;
  let currentPage = 1;
  let totalCards = 0; // Để sẽ cập nhật sau khi tải JSON
  let cardsData = [];

  // Hàm hiển thị card cho trang hiện tại
  function renderCards(page) {
    $("#content-cards__wrapper").empty();

    const start = (page - 1) * cardsPerPage;
    const end = start + cardsPerPage;

    for (let i = start; i < end && i < totalCards; i++) {
      $("#content-cards__wrapper").append(`
             <div class="col-12 col-md-4 col-sm-6 d-flex justify-content-center">
            <div class="content-card">
              <div class="content-card__img">
                <img src="${cardsData[i].image}" alt="${cardsData[i].name}" />
              </div>
              <div class="content-card__content">
                <p class="text-h6">${cardsData[i].title}</p>
                <p class="content-card__description">${cardsData[i].description}</p>
                <div class="content-card__price">
                  <span class="content-text content-card__price--new">${cardsData[i].price} đ</span>
                  <span class="content-card__price--old">${cardsData[i].old_price} đ</span>
                </div>
                <button class="content-card__btn">Xem Mẫu Demo</button>
              </div>
            </div>
          </div>
        `);
    }
  }

  // Hàm hiển thị phân trang
  function renderPagination() {
    const totalPages = Math.ceil(totalCards / cardsPerPage);
    let startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
    let endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);

    if (endPage - startPage < maxVisiblePages - 1) {
      startPage = Math.max(1, endPage - maxVisiblePages + 1);
    }

    // Xóa tất cả các nút trước khi render lại
    $("#pagination .pagination-btns").empty();

    // Nút "Previous"
    $(".pagination-btn-icon img[alt='prev']")
      .parent()
      .toggleClass("disabled", currentPage === 1);

    // Nút đầu tiên và "..."
    if (startPage > 1) {
      $("#pagination .pagination-btns")
        .first()
        .append(`<button class="pagination-btn" data-page="1">1</button>`);
      $("#pagination .pagination-btns").first().append(`<span >...</span>`);
    }

    // Nút số trang ở giữa
    for (let i = startPage; i <= endPage; i++) {
      $("#pagination .pagination-btns").first().append(`
          <button class="pagination-btn ${
            i === currentPage ? "active" : ""
          }" data-page="${i}">${i}</button>
        `);
    }

    // "..." và các trang cuối cùng
    if (endPage < totalPages) {
      $("#pagination .pagination-btns").last().append(`<span >...</span>`);
      $("#pagination .pagination-btns")
        .last()
        .append(
          `<button class="pagination-btn" data-page="${totalPages}">${totalPages}</button>`
        );
    }

    // Nút "Next"
    $(".pagination-btn-icon img[alt='next']")
      .parent()
      .toggleClass("disabled", currentPage === totalPages);
  }

  // Sự kiện khi người dùng nhấp vào các nút phân trang
  $("#pagination").on("click", ".pagination-btn:not(.active)", function () {
    const page = parseInt($(this).data("page"));
    if (page > 0 && page <= Math.ceil(totalCards / cardsPerPage)) {
      currentPage = page;
      renderCards(currentPage);
      renderPagination();
    }
  });

  // Sự kiện khi nhấp vào nút "Previous" hoặc "Next"
  $("#page-prev").on("click", function () {
    if (currentPage > 1) {
      currentPage--;
      renderCards(currentPage);
      renderPagination();
    }
  });

  $("#page-next").on("click", function () {
    const totalPages = Math.ceil(totalCards / cardsPerPage);
    if (currentPage < totalPages) {
      currentPage++;
      renderCards(currentPage);
      renderPagination();
    }
  });

  // Tải dữ liệu từ file JSON
  $.getJSON("./assets/js/json/card.json", function (cards) {
    cardsData = cards; // Lưu dữ liệu JSON
    totalCards = cards.length; // Cập nhật totalCards dựa trên độ dài của mảng JSON
    // Khởi tạo trang đầu tiên
    renderCards(currentPage);
    renderPagination();
  });
});
