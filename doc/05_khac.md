# 📌 KHÁC: QUY CHUẨN VĂN HÓA, KỸ NGHỆ PROMPT & CHẤT LƯỢNG (OTHER SPECIFICATIONS)

## 1. Bảng Tra Cứu Quy Cách & Ranh Giới Văn Hóa Chi Tiết

Hệ thống vận hành theo bộ nguyên tắc bất di bất dịch được đối chiếu từ các tài liệu sử liệu (*Khâm Định Đại Nam Hội Điển Sự Lệ*, *Đại Nam Thực Lục*, định chế Giáp Tý 1744 của Vũ Vương Nguyễn Phúc Khoát).

### 1.1. Ma Trận Quy Tắc Kiểm Định (Cultural Guardrails Rules)

| Quy Chuẩn | Mức Độ Răn Đe | Hành Vi Kích Hoạt | Hệ Quả & Hướng Xử Lý Của Hệ Thống |
| :--- | :---: | :--- | :--- |
| **Quy cách vạt Hữu Nhậm (右衽)** | ⛔ **TUYỆT ĐỐI (CẢNH BÁO ĐỎ)** | Thiết kế hoặc mặc vạt áo cài sang bên nách trái (**Tả Nhậm**). | Điểm phạt $P = 65$. Khóa ngay lập tức nút xác nhận may/thử đồ. Cảnh báo: *"Tả Nhậm là y phục cõi âm / tang ma tế tự người mất, tuyệt đối không áp dụng cho người sống."* |
| **Bảo vệ nơi Tôn Nghiêm (Trang nghiêm)** | ⛔ **CẢNH BÁO ĐỎ** | Đề xuất phối quần short ngắn, váy mini cạp cao, tà áo xẻ quá nách lộ eo lườn, hoặc chất liệu vải voan mỏng tang xuyên thấu tại Đền, Chùa, Nhà thờ tổ, Lễ cưới. | Điểm phạt $P = 40$. Giới hạn mức độ biến tấu $\le 20\%$. Buộc thay bằng quần ống suông lụa chạm gót hoặc quần lụa Vạn Phúc kín đáo. |
| **Long Văn Hoàng Gia (Rồng 5 móng)** | ⚠️ **CẢNH BÁO VÀNG** | Sử dụng hoa văn Rồng 5 móng (Cửu ngũ chí tôn triều Nguyễn) cho các trang phục dạo phố, cà phê thường nhật. | Điểm phạt $P = 20$. Gợi ý thay thế bằng hoa văn Tứ Linh thông thường, Hoa Loan, Mây Ngũ Sắc, Bát Bửu hoặc Hạc bay. |
| **Phối Phụ Kiện Đương Đại (Gen Z Streetwear)** | ✅ **KHUYẾN KHÍCH (THƯỞNG ĐIỂM)** | Phối cùng Chunky Sneaker monochrome, kính râm retro Y2K, túi tote vải dệt gấm, áo blazer khoác ngoài khi đi triển lãm nghệ thuật, concert, dạo phố. | Cộng điểm $B = +5$. Cho phép biến tấu linh hoạt từ $50\% - 70\%$, giữ trọn phom áo gốc nhưng mang diện mạo thời thượng. |

---

## 2. Giải Phẫu Rập May Cổ Phục Kỹ Thuật (Garment Anatomy Blueprint)

Hệ thống lưu trữ các thông số rập may chuẩn mực phục vụ cho cả mô phỏng 2D lẫn cắt may thực tế:

```
                      ┌───────────────────┐
                      │   CỔ LẬP LĨNH     │  <--- Đứng thẳng, ôm khít cổ, kín đáo
                      └─────────┬─────────┘
        ┌───────────────────────┴───────────────────────┐
        │                                               │
   [ VẠT TẢ NGOÀI ]                               [ VẠT HỮU TRONG ]
 (Vạt trái đè vạt phải)                          (Thân con đỡ bên trong)
        │                                               │
        ├── ĐƯỜNG TRUNG PHÙNG: Sống lưng may nối chính giữa hai khổ vải
        │   (Tượng trưng cho lòng ngay thẳng, chính trực của người quân tử)
        │
        ├── 5 HẠT KHUY CÀI SƯỜN PHẢI (Ngũ Thường: Nhân - Lễ - Nghĩa - Trí - Tín)
        │
        └── PHOM DÁNG CHỮ A: Thả suông, không chiết eo, tôn nét đoan trang thuần hậu
```

* **Ý nghĩa 5 thân áo:** 4 thân bên ngoài tượng trưng cho "Tứ thân phụ mẫu" (cha mẹ ruột và cha mẹ chồng/vợ); thân thứ 5 nhỏ hơn nằm kín đáo bên trong tượng trưng cho người con bé bỏng được che chở, đùm bọc trong luân thường đạo lý gia đình.
* **Quy cách tay áo:**
  * *Áo Chẽn:* Ống tay bó dần từ bắp tay đến cổ tay, thuận tiện cho sinh hoạt thường nhật.
  * *Áo Tấc (Áo Tay Thụng):* Bản tay áo vuông rộng từ 30cm đến 45cm, biểu trưng cho phong thái ung dung, lễ nghi cung kính.

---

## 3. Kỹ Nghệ Prompt Đa Phương Thức & JSON Schema (AI Engineering)

Để kết quả sinh ảnh từ Google GenAI (`gemini-3.1-flash-lite-image`) và thẩm định từ `gemini-3.8-flash` đạt độ chuẩn xác cao nhất, hệ thống ứng dụng cấu trúc Prompt chuẩn hóa:

