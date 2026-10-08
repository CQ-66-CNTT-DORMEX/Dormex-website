/* =========================================================
   SMART DORM - JS TƯƠNG TÁC SƠ ĐỒ KTX
   ========================================================= */
(function () {
  "use strict";

  // Cơ sở dữ liệu thông tin chi tiết các khu vực
  const campusData = {
    "toa-a": {
      badge: "A",
      title: "Tòa A - KTX Nam",
      tag: "Khu Nam sinh viên",
      color: "#0284c7",
      details: [
        "<strong>Quy mô:</strong> 5 Tầng (120 Phòng)",
        "<strong>Sức chứa:</strong> 480 sinh viên (4 người/phòng)",
        "<strong>Thời gian:</strong> 05:30 mở cửa – 23:00 đóng cổng",
        "<strong>Trưởng nhà:</strong> Thầy Nguyễn Văn Q (Phòng 101)",
        "<strong>Tiện ích tầng 1:</strong> Khu giặt sấy & máy bán nước tự động"
      ]
    },
    "toa-b": {
      badge: "B",
      title: "Tòa B - KTX Nữ",
      tag: "Khu Nữ sinh viên",
      color: "#38bdf8",
      details: [
        "<strong>Quy mô:</strong> 5 Tầng (120 Phòng)",
        "<strong>Sức chứa:</strong> 480 nữ sinh (4 người/phòng)",
        "<strong>Thời gian:</strong> 05:30 mở cửa – 23:00 khóa cổng tầng",
        "<strong>Trưởng nhà:</strong> Cô Trần Thị H (Phòng 102)",
        "<strong>Tiện ích tầng trệt:</strong> Phòng tự học yên tĩnh 24/7"
      ]
    },
    "toa-c": {
      badge: "C",
      title: "Tòa C - Chất Lượng Cao",
      tag: "Khu Phòng VIP / CLC",
      color: "#0369a1",
      details: [
        "<strong>Quy mô:</strong> 7 Tầng có thang máy (84 Phòng)",
        "<strong>Trang bị:</strong> Máy lạnh, bình nóng lạnh, tủ lạnh mini",
        "<strong>Sức chứa:</strong> 2 - 4 sinh viên/phòng",
        "<strong>Ban quản lý:</strong> Văn phòng tầng 1 Tòa C",
        "<strong>Dịch vụ:</strong> Vệ sinh phòng 2 lần/tuần miễn phí"
      ]
    },
    "cantin": {
      badge: "<i class='fa-solid fa-utensils'></i>",
      title: "Căn Tin - Nhà Ăn KTX",
      tag: "Dịch vụ ăn uống",
      color: "#059669",
      details: [
        "<strong>Phục vụ:</strong> Bữa sáng, trưa, tối và nước giải khát",
        "<strong>Giờ hoạt động:</strong> 06:00 - 20:30 mỗi ngày",
        "<strong>Tiêu chuẩn:</strong> Vệ sinh an toàn thực phẩm bộ Y tế",
        "<strong>Thanh toán:</strong> Tiền mặt, chuyển khoản & Thẻ Smart Dorm"
      ]
    },
    "san-bong": {
      badge: "<i class='fa-solid fa-futbol'></i>",
      title: "Sân Bóng & Thể Thao",
      tag: "Rèn luyện thể chất",
      color: "#f59e0b",
      details: [
        "<strong>Gồm có:</strong> Sân cỏ nhân tạo mini & sân bóng rổ ngoài trời",
        "<strong>Thời gian mở cửa:</strong> 05:30 - 21:30 hàng ngày",
        "<strong>Đăng ký sân:</strong> Miễn phí cho sinh viên nội trú qua App"
      ]
    },
    "bao-ve": {
      badge: "<i class='fa-solid fa-shield-halved'></i>",
      title: "Phòng Trực Bảo Vệ & Giữ Xe",
      tag: "An ninh 24/7",
      color: "#475569",
      details: [
        "<strong>Trực ban:</strong> 24/7 xuyên suốt các ngày trong tuần",
        "<strong>Hotline khẩn cấp:</strong> 028.3896.xxxx (Nhánh 115)",
        "<strong>Nhà xe sinh viên:</strong> Hệ thống giữ xe quẹt thẻ từ thông minh"
      ]
    },
    "quang-truong": {
      badge: "<i class='fa-solid fa-tree'></i>",
      title: "Quảng Trường Trung Tâm",
      tag: "Sinh hoạt chung",
      color: "#0284c7",
      details: [
        "<strong>Không gian:</strong> Điểm kết nối giao thông giữa các khối nhà",
        "<strong>Hoạt động:</strong> Tổ chức các sự kiện văn nghệ, giao lưu tân sinh viên",
        "<strong>Tiện ích:</strong> Ghế đá, wifi miễn phí và cây xanh bóng mát"
      ]
    }
  };

  // DOM Elements
  const detailBadge = document.getElementById("detailBadge");
  const detailTitle = document.getElementById("detailTitle");
  const detailTag = document.getElementById("detailTag");
  const detailList = document.getElementById("detailList");
  const clickableNodes = document.querySelectorAll(".block-box, .square-center");
  const searchInput = document.getElementById("mapSearch");

  // Hàm cập nhật hiển thị chi tiết khu vực
  function showBuildingInfo(key) {
    const data = campusData[key];
    if (!data) return;

    // Cập nhật card bên phải
    detailBadge.innerHTML = data.badge;
    detailBadge.style.backgroundColor = data.color;
    detailTitle.textContent = data.title;
    detailTag.textContent = data.tag;

    // Render danh sách gạch đầu dòng
    detailList.innerHTML = data.details
      .map(item => `<li><i class="fa-solid fa-circle-dot"></i> <span>${item}</span></li>`)
      .join("");

    // Đánh dấu active trên bản đồ
    clickableNodes.forEach(node => {
      if (node.dataset.id === key) {
        node.classList.add("active");
      } else {
        node.classList.remove("active");
      }
    });
  }

  // Lắng nghe sự kiện click trên từng khu nhà
  clickableNodes.forEach(node => {
    node.addEventListener("click", function () {
      const id = this.dataset.id;
      showBuildingInfo(id);
    });
  });

  // Hỗ trợ ô tìm kiếm nhanh tòa nhà
  if (searchInput) {
    searchInput.addEventListener("input", function (e) {
      const val = e.target.value.toLowerCase().trim();
      if (!val) return;

      for (const [key, item] of Object.entries(campusData)) {
        if (item.title.toLowerCase().includes(val) || item.tag.toLowerCase().includes(val)) {
          showBuildingInfo(key);
          break;
        }
      }
    });
  }

  // Khởi tạo mặc định chọn Tòa A khi vừa mở trang
  showBuildingInfo("toa-a");
})();