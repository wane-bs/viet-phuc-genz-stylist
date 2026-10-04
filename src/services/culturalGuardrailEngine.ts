import { 
  StylingConfig, 
  CulturalEvaluation, 
  GuardrailFinding, 
  OutfitRemixResult, 
  ColorSwatch 
} from '../types';
import { GARMENTS_CATALOG, TRADITIONAL_COLOR_PALETTES } from '../data/garmentsData';

export function evaluateCulturalGuardrails(config: StylingConfig): CulturalEvaluation {
  const findings: GuardrailFinding[] = [];
  let score = 100;
  let isLapelValid = true;
  let isContextAppropriate = true;

  // 1. FATAL RULE: Lapel Direction (Quy chuẩn vạt áo)
  if (config.lapelDirection === 'left') {
    isLapelValid = false;
    score -= 65;
    findings.push({
      id: 'fatal_left_lapel',
      level: 'DANGER',
      title: 'VI PHẠM ĐỎ: Cài Vạt Trái (Tử Phục / Tang Ma)',
      description: 'Cổ phục Việt Nam (Áo ngũ thân, giao lĩnh, tấc) TUYỆT ĐỐI bắt buộc vạt trái đè lên vạt phải (Hữu nhậm - cài cúc sườn phải). Việc cài vạt sang trái (Tả nhậm) là quy cách liệm người đã khuất hoặc tang lễ trong truyền thống Á Đông.',
      historicalCitation: 'Sách "Khâm Định Đại Nam Hội Điển Sự Lệ" & Cổ luật phương Đông: "Hữu nhậm vi nhân, Tả nhậm vi quỷ" (Mặc vạt phải cho người sống, vạt trái cho người chết).',
      suggestion: 'Đảo chiều cài vạt: Lấy vạt trái đè lên vạt phải và cài cúc/cột dây sang phía nách và sườn bên phải.'
    });
  } else {
    findings.push({
      id: 'valid_right_lapel',
      level: 'SAFE',
      title: 'HỢP LỄ: Quy cách Hữu Nhậm chuẩn mực',
      description: 'Vạt trái đè lên vạt phải, cài cúc dọc theo cổ xuống sườn phải đúng chuẩn mực định chế 1744 của chúa Nguyễn Phúc Khoát.',
      historicalCitation: 'Đại Nam Thực Lục Tiền Biên - Định chế y phục năm Giáp Tý 1744.',
      suggestion: 'Giữ vững nếp áo ngay ngắn khi mặc.'
    });
  }

  // 2. CONTEXT & SOLEMNITY BOUNDARY (Ranh giới bối cảnh đền chùa, cưới hỏi)
  const isSacredContext = config.eventContext === 'temple_worship' || config.eventContext === 'traditional_wedding';
  const isCasualContext = config.eventContext === 'concert_festival' || config.eventContext === 'street_cafe' || config.eventContext === 'school_workshop';

  if (isSacredContext) {
    // Check lower garment in sacred places
    if (config.lowerGarment === 'short_mini') {
      isContextAppropriate = false;
      score -= 40;
      findings.push({
        id: 'danger_short_in_sacred',
        level: 'DANGER',
        title: 'VI PHẠM ĐỎ: Phối Quần Ngắn/Mini Nơi Tôn Nghiêm',
        description: 'Mặc quần short quá ngắn hoặc váy mini lộ da thịt kết hợp cùng cổ phục khi đi lễ đền chùa hoặc cúng giỗ vi phạm nghiêm trọng thuần phong mỹ tục và tính tôn nghiêm.',
        historicalCitation: 'Nghi lễ thờ cúng cổ truyền & Quy ước chốn tự viện Phật giáo Việt Nam.',
        suggestion: 'Thay thế ngay bằng quần lụa ống suông truyền thống (màu trắng hoặc đen) hoặc quần âu dài kín đáo.'
      });
    }

    if (config.lowerGarment === 'cargo_pants' && config.eventContext === 'temple_worship') {
      score -= 15;
      findings.push({
        id: 'warning_cargo_in_temple',
        level: 'WARNING',
        title: 'CẢNH BÁO VÀNG: Quần Cargo Túi Hộp chưa phù hợp Chốn Thiền Môn',
        description: 'Quần túi hộp hầm hố phá vỡ phong thái trang nghiêm, thanh tịnh của không gian thờ tự.',
        historicalCitation: 'Quy chuẩn lễ phục Việt Nam khi yết bái tổ tiên.',
        suggestion: 'Nên ưu tiên quần suông lụa Hà Đông hoặc quần âu trơn màu tối giản.'
      });
    }

    if (config.fabric === 'sheer_voile') {
      score -= 25;
      findings.push({
        id: 'danger_sheer_fabric',
        level: 'DANGER',
        title: 'VI PHẠM: Chất liệu xuyên thấu phản cảm nơi tôn nghiêm',
        description: 'Vải voan xuyên thấu làm lộ nội y đi ngược lại chuẩn mực kín đáo của trang phục truyền thống.',
        historicalCitation: 'Quy định trang phục đoan chính nơi công cộng và tín ngưỡng.',
        suggestion: 'Chuyển sang vải Gấm dệt hoa, Lụa tơ tằm dệt dày hoặc Vải đũi mộc.'
      });
    }
  }

  // 3. PATTERN CHECK: Imperial 5-Claw Dragon (Rồng 5 móng)
  if (config.pattern === 'rong_nam_mong_hoang_gia') {
    if (config.eventContext === 'street_cafe' || config.aestheticVibe === 'streetwear') {
      score -= 20;
      findings.push({
        id: 'warning_imperial_dragon',
        level: 'WARNING',
        title: 'CẢNH BÁO VÀNG: Sử Dụng Hoa Văn Hoàng Gia Sai Ngữ Cảnh',
        description: 'Họa tiết Long văn 5 móng (Cửu ngũ chí tôn) là biểu tượng độc quyền tuyệt đối của Hoàng đế triều Nguyễn. Việc in/thêu bừa bãi trên trang phục dạo phố đi cà phê làm giảm tính tôn nghiêm mỹ thuật cung đình.',
        historicalCitation: 'Khâm Định Đại Nam Hội Điển Sự Lệ - Quyển "Quan chế y phục": Thứ dân và quan lại chỉ được dùng hoa văn Giao, Mãng (4 móng) hoặc Hoa Thảo.',
        suggestion: 'Nên chuyển sang hoa văn Vân Mây Sóng Thủy Ba, Hoa Sen hoặc Gấm Dệt Hoa Chìm trang nhã.'
      });
    }
  }

  // 4. MODERN REMIX COMMENDATIONS FOR CASUAL CONTEXTS
  if (isCasualContext) {
    if (config.footwear === 'chunky_sneaker' && (config.eventContext === 'concert_festival' || config.eventContext === 'street_cafe')) {
      findings.push({
        id: 'commend_chunky_sneaker',
        level: 'SAFE',
        title: 'ĐỘT PHÁ GEN Z: Phối Chunky Sneaker Năng Động',
        description: 'Sự kết hợp giữa phom dáng ngũ thân thẳng thớm và sneaker đế thô tạo độ đầm chắc, hỗ trợ di chuyển linh hoạt trong các lễ hội âm nhạc ngoài trời.',
        historicalCitation: 'Xu hướng Việt phục đương đại 2024-2026 được ghi nhận tại các đại nhạc hội quốc gia.',
        suggestion: 'Chọn màu sneaker monochrome (trắng ngà/đen nhám) để giữ tổng thể thanh thoát.'
      });
    }

    if (config.accessories.includes('slim_sunglasses')) {
      findings.push({
        id: 'commend_slim_shades',
        level: 'SAFE',
        title: 'PHỤ KIỆN ĐẮC GIÁ: Kính Mát Slim Retro',
        description: 'Tạo vẻ ngoài Cyber-Retro sắc sảo, tôn đường nét cổ lập lĩnh vuông vắn.',
        historicalCitation: 'Phong cách giao thoa Tân thời Sài Gòn & Đông Dương.',
        suggestion: 'Kính gọng kim loại mảnh hoặc mắt đen hẹp mang lại vẻ ngoài ấn tượng nhất.'
      });
    }
  }

  // Calculate Remix Percentage
  let remixPercentage = 15;
  if (config.lowerGarment === 'cargo_pants' || config.lowerGarment === 'pleated_skirt') remixPercentage += 20;
  if (config.footwear === 'chunky_sneaker' || config.footwear === 'high_boots') remixPercentage += 20;
  if (config.accessories.includes('slim_sunglasses')) remixPercentage += 10;
  if (config.aestheticVibe === 'cyber_y2k' || config.aestheticVibe === 'streetwear') remixPercentage += 15;

  const maxRecommendedRemix = isSacredContext ? 20 : 70;

  // Determine Guardrail Level
  const finalScore = Math.max(5, Math.min(100, score));
  let level: 'SAFE' | 'WARNING' | 'DANGER' = 'SAFE';
  let statusLabel = 'CHUẨN MỰC DI SẢN (HỢP LỆ)';

  if (finalScore < 50 || !isLapelValid) {
    level = 'DANGER';
    statusLabel = '⛔ VI PHẠM ĐỎ (CẤM KỴ VĂN HÓA)';
  } else if (finalScore < 85) {
    level = 'WARNING';
    statusLabel = '⚠️ CẢNH BÁO VÀNG (CẦN ĐIỀU CHỈNH)';
  } else {
    level = 'SAFE';
    statusLabel = '✅ CHUẨN MỰC DI SẢN (AN TOÀN)';
  }

  const summary = level === 'DANGER'
    ? 'Bộ trang phục có yếu tố cấm kỵ nghiêm trọng trong văn hóa (Cài vạt trái hoặc phản cảm nơi tôn nghiêm). Cần sửa đổi ngay!'
    : level === 'WARNING'
    ? 'Bộ trang phục sáng tạo nhưng có một vài chi tiết cần lưu ý để hài hòa giữa hiện đại và điển chế truyền thống.'
    : 'Bộ trang phục đạt độ chuẩn mực văn hóa cao, phối đồ tinh tế, tôn vinh trọn vẹn di sản dân tộc theo phong cách Gen Z đương đại!';

  return {
    score: finalScore,
    level,
    statusLabel,
    summary,
    remixPercentage: Math.min(100, remixPercentage),
    maxRecommendedRemix,
    findings,
    isLapelValid,
    isContextAppropriate
  };
}

