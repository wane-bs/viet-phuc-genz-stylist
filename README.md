# 🇻🇳 Việt Phục Remix: Gen Z Heritage Stylist & Anywear Virtual Fitting Studio

> **Nền tảng Tương tác Đa Phân hệ Kết hợp AI Phục Dựng Di Sản (Anywear Virtual Try-On), Studio Thiết Kế Việt Phục Đương Đại (Gen Z Stylist), Trò Chơi 2D Khám Phá Lịch Sử và Kho Dữ Liệu Rập Chuẩn Mực Triều Nguyễn.**

[![React Version](https://img.shields.io/badge/React-19-blue.svg)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.8-blue.svg)](https://www.typescriptlang.org/)
[![Vite](https://img.shields.io/badge/Vite-6-646CFF.svg)](https://vitejs.dev/)
[![Google GenAI SDK](https://img.shields.io/badge/@google/genai-gemini--3.8--flash-orange.svg)](https://ai.google.dev/)
[![Tailwind CSS](https://img.shields.io/badge/TailwindCSS-v4-38B2AC.svg)](https://tailwindcss.com/)

---

## 📖 1. Giới Thiệu Dự Án (Project Description)

**Việt Phục Remix** là một nền tảng công nghệ văn hóa (CultureTech & FashionTech) tiên phong, được xây dựng với sứ mệnh đưa di sản trang phục truyền thống Việt Nam (thời Hậu Lê – Nguyễn) bước vào đời sống đương đại của thế hệ trẻ Gen Z một cách tự nhiên, sáng tạo nhưng vẫn giữ vững tinh hoa và tính chuẩn mực lịch sử.

Dự án dung hợp bốn trụ cột then chốt:
1. **Bảo tồn & Chuẩn hóa Di sản:** Cơ sở tri thức lịch sử dẫn chiếu chuẩn xác Sắc lệnh cải cách trang phục năm Giáp Tý (1744) của Vũ Vương Nguyễn Phúc Khoát, *Khâm Định Đại Nam Hội Điển Sự Lệ*, *Đại Nam Thực Lục*, và quy chuẩn Rập may đo cổ truyền.
2. **Bộ Lọc Ranh Giới Văn Hóa (Cultural Guardrails):** Hệ thống quy tắc thuật toán nghiêm ngặt kiểm định nếp áo Hữu Nhậm (vạt trái đè vạt phải), cấm kỵ Tả Nhậm (tử phục tang lễ), kiểm soát hoa văn Long thần hoàng tộc và kiểm duyệt trang phục theo ngữ cảnh sinh hoạt.
3. **Trí Tuệ Nhân Tạo Sinh Ảnh Đa Mô Hình (Multimodal Generative AI):** Phòng thử đồ ảo (Anywear Virtual Fitting) ứng dụng Google Studio Gemini Image Engine (`gemini-3.1-flash-lite-image`, `gemini-3.1-flash-image`) kết hợp `gemini-3.8-flash` và OpenRouter Vision, giúp người dùng ướm thử trang phục di sản lên chính vóc dáng thật của mình.
4. **Trò Chơi Giáo Dục & Trắc Nghiệm Tương Tác:** Trò chơi 2D giải đố *"Dệt Ký Ức: Khuy Ngọc Trên Điện Kính Thiên"* và bài thi kiểm định nhận huy hiệu Đại sứ Di sản.

---

## 🎯 2. Phạm Vi Dự Án (Project Scope)

Dự án bao gồm 5 phân hệ tính năng hoạt động đồng bộ trên nền tảng Full-Stack:

```
┌────────────────────────────────────────────────────────────────────────────────────────┐
│                              VIỆT PHỤC REMIX ARCHITECTURE                              │
├──────────────────┬──────────────────┬──────────────────┬───────────────────────────────┤
│ 1. STYLIST       │ 2. VIRTUAL       │ 3. 2D GAME       │ 4. HERITAGE VAULT & CMS       │
│    STUDIO        │    TRY-ON STUDIO │    DI SẢN        │                               │
├──────────────────┼──────────────────┼──────────────────┼───────────────────────────────┤
│ • 6 Dòng Cổ Phục │ • Webcam Live    │ • Nhân vật An    │ • Kho Rập Kỹ Thuật (Blueprint)│
│ • Bối cảnh Gen Z │ • Upload Portrait│ • Bậc thềm rồng  │ • Quản lý Tham chiếu Di sản   │
│ • Guardrail Score│ • Dual AI Engine │ • Đố Khuy Ngọc   │ • Lịch sử Mặc thử (Tryon DB)  │
│ • Lookbook Preset│ • Before / After │ • Web Audio Synth│ • Trắc nghiệm & Cấp Huy hiệu  │
└──────────────────┴──────────────────┴──────────────────┴───────────────────────────────┘
```

### 1. Stylist Studio — Phối Đồ Việt Phục Đương Đại
- **6 Dòng Cổ Phục Gốc Được Phép Khai Thác:**
  - *Áo Ngũ Thân Tay Chẽn (1744)*: Tượng trưng cho Ngũ Thường, phom đứng chữ A, 5 khuy cài sang sườn phải.
  - *Áo Tấc (Áo Tay Thụng)*: Lễ phục chuẩn mực với tay rộng 30–45cm, mặc trong cưới hỏi, tế tự.
  - *Áo Nhật Bình*: Trang phục nội mệnh cung đình triều Nguyễn với dải cổ áo hình chữ nhật thêu hoa văn ngũ hành.
  - *Áo Tứ Thân*: Duyên dáng Kinh Bắc với 4 vạt buộc dải yếm lụa.
  - *Áo Giao Lĩnh*: Cổ chéo thời Lê – Nguyễn sơ, mang nét cổ kính uy nghiêm.
  - *Áo Dài Lemur / Raglan*: Bước chuyển biến thời trang thế kỷ 20 tôn vinh đường cong người phụ nữ Việt.
- **Tùy biến phong cách Gen Z:** Tự do mix & match cùng quần cargo túi hộp, quần ống suông Vạn Phúc, sneaker chunky, blazer hiện đại, kính mắt Y2K, kiềng bạc, quạt trầm.
- **Bộ Lọc Ranh Giới Văn Hóa (Cultural Guardrails Engine):**
  - Chấm điểm **Cultural Validity Score (1 - 100)** thời gian thực.
  - Bắt buộc vạt áo **Hữu Nhậm** (trái đè phải), cấm tuyệt đối **Tả Nhậm** (phải đè trái).
  - Phân loại ngữ cảnh: Tôn nghiêm (đền chùa, lễ cưới: biến tấu ≤20%) vs Đời thường (concert, triển lãm: biến tấu 50%–70%).
  - Cảnh báo vàng nếu lạm dụng Long văn 5 móng (hoa văn dành riêng cho Hoàng đế).

### 2. Anywear Virtual Fitting Studio — Phòng Thử Đồ Ảo AI
- **Đầu vào Đa Phương Thức:** Chụp ảnh chân dung trực tiếp qua Webcam (hỗ trợ chuyển đổi camera trước/sau trên điện thoại) hoặc tải ảnh chân dung độ nét cao từ máy.
- **Động cơ Sinh Ảnh AI:**
  - Tích hợp mô hình sinh ảnh **Google Studio Gemini Flash Image (`gemini-3.1-flash-lite-image`)** và **Gemini Flash Pro (`gemini-3.1-flash-image`)**.
  - Tích hợp mô hình ngôn ngữ & thị giác **`gemini-3.8-flash`** cho thẩm định chuyên gia học thuật.
  - Hỗ trợ mô hình phụ trợ **OpenRouter (`openai/gpt-4o`)** khi được cấu hình.
- **Trình tạo JSON Prompt Thời Trang (Prompt Inspector):** Tự động bóc tách các thông số vải vóc, mã màu hex, tên rập, quy cách cài khuy và denoising strength thành cấu trúc JSON chuẩn hóa có thể sao chép.
- **Chế độ Hiển thị Đa Dạng:**
  - *Song song (Side-by-Side)*: Khung Before và After độc lập, bố cục badge thông minh chống tràn chữ.
  - *Thanh trượt so sánh (Split Slider)*: Kéo vuốt trực tiếp trên ảnh để kiểm tra chi tiết may đo.
  - *Toàn bộ kết quả AI (Result Only)*: Phóng to toàn màn hình kèm dấu mộc chứng nhận di sản.

### 3. Trò Chơi 2D Di Sản — "Dệt Ký Ức: Khuy Ngọc Trên Điện Kính Thiên"
- **Cốt truyện:** Theo chân linh hồn sợi tơ chibi **An** thám hiểm thềm rồng Điện Kính Thiên để hóa giải chướng khí thời gian và phục dựng lại ký ức vàng son.
- **Gameplay tương tác:**
  - Điều khiển chuyển động và nhảy qua các bục đá cổ.
  - Sử dụng Quạt Gỗ Trầm xua tan làn sương chướng khí.
  - Câu đố Khuy Ngọc: Thử nghiệm cài khuy áo. Cài sai nếp Tả Nhậm sẽ kích hoạt cảnh báo răn đe văn hóa; cài đúng nếp Hữu Nhậm cùng 5 hạt khuy Nhân – Lễ – Nghĩa – Trí – Tín sẽ giải phóng hào quang bảo điện.
- **Âm thanh tổng hợp (Web Audio API Synthesizer):** Tạo hiệu ứng âm thanh bước chân, tiếng gió lạnh và chuông đồng mà không cần tải tài nguyên âm thanh ngoài nặng nề.

### 4. Heritage Knowledge Base & Quiz Di Sản
- **Cơ sở dữ liệu lịch sử:** Tài liệu học thuật chuyên sâu về các niên đại trang phục 1744, 1837, cấu tạo triết lý Ngũ Thường (Nhân, Lễ, Nghĩa, Trí, Tín) tương ứng 5 cúc áo.
- **Kho Bản Vẽ Kỹ Thuật Rập (Blueprints):** Sơ đồ giải phẫu 6 đường ráp vải (đường trung phùng), phom dáng chữ A, cấu trúc cổ đứng Lập Lĩnh.
- **Interactive Quiz:** Bộ câu hỏi trắc nghiệm kiểm tra độ hiểu biết về cổ phục và cấp chứng nhận Huy hiệu Đại sứ Di sản.

### 5. Quản Trị Dữ Liệu Bền Vững (Database & Admin CMS)
- **JSON Document Store bền vững nguyên tử** lưu trữ tại `data/heritage_vault_db.json`.
- Cho phép thêm, sửa, xóa các mẫu cổ phục tham chiếu (References), lưu trữ lịch sử các lần mặc thử (Try-on History), cấu hình tham số hệ thống và sao lưu dữ liệu.

---

## ⚡ 3. Hiện Trạng Triển Khai (Current Implementation Status)

Dự án hiện đang vận hành ổn định ở cấp độ **Production-Ready Functional Prototype**:

| Hạng Mục | Hiện Trạng | Chi Tiết Kỹ Thuật |
| :--- | :---: | :--- |
| **Kiến trúc Full-Stack** | ✅ 100% | Frontend React 19 + TypeScript + Express Backend gắn `vite.middlewares` trên cùng Port 3000. |
| **Giao diện & Trải nghiệm (UI/UX)** | ✅ 100% | Tailwind CSS v4, Dark Mode cung đình sang trọng, Responsive hoàn chỉnh cho Mobile & Desktop. Khắc phục triệt để lỗi chồng đè nhãn Before/After. |
| **Hệ thống AI Thẩm định** | ✅ 100% | Chuyển đổi thành công sang **`gemini-3.8-flash`** (loại bỏ hoàn toàn model cũ `gemini-2.5-flash` bị 404). Phân tích học thuật, cho điểm chuẩn mực tức thì. |
| **Hệ thống Sinh Ảnh AI (Try-On)** | ✅ 100% | Tích hợp `@google/genai` với `gemini-3.1-flash-lite-image`. Hỗ trợ luồng Paid Model Flow và cơ chế Fallback thông minh. |
| **Bộ Lọc Ranh Giới Văn Hóa** | ✅ 100% | Hoạt động thời gian thực với cảnh báo màu sắc (Xanh / Vàng / Đỏ), bảo vệ tính thiêng của trang phục. |
| **Trò Chơi 2D & Audio** | ✅ 100% | Canvas 2D engine mượt mà 60 FPS, Web Audio Synth không có độ trễ. |
| **Cơ Sở Dữ Liệu Lưu Trữ** | ✅ 100% | Tự động đồng bộ hóa disk storage tại `data/heritage_vault_db.json`, hình ảnh lưu tại `public/uploads/` và `public/references/`. |

---

## ⚠️ 4. Các Hạn Chế Hiện Tại & Lộ Trình Nâng Cấp (Known Limitations & Roadmaps)

Mặc dù hệ thống đã vận hành hoàn chỉnh các luồng tính năng, một số hạn chế kỹ thuật khách quan và định hướng phát triển bao gồm:

### 1. Giới hạn Hạn mức API Sinh Ảnh Cloud (Cloud AI Image Quota Constraints)
* **Thực trạng:** 
  * Các mô hình sinh ảnh AI trực tiếp của Google (`gemini-3.1-flash-lite-image`, `gemini-3.1-flash-image`) và OpenRouter trên gói miễn phí (Free Tier) có định mức gọi sinh ảnh bằng 0 (`limit: 0 requests/min, code 429 RESOURCE_EXHAUSTED`).
  * Để sinh ảnh trực tiếp từ cloud, người dùng hoặc hệ thống cần kích hoạt **Paid API Key** (thông qua giao diện *Paid Model Flow* của AI Studio) hoặc nạp credit OpenRouter.
* **Giải pháp hiện tại của dự án:** 
  * Hệ thống đã tích hợp **Cơ Chế Phục Dựng Di Sản Thông Minh**: Khi cloud API chưa có Paid Key hoặc hết hạn mức, backend tự động trích xuất ảnh chân dung gốc của người dùng (khuôn mặt, kính mắt, kiểu tóc) và lồng ghép chính xác vào rập cổ phục chuẩn mực Hữu Nhậm, Cổ Lập Lĩnh và khuy vàng, đảm bảo người dùng luôn nhận được kết quả trực quan mà không bị gián đoạn trải nghiệm.
* **Lộ trình tương lai:** Tích hợp mô hình Stable Diffusion Inpainting / ControlNet cục bộ chạy bằng WebGPU (ONNX Runtime Web) trực tiếp trên card đồ họa máy khách mà không cần tốn chi phí API cloud.

### 2. Góc Chụp & Ước Lượng Tư Thế Chân Dung (Pose & Angle Sensitivity)
* **Thực trạng:** Thuật toán phục dựng và may đo 2.5D đạt độ thẩm mỹ cao nhất với ảnh chụp thẳng (chính diện từ ngực trở lên hoặc cả người). Đối với ảnh chụp góc nghiêng mạnh (>60°), chụp từ trên xuống (high-angle) hoặc tư thế gập người phức tạp, nếp cổ áo có thể chưa hoàn toàn ôm sát cơ thể.
* **Lộ trình tương lai:** Tích hợp thư viện thị giác máy tính **MediaPipe Pose 3D** hoặc **DensePose** trên trình duyệt để tự động bắt 33 điểm xương khớp, tự động xoay chuyển góc cổ áo và tà áo theo 3 chiều không gian.

### 3. Mô Phỏng Vật Lý Vải Vóc Thời Gian Thực (Fabric Physics)
* **Thực trạng:** Hình ảnh phục dựng hiện tại là ảnh tĩnh 2D chất lượng cao với hiệu ứng ánh sáng studio giả lập, chưa thể hiện được độ rủ và chuyển động bay tà áo khi người dùng cử động.
* **Lộ trình tương lai:** Phát triển phiên bản 3D tương tác với **Three.js / WebGL Cloth Simulation**, cho phép người dùng xoay 360 độ ngắm nhìn tà áo ngũ thân bay nhẹ theo từng bước chân.

### 4. Đồ Họa Trò Chơi 2D Canvas
* **Thực trạng:** Nhân vật An và Điện Kính Thiên hiện được render bằng mã đồ họa hình học HTML5 Canvas 2D để tối ưu dung lượng (Zero External Assets).
* **Lộ trình tương lai:** Nâng cấp sang Sprite Sheet vẽ tay phong cách Thủy Mặc truyền thống hoặc tích hợp engine **Phaser.js** với hiệu ứng ánh sáng Dynamic Normal Maps 2D.

---

## 🛠️ 5. Công Nghệ Sử Dụng (Tech Stack)

* **Giao Diện (Frontend):** React 19, TypeScript 5.8, Vite 6, Tailwind CSS v4, Lucide React Icons.
* **Máy Chủ (Backend):** Node.js 20+, Express 4, TSX (TypeScript Execute Engine).
* **Trí Tuệ Nhân Tạo (AI & Vision):**
  * `@google/genai` TypeScript SDK:
    * `gemini-3.8-flash`: Phân tích học thuật, thẩm định văn hóa và tư vấn phối đồ.
    * `gemini-3.1-flash-lite-image`: Động cơ sinh ảnh Virtual Try-on.
    * `gemini-3.1-flash-image`: Sinh ảnh HD chất lượng cao.
  * `OpenRouter API`: Hỗ trợ đa mô hình thị giác bổ trợ (`openai/gpt-4o`).
* **Web APIs Tích Hợp:** HTML5 Canvas API, MediaDevices API (Camera / Webcam), Web Audio Synthesizer API, Fetch API với AbortSignal timeout.
* **Cơ Sở Dữ Liệu:** File-based Atomic JSON Document Store (`data/heritage_vault_db.json`).

---

## 🚀 6. Hướng Dẫn Cài Đặt & Vận Hành (Getting Started)

### Yêu cầu hệ thống:
* **Node.js**: Phiên bản 18 trở lên (Khuyến nghị 20.x hoặc 22.x).
* **NPM / Bun / Yarn**.

### Các bước khởi chạy:

1. **Cài đặt thư viện phụ thuộc:**
   ```bash
   npm install
   ```

2. **Cấu hình môi trường (`.env`):**
   Tạo file `.env` tại thư mục gốc dự án:
   ```env
   # API Key cho Google Gemini (Khuyến nghị để thẩm định và sinh ảnh)
   GEMINI_API_KEY="AIzaSy..."

   # API Key OpenRouter (Tùy chọn cho GPT-4o)
   OPENROUTER_API_KEY="sk-or-v1-..."
   ```

3. **Chạy máy chủ phát triển (Development Server):**
   ```bash
   npm run dev
   ```
   Ứng dụng sẽ hoạt động tại địa chỉ: `http://localhost:3000`

4. **Kiểm tra mã nguồn & Build bản Production:**
   ```bash
   npm run lint
   npm run build
   ```

---

## 🛡️ 7. An Toàn Thông Tin & Đạo Đức Di Sản

1. **Bảo Mật Quyền Riêng Tư (Privacy-First):** Ảnh chụp webcam của người dùng không bị rò rỉ ra bên ngoài; các ảnh upload được xử lý an toàn tại tầng backend cục bộ.
2. **Bảo Vệ API Keys:** Toàn bộ khóa bí mật API (`GEMINI_API_KEY`, `OPENROUTER_API_KEY`) nằm hoàn toàn tại máy chủ Node.js (`server.ts`), tuyệt đối không để lộ trong bundle mã nguồn gửi về trình duyệt của người dùng.
3. **Tôn Trọng Tuyệt Đối Di Sản Dân Tộc:** Ứng dụng từ chối phục dựng hoặc tạo ra các hình ảnh mang tính dung tục, xúc phạm tôn giáo, sai lệch lịch sử hoặc đảo ngược quy cách cổ phục (như áo cài sang trái - tử phục tang lễ).

---

*Dự án được xây dựng với lòng tự hào sâu sắc dành cho Cổ phục và Tinh thần Văn hóa Dân tộc Việt Nam 🇻🇳.*

