# Dormex-website
CQ.66.CNTT-DORMEX
🏠 DORMEX - Hệ thống Quản lý Ký túc xá Thông minh
Đồ án môn: Thiết kế Web
Lớp: CQ.66.CNTT - Trường Đại học Giao Thông Vận Tải Phân hiệu Thành phố Hồ Chí Minh - Khoa Công Nghệ Thông Tin
Giảng viên hướng dẫn: Thạc sĩ.Nguyễn Thiện Dương
link github: https://github.com/CQ-66-CNTT-DORMEX/Dormex-website.git

📌 Giới thiệu dự án
Smart Dorm là ứng dụng web hỗ trợ quản lý và tương tác dành cho sinh viên nội trú và Ban quản lý Ký túc xá. Dự án giúp tối ưu hóa việc quản lý phòng ở, tự động hóa hóa đơn tiền điện/nước, tiếp nhận yêu cầu sửa chữa sự cố và cập nhật thông báo nhanh chóng.

✨ Tính năng chính
🏠 Trang chủ: Hiển thị tổng quan tin tức, thông kê nhanh và lối tắt dịch vụ.
🛏️ Quản lý Phòng ở: Xem danh sách phòng, bộ lọc theo tòa/loại phòng và kiểm tra trạng thái giường trống.
📢 Thông báo: Cập nhật tin tức KTX, phân loại theo chủ đề và tìm kiếm tin tức.
🔧 Báo sửa chữa: Gửi form yêu cầu sửa chữa (điện, nước, điều hòa...) kèm hình ảnh và theo dõi trạng thái xử lý (Chờ tiếp nhận, Đang xử lý, Đã xong).
💰 Tiền phòng & Hóa đơn: Bảng tính chi tiết điện/nước/wifi, trạng thái nộp tiền và tích hợp mã QR VietQR thanh toán tự động.
📅 Sự kiện: Danh sách hoạt động đoàn hội, lịch đếm ngược và nút đăng ký tham gia.
📖 Nội quy: Quy định giờ giấc, vệ sinh và các chế tài dưới dạng Accordion dễ tra cứu.
🗺️ Sơ đồ KTX: Bản đồ tương tác các khu nhà, căn tin, nhà xe.
👤 Tài khoản: Đăng nhập, đăng ký và trang thông tin cá nhân sinh viên.
🛠️ Công nghệ sử dụng
Frontend: HTML5, CSS3, JavaScript (ES6+)
UI Framework/Library: Bootstrap 5 (hoặc Tailwind CSS, FontAwesome Icon)
Công cụ phát triển: Visual Studio Code, Git, Figma (Thiết kế UI)
📂 Cấu trúc thư mục dự án
smart-dorm/
├── assets/
│   ├── css/          # Các tệp định dạng style
│   ├── js/           # Các tệp xử lý logic JavaScript
│   └── images/       # Hình ảnh, biểu tượng, sơ đồ
├── pages/            # Các trang con
│   ├── rooms.html
│   ├── announcements.html
│   ├── maintenance.html
│   ├── billing.html
│   ├── events.html
│   ├── rules.html
│   ├── map.html
│   └── profile.html
├── index.html        # Trang chủ
└── README.md         # Tài liệu hướng dẫn
## 👥 Thành viên thực hiện

| MSSV | Họ và tên | Lớp | Vai trò / Công việc đảm nhận |
| 6651071065 | Nguyễn Phúc Khai Tâm | CQ.66.CNTT | Lập Sign In, fix code |
| 6651071058 | Lê Hồng Ngọc Quý | CQ.66CNTT | Thiết kế phần thanh toán kết hợp sự kiện |
| 6651071078 | Nguyễn Trần Trung Tính | CQ.66.CNTT | Thiết kế phần trang chủ website và phòng ở của ký túc xá |
| 6651071066 | Nguyễn Thanh Tâm | CQ.66.CNTT | Thiết kế nội quy và hoàn thiện sơ đồ ký túc xá |
| 6651071024 | Nguyễn Phạm Huy Hoàng | CQ.66.CNTT | Thiết kế với nội dung thông báo các hoạt động và báo sửa chữa ký túc xá | 