export function generateOutfitRemixResult(config: StylingConfig): OutfitRemixResult {
  const evaluation = evaluateCulturalGuardrails(config);
  const garmentInfo = GARMENTS_CATALOG[config.baseGarment];

  // Palette generation based on colors and mood
  const paletteKey = config.eventContext === 'temple_worship' 
    ? 'thanh_tinh_thien' 
    : config.aestheticVibe === 'cyber_y2k' 
    ? 'cyber_ngu_sac' 
    : config.eventContext === 'traditional_wedding' 
    ? 'son_son_thep_vang' 
    : 'hoang_triew';

  const colorPalette: ColorSwatch[] = TRADITIONAL_COLOR_PALETTES[paletteKey] || [
    { name: 'Màu Chủ Đạo', hex: config.primaryColor, traditionalName: 'Sắc Phục Chính', symbolism: 'Định hình tông thái của tổng thể' },
    { name: 'Màu Nhấn', hex: config.accentColor, traditionalName: 'Sắc Phối Đương Đại', symbolism: 'Điểm xuyết năng lượng tươi trẻ' },
    { name: 'Trắng Ngà Tơ', hex: '#F5F5F0', traditionalName: 'Bạch Ngọc Lụa', symbolism: 'Nền nã, thuần khiết' },
    { name: 'Đen Trầm', hex: '#18181B', traditionalName: 'Hắc Thạch', symbolism: 'Vững vàng, trường tồn' }
  ];

  // Titles & Taglines
  const titles: Record<string, string> = {
    ngu_than_tay_chen: 'Vạn Sắc Kinh Đô: Ngũ Thân Street-Armor',
    ao_tac: 'Uy Nghiêm Lễ Trọng: Áo Tấc Hoàng Triều',
    ao_nhat_binh: 'Hậu Phi Đương Thời: Nhật Bình Haute Couture',
    ao_tu_than: 'Gió Thổi Kinh Bắc: Tứ Thân Yếm Sắc',
    ao_giao_linh: 'Cổ Kính Thăng Long: Giao Lĩnh Cyber-Wave',
    ao_dai_raglan: 'Tân Thời Sài Gòn: Raglan Tối Giản'
  };

  const outfitTitle = titles[config.baseGarment] || 'Việt Phục Remix Đương Đại';
  const conceptTagline = `Remix ${garmentInfo.name} theo ngôn ngữ ${config.aestheticVibe.toUpperCase()} cho không gian ${config.eventContext}`;

  // Breakdown 3 layers
  const lowerGarmentNames: Record<string, string> = {
    cargo_pants: 'Quần Cargo Pants Túi Hộp Đen Nhám (Ống Suông)',
    silk_wide_pants: 'Quần Lụa Tơ Tằm Ống Suông Truyền Thống',
    dress_trousers: 'Quần Âu Xếp Ly Dáng Rộng (Tailored Trousers)',
    pleated_skirt: 'Chân Váy Xếp Ly Dài Phong Cách Đương Đại',
    culottes: 'Quần Culottes Vải Đũi Thoáng Mát',
    short_mini: 'Quần Short Mini / Chân Váy Ngắn'
  };

  const footwearNames: Record<string, string> = {
    chunky_sneaker: 'Monochrome Chunky Sneakers (Đế thô 5cm)',
    leather_loafer: 'Giày Loafer Da Bóng Khóa Kim Loại',
    high_boots: 'Boots Da Cổ Cao Màu Đen',
    wooden_clogs: 'Guốc Mộc Gỗ Sơn Mài Quai Nhung',
    mule_sandals: 'Dép Sục Quai Da Tối Giản'
  };

  const accessoriesNames: Record<string, string> = {
    slim_sunglasses: 'Kính Mát Retro Slim Narrow',
    silver_kieng: 'Kiềng Cổ Bạc Trơn Truyền Thống',
    folding_fan: 'Quạt Xếp Gỗ Trầm / Giấy Điệp',
    tote_crossbody: 'Túi Đeo Chéo Canvas / Tote Linen',
    pearl_chain: 'Chuỗi Ngọc Trai / Xích Bạc',
    non_quai_thao: 'Nón Quai Thao Mini Đeo Vai'
  };

  const selectedAccNames = config.accessories.map(a => accessoriesNames[a]).filter(Boolean).join(', ');

  const result: OutfitRemixResult = {
    id: `outfit_${Date.now()}`,
    outfitTitle,
    conceptTagline,
    config,
    evaluation,
    colorPalette,
    layers: {
      top: {
        layer: 'top',
        name: garmentInfo.name,
        category: 'Thượng Y (Áo Thân Trên)',
        material: config.fabric === 'gam_to_tam' ? 'Gấm dệt tơ tằm thượng hạng' : config.fabric === 'lua_ha_dong' ? 'Lụa Vạn Phúc mềm mại' : 'Vải đũi tơ tự nhiên',
        description: `Thân áo may chuẩn quy cách ${config.lapelDirection === 'right' ? 'vạt trái đè vạt phải cài 5 cúc bên sườn phải' : 'CÀI VẬT TRÁI (LỖI)'}. Cổ lập lĩnh thẳng đứng tôn dáng.`,
        culturalNote: garmentInfo.philosophicalSymbolism,
        modernTwist: config.aestheticVibe === 'streetwear' ? 'Mặc buông tà tự nhiên, xắn nhẹ gấu tay phối vòng bạc' : 'Sơ vin nhẹ tà trong hoặc khoác ngoài áo thun basic'
      },
      bottom: {
        layer: 'bottom',
        name: lowerGarmentNames[config.lowerGarment] || 'Quần Ống Suông',
        category: 'Hạ Y (Trang Phục Nửa Dưới)',
        material: config.lowerGarment === 'cargo_pants' ? 'Kaki Cotton nhám đứng phom' : config.lowerGarment === 'silk_wide_pants' ? 'Lụa satin rủ mềm' : 'Vải wool pha âu phục',
        description: `Phần thân dưới được chọn để cân bằng độ thướt tha của tà áo với tính ứng dụng thực tế.`,
        culturalNote: 'Thay vì quần lụa trắng đơn thuần của thế kỷ 19, bản phối hạ y hiện đại mở rộng tính năng vận động.',
        modernTwist: config.lowerGarment === 'cargo_pants' ? 'Túi hộp hai bên tạo vẻ ngoài khỏe khoắn, đựng vừa điện thoại và sạc dự phòng khi đi concert' : 'Phom suông tạo bước đi thanh thoát'
      },
      footwearAndAcc: {
        layer: 'footwear_acc',
        name: `${footwearNames[config.footwear]} & Phụ Kiện: ${selectedAccNames || 'Tối giản'}`,
        category: 'Phụ Kiện & Giày (Gia Phụ)',
        material: 'Da thuộc, kim loại bạc 925, gỗ tự nhiên',
        description: `Điểm nhấn giao thoa giữa truyền thống và phong cách Gen Z.`,
        culturalNote: 'Kiềng bạc cổ truyền biểu trưng cho sự thanh bạch và viên mãn của gia đình Việt.',
        modernTwist: 'Sneaker đế thô giúp tôn chiều cao thêm 4-5cm và không bị mỏi chân khi đứng lâu.'
      }
    },
    historicalInsight: {
      era: garmentInfo.historicalPeriod,
      origin: garmentInfo.originDescription,
      decreeYear: garmentInfo.decreeYear,
      philosophicalMeaning: garmentInfo.philosophicalSymbolism,
      citation: garmentInfo.academicSource
    },
    stylingTips: {
      comfortMovement: 'Khi di chuyển nhiều hoặc đi xe máy, hãy gập nhẹ hai tà trước và sau vắt sang một bên đùi để tà áo không bị quấn vào bánh xe và tránh nhăn vải.',
      photoAngle: 'Góc chụp nghiêng 45 độ hướng về phía sườn phải cài cúc để khoe trọn vẹn đường nẹp trung phùng và 5 hạt khuy ngọc tinh xảo.',
      weatherMaintenance: 'Vải gấm và lụa nên ủi ở nhiệt độ thấp có lót khăn mỏng hoặc dùng bàn ủi hơi nước cầm tay để giữ nguyên vân óng ánh.',
      etiquetteNote: config.eventContext === 'temple_worship' ? 'Khi bước vào điện thờ, giữ dáng đứng thẳng, chắp hai tay trước ngực để tôn nghiêm nếp áo.' : 'Tự tin sải bước, tôn vinh niềm tự hào di sản giữa phố thị.'
    }
  };

  return result;
}
