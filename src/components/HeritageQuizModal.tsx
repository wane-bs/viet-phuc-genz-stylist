import React, { useState } from 'react';
import { X, CheckCircle, XCircle, Award, HelpCircle, RotateCcw, Sparkles } from 'lucide-react';

interface Question {
  id: number;
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

const QUIZ_QUESTIONS: Question[] = [
  {
    id: 1,
    question: 'Theo quy chuẩn cổ phục Việt Nam, vạt áo bắt buộc phải cài theo chiều nào?',
    options: [
      'Vạt trái đè vạt phải, cài cúc bên sườn phải (Hữu nhậm)',
      'Vạt phải đè vạt trái, cài cúc bên sườn trái (Tả nhậm)',
      'Cài thẳng ở giữa ngực như áo sơ mi hiện đại',
      'Cài sang bên nào cũng được tùy sở thích'
    ],
    correctIndex: 0,
    explanation: 'Chính xác! "Hữu nhậm" (vạt trái đè phải cài sang sườn phải) là chuẩn mực cho người sống. Cài sang trái là "Tả nhậm", chỉ dùng cho tử phục (khâm liệm người đã khuất).'
  },
  {
    id: 2,
    question: '5 chiếc cúc áo trên chiếc Áo Ngũ Thân tượng trưng cho đạo lý nào?',
    options: [
      'Ngũ Hành: Kim, Mộc, Thủy, Hỏa, Thổ',
      'Ngũ Thường: Nhân, Lễ, Nghĩa, Trí, Tín',
      '5 châu lục trên thế giới',
      '5 mùa trong năm theo lịch nông nghiệp'
    ],
    correctIndex: 1,
    explanation: 'Chuẩn xác! 5 chiếc cúc áo (nữu) của áo ngũ thân đại diện cho Ngũ Thường (Nhân, Lễ, Nghĩa, Trí, Tín) nhắc nhở người mặc luôn giữ tròn nhân cách làm người.'
  },
  {
    id: 3,
    question: 'Sắc lệnh định hình Áo Ngũ Thân làm tiền thân áo dài Việt Nam ra đời năm nào?',
    options: [
      'Năm 1010 (Vua Lý Thái Tổ dời đô về Thăng Long)',
      'Năm 1744 (Chúa Nguyễn Phúc Khoát ban hành tại Đàng Trong)',
      'Năm 1930 (Họa sĩ Cát Tường vẽ áo Lemur)',
      'Năm 1986 (Thời kỳ Đổi mới)'
    ],
    correctIndex: 1,
    explanation: 'Tuyệt vời! Năm Giáp Tý 1744, chúa Vũ Vương Nguyễn Phúc Khoát đã ban hành quy định trang phục Đàng Trong, đặt nền móng cho áo ngũ thân và áo dài truyền thống.'
  },
  {
    id: 4,
    question: 'Điểm khác biệt dễ nhận biết nhất giữa Áo Tấc và Áo Ngũ Thân Tay Chẽn là gì?',
    options: [
      'Áo Tấc không có cúc áo',
      'Áo Tấc có ống tay thụng rộng 30-40cm buông dài quá ngón tay',
      'Áo Tấc chỉ may bằng chất liệu vải denim',
      'Áo Tấc có màu đen tuyền tuyệt đối'
    ],
    correctIndex: 1,
    explanation: 'Chính xác! Áo Tấc là áo ngũ thân tay thụng, tay áo may rộng chừng 1 tấc và dài quá tay, dùng cho các dịp đại lễ trang trọng.'
  },
  {
    id: 5,
    question: 'Họa tiết rồng 5 móng (Long văn cửu ngũ chí tôn) trong thời Nguyễn thuộc về ai?',
    options: [
      'Tất cả mọi người dân trong kinh thành',
      'Đặc quyền tuyệt đối của Hoàng Đế',
      'Các nghệ sĩ biểu diễn hát bội',
      'Học sinh đỗ tú tài'
    ],
    correctIndex: 1,
    explanation: 'Rất am hiểu! Rồng 5 móng là biểu tượng tối thượng của Hoàng đế. Quan lại và dân gian chỉ được dùng hoa văn Giao, Mãng (4 móng) hoặc Phượng, hoa cỏ.'
  }
];

interface HeritageQuizModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const HeritageQuizModal: React.FC<HeritageQuizModalProps> = ({ isOpen, onClose }) => {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [selectedOpt, setSelectedOpt] = useState<number | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [score, setScore] = useState(0);
  const [isFinished, setIsFinished] = useState(false);

  if (!isOpen) return null;

  const currentQ = QUIZ_QUESTIONS[currentIdx];

  const handleSelectOption = (idx: number) => {
    if (isAnswered) return;
    setSelectedOpt(idx);
    setIsAnswered(true);

    if (idx === currentQ.correctIndex) {
      setScore(prev => prev + 1);
    }
  };

  const handleNext = () => {
    if (currentIdx < QUIZ_QUESTIONS.length - 1) {
      setCurrentIdx(prev => prev + 1);
      setSelectedOpt(null);
      setIsAnswered(false);
    } else {
      setIsFinished(true);
    }
  };

