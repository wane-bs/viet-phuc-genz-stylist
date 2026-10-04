import React, { useState, useMemo } from 'react';
import { KNOWLEDGE_BASE_ARTICLES, KnowledgeArticle } from '../data/knowledgeBaseData';
import { 
  Search, 
  BookOpen, 
  Scroll, 
  ExternalLink, 
  Check, 
  Copy, 
  Award, 
  Sparkles, 
  ShieldCheck, 
  Filter,
  Bookmark
} from 'lucide-react';

interface KnowledgeBaseExplorerProps {
  onOpenArticleDetail?: (article: KnowledgeArticle) => void;
}

export const KnowledgeBaseExplorer: React.FC<KnowledgeBaseExplorerProps> = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedArticle, setSelectedArticle] = useState<KnowledgeArticle | null>(KNOWLEDGE_BASE_ARTICLES[0]);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const categories = [
    { id: 'all', label: 'Tất Cả Tri Thức' },
    { id: 'dient_kinh_thien', label: 'Điện Kính Thiên' },
    { id: 'dinh_che_1744', label: 'Định Chế 1744' },
    { id: 'ngu_than_ngu_thuong', label: 'Ngũ Thân & Ngũ Thường' },
    { id: 'ranh_gioi_van_hoa', label: 'Ranh Giới Guardrails' },
    { id: 'cac_dong_co_phuc', label: 'Các Dòng Cổ Phục' },
    { id: 'genz_remix', label: 'Gen Z Đương Đại' }
  ];

  const filteredArticles = useMemo(() => {
    return KNOWLEDGE_BASE_ARTICLES.filter((item) => {
      const matchCat = selectedCategory === 'all' || item.category === selectedCategory;
      const query = searchQuery.toLowerCase().trim();
      const matchQuery = 
        !query || 
        item.title.toLowerCase().includes(query) ||
        item.shortDesc.toLowerCase().includes(query) ||
        item.fullContent.toLowerCase().includes(query) ||
        item.tags.some(t => t.toLowerCase().includes(query));
      return matchCat && matchQuery;
    });
  }, [searchQuery, selectedCategory]);

  const handleCopyCitation = (citation: string, id: string) => {
    navigator.clipboard.writeText(citation);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div className="w-full bg-[#0b0f17] border border-slate-800 rounded-3xl p-6 shadow-2xl space-y-6 text-slate-200">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-800">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono text-amber-400">
            <Scroll className="w-4 h-4" />
            <span>KNOWLEDGE BASE & HỒ SƠ DI SẢN</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-black text-white tracking-tight">
            Cơ Sở Tri Thức Khảo Cứu Điển Chế Việt Phục
          </h2>
          <p className="text-xs text-slate-400 mt-1">
            Được tổng hợp từ tài liệu nghiên cứu Điện Kính Thiên, Đại Nam Thực Lục, Khâm Định Đại Nam Hội Điển Sự Lệ và xu hướng đương đại.
          </p>
        </div>

        {/* Notebook Source Reference Tag */}
        <div className="px-3 py-1.5 rounded-xl bg-slate-900 border border-slate-700 text-[11px] font-mono text-cyan-300 flex items-center gap-2 shrink-0">
          <Bookmark className="w-3.5 h-3.5 text-cyan-400" />
          <span>Notebook ID: 6832906d-0bd1-48db</span>
        </div>
      </div>

      {/* Search & Category Filter Bar */}
      <div className="space-y-3">
        <div className="relative w-full">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Tìm kiếm tư liệu sử học (Điện Kính Thiên, 1744, Hữu nhậm, Áo Tấc, Ngũ Thường, Rồng 5 móng...)"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-900/90 border border-slate-800 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500"
          />
        </div>

        {/* Categories Chips */}
        <div className="flex flex-wrap gap-1.5">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                selectedCategory === cat.id
                  ? 'bg-amber-500 text-black font-bold'
                  : 'bg-slate-900 border border-slate-800 text-slate-400 hover:text-white hover:bg-slate-800'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </div>

      {/* Two Column Layout: Articles List & Deep Viewer */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left 5 Columns: Articles List */}
        <div className="lg:col-span-5 space-y-3 max-h-[620px] overflow-y-auto pr-1">
          {filteredArticles.length === 0 ? (
            <div className="p-8 text-center text-xs text-slate-500 bg-slate-900/40 rounded-xl border border-slate-800">
              Không tìm thấy tư liệu phù hợp với từ khóa "{searchQuery}".
            </div>
          ) : (
            filteredArticles.map((art) => {
              const isSelected = selectedArticle?.id === art.id;
              return (
                <div
                  key={art.id}
                  onClick={() => setSelectedArticle(art)}
                  className={`p-4 rounded-2xl border transition-all cursor-pointer space-y-2 ${
                    isSelected
                      ? 'bg-slate-800/90 border-cyan-500 shadow-lg shadow-cyan-500/10'
                      : 'bg-slate-900/60 border-slate-800 hover:border-slate-700 hover:bg-slate-900'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-mono font-bold text-amber-400 px-2 py-0.5 rounded bg-amber-950/60 border border-amber-800/60">
                      {art.categoryLabel}
                    </span>
                    <span className="text-[10px] font-mono text-slate-500">
                      {art.historicalEra}
                    </span>
                  </div>

                  <h3 className="text-sm font-bold text-white leading-snug">
                    {art.title}
                  </h3>

                  <p className="text-xs text-slate-400 line-clamp-2">
                    {art.shortDesc}
                  </p>

                  <div className="flex flex-wrap gap-1 pt-1">
                    {art.tags.map((tag, idx) => (
                      <span key={idx} className="text-[10px] px-1.5 py-0.5 rounded bg-slate-950 text-slate-500 font-mono">
                        #{tag}
                      </span>
                    ))}
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Right 7 Columns: Article Reader */}
        <div className="lg:col-span-7 bg-slate-900/80 border border-slate-800 rounded-2xl p-6 space-y-5">
          {selectedArticle ? (
            <div className="space-y-4">
              {/* Header */}
              <div className="space-y-2 pb-4 border-b border-slate-800">
                <div className="flex items-center justify-between text-xs text-slate-400 font-mono">
                  <span className="text-amber-400 font-semibold">{selectedArticle.categoryLabel}</span>
                  <span>{selectedArticle.historicalEra}</span>
                </div>

                <h3 className="text-xl font-black text-white tracking-tight leading-snug">
                  {selectedArticle.title}
                </h3>

                <p className="text-xs text-cyan-300 italic">
                  {selectedArticle.shortDesc}
                </p>
              </div>

              {/* Key Takeaways Box */}
              <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800 space-y-2">
                <div className="text-xs font-bold text-amber-400 flex items-center gap-1.5 uppercase tracking-wider">
                  <Award className="w-3.5 h-3.5" />
                  <span>Điểm Cốt Lõi Cần Ghi Nhớ (Key Takeaways)</span>
                </div>
                <ul className="space-y-1.5 text-xs text-slate-300">
                  {selectedArticle.keyTakeaways.map((point, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <span className="text-amber-400 font-bold">•</span>
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Full Content Prose */}
              <div className="text-xs text-slate-300 leading-relaxed space-y-3 whitespace-pre-line font-normal">
                {selectedArticle.fullContent}
              </div>

              {/* Citation Footer */}
              <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 flex items-center justify-between gap-3 text-[11px] text-slate-400">
                <div className="min-w-0">
                  <span className="font-semibold text-slate-200">📜 Trích dẫn học thuật: </span>
                  <span className="italic">{selectedArticle.academicCitation}</span>
                </div>

                <button
                  onClick={() => handleCopyCitation(selectedArticle.academicCitation, selectedArticle.id)}
                  className="px-2.5 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-medium flex items-center gap-1 shrink-0 transition-colors"
                >
                  {copiedId === selectedArticle.id ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3 text-cyan-400" />}
                  <span>{copiedId === selectedArticle.id ? 'Đã chép' : 'Sao chép'}</span>
                </button>
              </div>
            </div>
          ) : (
            <div className="p-12 text-center text-xs text-slate-500">
              Chọn một bài viết bên trái để xem tài liệu chi tiết.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
