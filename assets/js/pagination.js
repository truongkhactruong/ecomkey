$(document).ready(function () {
  function initPagination({
    cardsWrapperSelector,
    paginationSelector,
    jsonDataPath,
    cardsPerPage,
    maxVisiblePages = 3,
    buildCardHTML, // Thêm tham số hàm để xây dựng HTML của card
  }) {
    let currentPage = 1;
    let totalCards = 0;
    let cardsData = [];

    // Hàm hiển thị card cho trang hiện tại
    function renderCards(page) {
      $(cardsWrapperSelector).empty();

      const start = (page - 1) * cardsPerPage;
      const end = start + cardsPerPage;

      for (let i = start; i < end && i < totalCards; i++) {
        // Sử dụng hàm `buildCardHTML` để tạo HTML của card
        const cardHTML = buildCardHTML(cardsData[i]);
        $(cardsWrapperSelector).append(cardHTML);
      }
    }

    // Hàm hiển thị phân trang (giữ nguyên như trước)
    function renderPagination() {
      const totalPages = Math.ceil(totalCards / cardsPerPage);
      let startPage = Math.max(
        1,
        currentPage - Math.floor(maxVisiblePages / 2)
      );
      let endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);

      if (endPage - startPage < maxVisiblePages - 1) {
        startPage = Math.max(1, endPage - maxVisiblePages + 1);
      }

      $(`${paginationSelector} .pagination-btns`).empty();

      $("#page-prev")
        .parent()
        .toggleClass("disabled", currentPage === 1);

      if (startPage > 1) {
        $(`${paginationSelector} .pagination-btns`)
          .first()
          .append(`<button class="pagination-btn" data-page="1">1</button>`);
        $(`${paginationSelector} .pagination-btns`)
          .first()
          .append(`<span >...</span>`);
      }

      for (let i = startPage; i <= endPage; i++) {
        $(`${paginationSelector} .pagination-btns`).first().append(`
              <button class="pagination-btn ${
                i === currentPage ? "active" : ""
              }" data-page="${i}">${i}</button>
            `);
      }

      if (endPage < totalPages) {
        $(`${paginationSelector} .pagination-btns`)
          .last()
          .append(`<span>...</span>`);
        $(`${paginationSelector} .pagination-btns`)
          .last()
          .append(
            `<button class="pagination-btn" data-page="${totalPages}">${totalPages}</button>`
          );
      }

      $("#prev-next")
        .parent()
        .toggleClass("disabled", currentPage === totalPages);
    }

    $(paginationSelector).on(
      "click",
      ".pagination-btn:not(.active)",
      function () {
        const page = parseInt($(this).data("page"));
        if (page > 0 && page <= Math.ceil(totalCards / cardsPerPage)) {
          currentPage = page;
          renderCards(currentPage);
          renderPagination();
        }
      }
    );

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
    $.getJSON(jsonDataPath, function (cards) {
      cardsData = cards; // Lưu dữ liệu JSON
      totalCards = cards.length; // Cập nhật totalCards dựa trên độ dài của mảng JSON

      // Khởi tạo trang đầu tiên
      renderCards(currentPage);
      renderPagination();
    });
  }

  // Hàm để xây dựng HTML card
  function CardHTML(card) {
    return `
        <div class="col-12 col-md-4 col-sm-6 d-flex justify-content-center">
          <div class="content-card">
            <div class="content-card__img">
              <img src="${card.image}" alt="${card.name}" />
            </div>
            <div class="content-card__content">
              <p class="text-h6">${card.title}</p>
              <p class="content-card__description">${card.description}</p>
              <div class="content-card__price">
                <span class="content-text content-card__price--new">${card.price} đ</span>
                <span class="content-card__price--old">${card.old_price} đ</span>
              </div>
              <button class="content-card__btn">Xem Mẫu Demo</button>
            </div>
          </div>
        </div>`;
  }
  function builNewsdCardHTML(card) {
    return `
       <div class="col-md-12 col-lg-6">
            <div class="content-post">
                  <img class="content-post-img"
                    src=${card.image}
                    alt="Post"
                  />
                  <div class="post-content">
                        <span class="post-date">${card.date}</span>
                        <h5 class="post-title">
                        ${card.title}
                        </h5>
                        <p class="post-description">
                        ${card.description}
                        </p>
                        <div class="post-link">
                            <a class="text-strong-medium" href="">Danh mục bài viết</a>
                        </div>
                  </div>
            </div>
        </div>`;
  }

  // Gọi hàm với các tham số truyền vào
  initPagination({
    cardsPerPage: 9,
    cardsWrapperSelector: "#content-cards__wrapper",
    paginationSelector: "#pagination",
    jsonDataPath: "./assets/js/json/card.json",
    buildCardHTML: CardHTML, // Truyền hàm buildCardHTML
  });
  initPagination({
    cardsPerPage: 12,
    cardsWrapperSelector: "#posts__wrapper",
    paginationSelector: "#news-pagination",
    jsonDataPath: "./assets/js/json/news.json",
    buildCardHTML: builNewsdCardHTML, // Truyền hàm buildCardHTML
  });
});
