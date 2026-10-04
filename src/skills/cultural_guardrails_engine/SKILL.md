---
name: "cultural-guardrails-engine"
description: >
  Thuật toán thẩm định điểm số văn hóa và quản trị ranh giới lịch sử cho thời trang truyền thống.
---

# Cultural Guardrails Engine Specification

## 1. Công Thức Tính Điểm Thẩm Định (Cultural Validity Score)
$$S = \max\left(5, \min\left(100, 100 - P_{\text{lapel}} - P_{\text{context}} - P_{\text{pattern}} - P_{\text{fabric}} + B_{\text{modern}}\right)\right)$$

### Ma Trận Điểm Phạt (Penalty Matrix):
- **Phạt Vạt Trái (Tả Nhậm - Tử Phục):** $P_{\text{lapel}} = 65$ (Kích hoạt Cảnh Báo Đỏ ngay lập tức).
- **Phạt Quần Ngắn Nơi Tôn Nghiêm:** $P_{\text{context}} = 40$.
- **Phạt Vải Xuyên Thấu Nơi Thờ Tự:** $P_{\text{fabric}} = 25$.
- **Phạt Dùng Long Văn 5 Móng Sai Ngữ Cảnh:** $P_{\text{pattern}} = 20$.
- **Thưởng Phối Sneaker / Kính Retro Tinh Tế Ngoài Trời:** $B_{\text{modern}} = +5$.

## 2. Phân Cấp Ranh Giới
- **85 - 100 Điểm:** ✅ AN TOÀN (Safe / Heritage Compliant)
- **50 - 84 Điểm:** ⚠️ CẢNH BÁO VÀNG (Caution / Adjustment Needed)
- **1 - 49 Điểm:** ⛔ VI PHẠM ĐỎ (Danger / Prohibited)
