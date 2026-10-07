# ⚙️ CẤU PHẦN KỸ THUẬT (TECHNICAL ARCHITECTURE & COMPONENTS)

## 1. Sơ Đồ Kiến Trúc Tổng Thể (System Architecture)

Dự án được xây dựng theo mô hình **Full-Stack Monorepo hiện đại**, kết hợp sức mạnh kết xuất giao diện tức thì của React 19 cùng máy chủ Node.js/Express tích hợp trực tiếp `vite.middlewares` trên duy nhất cổng dịch vụ **3000**.

```
┌────────────────────────────────────────────────────────────────────────────────────────┐
│                                   CLIENT LAYER (BROWSER)                               │
├────────────────────────────────────────────────────────────────────────────────────────┤
│  React 19 SPA • Tailwind CSS v4 • TypeScript 5.8 • Lucide React                       │
│                                                                                        │
│  ┌──────────────────────┬──────────────────────┬────────────────────────────────────┐  │
│  │ 1. Stylist Studio    │ 2. Anywear Try-On    │ 3. 2D Game "Dệt Ký Ức"             │  │
│  │  - GarmentVisualizer │  - Webcam MediaDev   │  - HTML5 Canvas 2D (60 FPS)        │  │
│  │  - Guardrail Gauge   │  - Split Slider      │  - Web Audio Pentatonic Synth      │  │
│  │  - Lookbook Gallery  │  - Prompt Inspector  │  - Collision & Radial Wave Shader  │  │
│  └──────────────────────┴──────────────────────┴────────────────────────────────────┘  │
│  ┌─────────────────────────────────────────────┬────────────────────────────────────┐  │
│  │ 4. Heritage Reference Vault & Admin CMS     │ 5. Knowledge Base & Quiz Modal     │  │
│  │  - Blueprint Viewer • Data Sync Dashboard   │  - Lịch sử 1744 • Chứng nhận số    │  │
│  └─────────────────────────────────────────────┴────────────────────────────────────┘  │
└───────────────────────────────────────────▲────────────────────────────────────────────┘
                                            │ REST APIs / JSON Payloads
┌───────────────────────────────────────────▼────────────────────────────────────────────┐
│                             SERVER LAYER (EXPRESS + TSX)                               │
├────────────────────────────────────────────────────────────────────────────────────────┤
│  Node.js 20+ • Express 4 • Port 3000 • TSX Execution Runtime                           │
│                                                                                        │
│  ┌───────────────────────────────────┬──────────────────────────────────────────────┐  │
│  │ AI Gateway Controller             │ Core Engines & Business Logic                │  │
│  │  - @google/genai SDK Integration  │  - Cultural Guardrails Engine                │  │
│  │  - gemini-3.8-flash (Text/Vision) │  - Heritage RAG Engine (Semantic Index)      │  │
│  │  - gemini-3.1-flash-lite-image    │  - Concurrency Guard (Rate Limit & Queue)    │  │
│  │  - OpenRouter Vision Fallback     │  - Regression Suite (Quality Gate)           │  │
│  └───────────────────────────────────┴──────────────────────────────────────────────┘  │
│  ┌───────────────────────────────────┬──────────────────────────────────────────────┐  │
│  │ Storage & Persistence Services    │ Static Asset Serving                         │  │
│  │  - Ephemeral Storage Service      │  - /public/uploads/ (Chân dung người dùng)   │  │
│  │  - Atomic JSON Document Store     │  - /public/references/ (Ảnh rập cổ phục)     │  │
│  └───────────────────────────────────┴──────────────────────────────────────────────┘  │
└───────────────────────────────────────────▲────────────────────────────────────────────┘
                                            │ Atomic File I/O
┌───────────────────────────────────────────▼────────────────────────────────────────────┐
│                                 DATA PERSISTENCE LAYER                                 │
├────────────────────────────────────────────────────────────────────────────────────────┤
│  • data/heritage_vault_db.json (References, Try-on History, System Config, Seed Data)  │
└────────────────────────────────────────────────────────────────────────────────────────┘
```

---

## 2. Chi Tiết Các Phân Hệ Frontend (Client Layer)

### 2.1. Nền Tảng Công Nghệ Giao Diện
* **React 19 & TypeScript 5.8:** Khai thác tối đa kiến trúc functional component, custom hooks và hệ thống kiểu dữ liệu tĩnh nghiêm ngặt (`src/types/index.ts`).
* **Tailwind CSS v4:** Sử dụng cú pháp `@import "tailwindcss";` mới nhất, lược bỏ hoàn toàn các file CSS phức tạp, đảm bảo thiết kế giao diện Dark Mode phong cách cung đình (Hoàng kim `#D97706`, Đỏ chu sa `#DC2626`, Xanh ngọc bích `#059669`, Nền nhung huyền `#0F172A`).
* **Lucide React:** Bộ icon vector đồng bộ cho toàn bộ giao diện điều hướng và các công cụ thao tác.

