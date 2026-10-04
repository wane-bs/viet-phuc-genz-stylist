export interface KnowledgeArticle {
  id: string;
  category: 'dient_kinh_thien' | 'dinh_che_1744' | 'ngu_than_ngu_thuong' | 'cac_dong_co_phuc' | 'ranh_gioi_van_hoa' | 'genz_remix';
  categoryLabel: string;
  title: string;
  shortDesc: string;
  fullContent: string;
  historicalEra: string;
  academicCitation: string;
  keyTakeaways: string[];
  tags: string[];
}

export const KNOWLEDGE_BASE_ARTICLES: KnowledgeArticle[] = [
  {
    id: 'kb_dien_kinh_thien',
    category: 'dient_kinh_thien',
    categoryLabel: 'Hoàng Thành Thăng Long & Điện Kính Thiên',
    title: 'Điện Kính Thiên: Trái Tim Quyền Lực & Khởi Nguồn Ký Ức Đại Việt',
    shortDesc: 'Di tích trung tâm của Hoàng thành Thăng Long, nơi thiết triều long trọng nhất và là bối cảnh hồi sinh di sản trong dự án "Dệt Ký Ức".',
    historicalEra: 'Thời Lê sơ (1428) - Lê Trung Hưng - Nhà Nguyễn',
    academicCitation: 'Hồ sơ Di sản Thế giới Hoàng Thành Thăng Long & Dự án Nghiên cứu Phục dựng Điện Kính Thiên (UNESCO / Viện Khảo cổ học).',
    keyTakeaways: [
      'Xây dựng năm 1428 trên nền cung Càn Nguyên thời Lý - Trần.',
      'Nơi cử hành các đại lễ trang nghiêm nhất của quốc gia Đại Việt.',
      'Thềm rồng đá Điện Kính Thiên là kiệt tác điêu khắc đá thời Lê sơ nguyên vẹn nhất.',
      'Dự án phục dựng bảo tồn ký ức 1300 năm lịch sử Thăng Long - Hà Nội.'
    ],
    fullContent: `Điện Kính Thiên (nghĩa là "Kính cẩn thờ Trời") là cung điện quan trọng bậc nhất trong Cấm thành Thăng Long. Đây là nơi các vị hoàng đế Đại Việt cử hành các nghi lễ đại triều, tiếp đón sứ thần ngoại giao và ban bố các chiếu chỉ trọng đại của đất nước.

Được khởi dựng từ năm 1428 dưới triều vua Lê Thái Tổ và hoàn thành dưới thời Lê Thánh Tông, Điện Kính Thiên tọa lạc chính giữa đỉnh núi Nùng linh thiêng. Dù kiến trúc gỗ xưa đã bị tàn phá qua biến thiên thời gian, đôi rồng đá chầu bậc thềm với thân uốn 7 khúc, đầu ngẩng cao uy nghiêm vẫn còn nguyên vẹn, minh chứng cho đỉnh cao nghệ thuật điêu khắc thời Lê sơ.

Trong tựa game "Dệt Ký Ức", Điện Kính Thiên là không gian tâm linh thức tỉnh, nơi tinh linh An đi tìm lại những hạt khuy ngọc và dệt nên chiếc áo ngũ thân gấm vàng, xua tan làn sương quên lãng.`,
    tags: ['Điện Kính Thiên', 'Hoàng Thành Thăng Long', 'Rồng Đá', 'Lê Sơ', 'Cõi Mộng Chỉ']
  },
  {
    id: 'kb_dinh_che_1744',
    category: 'dinh_che_1744',
    categoryLabel: 'Lịch Sử & Định Chế Y Phục',
    title: 'Sắc Lệnh Năm Giáp Tý 1744: Chúa Nguyễn Phúc Khoát Khai Sinh Áo Dài Ngũ Thân',
    shortDesc: 'Bước ngoặt lịch sử thống nhất trang phục Đàng Trong, tiền thân trực tiếp của chiếc Áo Dài truyền thống Việt Nam.',
    historicalEra: 'Đàng Trong (1744) - Toàn quốc (Thời Minh Mạng 1827-1837)',
    academicCitation: 'Đại Nam Thực Lục Tiền Biên & Phủ Biên Tạp Lục (Lê Quý Đôn).',
    keyTakeaways: [
      'Chúa Nguyễn Phúc Khoát ban hành sắc lệnh cải cách y phục năm 1744 tại Phú Xuân.',
      'Định hình quy cách áo ngũ thân: cổ lập lĩnh, vạt cài sang phải, 5 nút.',
      'Vua Minh Mạng mở rộng quy chuẩn trên toàn quốc từ năm 1827.',
      'Chiếc áo mang tính thống nhất quốc gia và độc lập văn hóa.'
    ],
    fullContent: `Năm 1744, sau khi xưng vương tại Đô thành Phú Xuân, Vũ Vương Nguyễn Phúc Khoát nhận thấy cần phải có một thể chế trang phục riêng biệt để khẳng định vị thế độc lập của xứ Đàng Trong. Ông đã ban hành sắc lệnh cải cách quy chế áo quần: nam nữ đều mặc áo cài cúc có cổ đứng (lập lĩnh), nẹp áo cài sang sườn phải, mặc cùng quần hai ống thay cho việc mặc váy quây hay áo xẻ ngực thời trước.

Đến thế kỷ 19, Hoàng đế Minh Mạng (1820–1841) đã tiếp tục hoàn thiện và ra chiếu chỉ chuẩn hóa áo ngũ thân làm quốc phục trên toàn cõi Việt Nam (từ Bắc chí Nam). Đây chính là mẫu áo tổ tiên trực tiếp của chiếc áo dài tân thời thế kỷ 20.`,
    tags: ['1744', 'Nguyễn Phúc Khoát', 'Minh Mạng', 'Áo Ngũ Thân', 'Lịch Sử Áo Dài']
  },
  {
    id: 'kb_ngu_than_ngu_thuong',
    category: 'ngu_than_ngu_thuong',
    categoryLabel: 'Triết Lý & Cấu Trúc',
    title: 'Triết Lý Cổ Nhân: 5 Thân Áo & 5 Nút Khuy Ngũ Thường',
    shortDesc: 'Mỗi đường kim, nếp gấp trên chiếc áo ngũ thân đều chứa đựng đạo lý làm người, chữ Hiếu và trật tự đạo đức Nho giáo.',
    historicalEra: 'Thế kỷ 18 - 20',
    academicCitation: 'Khâm Định Đại Nam Hội Điển Sự Lệ & Ngàn Năm Áo Mũ (Trần Quang Đức).',
    keyTakeaways: [
      '4 thân ngoài tượng trưng cho "Tứ Thân Phụ Mẫu" (Cha mẹ ruột và Cha mẹ chồng/vợ).',
      'Thân thứ 5 (thân con) lót bên trong che chở người mặc.',
      '5 hạt cúc ngọc tượng trưng cho Ngũ Thường: Nhân, Lễ, Nghĩa, Trí, Tín.',
      'Cổ lập lĩnh vuông vắn thể hiện sự ngay thẳng, chính trực.'
    ],
    fullContent: `Chiếc Áo Ngũ Thân không đơn thuần là trang phục làm đẹp mà là một hệ thống biểu tượng luân lý sâu sắc:

1. Ý nghĩa 5 thân áo:
- Hai thân trước và hai thân sau may giáp lại tượng trưng cho Tứ thân phụ mẫu (cha mẹ đẻ và cha mẹ vợ/chồng).
- Thân thứ năm (thân con hay thân lót) được may nhỏ hơn, nằm kín đáo bên trong ngực áo, tượng trưng cho bản thân người mặc luôn được phụ mẫu che chở, bao bọc.

2. Ý nghĩa 5 hạt nút khuy (Ngũ Thường):
Dãy 5 hạt cúc cài dọc từ cổ qua nách xuống sườn phải tương ứng với 5 đức tính nền tảng của con người:
- Cúc 1 (Cổ): NHÂN - Lòng trắc ẩn, yêu thương con người.
- Cúc 2 (Xương đòn): LỄ - Sự khiêm nhường, kính trên nhường dưới, lễ tiết.
- Cúc 3 (Nách): NGHĨA - Trọng lẽ phải, trung thực, giữ tròn tình nghĩa.
- Cúc 4 (Ngực sườn): TRÍ - Trí tuệ sáng suốt, phân định thị phi.
- Cúc 5 (Eo sườn): TÍN - Giữ tròn lời hứa, tạo niềm tin cậy.`,
    tags: ['Ngũ Thân', 'Ngũ Thường', 'Tứ Thân Phụ Mẫu', 'Nhân Lễ Nghĩa Trí Tín', 'Đạo Làm Người']
  },
  {
    id: 'kb_ranh_gioi_huu_nham',
    category: 'ranh_gioi_van_hoa',
    categoryLabel: 'Quy Chuẩn Ranh Giới (Guardrails)',
    title: 'Quy Chuẩn Vạt Áo: Tại Sao Tuyệt Đối Cấm Cài Vạt Sang Trái?',
    shortDesc: 'Giải thích nguyên lý "Hữu nhậm" (vạt phải) cho người sống và "Tả nhậm" (vạt trái) là cấm kỵ tang ma tử phục.',
    historicalEra: 'Quy ước ngàn năm văn hóa Á Đông & Việt Nam',
    academicCitation: 'Lễ Ký (Kinh Lễ) & Nghi Thức Tang Lễ Dân Gian Việt Nam.',
    keyTakeaways: [
      'Hữu nhậm (Vạt trái đè phải cài sang phải) là quy chuẩn duy nhất cho người sống.',
      'Tả nhậm (Cài sang sườn trái) là quy cách khâm liệm người đã khuất.',
      'Cài nhầm vạt trái ngoài đời là lỗi cấm kỵ cực kỳ nghiêm trọng.',
      'Trong game "Dệt Ký Ức", cài vạt trái kích hoạt bẫy dị biến cõi âm.'
    ],
    fullContent: `Trong lịch sử phục trang cổ truyền Việt Nam, hướng gài vạt áo là ranh giới bất biến phân định giữa Dương thế và Âm phần:

- Quy chuẩn Hữu Nhậm (右衽): Khi mặc áo, tay trái cầm vạt trái phủ đè lên trên vạt phải, sau đó gài cúc hoặc cột dây sang phía nách và sườn bên phải. Đây là biểu trưng của sự sống, hành Dương, sự hòa hợp trời đất và trật tự của người sống.

- Cấm kỵ Tả Nhậm (左衽): Việc kéo vạt phải đè lên vạt trái và cài cúc sang sườn trái là quy thức chỉ dùng trong "Tử phục" (khâm liệm thi hài người đã khuất trong nghi lễ tang ma) để báo hiệu sự chia ly cõi sống.

Nếu người trẻ mặc hoặc thiết kế Việt phục cài vạt sang trái sẽ tạo ra sự phản cảm văn hóa nặng nề, xúc phạm đến nếp áo tiền nhân. Vì vậy, Bộ lọc Ranh giới Văn hóa của ứng dụng kích hoạt CẢNH BÁO ĐỎ tức thì đối với chi tiết này.`,
    tags: ['Hữu Nhậm', 'Tả Nhậm', 'Tử Phục', 'Ranh Giới Đỏ', 'Cấm Kỵ']
  },
  {
    id: 'kb_ao_tac_vs_tay_chen',
    category: 'cac_dong_co_phuc',
    categoryLabel: 'Các Dòng Cổ Phục Chuẩn',
    title: 'Phân Biệt Áo Tấc (Tay Thụng) và Áo Ngũ Thân Tay Chẽn',
    shortDesc: 'Hướng dẫn chuẩn xác cách nhận diện và hoàn cảnh sử dụng của hai dạng thức áo ngũ thân phổ biến nhất.',
    historicalEra: 'Triều Nguyễn (1802 - 1945)',
    academicCitation: 'Cổ Phục Việt Nam & Khâm Định Đại Nam Hội Điển Sự Lệ.',
    keyTakeaways: [
      'Áo Tấc: Tay áo may thụng rộng 30-40cm, buông rủ qua tay, dùng cho đại lễ, tế tự, hôn lễ.',
      'Áo Tay Chẽn: Ống tay may thuôn gọn sát cổ tay, dùng cho sinh hoạt, công việc, thường nhật.',
      'Cả hai đều có 5 thân, cổ lập lĩnh và cài 5 cúc bên phải.',
      'Áo Tấc khi chắp tay tạo thế chữ Nhất đoan trang.'
    ],
    fullContent: `Cùng thuộc họ Áo Ngũ Thân nhưng Áo Tấc và Áo Tay Chẽn có công năng và phom dáng khác biệt:

1. Áo Tấc (Áo Lễ / Tay Thụng):
- Tên gọi: Chữ "Tấc" xuất phát từ kích thước cổ tay áo may rộng chừng một tấc cổ (tương đương 30-40cm hiện nay).
- Đặc điểm: Ống tay thụng rộng, dài phủ kín bàn tay khi buông xuôi. Tà áo dài quá gối, vạt áo xòe nhẹ.
- Ngữ cảnh: Là lễ phục trang trọng trong các dịp cúng tế thần linh, giỗ chạp gia tiên, lễ cưới hỏi và hội kiến chốn công đường. Khi chắp tay trước ngực, hai ống tay áo rủ xuống thẳng tắp tạo thành dáng chữ "Nhất" (一) thể hiện sự đoan chính.

2. Áo Ngũ Thân Tay Chẽn:
- Đặc điểm: Thân áo vẫn giữ nguyên 5 thân và cổ đứng nhưng ống tay áo được may chẽn thuôn ôm nhẹ theo cánh tay, cử động rất linh hoạt.
- Ngữ cảnh: Trang phục thường nhật, dạo phố, làm việc và di chuyển. Đây là dòng áo lý tưởng nhất để Gen Z remix cùng Sneaker, quần Cargo và Blazer hiện đại.`,
    tags: ['Áo Tấc', 'Áo Tay Chẽn', 'Tay Thụng', 'Lễ Phục', 'Thường Phục']
  },
  {
    id: 'kb_ao_nhat_binh',
    category: 'cac_dong_co_phuc',
    categoryLabel: 'Các Dòng Cổ Phục Chuẩn',
    title: 'Áo Nhật Bình: Tuyệt Tác Triều Phục Nẹp Chữ Nhật & Ngũ Sắc Ngũ Hành',
    shortDesc: 'Trang phục cao quý của Hậu phi, Công chúa triều Nguyễn với dải ngũ sắc tay áo chứa đựng triết lý vũ trụ.',
    historicalEra: 'Triều Nguyễn (1802 - 1945)',
    academicCitation: 'Khâm Định Đại Nam Hội Điển Sự Lệ - Quyển 78.',
    keyTakeaways: [
      'Nẹp cổ áo to bản ghép thành hình chữ nhật trước ngực.',
      'Dải ngũ sắc ở hai ống tay tương ứng Kim - Mộc - Thủy - Hỏa - Thổ.',
      'Thêu họa tiết phượng hoàng, hoa cúc, vân mây cung đình.',
      'Thường đi kèm kiềng vàng/bạc chạm trổ và trâm cài phượng.'
    ],
    fullContent: `Áo Nhật Bình là thường phục của các bậc Hậu phi, Công chúa và mệnh phụ phu nhân triều Nguyễn:

- Cấu trúc: Tên gọi "Nhật Bình" bắt nguồn từ chiếc nẹp cổ áo to bản thêu hoa văn tinh xảo, khi cài khép lại trước ngực sẽ tạo thành hình chữ nhật (日).
- Dải tay Ngũ Sắc: Hai đầu ống tay áo được may dải lụa viền 5 màu: Lục (Mộc), Đỏ (Hỏa), Vàng (Thổ), Trắng (Kim), Xanh Chàm (Thủy). Đây là biểu tượng của thuyết Ngũ Hành tương sinh, cân bằng năng lượng vũ trụ.
- Trong phong cách remix: Áo Nhật Bình có thể phối như một chiếc áo khoác Haori/Kimono statement cao cấp, kết hợp chân váy midi hoặc boots da cho các sự kiện nghệ thuật.`,
    tags: ['Áo Nhật Bình', 'Triều Nguyễn', 'Hậu Phi', 'Ngũ Sắc', 'Ngũ Hành']
  },
  {
    id: 'kb_concert_trend_guinness',
    category: 'genz_remix',
    categoryLabel: 'Xu Hướng Gen Z Đương Đại',
    title: 'Hiện Tượng Đại Nhạc Hội: Gen Z Xác Lập Kỷ Lục Guinness Với Cổ Phục',
    shortDesc: 'Khảo cứu làn sóng giới trẻ mặc Áo Ngũ Thân, Áo Tấc tại các concert âm nhạc quy mô hàng vạn người.',
    historicalEra: 'Việt Nam Đương Đại (2024 - 2026)',
    academicCitation: 'Phóng sự Báo Nhân Dân, Báo Tuổi Trẻ & Kỷ lục Guinness Việt Nam 2025.',
    keyTakeaways: [
      'Hàng chục ngàn bạn trẻ đồng loạt diện Việt phục dự concert "Anh Trai Vượt Ngàn Chông Gai".',
      'Minh chứng sống động cho việc di sản không bị đóng băng trong bảo tàng mà sống cùng nhịp thở đương đại.',
      'Công thức phối: Áo Ngũ Thân + Chunky Sneaker + Kính Retro + Quần Cargo.',
      'Đạt tính thẩm mỹ cao, tôn trọng lịch sử và cực kỳ thoải mái khi quẩy concert.'
    ],
    fullContent: `Tại các đại nhạc hội quy mô lớn ở Hà Nội và TP.HCM những năm gần đây, cộng đồng Gen Z Việt Nam đã tạo nên một hiện tượng văn hóa chưa từng có: hàng chục ngàn bạn trẻ tự hào khoác lên mình những tà áo ngũ thân, áo tấc đa sắc màu, kết hợp sáng tạo cùng giày sneaker đế thô, kính mát thời thượng và túi đeo chéo để thưởng thức âm nhạc suốt 4–5 tiếng đồng hồ.

Sự kiện này đã xác lập kỷ lục về số lượng khán giả mặc trang phục truyền thống đồng nhất tại một chương trình biểu diễn nghệ thuật đương đại. Điều này khẳng định thế hệ trẻ không hề quay lưng với quá khứ, mà luôn tìm cách kết nối di sản với phong cách sống hiện đại của chính mình.`,
    tags: ['Concert', 'Kỷ Lục Guinness', 'Anh Trai', 'Gen Z', 'Việt Phục Remix']
  }
];
