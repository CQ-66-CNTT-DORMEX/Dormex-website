/* =========================================================
   SMART DORM - JS RIÊNG CHO MỤC "NỘI QUY"
   1. Accordion: bấm vào điều khoản để mở / đóng
   2. Lọc theo nhóm + tìm kiếm từ khóa (ô tìm kiếm trên cùng)
   3. Nút Mở tất cả / Thu gọn / In
   4. Đồng hồ + trạng thái cổng (mở 05:30 - đóng 23:00)
   ========================================================= */
(function () {
  "use strict";

  /* ---------- Cấu hình giờ cổng (Điều 1) ---------- */
  var OPEN_MIN = 5 * 60 + 30; // 05:30
  var CLOSE_MIN = 23 * 60;    // 23:00

  var rules = Array.prototype.slice.call(document.querySelectorAll(".rule"));
  var searchInput = document.getElementById("globalSearch");
  var filterBox = document.getElementById("filters");
  var resultInfo = document.getElementById("resultInfo");
  var emptyMsg = document.getElementById("emptyMsg");

  var currentFilter = "all";

  /* ---------- 1. Accordion ---------- */
  function setOpen(rule, open) {
    rule.classList.toggle("open", open);
    rule.querySelector(".rule-btn").setAttribute("aria-expanded", String(open));
  }

  rules.forEach(function (rule) {
    rule.querySelector(".rule-btn").addEventListener("click", function () {
      setOpen(rule, !rule.classList.contains("open"));
    });
  });

  document.getElementById("expandAll").addEventListener("click", function () {
    rules.forEach(function (r) { if (!r.hidden) setOpen(r, true); });
  });
  document.getElementById("collapseAll").addEventListener("click", function () {
    rules.forEach(function (r) { setOpen(r, false); });
  });
  document.getElementById("printBtn").addEventListener("click", function () {
    // mở hết các điều khoản trước khi in
    rules.forEach(function (r) { if (!r.hidden) setOpen(r, true); });
    window.print();
  });

  /* ---------- 2. Lọc + tìm kiếm ---------- */
  // bỏ dấu tiếng Việt để tìm "ruou" vẫn ra "rượu"
  function normalize(s) {
    return s
      .toLowerCase()
      .normalize("NFD")
      .replace(/[̀-ͯ]/g, "")
      .replace(/đ/g, "d");
  }

  // cache nội dung gốc để tô sáng từ khóa
  rules.forEach(function (rule) {
    rule.querySelectorAll(".rule-title, .rule-content li").forEach(function (el) {
      el.dataset.original = el.textContent;
    });
  });

  function highlight(el, keyword) {
    var original = el.dataset.original;
    if (!keyword) { el.textContent = original; return; }

    var plain = normalize(original);
    var key = normalize(keyword);
    var out = "";
    var pos = 0;
    var idx;
    // normalize giữ nguyên độ dài ký tự nên có thể dùng chung vị trí
    while ((idx = plain.indexOf(key, pos)) !== -1) {
      out += escapeHtml(original.slice(pos, idx)) +
             "<mark>" + escapeHtml(original.slice(idx, idx + key.length)) + "</mark>";
      pos = idx + key.length;
    }
    out += escapeHtml(original.slice(pos));
    el.innerHTML = out;
  }

  function escapeHtml(s) {
    return s.replace(/[&<>"']/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c];
    });
  }

  function applyFilter() {
    var keyword = searchInput ? searchInput.value.trim() : "";
    var key = normalize(keyword);
    var shown = 0;

    rules.forEach(function (rule) {
      var inGroup = currentFilter === "all" || rule.dataset.cat === currentFilter;
      var text = normalize(rule.textContent);
      var match = !key || text.indexOf(key) !== -1;
      var visible = inGroup && match;

      rule.hidden = !visible;
      if (visible) {
        shown++;
        rule.querySelectorAll(".rule-title, .rule-content li").forEach(function (el) {
          highlight(el, keyword);
        });
        // đang tìm từ khóa thì tự mở điều khoản khớp
        if (key) setOpen(rule, true);
      }
    });

    resultInfo.textContent = "Hiển thị " + shown + "/" + rules.length + " quy định";
    emptyMsg.classList.toggle("show", shown === 0);
  }

  filterBox.addEventListener("click", function (e) {
    var chip = e.target.closest(".chip");
    if (!chip) return;
    filterBox.querySelectorAll(".chip").forEach(function (c) { c.classList.remove("active"); });
    chip.classList.add("active");
    currentFilter = chip.dataset.filter;
    applyFilter();
  });

  if (searchInput) searchInput.addEventListener("input", applyFilter);

  /* ---------- 4. Đồng hồ + trạng thái cổng ---------- */
  var elClock = document.getElementById("clock");
  var elDate = document.getElementById("clockDate");
  var elPill = document.getElementById("statusPill");
  var elStatus = document.getElementById("statusText");
  var elCount = document.getElementById("countdown");
  var elBar = document.getElementById("progressBar");

  var WEEKDAYS = ["Chủ nhật", "Thứ hai", "Thứ ba", "Thứ tư", "Thứ năm", "Thứ sáu", "Thứ bảy"];

  function pad(n) { return n < 10 ? "0" + n : String(n); }

  function fmtDuration(totalMin) {
    var h = Math.floor(totalMin / 60);
    var m = totalMin % 60;
    return (h > 0 ? h + " giờ " : "") + m + " phút";
  }

  function updateClock() {
    var now = new Date();
    var minutes = now.getHours() * 60 + now.getMinutes();

    elClock.textContent = pad(now.getHours()) + ":" + pad(now.getMinutes()) + ":" + pad(now.getSeconds());
    elDate.textContent = WEEKDAYS[now.getDay()] + ", " + pad(now.getDate()) + "/" + pad(now.getMonth() + 1) + "/" + now.getFullYear();

    var isOpen = minutes >= OPEN_MIN && minutes < CLOSE_MIN;

    elPill.classList.toggle("is-open", isOpen);
    elPill.classList.toggle("is-closed", !isOpen);
    elStatus.textContent = isOpen ? "Cổng đang mở" : "Cổng đã đóng";

    if (isOpen) {
      elCount.textContent = "Còn " + fmtDuration(CLOSE_MIN - minutes) + " nữa là đóng cổng (23:00)";
      elBar.style.width = ((minutes - OPEN_MIN) / (CLOSE_MIN - OPEN_MIN) * 100).toFixed(1) + "%";
    } else {
      var wait = minutes < OPEN_MIN ? OPEN_MIN - minutes : (24 * 60 - minutes) + OPEN_MIN;
      elCount.textContent = "Cổng mở lại sau " + fmtDuration(wait) + " (05:30)";
      elBar.style.width = "0%";
    }
  }

  updateClock();
  setInterval(updateClock, 1000);
  applyFilter();
})();