### 2.2. Các Thành Phần Giao Diện Nòng Cốt
1. **`WardrobeStudio.tsx`:** Trình phối đồ chính, liên kết dữ liệu rập áo, bối cảnh mặc và các phụ kiện đương đại.
2. **`GarmentVisualizer.tsx`:** Bộ hiển thị áo 2D tương tác đa lớp (Layered SVG/Canvas) phản ánh chân thực màu sắc vải, chất liệu gấm lụa, phom tay chẽn hoặc tay thụng.
3. **`CulturalScoreGauge.tsx`:** Đồng hồ đo điểm chuẩn mực văn hóa (1 - 100) hiển thị 3 trạng thái màu (Xanh lá = Hợp thức, Vàng = Thận trọng, Đỏ = Cấm kỵ).
4. **`AnywearVirtualFitting.tsx`:** Phòng thử đồ ảo thông minh:
   * Chụp ảnh webcam tức thì với cơ chế lật camera (User/Environment facing).
   * Kéo thả ảnh chân dung phân giải cao.
   * Thanh trượt so sánh Before/After (Split Slider) và chế độ phóng to ảnh kèm con dấu bảo chứng di sản.
5. **`DetKyUcGame.tsx`:** Trò chơi 2D Canvas tương tác 60 FPS, mô phỏng nhân vật bé An và kiến trúc Điện Kính Thiên.
6. **`HeritageReferenceVault.tsx`:** Trình quản lý danh mục cổ phục tham chiếu và lịch sử thử đồ của người dùng.
7. **`KnowledgeBaseExplorer.tsx` & `HeritageHandbookModal.tsx`:** Kho tư liệu giải phẫu rập áo và cẩm nang văn hóa số.

### 2.3. Web APIs Trình Duyệt Tích Hợp Sâu
* **MediaDevices & Streams API:** Điều khiển camera thời gian thực, xử lý ảnh canvas để trích xuất Base64 nén tối ưu băng thông.
* **Web Audio API Synthesizer:**
  * Bộ tổng hợp âm thanh đa sóng âm tự tạo (Sine, Triangle, Exponential decay).
  * Mô phỏng thang âm ngũ cung Việt Nam (Hò, Xự, Xang, Xê, Cống) khi nhặt các hạt Khuy Ngọc Ngũ Thường mà không phụ thuộc vào file MP3 dung lượng lớn từ máy chủ.

---

## 3. Chi Tiết Các Dịch Vụ Backend & AI Engine (Server Layer)

### 3.1. Cổng Kết Nối AI Đa Mô Hình (Google GenAI Gateway)
Tích hợp bộ công cụ chính thức `@google/genai` với cấu hình định tuyến thông minh:
* **`gemini-3.8-flash` (Học thuật & Đánh giá):**
  * Đảm nhận vai trò "Chuyên gia Cổ phục Việt Nam".
  * Tiếp nhận dữ liệu cấu hình trang phục (loại áo, cách cài khuy, bối cảnh xuất hiện, phụ kiện kèm theo).
  * Trả về kết quả phân tích lịch sử, lời khuyên styling Gen Z và điểm số định lượng JSON chuẩn hóa.
* **`gemini-3.1-flash-lite-image` & `gemini-3.1-flash-image` (Sinh ảnh Thử đồ Ảo):**
  * Nhận đồng thời hai ảnh: Chân dung người dùng + Ảnh rập cổ phục tham chiếu.
  * Ghép khuôn mặt, dáng người và trang phục di sản với chất liệu ánh sáng studio chân thực.
* **Cơ Chế Phục Dựng Di Sản Thông Minh (Heritage Fallback Engine):**
  * Tự động kích hoạt khi gói Cloud API đạt giới hạn hạn mức (Quota 429).
  * Backend sử dụng thuật toán cắt ghép chân dung cục bộ, phủ lớp trang phục Hữu Nhậm và lập lĩnh để người dùng không bao giờ gặp lỗi gián đoạn màn hình.

### 3.2. Động Cơ Bộ Lọc Ranh Giới Văn Hóa (`culturalGuardrailEngine.ts`)
Thuật toán tính điểm văn hóa hoạt động dựa trên ma trận phạt điểm định lượng:
$$\text{Score} = \max\left(5, \min\left(100, 100 - P_{\text{lapel}} - P_{\text{context}} - P_{\text{pattern}} - P_{\text{fabric}} + B_{\text{modern}}\right)\right)$$
* $P_{\text{lapel}} = 65$: Trừ điểm nặng nhất khi cài vạt sang trái (Tả Nhậm).
* $P_{\text{context}} = 40$: Phạt khi mặc quần short, váy ngắn nơi tôn nghiêm (Đền, Chùa, Nhà thờ họ).
* $P_{\text{fabric}} = 25$: Phạt chất liệu xuyên thấu lộ nội y nơi thờ tự.
* $P_{\text{pattern}} = 20$: Phạt in thêu Rồng 5 móng (biểu tượng Hoàng đế) cho trang phục dạo phố thông thường.
* $B_{\text{modern}} = +5$: Điểm cộng khuyến khích khi phối phụ kiện đương đại tinh tế (Sneaker trắng, Kính Y2K, Túi tote gấm) ở sự kiện ngoài trời.

