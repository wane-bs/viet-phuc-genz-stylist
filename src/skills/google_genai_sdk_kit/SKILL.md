---
name: "google-genai-sdk-kit"
description: >
  Hướng dẫn tích hợp Google GenAI SDK (@google/genai) trên Node.js/Express và Client-Side proxy.
  Hỗ trợ các mô hình gemini-3.8-flash, streaming, structured JSON schema và multimodal vision.
---

# Google GenAI SDK (@google/genai) Kit

## 1. Cài Đặt & Khởi Tạo SDK
\`\`\`bash
npm install @google/genai dotenv express
\`\`\`

### Khởi tạo Server-Side:
\`\`\`typescript
import { GoogleGenAI } from '@google/genai';
import dotenv from 'dotenv';

dotenv.config();

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
  httpOptions: {
    headers: {
      'User-Agent': 'aistudio-build',
    }
  }
});
\`\`\`

## 2. Gọi Model Với System Instruction
\`\`\`typescript
const response = await ai.models.generateContent({
  model: 'gemini-3.8-flash',
  contents: 'Hãy tư vấn cách phối Áo Ngũ Thân đi xem concert nhạc rock.',
  config: {
    systemInstruction: 'Bạn là Chuyên gia Cổ phục Việt Nam & Cố vấn Gen Z...',
    temperature: 0.7,
  }
});

console.log(response.text);
\`\`\`

## 3. Trả Về Dữ Liệu JSON Chuẩn Hóa
\`\`\`typescript
import { Type } from '@google/genai';

const response = await ai.models.generateContent({
  model: 'gemini-3.8-flash',
  contents: 'Đánh giá set đồ áo tấc đi lễ chùa.',
  config: {
    responseMimeType: 'application/json',
    responseSchema: {
      type: Type.OBJECT,
      properties: {
        score: { type: Type.NUMBER },
        verdict: { type: Type.STRING },
        advice: { type: Type.STRING }
      },
      required: ['score', 'verdict', 'advice']
    }
  }
});
\`\`\`
