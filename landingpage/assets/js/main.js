$(document).ready(function () {
  // Script cũ của slider giữ nguyên ở đây...

  // TỰ ĐỘNG XỬ LÝ TRÀN MENU CON
  $(".mega-item-has-child")
    .on("mouseenter", function () {
      var $childBox = $(this).find(".mega-child-box");

      // Lấy tọa độ mép phải của hộp menu con (Khoảng cách từ mép trái + Chiều rộng hộp)
      var boxRightEdge = $childBox.offset().left + $childBox.outerWidth();

      // Lấy chiều rộng của toàn bộ cửa sổ trình duyệt
      var windowWidth = $(window).width();

      // Nếu mép phải của hộp vượt ra khỏi màn hình (cộng thêm 20px khoảng lùi cho an toàn)
      if (boxRightEdge + 20 > windowWidth) {
        $(this).addClass("open-left"); // Tự động mở sang trái
      }
    })
    .on("mouseleave", function () {
      // Xóa class khi đưa chuột ra chỗ khác để reset trạng thái
      $(this).removeClass("open-left");
    });
});
