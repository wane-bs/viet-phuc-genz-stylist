# Việt Phục Remix: Gen Z Heritage Stylist & Dệt Ký Ức (Weaving Memories)

> **Nền tảng Tương tác Đa Phân hệ Kết hợp Trò Chơi 2D Di Sản, Studio Phối Đồ Việt Phục Đương Đại, Phòng Thử Đồ Ảo AI (Anywear Virtual Try-On) và Cơ Sở Tri Thức Cổ Phục Chuẩn Mực.**

---

## 📖 1. Giới Thiệu Dự Án

**Việt Phục Remix** là ứng dụng web toàn diện được thiết kế nhằm đưa nét đẹp di sản trang phục truyền thống Việt Nam đến gần hơn với giới trẻ (Gen Z, học sinh, sinh viên) theo phong cách hiện đại, trực quan và hấp dẫn.

Ứng dụng kết hợp giữa **giải trí tương tác (2D Game)**, **sáng tạo thời trang (Stylist Studio)**, **công nghệ trí tuệ nhân tạo (AI Virtual Try-On với OpenRouter GPT-4o & Google Gemini)**, và **hệ thống kiểm định văn hóa nghiêm ngặt (Cultural Guardrails Engine)**.

---

## 🏛️ 2. Các Phân Hệ Tính Năng Cốt Lõi

### 🎮 Phân hệ 1: Trò Chơi 2D Tương Tác — "Dệt Ký Ức: Khuy Ngọc Trên Điện Kính Thiên"
- **Cốt truyện & Nhân vật**: Người chơi điều khiển nhân vật **An** (linh hồn sợi tơ chibi) thám hiểm không gian ký ức lạnh lẽo trên bậc thềm Điện Kính Thiên thời Hậu Lê – Nguyễn.
- **Cơ chế Gameplay**:
  - Di chuyển (`A`/`D`/Mũi tên), Nhảy (`SPACE`), Tương tác giải đố (`E`).
  - Sử dụng *Quạt Gỗ Trầm* xua tan chướng khí.
  - **Câu đố Khuy Ngọc & Nếp Áo**: Thử nghiệm gắn khuy áo. Nếu phạm quy cài vạt Tả Nhậm (Vạt phải đè vạt trái – Lỗi tử phục tang lễ), màn hình sẽ kích hoạt hiệu ứng cảnh báo bóng ma (Jumpscare glitch). Khi cài đúng **Hữu Nhậm** (Vạt trái đè vạt phải) cùng **5 hạt Khuy Ngọc Ngũ Thường** (Nhân, Lễ, Nghĩa, Trí, Tín), cổng điện Kính Thiên sẽ bừng sáng giải thoát ký ức.
- **Âm thanh tổng hợp (Web Audio API Synthesizer)**: Phát tiếng bước chân, âm gió lạnh u uất, tiếng chuông đồng giải đố mà không cần tải tệp âm thanh ngoài.

---

### 🎨 Phân hệ 2: Stylist Studio — Phối Đồ "Việt Phục Remix"
- **Tùy biến phong cách đa tầng**:
  - Chọn Giới tính: *Nam / Nữ / Unisex*.
  - Chọn Bối cảnh: *Concert/Festival ngoài trời, Lễ hội đền chùa/cúng giỗ, Lễ cưới truyền thống, Dạo phố/Cà phê, Workshop trường học*.
  - Chọn Phong cách: *Streetwear, Y2K/Cyber-retro, Minimalist, Academia, Cung đình đương đại*.
  - 6 Dòng Cổ Phục Gốc: *Áo Ngũ Thân tay chẽn (1744), Áo Tấc (tay thụng), Áo Nhật Bình, Áo Tứ Thân, Áo Giao Lĩnh, Áo Dài Raglan*.
  - Hạ y & Phụ kiện: Quần cargo, quần lụa Vạn Phúc, sneaker chunky, guốc mộc, kiềng bạc, kính mát Y2K, quạt trầm.
- **Bộ Lọc Ranh Giới Văn Hóa (Cultural Guardrails Engine)**:
  - Tự động chấm điểm chuẩn mực văn hóa (**Cultural Validity Score: 1 - 100**).
  - Phân loại 3 cấp độ: 🟢 **AN TOÀN (Safe)**, 🟡 **CẢNH BÁO VÀNG (Warning)**, 🔴 **VI PHẠM ĐỎ (Danger)**.
  - Quy chuẩn vạt áo Hữu Nhậm bắt buộc; cảnh báo hoa văn rồng hoàng gia và trang phục phản cảm chốn tôn nghiêm.
