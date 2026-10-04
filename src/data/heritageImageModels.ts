/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface HeritageModelReference {
  id: string;
  name: string;
  category: 'ngu_than_tay_chen' | 'ao_tac' | 'ao_nhat_binh' | 'ao_dai';
  period: string;
  gender: 'nu' | 'nam' | 'couple';
  colorPalette: {
    primary: string;
    secondary: string;
    accent: string;
    description: string;
  };
  features: string[];
  historicalContext: string;
  guardrailNotes: string;
  tags: string[];
  sampleReferenceUrl?: string;
  previewUrl: string;
  fullBodyPhotorealisticUrl: string;
  img2imgPromptModifier: string;
}

export interface UserPresetProfile {
  id: string;
  name: string;
  description: string;
  gender: 'nam' | 'nu';
  avatarUrl: string;
  defaultFittingModelId: string;
}

export const USER_PRESET_PROFILES: UserPresetProfile[] = [
  {
    id: 'user_nam_glasses',
    name: 'Ảnh Chân Dung Nam (Đeo Kính)',
    description: 'Chân dung nam thanh niên góc chụp camera đời thường',
    gender: 'nam',
    defaultFittingModelId: 'ref_ngu_than_do_do',
    avatarUrl: `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="640" height="800" viewBox="0 0 640 800">
      <defs>
        <linearGradient id="wallBg" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="%231e293b"/>
          <stop offset="50%" stop-color="%23334155"/>
          <stop offset="100%" stop-color="%230f172a"/>
        </linearGradient>
      </defs>
      <!-- Background textured wall with ambient lighting -->
      <rect width="640" height="800" fill="url(%23wallBg)"/>
      <!-- Stone wall texture blocks -->
      <rect x="20" y="20" width="180" height="90" rx="8" fill="%23475569" opacity="0.4"/>
      <rect x="220" y="30" width="220" height="70" rx="8" fill="%23334155" opacity="0.5"/>
      <rect x="460" y="40" width="160" height="110" rx="8" fill="%23475569" opacity="0.3"/>
      <rect x="30" y="130" width="150" height="110" rx="8" fill="%23334155" opacity="0.4"/>
      <!-- Palm leaf on top right -->
      <path d="M450 120 Q560 60 640 100 Q580 220 460 260 Z" fill="%23166534" opacity="0.75"/>
      <path d="M470 140 Q570 180 620 280" stroke="%2322c55e" stroke-width="3" fill="none"/>
      <!-- Subject Body (White shirt) -->
      <path d="M180 680 Q320 640 460 680 L500 800 L140 800 Z" fill="%23f1f5f9"/>
      <path d="M280 660 L320 720 L360 660 Z" fill="%23cbd5e1"/>
      <!-- Neck & Head -->
      <rect x="285" y="520" width="70" height="90" fill="%23fed7aa"/>
      <ellipse cx="320" cy="420" rx="90" ry="115" fill="%23fed7aa"/>
      <!-- Hair -->
      <path d="M225 380 Q320 280 415 380 Q425 320 320 300 Q215 320 225 380 Z" fill="%23090d16"/>
      <!-- Ears with earphones -->
      <ellipse cx="225" cy="430" rx="12" ry="24" fill="%23fed7aa"/>
      <ellipse cx="415" cy="430" rx="12" ry="24" fill="%23fed7aa"/>
      <circle cx="228" cy="435" r="5" fill="%23e2e8f0"/>
      <path d="M228 440 Q240 560 285 640" stroke="%23f8fafc" stroke-width="2" fill="none"/>
      <circle cx="412" cy="435" r="5" fill="%23e2e8f0"/>
      <path d="M412 440 Q400 560 355 640" stroke="%23f8fafc" stroke-width="2" fill="none"/>
      <!-- Eyes & Eyebrows -->
      <path d="M255 380 Q285 372 300 380" stroke="%230f172a" stroke-width="4.5" fill="none"/>
      <path d="M340 380 Q355 372 385 380" stroke="%230f172a" stroke-width="4.5" fill="none"/>
      <ellipse cx="278" cy="405" rx="14" ry="9" fill="%230f172a"/>
      <ellipse cx="362" cy="405" rx="14" ry="9" fill="%230f172a"/>
      <!-- Glasses (Kính cận viền đen mỏng) -->
      <rect x="250" y="390" width="56" height="34" rx="8" fill="none" stroke="%231e293b" stroke-width="3.5"/>
      <rect x="334" y="390" width="56" height="34" rx="8" fill="none" stroke="%231e293b" stroke-width="3.5"/>
      <path d="M306 405 L334 405" stroke="%231e293b" stroke-width="3"/>
      <!-- Nose & Lips -->
      <path d="M320 405 L315 445 L328 448" stroke="%23f59e0b" stroke-width="2.5" fill="none"/>
      <path d="M298 475 Q320 488 342 475" stroke="%23e11d48" stroke-width="3.5" fill="none"/>
      <!-- Text Badge -->
      <rect x="180" y="740" width="280" height="36" rx="18" fill="%230f172a" stroke="%2338bdf8" stroke-width="1.5"/>
      <text x="320" y="763" fill="%2338bdf8" font-size="13" font-weight="bold" text-anchor="middle" font-family="sans-serif">ẢNH CHÂN DUNG GỐC (BEFORE)</text>
    </svg>`
  },
  {
    id: 'user_nu_portrait',
    name: 'Ảnh Chân Dung Nữ (Studio)',
    description: 'Chân dung nữ thanh niên góc chụp chân dung',
    gender: 'nu',
    defaultFittingModelId: 'ref_ngu_than_tim_chen',
    avatarUrl: `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="640" height="800" viewBox="0 0 640 800">
      <rect width="640" height="800" fill="%230f172a"/>
      <circle cx="320" cy="380" r="220" fill="%23ec4899" opacity="0.15"/>
      <ellipse cx="320" cy="400" rx="85" ry="110" fill="%23fed7aa"/>
      <path d="M220 330 Q320 220 420 330 Q440 500 420 620 Q320 580 220 620 Z" fill="%23090d16"/>
      <rect x="290" y="500" width="60" height="80" fill="%23fed7aa"/>
      <path d="M190 660 Q320 620 450 660 L490 800 L150 800 Z" fill="%23334155"/>
      <ellipse cx="280" cy="390" rx="12" ry="8" fill="%230f172a"/>
      <ellipse cx="360" cy="390" rx="12" ry="8" fill="%230f172a"/>
      <path d="M300 460 Q320 472 340 460" stroke="%23f43f5e" stroke-width="3" fill="none"/>
      <rect x="180" y="740" width="280" height="36" rx="18" fill="%230f172a" stroke="%23f472b6" stroke-width="1.5"/>
      <text x="320" y="763" fill="%23f472b6" font-size="13" font-weight="bold" text-anchor="middle" font-family="sans-serif">ẢNH CHÂN DUNG NỮ (BEFORE)</text>
    </svg>`
  }
];

