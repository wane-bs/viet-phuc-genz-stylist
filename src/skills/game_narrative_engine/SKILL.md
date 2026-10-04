---
name: "game-narrative-engine"
description: >
  Kiến trúc phát triển Web Game 2D Narrative Puzzle-Platformer "Dệt Ký Ức", cơ chế Dual Tone Shifting và Web Audio Synthesizer.
---

# 2D Narrative Game Engine Architecture

## 1. Vòng Lặp Trải Nghiệm Tự Sự (Narrative Loop)
1. **Pha 1 (Cold State):** Khám phá phế tích trong sương lam lạnh lẽo, giải tỏa chướng ngại bằng vật phẩm (Quạt Giấy Trầm).
2. **Pha 2 (Puzzle & Boundary):** Leo tháp chuông thu thập 5 Khuy Ngọc Ngũ Thường, thử thách quy chuẩn vạt áo (Bẫy Vạt Trái cõi âm vs Vạt Phải chính đạo).
3. **Pha 3 (Warm Awakening):** Chạm khung cửi huyền bí, dệt Áo Ngũ Thân gấm vàng và quét sóng màu từ Lạnh sang Ấm.

## 2. Công Nghệ Xử Lý Đồ Họa & Âm Thanh
- **Canvas Rendering 60FPS:** Hệ thống vật lý va chạm AABB mượt mà trên nền Web Canvas.
- **Dynamic Dual Tone Shader:** Radial Gradient Sweep mở rộng bán kính tỏa sáng màu hoàng kim khi nhân vật thức tỉnh.
- **Web Audio API Synthesizer:** Bộ tổng hợp âm thanh đa sóng (Sine, Triangle, Sawtooth) tự tạo hiệu ứng bước nhảy, khánh đồng ngũ cung và âm thanh bẫy ma quái mà không cần tải file âm thanh ngoài.
