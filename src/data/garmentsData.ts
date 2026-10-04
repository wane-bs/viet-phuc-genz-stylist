import { BaseGarmentType, EventContext, AestheticVibe, ColorSwatch } from '../types';

export interface BaseGarmentInfo {
  id: BaseGarmentType;
  name: string;
  subName: string;
  historicalPeriod: string;
  decreeYear: string;
  originDescription: string;
  philosophicalSymbolism: string;
  structureRules: string[];
  recommendedContexts: EventContext[];
  defaultVibe: AestheticVibe;
  keyFeatures: string[];
  academicSource: string;
}

export const GARMENTS_CATALOG: Record<BaseGarmentType, BaseGarmentInfo> = {
  ngu_than_tay_chen: {
    id: 'ngu_than_tay_chen',
    name: 'Áo Ngũ Thân Tay Chẽn',
    subName: 'Chuẩn Mực Định Chế 1744 & Quốc Phục Triều Nguyễn',
    historicalPeriod: 'Đàng Trong (1744) - Toàn quốc thời Nguyễn (1827-1945)',
    decreeYear: 'Năm Giáp Tý 1744 (Chúa Nguyễn Phúc Khoát)',
    originDescription: 'Ra đời theo sắc lệnh cải cách y phục năm 1744 của chúa Nguyễn Phúc Khoát tại Phú Xuân nhằm tạo bản sắc riêng, sau đó vua Minh Mạng chuẩn hóa thành quốc phục thống nhất từ Bắc chí Nam.',
    philosophicalSymbolism: 'Cấu trúc 5 thân: 4 thân ngoài tượng trưng cho "Tứ Thân Phụ Mẫu" (cha mẹ mình và cha mẹ người phối ngẫu), thân thứ 5 lót bên trong che chở tượng trưng cho bản thân người mặc. 5 chiếc cúc áo tượng trưng cho Ngũ Thường (Nhân, Lễ, Nghĩa, Trí, Tín) và Ngũ Luân đạo lý làm người.',
    structureRules: [
      'Cổ áo: Cổ lập lĩnh (cổ đứng) vuông tròn kín đáo cao từ 2-4cm.',
      'Vạt áo: Bắt buộc vạt trái đè vạt phải, cài cúc dọc theo cổ xuống sườn bên phải.',
      'Nẹp áo: Nẹp trung phùng chạy dọc thân, đường may giấu chỉ tinh xảo.',
      'Tay áo: Tay chẽn thuôn gọn sát cổ tay, tiện cho sinh hoạt và lao động.'
    ],
    recommendedContexts: ['concert_festival', 'street_cafe', 'school_workshop', 'traditional_wedding'],
    defaultVibe: 'streetwear',
    keyFeatures: ['5 cúc ngọc vạt phải', 'Cổ lập lĩnh tôn nghiêm', 'Tay chẽn gọn gàng', 'Tà cong chữ V mềm mại'],
    academicSource: 'Đại Nam Thực Lục & Khâm Định Đại Nam Hội Điển Sự Lệ'
  },
  ao_tac: {
    id: 'ao_tac',
    name: 'Áo Tấc (Ngũ Thân Tay Thụng)',
    subName: 'Đại Lễ Phục Trang Trọng Cung Đình & Dân Gian',
    historicalPeriod: 'Thời nhà Nguyễn (1802 - 1945)',
    decreeYear: 'Thời vua Gia Long - Minh Mạng',
    originDescription: 'Là biến thể tay thụng của áo ngũ thân, tay áo may rộng chừng 1 tấc (khoảng 30-40cm) buông rủ dài quá bàn tay. Thường mặc trong các dịp đại lễ, tế tự, hôn lễ và yết kiến triều đình.',
    philosophicalSymbolism: 'Tay áo thụng dài khi chắp tay trước ngực tạo thành chữ "Nhất" (一) biểu trưng cho sự hòa thuận, đoan trang, tôn kính thần linh và tổ tiên.',
    structureRules: [
      'Cổ áo: Cổ lập lĩnh cứng cáp cài cúc kín cổ.',
      'Ống tay: Rộng thụng từ 30-50cm, chiều dài phủ kín ngón tay khi buông xuôi.',
      'Quy cách cài: Cài vạt sang phải bằng 5 cúc.',
      'Trang trọng: Luôn đi kèm khăn đóng (khăn vấn) và quần lụa trắng.'
    ],
    recommendedContexts: ['temple_worship', 'traditional_wedding', 'school_workshop'],
    defaultVibe: 'royal_fusion',
    keyFeatures: ['Tay thụng uy nghiêm', 'Dáng đứng phong thái', '5 nút biểu trưng', 'Đi kèm khăn vấn'],
    academicSource: 'Lịch Triều Hiến Chương Loại Chí & Cổ Phục Việt Nam'
  },
  ao_nhat_binh: {
    id: 'ao_nhat_binh',
    name: 'Áo Nhật Bình',
    subName: 'Thường Phục Hậu Phi & Công Chúa Triều Nguyễn',
    historicalPeriod: 'Triều Nguyễn (1802 - 1945)',
    decreeYear: 'Quy chế y phục cung đình thời Minh Mạng',
    originDescription: 'Trang phục dành riêng cho Hoàng Hậu, Công Chúa, Phi Tần và phu nhân quan lại nhất, nhị phẩm. Tên gọi "Nhật Bình" bắt nguồn từ nẹp cổ áo to bản ghép lại tạo thành hình chữ nhật trước ngực.',
    philosophicalSymbolism: 'Nẹp cổ thêu hoa văn phượng hoàng, bát bửu hoặc cúc hóa rồng; hai tay áo đính dải vải ngũ sắc đại diện cho thuyết Ngũ Hành (Kim, Mộc, Thủy, Hỏa, Thổ) tạo nên sự hài hòa vũ trụ.',
    structureRules: [
      'Nẹp cổ: Hình chữ nhật chạy quanh cổ xuống tới ngực, cài bằng dải ngọc khánh hoặc cúc.',
      'Tay áo: Đính dải ngũ sắc ngũ hành (xanh, vàng, trắng, đỏ, lục/tía).',
      'Vạt áo: Thân dài quá gối, xẻ tà hai bên hông.',
      'Phụ kiện: Kết hợp kiềng vàng/bạc chạm trổ và trâm cài tóc phượng.'
    ],
    recommendedContexts: ['concert_festival', 'traditional_wedding', 'school_workshop'],
    defaultVibe: 'royal_fusion',
    keyFeatures: ['Nẹp cổ chữ nhật đặc trưng', 'Dải tay áo ngũ sắc', 'Thêu hoa văn cung đình', 'Kiềng cổ vương giả'],
    academicSource: 'Khâm Định Đại Nam Hội Điển Sự Lệ - Quyển 78: Quan chế Y phục'
  },
  ao_tu_than: {
    id: 'ao_tu_than',
    name: 'Áo Tứ Thân & Yếm Đào',
    subName: 'Biểu Tượng Văn Hóa Dân Gian Kinh Bắc & Bắc Bộ',
    historicalPeriod: 'Thế kỷ 12 đến đầu thế kỷ 20',
    decreeYear: 'Phổ biến thời Lý - Trần - Lê - Nguyễn',
    originDescription: 'Trang phục dân gian mộc mạc của phụ nữ miền Bắc Việt Nam, đặc biệt gắn liền với các làn điệu Dân ca Quan họ Bắc Ninh và ngày hội làng truyền thống.',
    philosophicalSymbolism: 'Bốn vạt áo tượng trưng cho tứ thân phụ mẫu (cha mẹ ruột và cha mẹ chồng). Chiếc áo yếm bên trong che chở như tình thương thầm kín; thắt lưng lụa xanh/hồng kết buộc như sợi dây tơ duyên gắn bó.',
    structureRules: [
      'Thân áo: Hai thân sau may nối sống ở giữa lưng, hai thân trước xẻ để tự do hoặc thắt nút trước bụng.',
      'Bên trong: Mặc kèm yếm cổ xây hoặc yếm cánh nhạn (màu đào, nâu sồng, hoa lý).',
      'Đầu đội: Nón quai thao (nón ba tầm) hoặc chít khăn mỏ quạ.',
      'Thắt lưng: Dải lụa thắt eo buông rủ thướt tha.'
    ],
    recommendedContexts: ['concert_festival', 'street_cafe', 'school_workshop'],
    defaultVibe: 'streetwear',
    keyFeatures: ['Vạt trước buộc lơi phóng khoáng', 'Yếm lụa đào bên trong', 'Nón quai thao duyên dáng', 'Thắt lưng lụa ngũ sắc'],
    academicSource: 'Văn hóa Dân gian Việt Nam & Trang phục Thăng Long - Hà Nội'
  },
  ao_giao_linh: {
    id: 'ao_giao_linh',
    name: 'Áo Giao Lĩnh (Cổ Chéo)',
    subName: 'Cổ Y Cổ Điển Thời Đại Lý - Trần - Hậu Lê',
    historicalPeriod: 'Thời Lý, Trần, Lê (Thế kỷ 11 - 18)',
    decreeYear: 'Tài liệu tranh khắc và khảo cổ thời Hậu Lê',
    originDescription: 'Một trong những hình thái cổ phục sớm và trang nghiêm bậc nhất của người Việt, với hai vạt cổ đan chéo nhau hình chữ Y (vạt trái đè lên vạt phải cột dây sang nách phải).',
    philosophicalSymbolism: 'Hình thái vạt giao nhau thể hiện sự đan cài trời đất (Thiên - Địa tương giao), tôn kính nề nếp kỷ cương Nho giáo cổ điển.',
    structureRules: [
      'Cổ áo: Cổ chéo giao lĩnh (vạt trái đè lên vạt phải).',
      'Buộc dây: Dùng dải vải mềm buộc cố định bên hông phải, không dùng khuy bấm kim loại.',
      'Ống tay: Thường rộng vừa hoặc thụng, xẻ tà hai bên hông.',
      'Nghiêm cấm: Tuyệt đối không giao vạt sang bên trái.'
    ],
    recommendedContexts: ['concert_festival', 'school_workshop', 'street_cafe'],
    defaultVibe: 'cyber_y2k',
    keyFeatures: ['Cổ chữ Y giao thoa kinh điển', 'Cột dây nách phải', 'Phom dáng bay bổng', 'Dễ layer cùng áo khoác'],
    academicSource: 'Ngàn Năm Áo Mũ (Trần Quang Đức) & Khảo Cổ Viện Sử Học'
  },
  ao_dai_raglan: {
    id: 'ao_dai_raglan',
    name: 'Áo Dài Raglan (Tân Thời)',
    subName: 'Cột Mốc Cách Tân Hiện Đại Thập Niên 1960',
    historicalPeriod: 'Sài Gòn thập niên 1960 đến nay',
    decreeYear: 'Nhà may Dung Đakao sáng tạo (1960)',
    originDescription: 'Kế thừa từ áo dài Lemur (Cát Tường - 1934) và Lê Phổ (1934), áo dài Raglan đột phá với tay áo ráp chéo từ cổ xuống nách, giúp thân áo ôm sát ngực mà không bị nhăn nhúm khi cử động.',
    philosophicalSymbolism: 'Sự giao thoa hoàn hảo giữa kỹ thuật cắt may phương Tây và nét duyên dáng phương Đông, tôn vinh đường nét cơ thể thanh thoát của người phụ nữ Việt Nam.',
    structureRules: [
      'Cổ áo: Cổ cao 2-3cm hoặc cổ tròn kín đáo.',
      'Khuy cài: Dãy cúc bấm hoặc dây kéo chéo từ cổ qua nách xuống eo phải.',
      'Tà áo: Hai tà trước sau xẻ cao tới eo.',
      'Quần đi kèm: Quần lụa ống suông rộng.'
    ],
    recommendedContexts: ['school_workshop', 'traditional_wedding', 'street_cafe'],
    defaultVibe: 'minimalist',
    keyFeatures: ['Cắt raglan tôn dáng', 'Tà xẻ ngang eo thanh thoát', 'Cúc bấm sườn phải', 'Hiện đại, nhẹ nhàng'],
    academicSource: 'Lịch Sử Áo Dài Việt Nam & Di Sản Thời Trang Sài Gòn'
  }
};