- **Thư viện Preset Lookbook**: Bộ sưu tập phối mẫu thực tế (Lookbook concert kỷ lục Guinness, Áo Tấc thiền trà, Nhật Bình dạ tiệc...).

---

### 📸 Phân hệ 3: Anywear Virtual Fitting Studio (AI Try-On)
- **Tích hợp Camera Webcam & Tải Ảnh Chân Dung**: Chụp trực tiếp từ webcam hoặc tải ảnh từ máy tính/điện thoại, hỗ trợ đổi camera trước/sau.
- **AI Virtual Try-On Engine (OpenRouter GPT-4o + Gemini Vision)**:
  - Tự động biên dịch toàn bộ thông số thiết kế thành cấu trúc **JSON Prompt Ngữ Cảnh**.
  - Áp dụng kỹ thuật may đo phục dựng (Neural Draping) để ướm bộ cổ phục chuẩn nếp áo, cổ lập lĩnh, vạt hữu nhậm và khuy ngọc lên vóc dáng người dùng.
- **Fitting Controls**: Thanh điều chỉnh vị trí cổ áo, độ rộng vai, dịch chuyển ngang để trang phục vừa vặn hoàn hảo với từng tư thế chụp.
- **Chế độ So sánh & Tải Ảnh HD**: Đối chiếu song song Before / After và tải ảnh có dấu mộc chứng nhận di sản.

---

### 📚 Phân hệ 4: Knowledge Base Di Sản & Trắc Nghiệm Di Sản
- **Cơ sở tri thức lịch sử**: Dẫn chứng chính xác Sắc lệnh 1744 của Chúa Nguyễn Phúc Khoát, Khâm Định Đại Nam Hội Điển Sự Lệ, triết lý Ngũ Thường – Ngũ Luân và khảo cứu Điện Kính Thiên.
- **Interactive Quiz Modal**: 5 câu hỏi trắc nghiệm kiểm tra kiến thức nếp áo tiền nhân và trao huy hiệu Đại sứ Di sản.

---

## ⚠️ 3. Các Điểm Hạn Chế Hiện Tại (Known Limitations & Roadmaps)

Dự án hiện đang ở giai đoạn nguyên mẫu ứng dụng web tương tác cao cấp (High-Fidelity Interactive Prototype). Dưới đây là các hạn chế kỹ thuật hiện tại cần được nâng cấp trong lộ trình tương lai:

### 1. Về Đồ Họa Màn Chơi & Game 2D (Gameplay & 2D Graphics Limitations)
| Hạn Chế Hiện Tại | Mô Tả Chi Tiết | Hướng Phát Triển Tương Lai |
| :--- | :--- | :--- |
| **Đồ họa Canvas Vector/Geometry** | Nhân vật An và bối cảnh Điện Kính Thiên hiện được vẽ bằng thuật toán hình học trên HTML5 Canvas 2D (`fillRect`, `bezierCurveTo`, `arc`), chưa sử dụng Sprite Sheet hoạt họa chuyên nghiệp (Frame-by-frame sprites). | Tích hợp engine chuyên dụng như **Phaser.js** / **Pixi.js** hoặc hoạt họa xương **Spine 2D / DragonBones** để chuyển động mượt mà hơn. |
| **Hiệu ứng Ánh sáng & Môi trường** | Hiệu ứng sương mù, tia sáng và bụi sáng (particles) đang chạy bằng thuật toán thời gian thực đơn giản, chưa có đổ bóng động (Dynamic 2D Raycasting/Shadows). | Nâng cấp hệ thống ánh sáng thời gian thực và Normal Map 2D cho gạch đá Điện Kính Thiên. |
| **Âm Thanh Procedural Synth** | Nhạc nền và hiệu ứng âm thanh sử dụng Web Audio Synthesizer (sóng Sin/Triangle/Noise giả lập) để tối ưu dung lượng và tránh phụ thuộc tệp ngoài. | Bổ sung thư viện âm thanh thu âm từ các nhạc cụ dân tộc cổ truyền thực tế (Đàn Tranh, Đàn Bầu, Sáo Trúc, Trống Lệnh). |