export const HERITAGE_MODEL_REFERENCES: HeritageModelReference[] = [
  {
    id: 'ref_ngu_than_do_do',
    name: 'Áo Ngũ Thân Tay Chẽn (Đỏ Đô Hoàng Triều)',
    category: 'ngu_than_tay_chen',
    period: 'Định chế 1744 Chúa Nguyễn Phúc Khoát - Chuẩn quốc phục 1837',
    gender: 'nam',
    colorPalette: {
      primary: '#7f1d1d', // Burgundy/Crimson #7f1d1d
      secondary: '#ffffff', // White pants
      accent: '#d97706', // Amber gold button
      description: 'Gấm lụa sa tanh đỏ đô vương giả, quần lụa trắng, mấn đỏ xếp nếp, hài nhung đen'
    },
    features: [
      'Tay chẽn ôm vừa vặn cổ tay, tạo tư thế chắp tay (Thủ lễ) trang nghiêm chuẩn mực',
      'Cổ áo Lập Lĩnh đứng thẳng 3.5cm ôm sát cổ tôn thần thái thanh tú',
      'Thân áo 5 thân xẻ tà bên sườn (Lót tà phụ che chắn kín đáo)',
      'Nếp vạt Hữu Nhậm: Vạt trái phủ lên vạt phải, 5 cúc khuy cài sang sườn phải',
      'Khăn đóng / Mấn đội đầu đồng màu đỏ đô sang trọng, quý phái'
    ],
    historicalContext: 'Mẫu Áo Ngũ Thân Nam Tay Chẽn màu Đỏ Đô là hình mẫu kinh điển của phong trào phục hưng cổ phục Việt Nam. Tông màu đỏ trầm kết hợp quần trắng tôn vinh vóc dáng người đàn ông Việt chính trực, nho nhã và hiện đại.',
    guardrailNotes: 'Bảo toàn tuyệt đối quy chuẩn Hữu Nhậm 5 cúc sang phải. Không để vạt áo cài sang trái.',
    tags: ['Ngũ Thân', 'Tay Chẽn', 'Đỏ Đô', 'Model Nam', 'Quý Phái'],
    img2imgPromptModifier: 'High-end studio fashion editorial photography: Vietnamese young man wearing authentic Ao Ngu Than Tay Chen in luxurious deep burgundy crimson silk #7f1d1d, stand-up mandarin collar (Co Lap Linh), strict 5-button right lapel closure (Huu Nham), matching crimson fabric man turban headdress, elegant white silk wide trousers, black shoes, clean minimalist neutral grey studio background, photorealistic 8k.',
    previewUrl: '',
    fullBodyPhotorealisticUrl: `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="640" height="960" viewBox="0 0 640 960">
      <defs>
        <linearGradient id="studioGrey" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stop-color="%23d1d5db"/>
          <stop offset="50%" stop-color="%239ca3af"/>
          <stop offset="100%" stop-color="%236b7280"/>
        </linearGradient>
        <linearGradient id="burgundySilk" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="%23991b1b"/>
          <stop offset="40%" stop-color="%237f1d1d"/>
          <stop offset="100%" stop-color="%23450a0a"/>
        </linearGradient>
        <linearGradient id="pantWhite" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stop-color="%23ffffff"/>
          <stop offset="100%" stop-color="%23e5e7eb"/>
        </linearGradient>
        <filter id="softShadow" x="-20%" y="-20%" width="140%" height="140%">
          <feDropShadow dx="0" dy="16" stdDeviation="20" flood-color="%23000000" flood-opacity="0.35"/>
        </filter>
      </defs>
      <!-- Clean Minimalist Grey Studio Background -->
      <rect width="640" height="960" fill="url(%23studioGrey)"/>
      <!-- Soft Studio Floor Light Spot -->
      <ellipse cx="320" cy="900" rx="260" ry="45" fill="%234b5563" opacity="0.4"/>

      <!-- MODEL FULL-BODY FIGURE -->
      <g filter="url(%23softShadow)">
        <!-- 1. Quần lụa trắng suông (White Silk Trousers) -->
        <path d="M255 680 L250 885 L310 885 L315 680 Z" fill="url(%23pantWhite)"/>
        <path d="M325 680 L330 885 L390 885 L385 680 Z" fill="url(%23pantWhite)"/>

        <!-- 2. Giày Hài đen mũi trắng thời trang (Shoes) -->
        <path d="M245 885 Q275 870 308 885 L312 925 Q275 930 242 925 Z" fill="%23ffffff" stroke="%23111827" stroke-width="4"/>
        <path d="M242 915 L312 915 L312 925 L242 925 Z" fill="%23111827"/>
        <path d="M328 885 Q360 870 395 885 L398 925 Q360 930 325 925 Z" fill="%23ffffff" stroke="%23111827" stroke-width="4"/>
        <path d="M325 915 L398 915 L398 925 L325 925 Z" fill="%23111827"/>

        <!-- 3. Áo Ngũ Thân Thân Dài (Burgundy Silk Tunic Body) -->
        <!-- Main Tunic Skirt & Torso -->
        <path d="M245 260 Q320 248 395 260 L430 740 L210 740 Z" fill="url(%23burgundySilk)"/>
        <!-- Inner contrasting silk hem lining -->
        <path d="M210 740 L225 540 L245 740 Z" fill="%23fef3c7" opacity="0.9"/>
        <path d="M430 740 L415 540 L395 740 Z" fill="%23fef3c7" opacity="0.9"/>

        <!-- 4. Fitted Sleeves (Tay Chẽn) with Hands Clasped in Front (Thủ Lễ) -->
        <path d="M245 265 L190 420 L240 450 L275 360 Z" fill="url(%23burgundySilk)"/>
        <path d="M395 265 L450 420 L400 450 L365 360 Z" fill="url(%23burgundySilk)"/>
        <!-- Clasped Hands -->
        <ellipse cx="320" cy="445" rx="34" ry="20" fill="%23fed7aa"/>

        <!-- 5. Collar (Cổ Lập Lĩnh Đứng) -->
        <rect x="286" y="235" width="68" height="28" rx="6" fill="%237f1d1d" stroke="%23450a0a" stroke-width="2"/>
        <!-- Inner white collar band -->
        <rect x="292" y="240" width="56" height="8" rx="2" fill="%23ffffff"/>

        <!-- 6. Right Lapel Line (Hữu Nhậm) & 5 Buttons (Ngũ Thường) -->
        <path d="M316 262 Q355 310 375 420" fill="none" stroke="%23991b1b" stroke-width="3"/>
        <circle cx="332" cy="275" r="5" fill="%23d97706" stroke="%23450a0a" stroke-width="1.5"/>
        <circle cx="346" cy="300" r="5" fill="%23d97706" stroke="%23450a0a" stroke-width="1.5"/>
        <circle cx="358" cy="335" r="5" fill="%23d97706" stroke="%23450a0a" stroke-width="1.5"/>
        <circle cx="366" cy="375" r="5" fill="%23d97706" stroke="%23450a0a" stroke-width="1.5"/>
        <circle cx="372" cy="420" r="5" fill="%23d97706" stroke="%23450a0a" stroke-width="1.5"/>

        <!-- 7. Head & Neck -->
        <rect x="300" y="210" width="40" height="35" fill="%23fed7aa"/>
        <ellipse cx="320" cy="170" rx="46" ry="58" fill="%23fed7aa"/>
        <!-- Ears -->
        <ellipse cx="272" cy="175" rx="6" ry="12" fill="%23fed7aa"/>
        <ellipse cx="368" cy="175" rx="6" ry="12" fill="%23fed7aa"/>

        <!-- 8. Mấn / Khăn Đóng Đỏ Đô Đồng Tông -->
        <ellipse cx="320" cy="140" rx="52" ry="22" fill="%237f1d1d" stroke="%23991b1b" stroke-width="3"/>
        <path d="M268 140 Q320 120 372 140 Q372 155 320 162 Q268 155 268 140 Z" fill="%23991b1b"/>

        <!-- 9. Facial Features with Modern Glasses (Đeo Kính Trẻ Trung) -->
        <!-- Eyebrows -->
        <path d="M288 155 Q302 150 310 155" stroke="%230f172a" stroke-width="2.5" fill="none"/>
        <path d="M330 155 Q338 150 352 155" stroke="%230f172a" stroke-width="2.5" fill="none"/>
        <!-- Eyes -->
        <ellipse cx="298" cy="168" rx="6" ry="4" fill="%230f172a"/>
        <ellipse cx="342" cy="168" rx="6" ry="4" fill="%230f172a"/>
        <!-- Glasses (Kính cận viền mỏng) -->
        <rect x="284" y="160" width="28" height="18" rx="4" fill="none" stroke="%231e293b" stroke-width="2"/>
        <rect x="328" y="160" width="28" height="18" rx="4" fill="none" stroke="%231e293b" stroke-width="2"/>
        <path d="M312 168 L328 168" stroke="%231e293b" stroke-width="2"/>
        <!-- Nose & Mouth -->
        <path d="M320 168 L318 185 L324 186" stroke="%23d97706" stroke-width="1.5" fill="none"/>
        <path d="M308 198 Q320 205 332 198" stroke="%23991b1b" stroke-width="2" fill="none"/>
      </g>

      <!-- Bottom Watermark Badge -->
      <rect x="140" y="915" width="360" height="32" rx="16" fill="%23111827" stroke="%23d97706" stroke-width="1.5"/>
      <text x="320" y="936" fill="%23fef3c7" font-size="13" font-weight="bold" text-anchor="middle" font-family="sans-serif">ẢNH AI PHỤC DỰNG TOÀN THÂN (AFTER)</text>
    </svg>`
  },
  {
    id: 'ref_ngu_than_tim_chen',
    name: 'Áo Ngũ Thân Tay Chẽn (Tím Hoa Cà Hoàng Gia)',
    category: 'ngu_than_tay_chen',
    period: 'Định chế 1744 Võ Vương Nguyễn Phúc Khoát',
    gender: 'nu',
    colorPalette: {
      primary: '#9061b7',
      secondary: '#ffffff',
      accent: '#fde047',
      description: 'Lụa tơ tằm tím hoa cà vương giả phối quần lụa trắng và chuỗi ngọc trai 3 vòng'
    },
    features: [
      'Tay chẽn thon gọn ôm vừa vặn cổ tay, tạo dáng vẻ thanh thoát năng động',
      'Cổ áo Lập Lĩnh đứng thẳng 3.5cm trang nhã, ôm sát gáy',
      'Thân áo 5 thân (4 thân tượng trưng Tứ Phụ Mẫu, 1 thân con che chở tâm can)',
      'Quy cách Hữu Nhậm: Vạt trái đè vạt phải, 5 cúc ngọc cài sang sườn phải',
      'Phối cùng Mấn đội đầu đồng màu tím và chuỗi ngọc trai nhiều tầng quý phái'
    ],
    historicalContext: 'Mẫu Áo Ngũ Thân Tay Chẽn Nữ mang vẻ đẹp đài các, thanh lịch đậm chất kinh kỳ Huế xưa.',
    guardrailNotes: 'Bắt buộc vạt trái phủ lên vạt phải. Tuyệt đối không cài sang trái.',
    tags: ['Ngũ Thân', 'Tay Chẽn', 'Tím Quý Phái', 'Gen Z Ready', 'Nữ Quyền'],
    img2imgPromptModifier: 'Wearing authentic Vietnamese Ao Ngu Than Tay Chen in royal amethyst purple #9061b7, standing mandarin collar, strictly right lapel fastening with 5 traditional jade buttons, flowing wide-leg white silk trousers, purple turban, 3-strand pearl necklace, neutral studio background.',
    previewUrl: '',
    fullBodyPhotorealisticUrl: `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="640" height="960" viewBox="0 0 640 960">
      <defs>
        <linearGradient id="studioGreyNu" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stop-color="%23e2e8f0"/>
          <stop offset="50%" stop-color="%23cbd5e1"/>
          <stop offset="100%" stop-color="%2394a3b8"/>
        </linearGradient>
        <linearGradient id="purpleSilkNu" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="%23a855f7"/>
          <stop offset="50%" stop-color="%238b5cf6"/>
          <stop offset="100%" stop-color="%236b21a8"/>
        </linearGradient>
      </defs>
      <rect width="640" height="960" fill="url(%23studioGreyNu)"/>
      <ellipse cx="320" cy="900" rx="260" ry="45" fill="%2364748b" opacity="0.3"/>
      <!-- Trousers -->
      <path d="M255 660 L245 885 L310 885 L315 660 Z" fill="%23ffffff"/>
      <path d="M325 660 L330 885 L395 885 L385 660 Z" fill="%23ffffff"/>
      <!-- Shoes -->
      <ellipse cx="277" cy="895" rx="32" ry="12" fill="%230f172a"/>
      <ellipse cx="363" cy="895" rx="32" ry="12" fill="%230f172a"/>
      <!-- Tunic Body -->
      <path d="M250 250 Q320 240 390 250 L425 720 L215 720 Z" fill="url(%23purpleSilkNu)"/>
      <!-- Sleeves & Pearl Necklace -->
      <path d="M250 255 L180 400 L230 430 L275 350 Z" fill="url(%23purpleSilkNu)"/>
      <path d="M390 255 L460 400 L410 430 L365 350 Z" fill="url(%23purpleSilkNu)"/>
      <ellipse cx="320" cy="425" rx="30" ry="18" fill="%23fed7aa"/>
      <path d="M280 280 Q320 330 360 280" stroke="%23ffffff" stroke-width="4" stroke-dasharray="2 6" fill="none"/>
      <path d="M272 292 Q320 350 368 292" stroke="%23ffffff" stroke-width="4" stroke-dasharray="2 6" fill="none"/>
      <!-- Collar & Buttons -->
      <rect x="290" y="225" width="60" height="26" rx="6" fill="%238b5cf6" stroke="%23ffffff" stroke-width="2"/>
      <path d="M318 252 Q355 300 372 400" stroke="%23c084fc" stroke-width="3" fill="none"/>
      <circle cx="335" cy="265" r="4.5" fill="%23fde047"/>
      <circle cx="348" cy="292" r="4.5" fill="%23fde047"/>
      <circle cx="360" cy="328" r="4.5" fill="%23fde047"/>
      <!-- Head & Mấn -->
      <rect x="300" y="200" width="40" height="35" fill="%23fed7aa"/>
      <ellipse cx="320" cy="160" rx="42" ry="52" fill="%23fed7aa"/>
      <ellipse cx="320" cy="130" rx="50" ry="20" fill="%238b5cf6" stroke="%23c084fc" stroke-width="3"/>
      <!-- Badge -->
      <rect x="140" y="915" width="360" height="32" rx="16" fill="%23111827" stroke="%238b5cf6" stroke-width="1.5"/>
      <text x="320" y="936" fill="%23f3e8ff" font-size="13" font-weight="bold" text-anchor="middle" font-family="sans-serif">ẢNH AI PHỤC DỰNG NỮ TÍM (AFTER)</text>
    </svg>`
  },
  {
    id: 'ref_ao_tac_tay_thung_nam_nu',
    name: 'Áo Tấc Lễ Phục Tay Thụng (Lam Ngọc & Lục Bảo)',
    category: 'ao_tac',
    period: 'Lễ phục truyền thống Triều Nguyễn (Thế kỷ 19 - 20)',
    gender: 'couple',
    colorPalette: {
      primary: '#38bdf8',
      secondary: '#059669',
      accent: '#e0e7ff',
      description: 'Lễ phục Áo Tấc tay thụng thụng dài uy nghi: Nữ diện lụa lam ngọc thanh thoát, Nam diện gấm lục bảo trầm mặc'
    },
    features: [
      'Tay thụng (tay tấc) may rộng bề ngang 30 - 45cm, dài quá đầu ngón tay tạo vẻ ung dung đài các',
      'Khi chắp tay trước ngực hành lễ (Thủ lễ), hai ống tay thụng phủ kín tạo vòng cung trang trọng',
      'Cổ Lập Lĩnh tôn nghiêm đính cúc Hữu Nhậm cài 5 khuy bên sườn',
      'Phối cùng Khăn Đóng (nam) hoặc Mấn nhung xanh (nữ) và ngọc bội/thẻ bài văn hóa'
    ],
    historicalContext: 'Áo Tấc là lễ phục chuẩn mực cao nhất của người Việt xưa trong các dịp đại lễ, cưới hỏi, cúng giỗ, tế tự.',
    guardrailNotes: 'Vì là dòng Lễ Phục Tôn Nghiêm, không nên cắt xén quá đà hoặc phối cùng quần short ngắn.',
    tags: ['Áo Tấc', 'Tay Thụng', 'Lễ Phục', 'Lam Ngọc', 'Lục Bảo'],
    img2imgPromptModifier: 'Vietnamese traditional Ao Tac ceremonial robes with majestic wide flowing sleeves, radiant cyan blue and emerald green silk brocade, standing collar, right lapel fastening, loose white silk trousers, ceremonial backdrop.',
    previewUrl: '',
    fullBodyPhotorealisticUrl: `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="640" height="960" viewBox="0 0 640 960">
      <rect width="640" height="960" fill="%230f172a"/>
      <!-- Couple Silhouette in Grand Silk Robes -->
      <path d="M120 320 L60 520 L160 760 L320 760 L320 320 Z" fill="%230284c7"/>
      <path d="M320 320 L480 320 L580 520 L520 760 L320 760 Z" fill="%23047857"/>
      <rect x="140" y="915" width="360" height="32" rx="16" fill="%23111827" stroke="%2338bdf8" stroke-width="1.5"/>
      <text x="320" y="936" fill="%23e0f2fe" font-size="13" font-weight="bold" text-anchor="middle" font-family="sans-serif">ẢNH AI PHỤC DỰNG ÁO TẤC LỄ PHỤC (AFTER)</text>
    </svg>`
  }
];