### 3.1. Cấu Trúc Prompt Thị Giác (Try-On Visual Prompt)
```text
Photorealistic high-fashion heritage portrait of the user wearing authentic Vietnamese 
Ngu Than garment (1744 Nguyen Dynasty standard). 
- Garment Details: Standing Lap Linh collar, authentic Huu Nham overlap (left lapel firmly 
  wrapped over right side, fastened on right rib with 5 polished jade/gold buttons).
- Fabric: Premium Van Phuc mulberry silk with subtle imperial cloud jacquard weave.
- Fit & Silhouette: Elegant straight A-line silhouette, tailored snug wrists.
- Styling Accent: Tasteful contemporary fusion with [User-selected modern accessory, e.g., 
  minimalist white leather sneaker / retro tortoiseshell sunglasses].
- Cultural Integrity: Absolute prohibition of left-sided fastening (Ta Nham). 
- Lighting: 85mm portrait lens, professional cinematic softbox lighting, natural skin texture, 
  preserving original face characteristics and gaze direction.
```

### 3.2. Cấu Trúc JSON Phản Hồi Chuẩn Hóa
```json
{
  "cultural_validity_score": 94,
  "level": "SAFE",
  "historical_analysis": "Mẫu áo Ngũ Thân tay chẽn tuân thủ chuẩn xác Sắc lệnh 1744 của Vũ Vương Nguyễn Phúc Khoát. Nếp áo Hữu Nhậm cài 5 khuy bên sườn phải thể hiện đầy đủ đạo Ngũ Thường.",
  "guardrail_alerts": [],
  "styling_advice": "Bản phối cùng quần suông lụa đen và giày sneaker trắng tạo nên nét tương phản tối giản, rất thích hợp cho sự kiện triển lãm nghệ thuật hoặc dạo phố cuối tuần.",
  "blueprint_specs": {
    "collar_type": "Lap Linh (Standing Collar 4cm)",
    "closure_direction": "Right-side fastening (Huu Nham)",
    "button_count": 5,
    "recommended_fabrics": ["Lụa Sa Hạch Hà Đông", "Đũi Tơ Tằm Tự Nhiên"]
  }
}
```

---

## 4. Quy Trình Kiểm Thử Hồi Quy & Cổng Chất Lượng (Quality Gate)

Hệ thống tích hợp bộ tự động hóa kiểm thử `HeritageRegressionSuite` tại `src/services/qualityGate/heritageRegressionSuite.ts`. Mọi thay đổi mã nguồn trước khi xuất bản đều phải vượt qua 10 kịch bản văn hóa nghiêm ngặt:

1. **TC-01 (Áo Ngũ Thân chuẩn Hữu Nhậm dạo phố):** Điểm số phải $\ge 85$, không có cảnh báo đỏ.
2. **TC-02 (Cố tình cài vạt Tả Nhậm tang ma):** Điểm số bắt buộc $< 50$, lập tức kích hoạt Cảnh báo Đỏ cấm kỵ.
3. **TC-03 (Mặc Áo Tấc phối quần đùi vào Chùa chiền):** Điểm số bắt buộc $< 50$, kích hoạt cảnh báo vi phạm nơi tôn nghiêm.
4. **TC-04 (Áo Nhật Bình phối Sneaker đi sự kiện ngoài trời):** Điểm số đạt $80 - 90$, chấp nhận biến tấu Gen Z hợp lệ.
5. **TC-05 (Thêu Long Văn 5 móng đi cà phê):** Kích hoạt cảnh báo vàng về thẩm quyền biểu tượng hoàng gia.
6. **TC-06 (Vải voan mỏng xuyên thấu nơi lễ bái):** Trừ 25 điểm chất liệu, từ chối phê duyệt.
7. **TC-07 (Áo Tứ Thân Kinh Bắc trẩy hội Lim):** Thẩm định đúng niên đại và chi tiết dải yếm lụa.
8. **TC-08 (Áo Giao Lĩnh cổ chéo):** Kiểm tra nếp vạt chéo giao nhau sang bên sườn phải.
9. **TC-09 (Áo Dài Lemur cách tân thập niên 1930):** Xác thực biến tấu tôn vinh hình thể mà không dung tục.
10. **TC-10 (Đủ 5 hạt khuy ngọc Ngũ Thường):** Kiểm tra sự hiện diện của Nhân, Lễ, Nghĩa, Trí, Tín.

---

## 5. Nguyên Tắc Đạo Đức Trí Tuệ Nhân Tạo & Bảo Mật Di Sản (AI Ethics)

1. **Quyền Riêng Tư Sinh Trắc Học Tuyệt Đối:**
   * Ảnh chân dung người dùng tải lên phòng thử đồ chỉ được lưu tạm thời trong bộ nhớ đệm phục vụ quá trình kết xuất (Rendering).
   * Không sử dụng khuôn mặt của người dùng để huấn luyện (Training) bất kỳ mô hình AI nào khác nếu không có sự đồng ý bằng văn bản.
2. **Tôn Trọng Tính Thiêng & Không Xúc Phạm Tín Ngưỡng:**
   * Hệ thống kiên quyết từ chối tạo sinh các hình ảnh bóp méo, giễu nhại trang phục tế lễ, triều phục thần thánh hoặc gán ghép hình ảnh báng bổ vào di sản dân tộc.
3. **Minh Bạch Trong Thuật Toán:**
   * Người dùng luôn được giải thích rõ ràng tại sao bản phối của mình bị trừ điểm, giúp việc tiếp cận kiến thức lịch sử trở nên văn minh và thấu hiểu.