  const handleRestart = () => {
    setCurrentIdx(0);
    setSelectedOpt(null);
    setIsAnswered(false);
    setScore(0);
    setIsFinished(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
      <div 
        className="relative w-full max-w-lg bg-[#0f172a] border border-slate-700 rounded-2xl p-6 shadow-2xl space-y-5 text-slate-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-slate-800">
          <div className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-amber-400" />
            <h3 className="text-base font-bold text-white tracking-wide">
              Trắc Nghiệm Di Sản: Thử Tài Sĩ Tử Gen Z
            </h3>
          </div>
          <button onClick={onClose} className="p-1 rounded-lg bg-slate-800 text-slate-400 hover:text-white">
            <X className="w-5 h-5" />
          </button>
        </div>

        {!isFinished ? (
          <div className="space-y-4">
            {/* Progress */}
            <div className="flex items-center justify-between text-xs text-slate-400 font-mono">
              <span>Câu hỏi {currentIdx + 1} / {QUIZ_QUESTIONS.length}</span>
              <span>Điểm số: <b className="text-cyan-400">{score}</b> / {QUIZ_QUESTIONS.length}</span>
            </div>

            <div className="w-full h-1.5 bg-slate-800 rounded-full overflow-hidden">
              <div 
                className="h-full bg-cyan-500 transition-all duration-300"
                style={{ width: `${((currentIdx + 1) / QUIZ_QUESTIONS.length) * 100}%` }}
              />
            </div>

            {/* Question title */}
            <h4 className="text-sm font-semibold text-white leading-relaxed">
              {currentQ.question}
            </h4>

            {/* Options */}
            <div className="space-y-2">
              {currentQ.options.map((opt, idx) => {
                let btnStyle = 'bg-slate-900 border-slate-800 text-slate-300 hover:bg-slate-800';

                if (isAnswered) {
                  if (idx === currentQ.correctIndex) {
                    btnStyle = 'bg-emerald-950/80 border-emerald-500 text-emerald-200 font-semibold ring-1 ring-emerald-500/50';
                  } else if (idx === selectedOpt) {
                    btnStyle = 'bg-red-950/80 border-red-500 text-red-200 font-semibold ring-1 ring-red-500/50';
                  } else {
                    btnStyle = 'bg-slate-950/60 border-slate-900 text-slate-500 opacity-60';
                  }
                }

                return (
                  <button
                    key={idx}
                    disabled={isAnswered}
                    onClick={() => handleSelectOption(idx)}
                    className={`w-full p-3 rounded-xl text-xs text-left border transition-all flex items-start gap-2.5 ${btnStyle}`}
                  >
                    <span className="w-5 h-5 rounded-full bg-slate-800 border border-slate-700 text-slate-400 flex items-center justify-center shrink-0 text-[10px] font-mono font-bold">
                      {String.fromCharCode(65 + idx)}
                    </span>
                    <span className="leading-snug">{opt}</span>
                  </button>
                );
              })}
            </div>

            {/* Explanation box */}
            {isAnswered && (
              <div className="p-3 rounded-xl bg-slate-900/90 border border-slate-800 text-xs text-slate-300 leading-relaxed animate-in fade-in duration-200">
                <div className="flex items-center gap-1.5 font-bold mb-1">
                  {selectedOpt === currentQ.correctIndex ? (
                    <span className="text-emerald-400 flex items-center gap-1"><CheckCircle className="w-3.5 h-3.5" /> Chính xác!</span>
                  ) : (
                    <span className="text-rose-400 flex items-center gap-1"><XCircle className="w-3.5 h-3.5" /> Chưa chính xác</span>
                  )}
                </div>
                <p className="text-[11px] text-slate-300">{currentQ.explanation}</p>
              </div>
            )}

            {/* Next Button */}
            {isAnswered && (
              <button
                onClick={handleNext}
                className="w-full py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-black font-bold text-xs transition-colors shadow-lg"
              >
                {currentIdx < QUIZ_QUESTIONS.length - 1 ? 'Câu Hỏi Tiếp Theo ➔' : 'Xem Kết Quả & Nhận Huy Hiệu 🏆'}
              </button>
            )}
          </div>
        ) : (
          /* Finished Screen */
          <div className="text-center py-4 space-y-4 animate-in zoom-in duration-200">
            <div className="w-16 h-16 rounded-full bg-amber-500/20 border border-amber-500/50 text-amber-400 flex items-center justify-center mx-auto">
              <Award className="w-8 h-8" />
            </div>

            <div className="space-y-1">
              <span className="text-xs font-mono text-cyan-400 uppercase tracking-wider">KẾT QUẢ TRẮC NGHIỆM</span>
              <h4 className="text-xl font-black text-white">
                {score >= 4 ? '🏅 Đại Sứ Di Sản Gen Z Xuất Sắc!' : '🎓 Sĩ Tử Di Sản Tiềm Năng!'}
              </h4>
              <p className="text-xs text-slate-300">
                Bạn đã trả lời đúng <b className="text-amber-400">{score} / {QUIZ_QUESTIONS.length}</b> câu hỏi về quy chuẩn cổ phục Việt Nam.
              </p>
            </div>

            <div className="p-3.5 rounded-xl bg-slate-900 border border-slate-800 text-xs text-slate-300 text-left space-y-1">
              <div className="font-semibold text-white">💡 Đúc kết di sản:</div>
              <p className="text-[11px] text-slate-400">
                Hiểu đúng nguồn cội năm 1744, quy tắc vạt phải (hữu nhậm) và triết lý 5 nút Ngũ Thường giúp bạn tự tin remix Việt phục đi muôn nơi mà không sợ sai lệch chuẩn mực.
              </p>
            </div>

            <div className="flex gap-2 pt-2">
              <button
                onClick={handleRestart}
                className="flex-1 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-medium flex items-center justify-center gap-1.5 transition-colors"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Làm Lại</span>
              </button>
              <button
                onClick={onClose}
                className="flex-1 py-2.5 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white text-xs font-semibold transition-colors"
              >
                Tiếp Tục Phối Đồ
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