---

### 2. Về Tính Năng Thử Đồ Bằng AI (AI Virtual Try-On Limitations)
| Hạn Chế Hiện Tại | Mô Tả Chi Tiết | Hướng Phát Triển Tương Lai |
| :--- | :--- | :--- |
| **Góc Chụp Chân Dung** | Phục dựng tối ưu nhất cho ảnh chụp chính diện (Front-facing portrait) nửa thân trên hoặc cả người; các góc nghiêng sâu (>45 độ) hoặc tư thế phức tạp có thể cần người dùng căn chỉnh thêm bằng thanh trượt Fitting Controls. | Tích hợp mạng Pose Estimation (MediaPipe Pose / DensePose) để tự động xoay và bẻ khớp trang phục 3D theo dáng người. |
| **Phụ Thuộc Kết Nối API AI** | Phân tích thị giác chuyên sâu và mô tả thời trang phụ thuộc vào OpenRouter / Gemini API. Khi mất kết nối mạng hoặc hết hạn mức token, hệ thống tự động kích hoạt bộ máy tính điểm và may đo nội suy ngoại tuyến. | Triển khai mô hình AI cục bộ dạng WebGPU (như Stable Diffusion WebGPU / ONNX Runtime Web) chạy hoàn toàn trên trình duyệt người dùng. |
| **Xử Lý Chất Liệu Động (Cloth Physics)** | Trang phục trên ảnh mặc thử tái hiện cấu trúc phẳng 2.5D của tơ lụa và gấm, chưa mô phỏng độ rũ vật lý thời gian thực khi cử động. | Kết hợp WebGL / Three.js 3D Garment Simulation với định dạng glTF/USDZ cho phép xoay 360 độ. |

---

## 🛠️ 4. Công Nghệ Sử Dụng (Tech Stack)

- **Frontend**: React 19, TypeScript, Vite, Tailwind CSS (v4), Motion, Lucide Icons.
- **Backend / Server**: Node.js, Express, TSX.
- **AI & SDKs**: 
  - **OpenRouter API** (`openai/gpt-4o`, `google/gemini-2.0-flash-001`).
  - **Google GenAI SDK** (`@google/genai` với `gemini-3.8-flash`, `gemini-3.1-flash-image`).
- **Web APIs**: HTML5 Canvas, MediaDevices (Webcam API), Web Audio API.

---

## 🚀 5. Cài Đặt & Chạy Dự Án

### Yêu cầu môi trường:
- **Node.js**: Phiên bản 18+ trở lên.
- **Trình quản lý gói**: `npm` hoặc `bun` hoặc `yarn`.

### Các bước khởi chạy:

1. **Cài đặt dependencies**:
   ```bash
   npm install
   ```

2. **Cấu hình biến môi trường**:
   Tạo file `.env` dựa trên `.env.example`:
   ```env
   # GEMINI_API_KEY (tùy chọn nếu dùng Google AI Studio)
   GEMINI_API_KEY="YOUR_GEMINI_API_KEY"

   # OPENROUTER_API_KEY (dùng cho OpenRouter GPT-4o)
   OPENROUTER_API_KEY="YOUR_OPENROUTER_KEY"
   ```

3. **Chạy máy chủ phát triển (Dev Server)**:
   ```bash
   npm run dev
   ```
   Ứng dụng sẽ khả dụng tại: `http://localhost:3000`

4. **Kiểm tra cú pháp & Build Production**:
   ```bash
   npm run lint
   npm run build
   ```

---

## 🔒 6. Chính Sách Bảo Mật & An Toàn Dữ Liệu

- Không lưu trữ ảnh chân dung người dùng trên cơ sở dữ liệu vĩnh viễn; ảnh chụp từ webcam được xử lý tức thời trong phiên làm việc.
- Toàn bộ API Key của OpenRouter và Gemini được giữ an toàn tại tầng Server-side (`server.ts`), tuyệt đối không để lộ ra mã nguồn phía Client (Browser).
- Các file chứa thông tin nhạy cảm (`.env`, key credentials, build cache) được bảo vệ nghiêm ngặt thông qua `.gitignore`.

---

*Dự án được xây dựng với tình yêu sâu sắc dành cho Cổ phục và Di sản Văn hóa Dân tộc Việt Nam 🇻🇳.*
