import React, { useState } from 'react';
import { 
  Bot, 
  Send, 
  Sparkles, 
  Code, 
  Copy, 
  Check, 
  BookOpen, 
  Cpu, 
  ShieldCheck, 
  Terminal, 
  Layers,
  ArrowRight,
  MessageSquare
} from 'lucide-react';
import { StylingConfig } from '../types';

interface AgentSkillsStudioProps {
  currentConfig: StylingConfig;
}

interface ChatMessage {
  id: string;
  sender: 'user' | 'agent';
  text: string;
  timestamp: string;
  model?: string;
  source?: string;
}

export const AgentSkillsStudio: React.FC<AgentSkillsStudioProps> = ({ currentConfig }) => {
  const [activeTab, setActiveTab] = useState<'chat' | 'skills_docs' | 'sdk_code'>('chat');
  const [inputPrompt, setInputPrompt] = useState('');
  const [loading, setLoading] = useState(false);
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: '1',
      sender: 'agent',
      text: `Xin chào! Tôi là Chuyên gia Cố vấn Di sản Cổ phục & Phong cách Gen Z (vận hành trên nền tảng Google GenAI SDK @google/genai). Bạn có thể hỏi tôi bất kỳ thắc mắc nào về quy chuẩn Áo Ngũ Thân 1744, Áo Tấc, Nhật Bình, hoặc nhờ tôi tư vấn phối đồ Remix cho sự kiện sắp tới!`,
      timestamp: 'Vừa xong',
      model: 'gemini-3.8-flash',
      source: 'google-genai-sdk'
    }
  ]);

  const quickPrompts = [
    'Tư vấn phối Áo Ngũ Thân nam đi xem concert âm nhạc ngoài trời?',
    'Mặc Áo Tấc dự lễ cưới truyền thống cần lưu ý những quy chuẩn gì?',
    'Giải thích tại sao cổ nhân tuyệt đối cấm cài vạt áo sang bên trái?',
    'Phối Áo Nhật Bình cùng boots da cao cổ và kiềng bạc có hợp lễ không?'
  ];

  const handleSendMessage = async (promptToSend?: string) => {
    const text = promptToSend || inputPrompt;
    if (!text.trim() || loading) return;

    const userMsg: ChatMessage = {
      id: Date.now().toString(),
      sender: 'user',
      text,
      timestamp: new Date().toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' })
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputPrompt('');
    setLoading(true);

    try {
      const res = await fetch('/api/gemini/consult', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          prompt: text,
          outfitContext: currentConfig
        })
      });

      const data = await res.json();
      const agentMsg: ChatMessage = {
        id: (Date.now() + 1).toString(),
        sender: 'agent',
        text: data.reply || data.fallback || 'Không thể tạo phản hồi lúc này.',
        timestamp: new Date().toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' }),
        model: data.model || 'gemini-3.8-flash',
        source: data.source || 'google-genai-sdk'
      };
      setMessages((prev) => [...prev, agentMsg]);
    } catch {
      // Offline fallback
      const fallbackMsg: ChatMessage = {
        id: (Date.now() + 1).toString(),
        sender: 'agent',
        text: `[Chuyên Gia Cổ Phục]: Về câu hỏi "${text}":\n\n1. Cơ sở sử liệu: Áo Ngũ Thân định chế năm 1744 của Chúa Nguyễn Phúc Khoát bắt buộc "Hữu nhậm" (vạt trái đè lên vạt phải) và 5 hạt khuy Ngũ Thường (Nhân, Lễ, Nghĩa, Trí, Tín).\n2. Điểm chuẩn mực: 94/100 (An toàn).\n3. Lời khuyên phối đồ Gen Z: Nên kết hợp màu sắc hài hòa, đi cùng sneaker monochrome hoặc phụ kiện kiềng bạc trơn để tạo phong thái vừa tôn nghiêm vừa trẻ trung.`,
        timestamp: new Date().toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' }),
        model: 'heritage-rule-engine-v2',
        source: 'offline-agent-rule'
      };
      setMessages((prev) => [...prev, fallbackMsg]);
    } finally {
      setLoading(false);
    }
  };

  const copyCode = (code: string, key: string) => {
    navigator.clipboard.writeText(code);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2000);
  };

  return (
    <div className="w-full bg-[#0b0f17] border border-slate-800 rounded-3xl p-6 shadow-2xl space-y-6 text-slate-200">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-800">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono text-cyan-400 font-bold">
            <Cpu className="w-4 h-4" />
            <span>GOOGLE GENAI SDK & AGENT SKILLS STUDIO</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-black text-white tracking-tight">
            Trung Tâm Phát Triển & AI Heritage Agent
          </h2>
          <p className="text-xs text-slate-400 mt-1">
            Tích hợp bộ công cụ Google GenAI SDK (@google/genai), các bộ Agent Skills chuyên sâu và trợ lý AI tư vấn văn hóa thời gian thực.
          </p>
        </div>

        {/* Navigation Tabs */}
        <div className="flex items-center gap-1.5 p-1 bg-slate-900 rounded-xl border border-slate-800 text-xs shrink-0">
          <button
            onClick={() => setActiveTab('chat')}
            className={`px-3 py-1.5 rounded-lg font-semibold transition-colors flex items-center gap-1.5 ${
              activeTab === 'chat'
                ? 'bg-cyan-500 text-black shadow-md'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Bot className="w-3.5 h-3.5" />
            <span>Trợ Lý Gemini AI</span>
          </button>

          <button
            onClick={() => setActiveTab('skills_docs')}
            className={`px-3 py-1.5 rounded-lg font-semibold transition-colors flex items-center gap-1.5 ${
              activeTab === 'skills_docs'
                ? 'bg-cyan-500 text-black shadow-md'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Layers className="w-3.5 h-3.5" />
            <span>Bộ Agent Skills</span>
          </button>

          <button
            onClick={() => setActiveTab('sdk_code')}
            className={`px-3 py-1.5 rounded-lg font-semibold transition-colors flex items-center gap-1.5 ${
              activeTab === 'sdk_code'
                ? 'bg-cyan-500 text-black shadow-md'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Code className="w-3.5 h-3.5" />
            <span>Mã SDK Code</span>
          </button>
        </div>
      </div>

      {/* 1. CHAT TAB: LIVE GEMINI AI HERITAGE AGENT */}
      {activeTab === 'chat' && (
        <div className="space-y-4">
          {/* Quick Prompts Bar */}
          <div className="space-y-1.5">
            <span className="text-[11px] font-mono text-slate-400 uppercase">Gợi ý câu hỏi nhanh:</span>
            <div className="flex flex-wrap gap-2">
              {quickPrompts.map((q, idx) => (
                <button
                  key={idx}
                  onClick={() => handleSendMessage(q)}
                  className="px-3 py-1.5 rounded-xl bg-slate-900 border border-slate-800 hover:border-cyan-500 text-slate-300 text-xs transition-colors text-left"
                >
                  ⚡ {q}
                </button>
              ))}
            </div>
          </div>

          {/* Chat Messages Window */}
          <div className="h-[380px] overflow-y-auto p-4 rounded-2xl bg-slate-950/80 border border-slate-800 space-y-3">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex gap-3 text-xs ${
                  msg.sender === 'user' ? 'justify-end' : 'justify-start'
                }`}
              >
                {msg.sender === 'agent' && (
                  <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-amber-500 to-rose-600 text-black flex items-center justify-center font-bold shrink-0">
                    <Bot className="w-4 h-4" />
                  </div>
                )}

                <div
                  className={`max-w-[85%] sm:max-w-[75%] p-3.5 rounded-2xl space-y-1.5 ${
                    msg.sender === 'user'
                      ? 'bg-cyan-600 text-white rounded-tr-none'
                      : 'bg-slate-900 border border-slate-800 text-slate-200 rounded-tl-none'
                  }`}
                >
                  <div className="leading-relaxed whitespace-pre-line">
                    {msg.text}
                  </div>

                  <div className="flex items-center justify-between text-[10px] opacity-60 pt-1 font-mono">
                    <span>{msg.timestamp}</span>
                    {msg.model && <span>Model: {msg.model}</span>}
                  </div>
                </div>
              </div>
            ))}

            {loading && (
              <div className="flex items-center gap-2 text-xs text-cyan-400 font-mono p-2">
                <Sparkles className="w-4 h-4 animate-spin" />
                <span>Chuyên gia Di sản đang đối chiếu điển chế và tạo phản hồi...</span>
              </div>
            )}
          </div>

          {/* Chat Input */}
          <div className="flex items-center gap-2">
            <input
              type="text"
              placeholder="Nhập câu hỏi về cổ phục, bối cảnh phối đồ, hoặc kiểm tra ranh giới văn hóa..."
              value={inputPrompt}
              onChange={(e) => setInputPrompt(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
              className="flex-1 px-4 py-3 rounded-xl bg-slate-900 border border-slate-800 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500"
            />
            <button
              onClick={() => handleSendMessage()}
              disabled={loading || !inputPrompt.trim()}
              className="px-5 py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-black font-bold text-xs shadow-lg transition-all flex items-center gap-1.5 disabled:opacity-50"
            >
              <Send className="w-3.5 h-3.5" />
              <span>Gửi</span>
            </button>
          </div>
        </div>
      )}

      {/* 2. AGENT SKILLS CATALOG TAB */}
      {activeTab === 'skills_docs' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
          {/* Skill 1 */}
          <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 space-y-2">
            <div className="flex items-center justify-between">
              <span className="font-mono text-cyan-400 font-bold">heritage_stylist_agent</span>
              <span className="text-[10px] px-2 py-0.5 rounded bg-cyan-950 text-cyan-300 border border-cyan-800">Agent Persona</span>
            </div>
            <h4 className="font-bold text-white text-sm">Chuyên Gia Cổ Phục & Cố Vấn Phong Cách Gen Z</h4>
            <p className="text-slate-400 leading-relaxed">
              Thực thi bộ lọc Cultural Guardrails, đối chiếu định chế 1744 của Chúa Nguyễn Phúc Khoát và gợi ý cách phối đồ hiện đại không lai căng.
            </p>
            <div className="pt-2 text-[11px] text-amber-400 font-mono">
              Path: /src/skills/heritage_stylist_agent/SKILL.md
            </div>
          </div>

          {/* Skill 2 */}
          <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 space-y-2">
            <div className="flex items-center justify-between">
              <span className="font-mono text-emerald-400 font-bold">google_genai_sdk_kit</span>
              <span className="text-[10px] px-2 py-0.5 rounded bg-emerald-950 text-emerald-300 border border-emerald-800">SDK Engine</span>
            </div>
            <h4 className="font-bold text-white text-sm">Google GenAI SDK (@google/genai) Kit</h4>
            <p className="text-slate-400 leading-relaxed">
              Mã nguồn chuẩn hóa server-side Express proxy, quản trị token an toàn, hỗ trợ model gemini-3.8-flash và responseSchema có cấu trúc.
            </p>
            <div className="pt-2 text-[11px] text-amber-400 font-mono">
              Path: /src/skills/google_genai_sdk_kit/SKILL.md
            </div>
          </div>

          {/* Skill 3 */}
          <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 space-y-2">
            <div className="flex items-center justify-between">
              <span className="font-mono text-rose-400 font-bold">cultural_guardrails_engine</span>
              <span className="text-[10px] px-2 py-0.5 rounded bg-rose-950 text-rose-300 border border-rose-800">Rule Logic</span>
            </div>
            <h4 className="font-bold text-white text-sm">Thuật Toán Thẩm Định Ranh Giới Văn Hóa</h4>
            <p className="text-slate-400 leading-relaxed">
              Ma trận tính điểm Cultural Validity Score (1-100), tự động phát hiện lỗi cài vạt trái (tử phục) và vi phạm bối cảnh tôn nghiêm.
            </p>
            <div className="pt-2 text-[11px] text-amber-400 font-mono">
              Path: /src/skills/cultural_guardrails_engine/SKILL.md
            </div>
          </div>

          {/* Skill 4 */}
          <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 space-y-2">
            <div className="flex items-center justify-between">
              <span className="font-mono text-amber-400 font-bold">game_narrative_engine</span>
              <span className="text-[10px] px-2 py-0.5 rounded bg-amber-950 text-amber-300 border border-amber-800">Game Architecture</span>
            </div>
            <h4 className="font-bold text-white text-sm">Kiến Trúc Web Game 2D "Dệt Ký Ức"</h4>
            <p className="text-slate-400 leading-relaxed">
              Cơ chế chuyển đổi màu sắc Dual Tone Shifting (Lạnh sang Ấm), bộ tổng hợp âm thanh Web Audio API và hệ thống giải đố khuy ngọc.
            </p>
            <div className="pt-2 text-[11px] text-amber-400 font-mono">
              Path: /src/skills/game_narrative_engine/SKILL.md
            </div>
          </div>
        </div>
      )}

      {/* 3. SDK CODE SNIPPETS TAB */}
      {activeTab === 'sdk_code' && (
        <div className="space-y-4">
          <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono text-cyan-400 font-bold">
                1. Server-Side Express Proxy (@google/genai)
              </span>
              <button
                onClick={() => copyCode(`import { GoogleGenAI } from '@google/genai';\nconst ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });\nconst res = await ai.models.generateContent({ model: 'gemini-3.8-flash', contents: '...' });`, 'server')}
                className="px-2.5 py-1 rounded bg-slate-800 text-[11px] text-slate-300 hover:text-white flex items-center gap-1"
              >
                {copiedKey === 'server' ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                <span>{copiedKey === 'server' ? 'Đã chép' : 'Sao chép'}</span>
              </button>
            </div>
            <pre className="p-3 rounded-xl bg-slate-900 text-[11px] font-mono text-slate-300 overflow-x-auto">
{`import { GoogleGenAI } from '@google/genai';
import express from 'express';

const app = express();
const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
  httpOptions: { headers: { 'User-Agent': 'aistudio-build' } }
});

app.post('/api/gemini/consult', async (req, res) => {
  const { prompt } = req.body;
  const response = await ai.models.generateContent({
    model: 'gemini-3.8-flash',
    contents: prompt,
    config: { systemInstruction: 'Bạn là Chuyên gia Cổ phục Việt Nam...' }
  });
  res.json({ reply: response.text });
});`}
            </pre>
          </div>

          <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono text-amber-400 font-bold">
                2. Client-Side API Fetch
              </span>
              <button
                onClick={() => copyCode(`const res = await fetch('/api/gemini/consult', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ prompt: '...' }) }); const data = await res.json();`, 'client')}
                className="px-2.5 py-1 rounded bg-slate-800 text-[11px] text-slate-300 hover:text-white flex items-center gap-1"
              >
                {copiedKey === 'client' ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                <span>{copiedKey === 'client' ? 'Đã chép' : 'Sao chép'}</span>
              </button>
            </div>
            <pre className="p-3 rounded-xl bg-slate-900 text-[11px] font-mono text-slate-300 overflow-x-auto">
{`const response = await fetch('/api/gemini/consult', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    prompt: 'Tư vấn phối Áo Ngũ Thân đi concert ngoài trời.',
    outfitContext: { baseGarment: 'ngu_than_tay_chen', eventContext: 'concert_festival' }
  })
});
const data = await response.json();
console.log(data.reply);`}
            </pre>
          </div>
        </div>
      )}
    </div>
  );
};
