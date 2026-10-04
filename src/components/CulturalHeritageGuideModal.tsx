import React from 'react';
import { 
  X, 
  BookOpen, 
  ShieldAlert, 
  Scroll, 
  Compass, 
  CheckCircle2, 
  AlertTriangle,
  Award,
  Sparkles
} from 'lucide-react';
import { GARMENTS_CATALOG } from '../data/garmentsData';

interface CulturalHeritageGuideModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const CulturalHeritageGuideModal: React.FC<CulturalHeritageGuideModalProps> = ({
  isOpen,
  onClose
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
      <div 
        className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto bg-[#0f172a] border border-slate-700 rounded-2xl p-6 shadow-2xl space-y-6 text-slate-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-800">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-500/20 border border-amber-500/40 text-amber-400 flex items-center justify-center">
              <Scroll className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg font-black text-white tracking-tight">
                Thư Viện Điển Chế & Ranh Giới Cổ Phục Việt Nam
              </h3>
              <p className="text-xs text-slate-400">
                Tư liệu khảo cứu lịch sử, triết lý nếp áo và hướng dẫn bảo tồn di sản cho Gen Z
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* 1. SECTION: CỘT MỐC 1744 & ĐỊNH CHẾ QUỐC PHỤC */}
        <div className="p-4 rounded-xl bg-slate-900/90 border border-slate-800 space-y-3">
          <div className="flex items-center gap-2 text-amber-400 font-bold text-sm">
            <Award className="w-4 h-4" />
            <span>01. Cột Mốc Năm 1744: Khai Sinh Áo Dài Ngũ Thân</span>
          </div>
          <p className="text-xs leading-relaxed text-slate-300">
            Vào năm Giáp Tý (1744), Chúa Vũ Vương <b>Nguyễn Phúc Khoát</b> tại Đàng Trong đã ban hành sắc lệnh cải cách trang phục, định hình chiếc <b>Áo Ngũ Thân</b> với cổ lập lĩnh (cổ đứng), cài cúc sang phải. Đến năm 1827 - 1837, vua <b>Minh Mạng</b> chuẩn hóa sắc lệnh này trên toàn cõi Việt Nam, thống nhất trang phục từ Bắc chí Nam, chính thức xác lập bản sắc quốc phục của người Việt.
          </p>
        </div>

        {/* 2. SECTION: CULTURAL GUARDRAILS TABLE (QUY CHUẨN RANH GIỚI) */}
        <div className="space-y-3">
          <div className="flex items-center gap-2 text-rose-400 font-bold text-sm">
            <ShieldAlert className="w-4 h-4" />
            <span>02. Bộ Lọc Ranh Giới Văn Hóa (Cultural Guardrails Matrix)</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs">
            {/* Safe zone */}
            <div className="p-3.5 rounded-xl bg-emerald-950/30 border border-emerald-800/80 space-y-2">
              <div className="font-bold text-emerald-300 flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span>VÙNG AN TOÀN (100% Valid)</span>
              </div>
              <ul className="space-y-1.5 text-slate-300 text-[11px] list-disc list-inside">
                <li>Vạt trái đè lên vạt phải (cài cúc sườn phải).</li>
                <li>Cổ lập lĩnh vuông vắn, không khoét sâu.</li>
                <li>Đủ 5 hạt cúc tượng trưng Ngũ Thường.</li>
                <li>Phối sneaker monochrome, kính retro đi concert.</li>
              </ul>
            </div>

            {/* Warning zone */}
            <div className="p-3.5 rounded-xl bg-amber-950/30 border border-amber-800/80 space-y-2">
              <div className="font-bold text-amber-300 flex items-center gap-1.5">
                <AlertTriangle className="w-4 h-4 text-amber-400" />
                <span>CẢNH BÁO VÀNG (Lưu Ý)</span>
              </div>
              <ul className="space-y-1.5 text-slate-300 text-[11px] list-disc list-inside">
                <li>Sử dụng rồng 5 móng (long văn hoàng gia) khi đi cà phê vỉa hè.</li>
                <li>Phối quần túi hộp quá hầm hố khi yết bái đền chùa.</li>
                <li>Biến tấu vượt quá 20% tại không gian linh thiêng.</li>
              </ul>
            </div>

            {/* Danger zone */}
            <div className="p-3.5 rounded-xl bg-red-950/40 border border-red-800/80 space-y-2">
              <div className="font-bold text-red-300 flex items-center gap-1.5">
                <ShieldAlert className="w-4 h-4 text-red-400" />
                <span>VI PHẠM ĐỎ (CẤM TUYỆT ĐỐI)</span>
              </div>
              <ul className="space-y-1.5 text-red-200 text-[11px] list-disc list-inside">
                <li><b>Cài vạt sang bên trái</b> (Quy chuẩn liệm tử phục/tang ma).</li>
                <li>Mặc quần short siêu ngắn lộ đùi khi đi lễ đền chùa.</li>
                <li>Xẻ tà quá cao lộ nội y phản cảm.</li>
                <li>Vải xuyên thấu lộ rõ cơ thể nơi thờ tự.</li>
              </ul>
            </div>
          </div>
        </div>

        {/* 3. SECTION: CATALOG OF ORIGINAL GARMENTS */}
        <div className="space-y-3">
          <div className="flex items-center gap-2 text-cyan-400 font-bold text-sm">
            <BookOpen className="w-4 h-4" />
            <span>03. Bản Đồ Các Dòng Phục Trang Cốt Lõi</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {Object.entries(GARMENTS_CATALOG).map(([key, item]) => (
              <div key={key} className="p-3.5 rounded-xl bg-slate-900 border border-slate-800 space-y-1.5 text-xs">
                <div className="flex items-center justify-between">
                  <h4 className="font-bold text-white">{item.name}</h4>
                  <span className="text-[10px] font-mono text-amber-400 px-1.5 py-0.5 rounded bg-amber-950/60 border border-amber-800/60">
                    {item.decreeYear}
                  </span>
                </div>
                <p className="text-slate-300 text-[11px] leading-relaxed">
                  {item.originDescription}
                </p>
                <div className="pt-1 text-[11px] text-slate-400 italic">
                  🏛️ <span className="font-medium not-italic text-slate-300">Ý nghĩa:</span> {item.philosophicalSymbolism}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div className="pt-4 border-t border-slate-800 flex items-center justify-between">
          <span className="text-xs text-slate-500">
            Dự án nghiên cứu & ứng dụng Việt Phục Remix Gen Z
          </span>
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white text-xs font-semibold transition-colors"
          >
            Đã Hiểu & Tiếp Tục Phối Đồ
          </button>
        </div>
      </div>
    </div>
  );
};
