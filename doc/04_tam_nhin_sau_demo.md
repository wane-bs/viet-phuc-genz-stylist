# 🚀 TẦM NHÌN SAU DEMO & LỘ TRÌNH PHÁT TRIỂN (POST-DEMO ROADMAP)

## 1. Đánh Giá Hiện Trạng Sau Giai Đoạn Demo (Prototype Validation)

Giai đoạn phát triển thử nghiệm (PoC - Proof of Concept) của **Việt Phục Remix** đã chứng minh sự đón nhận nồng nhiệt từ người dùng trẻ khi kết hợp giữa **Trí tuệ nhân tạo (AI)**, **Thời trang đường phố (Streetwear)** và **Bảo tồn di sản dân tộc**:
* ✅ Luồng trải nghiệm khép kín từ khâu tư vấn phong cách, kiểm duyệt văn hóa, thử đồ ảo chân dung cho đến trò chơi tự sự 2D đều vận hành trơn tru.
* ✅ Bộ Lọc Ranh Giới Văn Hóa (Cultural Guardrails) chứng minh hiệu quả thực tế trong việc ngăn chặn 100% lỗi sai quy chuẩn (như áo Tả Nhậm tang lễ).
* ⚠️ Các rào cản kỹ thuật khách quan đã được nhận diện rõ nét: Giới hạn hạn mức API sinh ảnh đám mây, độ nhạy với góc chụp chân dung nghiêng và nhu cầu tương tác 3D chân thực của người dùng.

---

## 2. Bứt Phá Công Nghệ Cốt Lõi (Core Tech Breakthroughs)

```
┌────────────────────────────────────────────────────────────────────────────────────────┐
│                              POST-DEMO TECH UPGRADE MATRIX                             │
├──────────────────────────┬──────────────────────────┬──────────────────────────────────┤
│ 1. CLIENT-SIDE AI        │ 2. 3D VISION & POSE      │ 3. 3D FABRIC PHYSICS             │
├──────────────────────────┼──────────────────────────┼──────────────────────────────────┤
│ WebGPU + ONNX Runtime    │ MediaPipe Pose 3D        │ Three.js / WebGL Cloth Engine    │
│ Zero Cloud API Cost      │ 33 Điểm Xương Khớp       │ Mô Phỏng Bay Tà Áo Tự Nhiên      │
│ Khử Phụ Thuộc Hạn Mức    │ Tự Xoay Rập Góc Nghiêng  │ Tương Tác Xoay 360 Độ            │
└──────────────────────────┴──────────────────────────┴──────────────────────────────────┘
```

### 2.1. Độc Lập Hóa Bộ Sinh Ảnh Bằng WebGPU & On-Device AI
* **Mục tiêu:** Loại bỏ hoàn toàn sự phụ thuộc vào các gói API Cloud trả phí và định mức cuộc gọi (Rate Limits / Quotas).
* **Giải pháp:**
  * Nhúng mô hình Inpainting tinh gọn (như MobileDiffusion, LCM LoRA Cổ Phục) chạy trực tiếp trên GPU máy khách thông qua **WebGPU** và **ONNX Runtime Web**.
  * Tốc độ sinh ảnh đạt < 1.5 giây ngay trên trình duyệt mà không cần gửi dữ liệu hình ảnh người dùng lên máy chủ bên thứ ba, nâng cao tính bảo mật sinh trắc học cá nhân.

### 2.2. Nhận Diện Tư Thế Đa Chiều (MediaPipe 3D Pose Estimation)
* **Mục tiêu:** Cho phép người dùng thử đồ ảo ở mọi tư thế: đứng nghiêng 45°, xoay lưng, bước đi hoặc giơ tay chắp lễ.
* **Giải pháp:**
  * Tích hợp thư viện thị giác máy tính **MediaPipe Pose 3D / DensePose**.
  * Bắt 33 điểm mốc cơ thể theo thời gian thực (vai, khuỷu tay, cổ tay, sống lưng).
  * Tự động biến dạng lưới tam giác (Mesh Warping) của tà áo ngũ thân ôm sát theo từng chuyển động của người dùng.

### 2.3. Mô Phỏng Vật Lý Vải Vóc Thời Gian Thực (3D Realtime Cloth Simulation)
* **Mục tiêu:** Cung cấp trải nghiệm thử đồ 3D tương tác sống động, người dùng có thể dùng chuột hoặc cử chỉ cảm ứng xoay 360 độ ngắm nhìn tà áo bay nhẹ.
* **Giải pháp:**
  * Sử dụng engine **Three.js** kết hợp bộ giải thuật hạt vật lý **Verlet Integration**.
  * Mô phỏng chính xác đặc tính cơ học của các chất liệu truyền thống:
    * *Lụa Tơ Tằm Hà Đông:* Mềm rủ, óng ánh khúc xạ ánh sáng theo góc nhìn.
    * *Gấm Sa Hạch:* Cứng cáp, đứng dáng, giữ phom chữ A đặc trưng của áo ngũ thân.
    * *Đũi Tự Nhiên:* Thoáng mát, có độ nhăn tự nhiên mộc mạc.

