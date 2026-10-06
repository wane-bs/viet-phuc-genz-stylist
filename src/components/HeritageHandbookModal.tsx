import React, { useState } from 'react';
import { BookOpen, X, ChevronLeft, ChevronRight, ShieldCheck, Sparkles, Scroll } from 'lucide-react';

interface HeritageHandbookModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialPage?: number;
}

interface HandbookPage {
  chapter: string;
  title: string;
  subtitle: string;
  source: string;
  coreRule: string;
  quote?: string;
  bullets: { label: string; text: string }[];
  visualCue: string;
}

const HANDBOOK_PAGES: HandbookPage[] = [
  {
    chapter: 'Chương I',
    title: 'Định Chế Áo Ngũ Thân Triều Nguyễn',
    subtitle: 'Nguồn gốc năm 1744 & Chuẩn hóa toàn quốc thời vua Minh Mạng',
    source: 'Đại Nam Thực Lục Tiền Biên & Khâm Định Đại Nam Hội Điển Sự Lệ',
    coreRule: 'Áo ngũ thân là gốc rễ của quốc phục Việt Nam, ra đời từ khát vọng khẳng định bản sắc văn hóa phương Nam.',
    quote: 'Năm Giáp Tý 1744, chúa Võ Vương Nguyễn Phúc Khoát ban sắc dụ cải cách y phục tại phủ Phú Xuân, định chế áo năm thân cài khuy lập lĩnh.',
    bullets: [
      { label: 'Cấu trúc 5 thân:', text: '4 thân ngoài tượng trưng cho "Tứ Thân Phụ Mẫu" (cha mẹ mình và cha mẹ người phối ngẫu), thân thứ 5 lót bên trong che chở tượng trưng cho bản thân người mặc.' },
      { label: 'Cổ lập lĩnh:', text: 'Cổ đứng vuông tròn cao 2–4cm, ôm khít cổ thể hiện sự đoan chính, trang nghiêm.' },
      { label: 'Tay chẽn & Tay thụng:', text: 'Tay chẽn gọn gàng cho sinh hoạt; tay thụng (Áo Tấc) dài rộng phủ bàn tay cho đại lễ tế tự.' }
    ],
    visualCue: '5 thân ghép vải · Cổ đứng lập lĩnh · Nẹp trung phùng'
  },
  {
    chapter: 'Chương II',
    title: '5 Hạt Khuy Ngọc & Ngũ Thường',
    subtitle: 'Triết lý làm người gửi gắm trong từng điểm cài cúc',
    source: 'Nho gia cổ truyền & Mỹ học trang phục cung đình Huế',
    coreRule: 'Năm hạt cúc áo ngũ thân là bài học luân lý thường nhật về đạo làm người: Nhân - Lễ - Nghĩa - Trí - Tín.',
    quote: 'Mỗi lần cài cúc áo là một lần người mặc tự nhắc nhở bản thân về năm đức tính căn bản của bậc quân tử.',
    bullets: [
      { label: '1. Khuy Nhân (Cổ áo):', text: 'Lòng nhân ái, từ bi, bao dung đối với muôn loài và đồng bào.' },
      { label: '2. Khuy Lễ (Ngực áo):', text: 'Sự đoan trang, trật tự, tôn kính lễ nghi tiền nhân và đạo đức xã hội.' },
      { label: '3. Khuy Nghĩa (Sườn nách phải):', text: 'Ngay thẳng, trượng nghĩa, phân biệt rõ phải trái và bảo vệ chính nghĩa.' },
      { label: '4. Khuy Trí (Bụng phải):', text: 'Sự sáng suốt, minh triết, học hỏi không ngừng để giữ gìn gia phong.' },
      { label: '5. Khuy Tín (Hông phải):', text: 'Giữ trọn lời ước, trung thực thủy chung, nhất ngôn cửu đỉnh.' }
    ],
    visualCue: 'Ngũ Thường: Nhân · Lễ · Nghĩa · Trí · Tín'
  },
  {
    chapter: 'Chương III',
    title: 'Ranh Giới Vạt: Hữu Nhậm vs Tả Nhậm',
    subtitle: 'Quy chuẩn sinh tử tối thượng của cổ phục Á Đông',
    source: 'Khâm Định Đại Nam Hội Điển Sự Lệ & Cổ lễ Đông Chu',
    coreRule: 'TUYỆT ĐỐI cài vạt sang phải (Hữu nhậm - vạt trái đè vạt phải). Cài sang trái (Tả nhậm) là tử phục dành cho người khuất.',
    quote: '"Hữu nhậm vi nhân, Tả nhậm vi quỷ" - Người sống cài vạt sang phải, chỉ người đã mất khi liệm mới cài vạt sang trái.',
    bullets: [
      { label: 'Quy chuẩn đúng (Hữu nhậm):', text: 'Vạt trái phủ lên trên vạt phải, cài cúc dọc theo cổ xuống nách và sườn bên phải.' },
      { label: 'Lỗi cấm kỵ (Tả nhậm):', text: 'Vạt phải đè vạt trái là trang phục khâm liệm tang ma, mang hàm nghĩa điềm gở và oán khí cõi âm.' },
      { label: 'Cảnh báo đỏ Stylist:', text: 'Mọi thiết kế remix bắt buộc phải giữ nguyên vạt cài sang phải, không được tự ý lật ngược vì thẩm mỹ sơ suất.' }
    ],
    visualCue: 'Bắt buộc: Vạt Trái đè Vạt Phải · Cài sườn bên PHẢI'
  },
  {
    chapter: 'Chương IV',
    title: 'Dòng Chảy Cổ Phục & Sự Tiến Hóa',
    subtitle: 'Từ Giao Lĩnh, Tứ Thân, Nhật Bình đến Áo Dài Thế Kỷ 20',
    source: 'Ngàn Năm Áo Mũ (Trần Quang Đức) & Khảo cứu mỹ thuật Việt Nam',
    coreRule: 'Việt phục không đứng yên mà là một dòng chảy thẩm mỹ uyển chuyển qua từng triều đại.',
    quote: 'Mỗi thời đại kế thừa tinh hoa của tiền nhân và dung nạp hơi thở mới của đời sống đương thời.',
    bullets: [
      { label: 'Áo Giao Lĩnh (Lý - Trần - Lê):', text: 'Cổ áo giao nhau trước ngực, ống tay rộng, phong thái phóng khoáng cổ điển.' },
      { label: 'Áo Nhật Bình (Triều Nguyễn):', text: 'Thường phục hậu phi cung đình với nẹp cổ hình chữ nhật và dải tay áo ngũ sắc tượng trưng ngũ hành.' },
      { label: 'Áo Tứ Thân (Kinh Bắc):', text: 'Bốn vạt áo dân gian mộc mạc gắn liền chiếc yếm đào, thắt lưng lụa và nón quai thao.' },
      { label: 'Áo Dài Lemur & Lê Phổ (1930s):', text: 'Cách tân áo ngũ thân giao thoa phong cách phương Tây, tạo nên tiền đề Áo Dài hiện đại.' }
    ],
    visualCue: 'Giao Lĩnh ➔ Ngũ Thân ➔ Nhật Bình ➔ Áo Dài Đương Đại'
  },
  {
    chapter: 'Chương V',
    title: 'Ranh Giới Remix Đương Đại Cho Gen Z',
    subtitle: 'Cân bằng giữa tôn nghiêm truyền thống và tự do sáng tạo',
    source: 'Bộ Tiêu Chuẩn Cultural Guardrails & Hướng Dẫn Phong Cách Gen Z',
    coreRule: 'Sáng tạo tôn trọng cội nguồn: Phân định rạch ròi giữa chốn tôn nghiêm và không gian đời thường.',
    quote: 'Remix Việt phục không phải là làm mất đi hồn cốt, mà là mang di sản sống động bước vào nhịp thở hôm nay.',
    bullets: [
      { label: 'Chốn tôn nghiêm (Đền, Chùa, Cúng tế):', text: 'Mức độ biến tấu tối đa 10%–20%. Nghiêm cấm quần short ngắn, vải xuyên thấu lộ nội y hay xẻ tà hở hang.' },
      { label: 'Đời thường & Nghệ thuật (Dạo phố, Concert):', text: 'Khuyến khích biến tấu 50%–70% cùng Sneaker, Quần Cargo, Blazer, Kính râm cá tính.' },
      { label: 'Biểu tượng quyền lực:', text: 'Họa tiết Rồng 5 móng chỉ dành riêng cho Hoàng đế, tránh sử dụng bừa bãi làm trang phục dạo phố.' }
    ],
    visualCue: 'Tôn nghiêm: 10–20% · Đời thường: 50–70% Tự do Remix'
  }
];

