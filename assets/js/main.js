/* =========================================================
   SMART DORM - JS CHUNG (dùng cho tất cả các trang)
   Hiện tại: bật/tắt menu sidebar trên điện thoại.
   ========================================================= */
(function () {
  "use strict";

  var sidebar = document.getElementById("sidebar");
  var overlay = document.getElementById("overlay");
  var toggle = document.getElementById("menuToggle");
  if (!sidebar || !overlay || !toggle) return;

  function setMenu(open) {
    sidebar.classList.toggle("open", open);
    overlay.classList.toggle("show", open);
  }

  toggle.addEventListener("click", function () {
    setMenu(!sidebar.classList.contains("open"));
  });
  overlay.addEventListener("click", function () {
    setMenu(false);
  });
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape") setMenu(false);
  });
})();
