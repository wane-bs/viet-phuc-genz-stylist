export type Gender = 'nam' | 'nu' | 'unisex';

export type EventContext = 
  | 'temple_worship' // Đền chùa / Cúng giỗ (Tôn nghiêm)
  | 'traditional_wedding' // Lễ cưới truyền thống (Trọng thể)
  | 'concert_festival' // Concert âm nhạc / Festival ngoài trời (Năng động / Đương đại)
  | 'street_cafe' // Dạo phố / Cà phê cuối tuần (Phóng khoáng)
  | 'school_workshop'; // Workshop trường học / Thuyết trình văn hóa (Thanh lịch)

export type AestheticVibe = 
  | 'streetwear' // Streetwear năng động, cá tính
  | 'minimalist' // Minimalist tinh giản, hiện đại
  | 'cyber_y2k' // Cyber-retro / Y2K phá cách
  | 'academia' // Academia / Thanh lịch học thuật
  | 'royal_fusion'; // Cung đình Đương đại / Sang trọng

export type BaseGarmentType = 
  | 'ngu_than_tay_chen' // Áo Ngũ Thân Tay Chẽn (1744)
  | 'ao_tac' // Áo Tấc (Áo Ngũ Thân Tay Thụng)
  | 'ao_nhat_binh' // Áo Nhật Bình (Triều Nguyễn)
  | 'ao_tu_than' // Áo Tứ Thân & Nón Quai Thao (Kinh Bắc)
  | 'ao_giao_linh' // Áo Giao Lĩnh (Cổ chéo)
  | 'ao_dai_raglan'; // Áo Dài Raglan / Lemur (Thế kỷ 20)

export type LapelDirection = 'right' | 'left'; // Right = Hợp lễ (chuẩn); Left = Tử phục / Tang lễ (CẤM KỴ)

export type LowerGarmentType = 
  | 'cargo_pants' // Quần Cargo túi hộp ống suông
  | 'silk_wide_pants' // Quần lụa ống suông truyền thống
  | 'dress_trousers' // Quần âu xếp ly thanh lịch
  | 'pleated_skirt' // Chân váy xếp ly midi
  | 'culottes' // Quần lửng culottes đũi
  | 'short_mini'; // Quần short ngắn / Mini skirt (Dễ phạm quy chốn tôn nghiêm)

export type FootwearType = 
  | 'chunky_sneaker' // Sneaker đế thô monochrome
  | 'leather_loafer' // Giày Loafer da bóng
  | 'high_boots' // Boots da cao cổ
  | 'wooden_clogs' // Guốc mộc truyền thống
  | 'mule_sandals'; // Dép sục quai da tối giản

export type AccessoryType = 
  | 'slim_sunglasses' // Kính mát retro mắt hẹp
  | 'silver_kieng' // Kiềng bạc trơn đeo cổ
  | 'folding_fan' // Quạt xếp gỗ trầm / giấy điệp
  | 'tote_crossbody' // Túi tote linen / Crossbody bag
  | 'pearl_chain' // Chuỗi ngọc trai hoặc xích bạc
  | 'non_quai_thao'; // Nón quai thao thu nhỏ / Nón lá nghệ thuật

export type PatternType = 
  | 'van_may_thuy_ba' // Vân mây & Sóng Thủy Ba (Dân gian & Cung đình nhã nhặn)
  | 'hoa_sen_tinh_khiet' // Hoa sen truyền thống
  | 'gam_chim_co_dien' // Dệt gấm hoa chìm cổ điển
  | 'plain_solid' // Trơn tối giản không hoa văn
  | 'rong_nam_mong_hoang_gia'; // Rồng 5 móng (CẢNH BÁO VÀNG nếu mặc bừa bãi)

export type FabricType = 
  | 'gam_to_tam' // Gấm tơ tằm dệt hoa
  | 'lua_ha_dong' // Lụa Vạn Phúc - Hà Đông
  | 'dui_linen' // Đũi tự nhiên pha Linen thoáng mát
  | 'denim_silk' // Denim kết hợp dệt chỉ tơ
  | 'sheer_voile'; // Voan xuyên thấu (CẢNH BÁO chốn tôn nghiêm)

export interface ColorSwatch {
  name: string;
  hex: string;
  traditionalName: string;
  symbolism: string;
}

export interface StylingConfig {
  gender: Gender;
  eventContext: EventContext;
  aestheticVibe: AestheticVibe;
  baseGarment: BaseGarmentType;
  lapelDirection: LapelDirection;
  lowerGarment: LowerGarmentType;
  footwear: FootwearType;
  accessories: AccessoryType[];
  pattern: PatternType;
  fabric: FabricType;
  primaryColor: string;
  accentColor: string;
}

export type GuardrailLevel = 'SAFE' | 'WARNING' | 'DANGER';

export interface GuardrailFinding {
  id: string;
  level: GuardrailLevel;
  title: string;
  description: string;
  historicalCitation: string;
  suggestion: string;
}

export interface CulturalEvaluation {
  score: number; // 1 - 100
  level: GuardrailLevel;
  statusLabel: string;
  summary: string;
  remixPercentage: number;
  maxRecommendedRemix: number;
  findings: GuardrailFinding[];
  isLapelValid: boolean;
  isContextAppropriate: boolean;
}

export interface OutfitLayerDetail {
  layer: 'top' | 'bottom' | 'footwear_acc';
  name: string;
  category: string;
  material: string;
  description: string;
  culturalNote: string;
  modernTwist: string;
}

export interface OutfitRemixResult {
  id: string;
  outfitTitle: string;
  conceptTagline: string;
  config: StylingConfig;
  evaluation: CulturalEvaluation;
  colorPalette: ColorSwatch[];
  layers: {
    top: OutfitLayerDetail;
    bottom: OutfitLayerDetail;
    footwearAndAcc: OutfitLayerDetail;
  };
  historicalInsight: {
    era: string;
    origin: string;
    decreeYear: string;
    philosophicalMeaning: string;
    citation: string;
  };
  stylingTips: {
    comfortMovement: string;
    photoAngle: string;
    weatherMaintenance: string;
    etiquetteNote: string;
  };
}

export interface PresetLookbook {
  id: string;
  title: string;
  subtitle: string;
  badge: string;
  description: string;
  tags: string[];
  config: StylingConfig;
  score: number;
  level: GuardrailLevel;
  culturalHighlight: string;
  iconName: string;
}