export const TRADITIONAL_COLOR_PALETTES: Record<string, ColorSwatch[]> = {
  hoang_triew: [
    { name: 'Hoàng Kim', hex: '#D97706', traditionalName: 'Màu Vàng Hoàng Yến', symbolism: 'Quyền quý, rực rỡ, ánh nắng cung đình' },
    { name: 'Hắc Trầm', hex: '#18181B', traditionalName: 'Màu Đen Than Củi', symbolism: 'Vững chãi, trầm mặc, huyền bí đương đại' },
    { name: 'Xanh Thủy Ba', hex: '#0284C7', traditionalName: 'Xanh Chàm Thủy Ba', symbolism: 'Sóng biển, thanh bình, thịnh vượng' },
    { name: 'Trắng Đũi', hex: '#F4F4F5', traditionalName: 'Trắng Tơ Tằm', symbolism: 'Thuần khiết, mộc mạc, tôn nghiêm' }
  ],
  son_son_thep_vang: [
    { name: 'Đỏ Son', hex: '#DC2626', traditionalName: 'Đỏ Son Sơn Mài', symbolism: 'May mắn, hỷ sự, xua đuổi tà khí' },
    { name: 'Vàng Đồng', hex: '#EAB308', traditionalName: 'Vàng Thếp Đồng Cổ', symbolism: 'Ấm áp, phú quý, cổ kính' },
    { name: 'Xanh Hoa Lý', hex: '#10B981', traditionalName: 'Xanh Hoa Lý Nhẹ', symbolism: 'Sinh sôi nảy nở, thanh tao nhã nhặn' },
    { name: 'Nâu Trầm Hương', hex: '#78350F', traditionalName: 'Nâu Gỗ Trầm', symbolism: 'Gắn kết cội nguồn, mộc mạc Bắc Bộ' }
  ],
  cyber_ngu_sac: [
    { name: 'Xanh Lam Cyber', hex: '#06B6D4', traditionalName: 'Thủy Lam Hiện Đại', symbolism: 'Hành Thủy - Trí tuệ và năng động' },
    { name: 'Hồng Đào Neon', hex: '#EC4899', traditionalName: 'Hỏa Xích Đương Thời', symbolism: 'Hành Hỏa - Đam mê rực cháy Gen Z' },
    { name: 'Tím Tử Đằng', hex: '#8B5CF6', traditionalName: 'Tía Cung Đình Remix', symbolism: 'Sang trọng, sáng tạo không giới hạn' },
    { name: 'Đen Onyx', hex: '#0F172A', traditionalName: 'Dạ Trầm', symbolism: 'Điểm tựa chiều sâu cho toàn bộ trang phục' }
  ],
  thanh_tinh_thien: [
    { name: 'Xanh Rêu Cổ', hex: '#3F6212', traditionalName: 'Thanh Rêu Tường Cổ', symbolism: 'Tĩnh lặng, cổ thụ, thiền định' },
    { name: 'Trắng Ngà', hex: '#FAFAF9', traditionalName: 'Bạch Ngọc Lụa Đũi', symbolism: 'Thanh sạch nơi tôn nghiêm' },
    { name: 'Xám Tro Điệp', hex: '#64748B', traditionalName: 'Xám Giấy Điệp', symbolism: 'Cân bằng, khiêm nhường, lễ độ' },
    { name: 'Nâu Đất Nung', hex: '#9A3412', traditionalName: 'Thổ Trầm Đất Mẹ', symbolism: 'Gốc rễ, chữ Hiếu vuông tròn' }
  ]
};
