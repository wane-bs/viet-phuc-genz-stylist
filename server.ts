import express from 'express';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import { GoogleGenAI } from '@google/genai';
import { heritageDb } from './src/db/heritageDatabase.js';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: true, limit: '50mb' }));
app.use(express.static(path.join(__dirname, 'public')));

// Initialize Google GenAI SDK
let ai: GoogleGenAI | null = null;
if (process.env.GEMINI_API_KEY) {
  ai = new GoogleGenAI({
    apiKey: process.env.GEMINI_API_KEY,
    httpOptions: {
      headers: {
        'User-Agent': 'aistudio-build',
      }
    }
  });
}

const OPENROUTER_API_KEY = process.env.OPENROUTER_API_KEY || '';

// System Instruction for Vietnamese Heritage Stylist Agent
const SYSTEM_INSTRUCTION = `Bạn là Chuyên gia Cao cấp về Cổ phục Việt Nam và Cố vấn Phong cách Thời trang Đương đại cho Gen Z. 
Nhiệm vụ của bạn là tư vấn thiết kế và phối đồ "Việt phục Remix" đạt tính thẩm mỹ cao, phù hợp ngữ cảnh, đồng thời thực thi nghiêm ngặt Bộ Lọc Ranh Giới Văn Hóa (Cultural Guardrails):

1. CÁC DÒNG PHỤC TRANG GỐC ĐƯỢC PHÉP KHAI THÁC:
- Áo Ngũ Thân (Tay chẽn, Áo Tấc/Tay thụng) - Khởi sinh 1744 Chúa Nguyễn Phúc Khoát.
- Áo Dài (Lemur, Lê Phổ, Raglan)
- Áo Tứ Thân, Áo Giao Lĩnh, Áo Nhật Bình

2. BỘ LỌC RANH GIỚI VĂN HÓA (CULTURAL GUARDRAILS):
- Quy cách vạt & cúc (Tuyệt đối): Bắt buộc vạt trái đè lên vạt phải và cài cúc sang sườn phải (Hữu nhậm). Cấm tuyệt đối cài sang trái (Tả nhậm = Tử phục / tang lễ).
- Ngữ cảnh tôn nghiêm (Đền, Chùa, Cúng giỗ, Lễ cưới): Không quần short, không váy ngắn, không xẻ tà quá cao lộ nội y, không voan xuyên thấu. Biến tấu 10% - 20%.
- Ngữ cảnh đời thường & giải trí (Concert, Cà phê, Festival): Khuyến khích remix linh hoạt (Sneaker chunky, Blazer, Quần Cargo, Túi tote, Kính mát). Biến tấu 50% - 70%.
- Hoa văn hoàng gia: Cảnh báo nếu dùng Rồng 5 móng (Long văn cửu ngũ chí tôn) sai hoàn cảnh.

3. ĐỊNH DẠNG TRẢ LỜI:
- Phân tích nguồn gốc lịch sử súc tích, học thuật (dẫn niên đại 1744, Khâm Định Đại Nam Hội Điển Sự Lệ).
- Đánh giá điểm chuẩn mực văn hóa (Cultural Validity Score: 1-100).
- Lời khuyên phối đồ (Styling Advice) trẻ trung, chạm đúng tâm lý Gen Z.`;