export const HeritageHandbookModal: React.FC<HeritageHandbookModalProps> = ({
  isOpen,
  onClose,
  initialPage = 0
}) => {
  const [currentPage, setCurrentPage] = useState(initialPage);

  if (!isOpen) return null;

  const page = HANDBOOK_PAGES[currentPage];

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-black/80 backdrop-blur-md animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div 
        className="relative w-full max-w-2xl bg-gradient-to-b from-[#131b2e] via-[#0d1424] to-[#090d18] border border-amber-500/30 rounded-3xl p-5 sm:p-7 shadow-2xl text-slate-100 flex flex-col justify-between max-h-[92vh] overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Subtle royal pattern decor */}
        <div className="absolute top-0 right-0 w-36 h-36 bg-amber-500/5 rounded-full blur-2xl pointer-events-none" />

        {/* Top Header */}
        <div className="flex items-center justify-between pb-3 border-b border-slate-800/80">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-amber-500/20 border border-amber-500/40 flex items-center justify-center text-amber-300">
              <Scroll className="w-4 h-4" />
            </div>
            <div>
              <span className="text-[10px] font-mono tracking-widest text-amber-400 font-bold uppercase">
                SỔ TAY DI SẢN HOÀNG CUNG
              </span>
              <div className="text-xs text-slate-400">
                Khảo cứu Cung đình Triều Nguyễn & Quy chuẩn Y phục
              </div>
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-8 h-8 rounded-xl bg-slate-800/80 hover:bg-slate-700 text-slate-400 hover:text-white flex items-center justify-center transition-colors cursor-pointer"
            title="Đóng sổ tay"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Book Page Content */}
        <div className="my-4 space-y-3.5 flex-1 overflow-y-auto pr-1">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold font-mono px-2.5 py-0.5 rounded-full bg-amber-500/10 text-amber-300 border border-amber-500/30">
              {page.chapter}
            </span>
            <span className="text-[11px] font-mono text-slate-400">
              Trang {currentPage + 1} / {HANDBOOK_PAGES.length}
            </span>
          </div>

          <div>
            <h2 className="text-lg sm:text-xl font-black text-white tracking-tight">
              {page.title}
            </h2>
            <p className="text-xs text-slate-400 mt-0.5">
              {page.subtitle}
            </p>
          </div>

          {/* Quote Block */}
          {page.quote && (
            <div className="p-3 rounded-2xl bg-amber-950/20 border-l-2 border-amber-500 text-xs text-amber-200/90 italic leading-relaxed">
              "{page.quote}"
            </div>
          )}

          {/* Bullet Points */}
          <div className="space-y-2">
            {page.bullets.map((b, idx) => (
              <div key={idx} className="p-2.5 rounded-xl bg-slate-900/60 border border-slate-800/80 text-xs leading-relaxed">
                <span className="font-bold text-amber-300 mr-1.5">{b.label}</span>
                <span className="text-slate-300">{b.text}</span>
              </div>
            ))}
          </div>

          {/* Visual Cue Badge */}
          <div className="pt-1 flex items-center justify-between text-[11px] text-slate-400">
            <span className="flex items-center gap-1.5 text-cyan-400 font-mono">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Ghi nhớ: {page.visualCue}</span>
            </span>
            <span className="italic text-[10px] text-slate-500 hidden sm:inline">
              Nguồn: {page.source}
            </span>
          </div>
        </div>

        {/* Bottom Pagination Controls */}
        <div className="pt-3 border-t border-slate-800/80 flex items-center justify-between gap-3">
          <button
            onClick={() => setCurrentPage((prev) => Math.max(0, prev - 1))}
            disabled={currentPage === 0}
            className={`px-3 py-1.5 rounded-xl text-xs font-semibold flex items-center gap-1 transition-all ${
              currentPage === 0 
                ? 'opacity-40 text-slate-600 cursor-not-allowed' 
                : 'text-slate-300 hover:text-white bg-slate-800 hover:bg-slate-700 cursor-pointer'
            }`}
          >
            <ChevronLeft className="w-4 h-4" />
            <span>Trang Trước</span>
          </button>

          {/* Page Indicators */}
          <div className="flex items-center gap-1.5">
            {HANDBOOK_PAGES.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrentPage(i)}
                className={`h-2 rounded-full transition-all cursor-pointer ${
                  currentPage === i ? 'w-6 bg-amber-400' : 'w-2 bg-slate-700 hover:bg-slate-500'
                }`}
                title={`Đến trang ${i + 1}`}
              />
            ))}
          </div>

          <button
            onClick={() => setCurrentPage((prev) => Math.min(HANDBOOK_PAGES.length - 1, prev + 1))}
            disabled={currentPage === HANDBOOK_PAGES.length - 1}
            className={`px-3 py-1.5 rounded-xl text-xs font-semibold flex items-center gap-1 transition-all ${
              currentPage === HANDBOOK_PAGES.length - 1 
                ? 'opacity-40 text-slate-600 cursor-not-allowed' 
                : 'text-black bg-amber-400 hover:bg-amber-300 shadow-md shadow-amber-500/20 cursor-pointer'
            }`}
          >
            <span>Trang Kế</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