### 3.3. Động Cơ Tìm Kiếm Di Sản RAG (`HeritageRAGService`)
* Lập chỉ mục ngữ nghĩa cho toàn bộ kho tư liệu lịch sử thời Lê - Nguyễn, các sắc lệnh 1744, quy chuẩn triều phục và điển lệ dân gian.
* Cho phép người dùng truy vấn ngôn ngữ tự nhiên: *"Tại sao áo ngũ thân lại có 5 cúc?"*, *"Đi chùa mặc áo tấc phối sneaker được không?"* và trích xuất đúng chương mục lịch sử tương ứng.

### 3.4. Dịch Vụ Lưu Trữ Tạm & Bảo Vệ Riêng Tư (`EphemeralStorageService`)
* Quản lý vòng đời ảnh chụp chân dung của người dùng.
* Tự động xóa dọn rác các file ảnh tạm sau một khoảng thời gian quy định, đảm bảo không lưu giữ trái phép dữ liệu sinh trắc học và hình ảnh cá nhân.

### 3.5. Kiểm Soát Tải Đồng Thời (`ConcurrencyGuard`)
* Thiết lập hàng đợi cho các yêu cầu sinh ảnh AI nặng.
* Giới hạn số lượng tác vụ xử lý đồng thời để tránh làm nghẽn máy chủ Node.js và ngăn chặn lỗi tràn bộ nhớ (Out-Of-Memory).

### 3.6. Bộ Kiểm Thử Chất Lượng Hồi Quy (`HeritageRegressionSuite`)
* Bộ 10 kịch bản kiểm thử văn hóa tự động (Automated Quality Gate).
* Đảm bảo mọi lần cập nhật mã nguồn trong tương lai không bao giờ vô tình làm suy yếu thuật toán kiểm duyệt (ví dụ: một phiên bản mới tuyệt đối không được cấp điểm trên 50 cho trường hợp áo Tả Nhậm).

---

## 4. Đặc Tả Cơ Sở Dữ Liệu (Database Vault)

Hệ thống sử dụng cơ sở dữ liệu tài liệu nguyên tử (Atomic Document Store) lưu tại file:
`data/heritage_vault_db.json`

### Cấu Trúc Các Bộ Dữ Liệu Chính:
1. **`references` (Danh mục Cổ phục Tham chiếu):**
   * `id`: Định danh duy nhất (ví dụ: `ref-ngu-than-nam-01`).
   * `name`: Tên trang phục (ví dụ: Áo Ngũ Thân Tay Chẽn Sa Hạch).
   * `dynasty`: Triều đại (Triều Nguyễn 1802 - 1945).
   * `garmentType`: Phân loại (`ngu_than`, `ao_tac`, `nhat_binh`, `giao_linh`, `tu_than`).
   * `gender`: Nam / Nữ / Unisex.
   * `imageUrl`: Đường dẫn ảnh mẫu chất lượng cao.
   * `description`: Mô tả chi tiết kỹ thuật may đo và ý nghĩa biểu tượng.
   * `tags`: Danh sách từ khóa phục vụ RAG.
2. **`tryon_history` (Lịch sử Mặc Thử):**
   * Lưu trữ các phiên mặc thử thành công: ảnh gốc, ảnh kết quả sau AI, thông số phong cách đã chọn, điểm số văn hóa đạt được và mốc thời gian (timestamp).
3. **`system_config` (Cấu hình Vận Hành):**
   * Các ngưỡng điểm an toàn, phiên bản mô hình AI mặc định, định mức lưu trữ và trạng thái kích hoạt chế độ bảo vệ di sản.

---

## 5. Danh Mục Các API Endpoints Chính

| Phương Thức | Tuyến Đường (Route) | Chức Năng |
| :--- | :--- | :--- |
| `POST` | `/api/stylist/analyze` | Gửi cấu hình phối đồ để AI Gemini 3.8 Flash thẩm định và chấm điểm. |
| `POST` | `/api/tryon/generate` | Nhận ảnh chân dung và cấu hình rập áo để tiến hành thử đồ ảo AI. |
| `GET` | `/api/vault/references` | Lấy danh sách các mẫu cổ phục chuẩn mực trong kho dữ liệu. |
| `POST` | `/api/vault/references` | Thêm mẫu cổ phục tham chiếu mới vào kho lưu trữ (Kèm upload ảnh). |
| `DELETE` | `/api/vault/references/:id` | Xóa mẫu cổ phục khỏi kho lưu trữ. |
| `GET` | `/api/vault/history` | Lấy lịch sử các phiên thử đồ ảo. |
| `GET` | `/api/knowledge/search` | Tìm kiếm ngữ nghĩa trong kho tri thức lịch sử RAG. |
| `POST` | `/api/test/regression-suite` | Kích hoạt bộ kiểm thử hồi quy 10 ca để thẩm định hệ thống. |