---

## 3. Mở Rộng Hệ Sinh Thái Thực Nghiệm O2O (Online-to-Offline)

Hệ thống sẽ không dừng lại ở mức mô phỏng hình ảnh màn hình, mà trở thành đầu mối thương mại kết nối nền kinh tế di sản thực tế:

```
[ THỬ ĐỒ ẢO TRÊN APP ] ────► [ XUẤT RẬP KỸ THUẬT PDF ] ────► [ GỬI NHÀ MAY ĐO THỰC TẾ ]
                                                                      │
[ GƯƠNG THÔNG MINH AR TẠI DI TÍCH ] ◄─────────────────────────────────┴── [ GIAO ÁO MAY ĐO ]
```

### 3.1. Mạng Lưới Nhà May Di Sản & Xuất Rập Đo May Cá Nhân Hóa (CAD/CAM Integration)
* Khi người dùng ưng ý với một bản phối cổ phục trên hệ thống, chỉ cần 1 cú click để tạo file **Bản vẽ rập kỹ thuật may đo cá nhân (Tailoring CAD Blueprint)** dựa trên tỉ lệ cơ thể đã ước tính.
* Chuyển thẳng đơn đặt hàng đến mạng lưới các nghệ nhân, xưởng may cổ phục liên kết tại Huế, Hà Nội, TP.HCM và làng nghề Vạn Phúc.

### 3.2. Gương Thử Đồ Thông Minh (Smart AR Mirror) Tại Các Điểm Di Tích
* Triển khai ki-ốt màn hình cảm ứng gương lớn đặt tại cổng vào **Hoàng thành Thăng Long**, **Đại Nội Huế**, **Văn Miếu - Quốc Tử Giám**.
* Du khách trong và ngoài nước đứng trước gương có thể "khoác" ngay tà áo ngũ thân hoặc nhật bình lên người trong 1 giây, chụp ảnh lưu niệm in lấy ngay kèm mã QR tìm hiểu ý nghĩa lịch sử.

### 3.3. Thẻ Nhận Diện Di Sản Số (NFC & Blockchain Heritage Tag)
* Mỗi bộ áo may đo thật bước ra từ hệ thống được đính kèm một thẻ chip NFC nhỏ giấu sau nẹp áo.
* Khi dùng điện thoại chạm vào áo, hệ thống sẽ mở ra trang web xác thực: tên thợ may, loại lụa, chứng chỉ chuẩn mực Hữu Nhậm và ngày hoàn thành sản phẩm.

---

## 4. Giáo Dục & Học Đường Hóa Di Sản (Heritage EdTech)

1. **Ứng dụng Giảng dạy Trực quan:**
   * Cung cấp phiên bản giáo dục dành cho các trường phổ thông (THCS, THPT) phục vụ phân môn Lịch sử và Hoạt động trải nghiệm hướng nghiệp.
   * Học sinh được chơi trò chơi *"Dệt Ký Ức"*, tự tay thiết kế bộ áo cho nhân vật lịch sử và làm bài tập trắc nghiệm văn hóa.
2. **Hợp tác Đào tạo Thiết kế Thời trang:**
   * Liên kết với các trường Đại học chuyên ngành Mỹ thuật, Kiến trúc, Thời trang để biến nền tảng thành công cụ nghiên cứu rập cổ phục chuẩn xác cho sinh viên đồ án tốt nghiệp.

---

## 5. Lộ Trình Triển Khai Chi Tiết (Strategic Timeline)

| Giai Đoạn | Thời Gian | Mục Tiêu Then Chốt |
| :--- | :---: | :--- |
| **Pha 1: Ổn Định & On-Device AI** | Q1/2027 – Q2/2027 | Triển khai WebGPU Inpainting trên trình duyệt; Giảm thiểu 95% chi phí Cloud API; Tối ưu hóa UI/UX trên thiết bị di động màn hình gập. |
| **Pha 2: 3D Fitting & MediaPipe** | Q3/2027 – Q4/2027 | Ra mắt tính năng bắt 33 điểm xương khớp tư thế nghiêng; Triển khai mô hình 3D xoay 360 độ tà áo; Nâng cấp game 2D sang Sprite Art vẽ tay. |
| **Pha 3: Mạng Lưới O2O & Smart Mirror** | Q1/2028 – Q2/2028 | Thí điểm Gương thông minh Smart AR Mirror tại Trung tâm Bảo tồn Di tích Cố đô Huế; Kết nối 10 xưởng may cổ phục truyền thống đầu tiên. |
| **Pha 4: Mở Rộng Quốc Tế & EdTech** | Q3/2028 – Q4/2028 | Đa ngôn ngữ (Anh, Pháp, Nhật, Hàn); Giới thiệu văn hóa cổ phục Việt Nam tại các tuần lễ thời trang quốc tế và nền tảng bảo tàng số toàn cầu. |
