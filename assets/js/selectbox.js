class Select {
  constructor(selectElement) {
    this.$selectElement = $(selectElement);
    this.init();
  }

  init() {
    // Tạo cấu trúc HTML tùy chỉnh cho select
    this.createCustomSelect();

    // Gán sự kiện click cho từng tùy chọn
    this.bindEvents();
  }

  createCustomSelect() {
    const $container = $('<div class="custom-select"></div>');
    const $selected = $('<div class="custom-select__selected"></div>');
    const $optionsContainer = $('<div class="custom-select__options"></div>');

    // Tạo danh sách các option
    this.$selectElement.find("option").each(function () {
      const $option = $('<div class="custom-select__option"></div>');
      $option.text($(this).text());
      $option.data("value", $(this).val());
      $optionsContainer.append($option);
    });

    // Hiển thị giá trị mặc định
    const defaultText = this.$selectElement.find("option:selected").text();
    $selected.text(defaultText);

    // Gắn vào DOM
    $container.append($selected);
    $container.append($optionsContainer);
    this.$selectElement.after($container);

    // Ẩn select mặc định
    this.$selectElement.hide();
  }

  bindEvents() {
    const self = this;
    const $customSelect = this.$selectElement.next(".custom-select");
    const $selected = $customSelect.find(".custom-select__selected");
    const $optionsContainer = $customSelect.find(".custom-select__options");
    const $options = $customSelect.find(".custom-select__option");

    // Hiển thị hoặc ẩn danh sách option khi click vào phần đã chọn
    $selected.on("click", function () {
      $optionsContainer.toggle();
    });

    // Khi chọn một option, thay đổi giá trị
    $options.on("click", function () {
      const selectedValue = $(this).data("value");
      const selectedText = $(this).text();

      // Cập nhật giá trị của select
      self.$selectElement.val(selectedValue).trigger("change");
      $selected.text(selectedText);

      // Ẩn danh sách option
      $optionsContainer.hide();
    });

    // Đóng danh sách option khi click ra ngoài
    $(document).on("click", function (e) {
      if (
        !$customSelect.is(e.target) &&
        $customSelect.has(e.target).length === 0
      ) {
        $optionsContainer.hide();
      }
    });
  }
}

// Áp dụng class Select cho tất cả các phần tử select
$(document).ready(function () {
  $("select").each(function () {
    new Select(this);
  });
});