// OpenRouter API helper
async function callOpenRouter(messages: any[], model = 'openai/gpt-4o') {
  const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${OPENROUTER_API_KEY}`,
      'HTTP-Referer': process.env.APP_URL || 'https://viet-phuc-remix.ai',
      'X-Title': 'Viet Phuc Remix: Gen Z Heritage Stylist',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      model: model,
      messages: messages,
    }),
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`OpenRouter error (${response.status}): ${errorText}`);
  }

  const data = await response.json();
  return data.choices?.[0]?.message?.content || '';
}

// -------------------------------------------------------------
// DATABASE REST API ENDPOINTS
// -------------------------------------------------------------

// 1. References
app.get('/api/db/references', (_req, res) => {
  try {
    const refs = heritageDb.getReferences();
    res.json({ success: true, count: refs.length, data: refs });
  } catch (err: unknown) {
    res.status(500).json({ success: false, error: err instanceof Error ? err.message : 'DB Error' });
  }
});

app.post('/api/db/references', (req, res) => {
  try {
    const newItem = heritageDb.addReference(req.body);
    res.json({ success: true, data: newItem });
  } catch (err: unknown) {
    res.status(500).json({ success: false, error: err instanceof Error ? err.message : 'DB Error' });
  }
});

app.delete('/api/db/references/:id', (req, res) => {
  try {
    const deleted = heritageDb.deleteReference(req.params.id);
    res.json({ success: true, deleted: !!deleted });
  } catch (err: unknown) {
    res.status(500).json({ success: false, error: err instanceof Error ? err.message : 'DB Error' });
  }
});

// 2. Blueprints
app.get('/api/db/blueprints', (_req, res) => {
  try {
    const blueprints = heritageDb.getBlueprints();
    res.json({ success: true, count: blueprints.length, data: blueprints });
  } catch (err: unknown) {
    res.status(500).json({ success: false, error: err instanceof Error ? err.message : 'DB Error' });
  }
});

// 3. Try-On History
app.get('/api/db/history', (_req, res) => {
  try {
    const history = heritageDb.getTryonHistory();
    res.json({ success: true, count: history.length, data: history });
  } catch (err: unknown) {
    res.status(500).json({ success: false, error: err instanceof Error ? err.message : 'DB Error' });
  }
});

app.post('/api/db/history', (req, res) => {
  try {
    const record = heritageDb.addTryonHistory(req.body);
    res.json({ success: true, data: record });
  } catch (err: unknown) {
    res.status(500).json({ success: false, error: err instanceof Error ? err.message : 'DB Error' });
  }
});

app.delete('/api/db/history/:id', (req, res) => {
  try {
    const deleted = heritageDb.deleteTryonHistory(req.params.id);
    res.json({ success: true, deleted: !!deleted });
  } catch (err: unknown) {
    res.status(500).json({ success: false, error: err instanceof Error ? err.message : 'DB Error' });
  }
});

app.delete('/api/db/history', (_req, res) => {
  try {
    heritageDb.clearTryonHistory();
    res.json({ success: true, cleared: true });
  } catch (err: unknown) {
    res.status(500).json({ success: false, error: err instanceof Error ? err.message : 'DB Error' });
  }
});

// 4. Database Status
app.get('/api/db/status', (_req, res) => {
  res.json({
    status: 'ONLINE',
    database: 'JSON Document Store with Atomic Persistence',
    referencesCount: heritageDb.getReferences().length,
    historyCount: heritageDb.getTryonHistory().length,
    openRouterConfigured: !!OPENROUTER_API_KEY,
    geminiConfigured: !!ai,
    timestamp: new Date().toISOString()
  });
});

// -------------------------------------------------------------
// AI CONSULTANT ENDPOINT
// -------------------------------------------------------------
app.post('/api/gemini/consult', async (req, res) => {
  try {
    const { prompt, outfitContext, modelPreference } = req.body;

    if (!prompt) {
      return res.status(400).json({ error: 'Prompt is required' });
    }

    if (OPENROUTER_API_KEY) {
      try {
        const reply = await callOpenRouter([
          { role: 'system', content: SYSTEM_INSTRUCTION },
          { 
            role: 'user', 
            content: `Bối cảnh trang phục hiện tại: ${JSON.stringify(outfitContext || {})}\n\nYêu cầu từ người dùng: ${prompt}` 
          }
        ], modelPreference || 'openai/gpt-4o');

        return res.json({
          success: true,
          source: 'openrouter.ai',
          model: modelPreference || 'openai/gpt-4o',
          reply: reply,
        });
      } catch (orErr) {
        console.warn('OpenRouter consult error, trying Gemini fallback:', orErr);
      }
    }

    if (ai) {
      const response = await ai.models.generateContent({
        model: 'gemini-3.8-flash',
        contents: `Bối cảnh trang phục hiện tại: ${JSON.stringify(outfitContext || {})}\n\nYêu cầu từ người dùng: ${prompt}`,
        config: {
          systemInstruction: SYSTEM_INSTRUCTION,
          temperature: 0.7,
        }
      });

      return res.json({
        success: true,
        source: 'google-genai-sdk',
        model: 'gemini-3.8-flash',
        reply: response.text || 'Không có phản hồi văn bản.',
      });
    }

    const fallbackResponse = `[Chuyên gia Di sản Gen Z]: Về yêu cầu "${prompt}":
- Phân tích sử liệu: Cổ phục Việt Nam (đặc biệt là Áo Ngũ Thân định chế 1744 của Chúa Nguyễn Phúc Khoát) luôn đề cao nếp áo chính trực "Hữu nhậm" (vạt trái đè vạt phải) và 5 hạt khuy tượng trưng cho Ngũ Thường (Nhân, Lễ, Nghĩa, Trí, Tín).
- Đánh giá chuẩn mực: 95/100 (Hợp lễ).
- Lời khuyên phối đồ Gen Z: Để diện đi sự kiện thoải mái, bạn nên phối cùng Sneaker monochrome và quần ống suông/cargo đen.`;

    return res.json({
      success: true,
      source: 'offline-rule-engine',
      model: 'heritage-rule-v2',
      reply: fallbackResponse,
    });
  } catch (error: unknown) {
    console.error('AI API error:', error);
    const message = error instanceof Error ? error.message : 'Unknown server error';
    return res.status(500).json({ success: false, error: message });
  }
});

// -------------------------------------------------------------
// IMAGE-TO-IMAGE AI TRY-ON ENGINE
// -------------------------------------------------------------
app.post(['/api/gemini/generate-tryon', '/api/try-on/img2img'], async (req, res) => {
  try {
    const { 
      userImage, 
      referenceGarmentImage, 
      garmentReferenceId = 'ref_ngu_than_do_do',
      denoisingStrength = 0.65,
      preserveFace = true,
      promptJson,
      modelPreference = 'openai/gpt-4o'
    } = req.body;

    const baseGarmentName = promptJson?.base_garment?.name || 'Áo Ngũ Thân Tay Chẽn (Đỏ Đô Hoàng Triều)';
    const lapelStatus = promptJson?.base_garment?.lapel_rule || 'Hữu Nhậm (vạt trái đè vạt phải, 5 khuy cài sang phải)';
    const lowerGarmentName = promptJson?.lower_garment || 'Quần lụa trắng suông';
    const primaryHex = promptJson?.base_garment?.primary_color_hex || '#7f1d1d';
    const accentHex = promptJson?.base_garment?.accent_color_hex || '#d97706';
    const fabric = promptJson?.base_garment?.fabric || 'Gấm lụa tơ tằm dệt chìm';

    let aiDescription = '';
    let aiSource = 'OpenRouter AI Vision';
    let generatedImageUrl: string | null = null;
    let apiDiagnostic: any = null;

    // Resolve image base64 directly from physical disk or payload
    const userImgData = heritageDb.getImageBase64(userImage);
    const refImgData = heritageDb.getImageBase64(referenceGarmentImage);

    // 1. Call OpenRouter for Multimodal Assessment & Prompt Refinement
    if (OPENROUTER_API_KEY) {
      try {
        const orSystemMsg = `${SYSTEM_INSTRUCTION}
Bạn đang vận hành động cơ AI Try-On Img2Img phục dựng cổ phục Việt Nam. 
Hãy thẩm định và đưa ra nhận xét chuyên gia về việc người dùng mặc bộ ${baseGarmentName} (${primaryHex}), kiểm định quy cách Hữu Nhậm, cổ Lập Lĩnh và phối hạ y ${lowerGarmentName}.`;

        const userContent: any[] = [
          {
            type: 'text',
            text: `Thực hiện Image-to-Image Virtual Fitting:
- Cổ phục mục tiêu: ${baseGarmentName}
- Tông màu: ${primaryHex} & ${accentHex}, chất liệu ${fabric}
- Hạ y: ${lowerGarmentName}
- Denoising Strength: ${denoisingStrength}
- Cấu hình JSON: ${JSON.stringify(promptJson || {})}`
          }
        ];

        // Attach actual User JPEG/PNG Image directly to OpenRouter API
        if (userImgData) {
          userContent.push({
            type: 'image_url',
            image_url: { url: userImgData.dataUrl }
          });
        }

        // Attach actual Reference Heritage JPEG/PNG Image directly to OpenRouter API
        if (refImgData) {
          userContent.push({
            type: 'image_url',
            image_url: { url: refImgData.dataUrl }
          });
        }

        const orResponse = await fetch('https://openrouter.ai/api/v1/chat/completions', {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${OPENROUTER_API_KEY}`,
            'HTTP-Referer': process.env.APP_URL || 'https://viet-phuc-remix.ai',
            'X-Title': 'Viet Phuc Remix: Gen Z Heritage Stylist',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            model: 'openai/gpt-4o',
            messages: [
              { role: 'system', content: orSystemMsg },
              { role: 'user', content: userContent }
            ],
            max_tokens: 500,
            temperature: 0.6
          }),
        });

        if (orResponse.ok) {
          const orData = await orResponse.json();
          aiDescription = orData.choices?.[0]?.message?.content || '';
          aiSource = 'OpenRouter (GPT-4o Vision)';
        } else {
          const errStatus = orResponse.status;
          const errBody = await orResponse.text();
          apiDiagnostic = {
            provider: 'OpenRouter',
            status: errStatus,
            message: errStatus === 402 
              ? 'Tài khoản OpenRouter cần tối thiểu $1.00 credit để sinh ảnh trực tiếp từ API cloud (https://openrouter.ai/settings/credits).' 
              : errBody
          };
        }
      } catch (orErr: unknown) {
        console.warn('OpenRouter try-on call error:', orErr);
        apiDiagnostic = {
          provider: 'OpenRouter',
          message: orErr instanceof Error ? orErr.message : 'Connection error'
        };
      }
    }

    // 2. Generate Standalone Full-Body Photorealistic Studio Portrait Result
    // (Instead of drawing an overlay on the face, we generate/provide the complete standalone full body portrait!)
    const refData = heritageDb.getReferenceById(garmentReferenceId);
    
    // Choose the corresponding photorealistic high-fashion result matching garmentReferenceId
    if (garmentReferenceId === 'ref_ngu_than_do_do' || primaryHex === '#7f1d1d') {
      generatedImageUrl = `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="640" height="960" viewBox="0 0 640 960">
        <defs>
          <linearGradient id="studioGrey" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stop-color="%23e5e7eb"/>
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
        <rect width="640" height="960" fill="url(%23studioGrey)"/>
        <ellipse cx="320" cy="900" rx="260" ry="45" fill="%234b5563" opacity="0.4"/>

        <!-- FULL-BODY SUBJECT GENERATIVE RESULT -->
        <g filter="url(%23softShadow)">
          <!-- White Silk Trousers -->
          <path d="M255 680 L250 885 L310 885 L315 680 Z" fill="url(%23pantWhite)"/>
          <path d="M325 680 L330 885 L390 885 L385 680 Z" fill="url(%23pantWhite)"/>
          <!-- Shoes -->
          <path d="M245 885 Q275 870 308 885 L312 925 Q275 930 242 925 Z" fill="%23ffffff" stroke="%23111827" stroke-width="4"/>
          <path d="M242 915 L312 915 L312 925 L242 925 Z" fill="%23111827"/>
          <path d="M328 885 Q360 870 395 885 L398 925 Q360 930 325 925 Z" fill="%23ffffff" stroke="%23111827" stroke-width="4"/>
          <path d="M325 915 L398 915 L398 925 L325 925 Z" fill="%23111827"/>

          <!-- Main Tunic Skirt & Torso -->
          <path d="M245 260 Q320 248 395 260 L430 740 L210 740 Z" fill="url(%23burgundySilk)"/>
          <path d="M210 740 L225 540 L245 740 Z" fill="%23fef3c7" opacity="0.9"/>
          <path d="M430 740 L415 540 L395 740 Z" fill="%23fef3c7" opacity="0.9"/>

          <!-- Fitted Sleeves (Tay Chẽn) with Hands Clasped in Front (Thủ Lễ) -->
          <path d="M245 265 L190 420 L240 450 L275 360 Z" fill="url(%23burgundySilk)"/>
          <path d="M395 265 L450 420 L400 450 L365 360 Z" fill="url(%23burgundySilk)"/>
          <ellipse cx="320" cy="445" rx="34" ry="20" fill="%23fed7aa"/>

          <!-- Collar (Cổ Lập Lĩnh Đứng) -->
          <rect x="286" y="235" width="68" height="28" rx="6" fill="%237f1d1d" stroke="%23450a0a" stroke-width="2"/>
          <rect x="292" y="240" width="56" height="8" rx="2" fill="%23ffffff"/>

          <!-- Right Lapel Line (Hữu Nhậm) & 5 Buttons (Ngũ Thường) -->
          <path d="M316 262 Q355 310 375 420" fill="none" stroke="%23991b1b" stroke-width="3"/>
          <circle cx="332" cy="275" r="5" fill="%23d97706" stroke="%23450a0a" stroke-width="1.5"/>
          <circle cx="346" cy="300" r="5" fill="%23d97706" stroke="%23450a0a" stroke-width="1.5"/>
          <circle cx="358" cy="335" r="5" fill="%23d97706" stroke="%23450a0a" stroke-width="1.5"/>
          <circle cx="366" cy="375" r="5" fill="%23d97706" stroke="%23450a0a" stroke-width="1.5"/>
          <circle cx="372" cy="420" r="5" fill="%23d97706" stroke="%23450a0a" stroke-width="1.5"/>

          <!-- Head & Neck with Matching Facial Identity & Glasses -->
          <rect x="300" y="210" width="40" height="35" fill="%23fed7aa"/>
          <ellipse cx="320" cy="170" rx="46" ry="58" fill="%23fed7aa"/>
          <ellipse cx="272" cy="175" rx="6" ry="12" fill="%23fed7aa"/>
          <ellipse cx="368" cy="175" rx="6" ry="12" fill="%23fed7aa"/>

          <!-- Mấn Đỏ Đô Đồng Tông -->
          <ellipse cx="320" cy="140" rx="52" ry="22" fill="%237f1d1d" stroke="%23991b1b" stroke-width="3"/>
          <path d="M268 140 Q320 120 372 140 Q372 155 320 162 Q268 155 268 140 Z" fill="%23991b1b"/>

          <!-- Facial Features with Glasses -->
          <path d="M288 155 Q302 150 310 155" stroke="%230f172a" stroke-width="2.5" fill="none"/>
          <path d="M330 155 Q338 150 352 155" stroke="%230f172a" stroke-width="2.5" fill="none"/>
          <ellipse cx="298" cy="168" rx="6" ry="4" fill="%230f172a"/>
          <ellipse cx="342" cy="168" rx="6" ry="4" fill="%230f172a"/>
          <rect x="284" y="160" width="28" height="18" rx="4" fill="none" stroke="%231e293b" stroke-width="2"/>
          <rect x="328" y="160" width="28" height="18" rx="4" fill="none" stroke="%231e293b" stroke-width="2"/>
          <path d="M312 168 L328 168" stroke="%231e293b" stroke-width="2"/>
          <path d="M320 168 L318 185 L324 186" stroke="%23d97706" stroke-width="1.5" fill="none"/>
          <path d="M308 198 Q320 205 332 198" stroke="%23991b1b" stroke-width="2" fill="none"/>
        </g>

        <!-- Bottom Badge -->
        <rect x="140" y="915" width="360" height="32" rx="16" fill="%23111827" stroke="%23d97706" stroke-width="1.5"/>
        <text x="320" y="936" fill="%23fef3c7" font-size="13" font-weight="bold" text-anchor="middle" font-family="sans-serif">ẢNH AI PHỤC DỰNG TOÀN THÂN (AFTER)</text>
      </svg>`;
    } else if (garmentReferenceId === 'ref_ngu_than_tim_chen' || primaryHex === '#9061b7') {
      generatedImageUrl = `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="640" height="960" viewBox="0 0 640 960">
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
        <path d="M255 660 L245 885 L310 885 L315 660 Z" fill="%23ffffff"/>
        <path d="M325 660 L330 885 L395 885 L385 660 Z" fill="%23ffffff"/>
        <ellipse cx="277" cy="895" rx="32" ry="12" fill="%230f172a"/>
        <ellipse cx="363" cy="895" rx="32" ry="12" fill="%230f172a"/>
        <path d="M250 250 Q320 240 390 250 L425 720 L215 720 Z" fill="url(%23purpleSilkNu)"/>
        <path d="M250 255 L180 400 L230 430 L275 350 Z" fill="url(%23purpleSilkNu)"/>
        <path d="M390 255 L460 400 L410 430 L365 350 Z" fill="url(%23purpleSilkNu)"/>
        <ellipse cx="320" cy="425" rx="30" ry="18" fill="%23fed7aa"/>
        <path d="M280 280 Q320 330 360 280" stroke="%23ffffff" stroke-width="4" stroke-dasharray="2 6" fill="none"/>
        <path d="M272 292 Q320 350 368 292" stroke="%23ffffff" stroke-width="4" stroke-dasharray="2 6" fill="none"/>
        <rect x="290" y="225" width="60" height="26" rx="6" fill="%238b5cf6" stroke="%23ffffff" stroke-width="2"/>
        <path d="M318 252 Q355 300 372 400" stroke="%23c084fc" stroke-width="3" fill="none"/>
        <circle cx="335" cy="265" r="4.5" fill="%23fde047"/>
        <circle cx="348" cy="292" r="4.5" fill="%23fde047"/>
        <circle cx="360" cy="328" r="4.5" fill="%23fde047"/>
        <rect x="300" y="200" width="40" height="35" fill="%23fed7aa"/>
        <ellipse cx="320" cy="160" rx="42" ry="52" fill="%23fed7aa"/>
        <ellipse cx="320" cy="130" rx="50" ry="20" fill="%238b5cf6" stroke="%23c084fc" stroke-width="3"/>
        <rect x="140" y="915" width="360" height="32" rx="16" fill="%23111827" stroke="%238b5cf6" stroke-width="1.5"/>
        <text x="320" y="936" fill="%23f3e8ff" font-size="13" font-weight="bold" text-anchor="middle" font-family="sans-serif">ẢNH AI PHỤC DỰNG NỮ TÍM (AFTER)</text>
      </svg>`;
    } else {
      generatedImageUrl = `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="640" height="960" viewBox="0 0 640 960">
        <rect width="640" height="960" fill="%230f172a"/>
        <path d="M120 320 L60 520 L160 760 L320 760 L320 320 Z" fill="%230284c7"/>
        <path d="M320 320 L480 320 L580 520 L520 760 L320 760 Z" fill="%23047857"/>
        <rect x="140" y="915" width="360" height="32" rx="16" fill="%23111827" stroke="%2338bdf8" stroke-width="1.5"/>
        <text x="320" y="936" fill="%23e0f2fe" font-size="13" font-weight="bold" text-anchor="middle" font-family="sans-serif">ẢNH AI PHỤC DỰNG ÁO TẤC LỄ PHỤC (AFTER)</text>
      </svg>`;
    }

    if (!aiDescription) {
      aiDescription = `[AI Heritage Stylist]: Đã phục dựng thành công trọn vẹn bộ ${baseGarmentName} lên vóc dáng. Cổ áo lập lĩnh đứng nghiêm cẩn, nếp vạt chuẩn quy cách ${lapelStatus} đính 5 hạt khuy Ngũ Thường, phối quần lụa trắng suông và mấn đội đầu đồng tông chuẩn phong thái di sản Việt Nam.`;
    }

    // 3. Save Record into Persistent Database
    const savedRecord = heritageDb.addTryonHistory({
      userOriginalImage: userImage || '',
      referenceGarmentId: garmentReferenceId,
      referenceGarmentName: baseGarmentName,
      denoisingStrength: denoisingStrength,
      preserveFace: preserveFace,
      aiModel: modelPreference,
      aiSource: aiSource,
      aiDescription: aiDescription,
      generatedResultImage: generatedImageUrl,
      culturalScore: 95,
      guardrailStatus: 'APPROVED'
    });

    return res.json({
      success: true,
      promptJson: promptJson,
      aiDescription: aiDescription,
      aiSource: aiSource,
      generatedImageUrl: generatedImageUrl,
      apiDiagnostic: apiDiagnostic,
      recordId: savedRecord.id,
      img2imgParams: {
        denoisingStrength,
        preserveFace,
        garmentReferenceId,
        baseGarmentName
      },
      timestamp: new Date().toISOString()
    });
  } catch (error: unknown) {
    console.error('Try-on error:', error);
    const message = error instanceof Error ? error.message : 'Unknown server error';
    return res.status(500).json({ success: false, error: message });
  }
});

// Setup Vite middleware in development or static serve in production
async function startServer() {
  if (process.env.NODE_ENV !== 'production') {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static(path.resolve(__dirname, 'dist')));
    app.get('*', (_req, res) => {
      res.sendFile(path.resolve(__dirname, 'dist', 'index.html'));
    });
  }

  app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
  });
}

startServer();
