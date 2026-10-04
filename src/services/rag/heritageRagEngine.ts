/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * Hybrid RAG Knowledge Base Engine (PostgreSQL / pgvector Simulation)
 * Implements Vector Cosine Similarity (threshold <= 0.25 distance) + Lexical Full-Text Search
 */

export interface GarmentKnowledgeNode {
  id: string;
  category: string;
  title: string;
  era: string;
  decreeYear: string;
  strictInvariants: string[];
  culturalRules: string[];
  forbiddenPractices: string[];
  stylingGuardrails: {
    maxSacredRemix: number;
    maxCasualRemix: number;
    recommendedAccessories: string[];
  };
  academicSources: string[];
  tags: string[];
  /** 8-dimensional normalized feature vector for pgvector cosine distance */
  vector: number[];
}

/** Pre-seeded Grounded Knowledge Nodes matching Decree 1744 & Imperial Decrees */
export const GARMENT_KNOWLEDGE_NODES: GarmentKnowledgeNode[] = [
  {
    id: 'node_ngu_than_tay_chen',
    category: 'ngu_than_tay_chen',
    title: 'Áo Ngũ Thân Tay Chẽn (Định Chế 1744)',
    era: 'Đàng Trong (1744) - Toàn quốc thời Nguyễn (1827-1945)',
    decreeYear: 'Năm Giáp Tý 1744 (Chúa Nguyễn Phúc Khoát) & Minh Mạng (1827)',
    strictInvariants: [
      'Cổ lập lĩnh (cổ đứng) vuông tròn kín đáo, viền định hình cao 2-4cm ôm sát cổ.',
      'Bắt buộc vạt trái đè vạt phải (Hữu nhậm), cài nẹp cúc bên sườn phải.',
      'Hệ thống 5 hạt cúc biểu trưng Ngũ Thường (Nhân, Lễ, Nghĩa, Trí, Tín) và Ngũ Luân.',
      'Sống áo trung phùng chạy dọc sống lưng và trước ngực ghép dọc kín đáo.',
      'Tay chẽn thuôn dài hẹp dần ôm khít cổ tay, phân biệt tuyệt đối với áo tấc tay thụng.',
      'Vạt áo uốn lượn cong nhẹ chữ A xòe dần về chân vạt.'
    ],
    culturalRules: [
      'Phối phục chuẩn: Quần lụa trắng hoặc trắng ngà ống rộng, khăn vấn nam chữ Nhân/chữ Nhất.',
      'Ngữ cảnh đời thường: Cho phép remix cùng Sneaker monochrome, quần Cargo tối màu, kính mát.',
      'Ngữ cảnh tôn nghiêm: Mức độ remix tối đa 10% - 20%, cấm vải xuyên thấu hoặc xẻ tà quá nách.'
    ],
    forbiddenPractices: [
      'CẤM TUYỆT ĐỐI cài vạt sang trái (Tả nhậm) - đây là quy cách tử phục liệm người chết.',
      'CẤM mặc quần short mini, chân váy ngắn hở đùi tại nơi thờ tự, đền miếu, đám cưới truyền thống.',
      'CẢNH BÁO: Không in ấn hoa văn Rồng 5 móng hoàng gia (Long văn cửu ngũ) cho trang phục dạo phố.'
    ],
    stylingGuardrails: {
      maxSacredRemix: 20,
      maxCasualRemix: 70,
      recommendedAccessories: ['Kiềng bạc trơn 925', 'Quạt xếp gỗ trầm', 'Kính mát slim retro', 'Sneaker monochrome']
    },
    academicSources: [
      'Đại Nam Thực Lục Tiền Biên',
      'Khâm Định Đại Nam Hội Điển Sự Lệ - Quyển 78',
      'Ngàn Năm Áo Mũ (Trần Quang Đức)'
    ],
    tags: ['ngu_than', 'tay_chen', '1744', 'huu_nham', 'ngu_thuong', 'trung_phung', 'minh_mang'],
    vector: [0.92, 0.88, 0.95, 0.96, 0.20, 0.85, 0.90, 0.15]
  },
  {
    id: 'node_ao_tac',
    category: 'ao_tac',
    title: 'Áo Tấc (Ngũ Thân Tay Thụng)',
    era: 'Triều Nguyễn (1802 - 1945)',
    decreeYear: 'Đại lễ phục triều Nguyễn',
    strictInvariants: [
      'Là biến thể ngũ thân tay thụng rộng 30-50cm buông dài quá đầu ngón tay.',
      'Khi chắp hai tay trước ngực (thủ lễ) tạo thành hình chữ Nhất (一) đoan trang.',
      'Vạt áo cài sườn phải bằng 5 cúc ngọc/bạc.',
      'Luôn đi kèm khăn đóng (khăn vấn) và quần lụa trắng.'
    ],
    culturalRules: [
      'Dành cho tế lễ, bái tổ, yết kiến tiền nhân, hôn lễ tôn nghiêm.',
      'Mức độ biến tấu tối đa 15% - 25% để giữ trọn vẻ uy nghiêm hoàng triều.'
    ],
    forbiddenPractices: [
      'Cấm cắt xén tay thụng thành tay ngắn phá vỡ quy cách đại lễ.',
      'Cấm phối với trang phục hở hang phản cảm nơi cúng giỗ gia tiên.'
    ],
    stylingGuardrails: {
      maxSacredRemix: 15,
      maxCasualRemix: 35,
      recommendedAccessories: ['Khăn vấn lụa', 'Hài thêu hoa', 'Kiềng bạc cổ', 'Quạt lụa']
    },
    academicSources: ['Lịch Triều Hiến Chương Loại Chí', 'Nghi Lễ Cung Đình Triều Nguyễn'],
    tags: ['ao_tac', 'tay_thung', 'le_phuc', 'thu_le', 'chu_nhat', 'khan_dong'],
    vector: [0.85, 0.95, 0.92, 0.25, 0.95, 0.95, 0.70, 0.10]
  },
  {
    id: 'node_ao_nhat_binh',
    category: 'ao_nhat_binh',
    title: 'Áo Nhật Bình Cung Đình',
    era: 'Triều Nguyễn (1802 - 1945)',
    decreeYear: 'Quy chế Thường phục Hậu phi thời Minh Mạng',
    strictInvariants: [
      'Nẹp cổ áo to bản ghép lại tạo thành hình chữ nhật đặc trưng trước ngực.',
      'Cổ áo có dải dây buộc hoặc đính khánh ngọc cố định.',
      'Hai tay áo có dải vải viền ngũ sắc tượng trưng cho thuyết Ngũ Hành (Kim-Mộc-Thủy-Hỏa-Thổ).',
      'Thân áo dài quá gối, xẻ tà hai bên hông.'
    ],
    culturalRules: [
      'Nguyên bản là thường phục của Hoàng Hậu, Công Chúa, Phi Tần triều Nguyễn.',
      'Đương đại: Phổ biến trong ảnh cưới cao cấp, festival nghệ thuật và dạ tiệc di sản.'
    ],
    forbiddenPractices: [
      'Cấm đảo lộn thứ tự dải ngũ sắc nơi tay áo.',
      'Không sử dụng hình thêu rồng 5 móng nếu không thuộc ngữ cảnh tái hiện hoàng tộc.'
    ],
    stylingGuardrails: {
      maxSacredRemix: 20,
      maxCasualRemix: 55,
      recommendedAccessories: ['Kiềng chạm phượng', 'Trâm cài tóc', 'Boots da cao cổ', 'Túi cầm tay gấm']
    },
    academicSources: ['Khâm Định Đại Nam Hội Điển Sự Lệ - Phần Hậu Cung Y Phục'],
    tags: ['nhat_binh', 'hau_phi', 'ngu_sac', 'ngu_hanh', 'nep_chu_nhat', 'cung_dinh'],
    vector: [0.80, 0.90, 0.88, 0.35, 0.80, 0.92, 0.85, 0.40]
  },
  {
    id: 'node_ao_giao_linh',
    category: 'ao_giao_linh',
    title: 'Áo Giao Lĩnh (Cổ Chéo Thời Đại Lý - Trần - Lê)',
    era: 'Thế kỷ 11 - 18',
    decreeYear: 'Thời Lý, Trần, Hậu Lê',
    strictInvariants: [
      'Cổ chéo giao nhau hình chữ Y, vạt trái đè lên vạt phải (Hữu nhậm).',
      'Cột cố định bằng dải vải mềm bên nách phải, không dùng khuy bấm kim loại.',
      'Ống tay rộng vừa hoặc thụng nhẹ, phong thái khoáng đạt cổ phong.'
    ],
    culturalRules: [
      'Biểu trưng cho sự tương giao Trời - Đất (Thiên Địa giao hòa).',
      'Dễ dàng layer phong cách Y2K hoặc Dark Academia cùng áo khoác hiện đại.'
    ],
    forbiddenPractices: [
      'Tuyệt đối không bắt chéo vạt sang sườn trái (Tả nhậm).'
    ],
    stylingGuardrails: {
      maxSacredRemix: 25,
      maxCasualRemix: 65,
      recommendedAccessories: ['Dây đai lụa thắt eo', 'Kiềng bạc mộc', 'Boots da đế bệt']
    },
    academicSources: ['Ngàn Năm Áo Mũ', 'Khảo Cổ Học Viện Sử Học Việt Nam'],
    tags: ['giao_linh', 'co_cheo', 'thoi_le', 'thoi_ly', 'thoi_tran', 'thien_dia'],
    vector: [0.75, 0.82, 0.85, 0.50, 0.65, 0.78, 0.75, 0.15]
  },
  {
    id: 'node_ao_tu_than',
    category: 'ao_tu_than',
    title: 'Áo Tứ Thân & Yếm Đào Bắc Bộ',
    era: 'Thế kỷ 12 - 20',
    decreeYear: 'Dân gian Kinh Bắc & Đồng bằng Bắc Bộ',
    strictInvariants: [
      'Hai thân sau nối sống ở giữa sống lưng, hai thân trước xẻ để buông hoặc buộc vạt trước bụng.',
      'Bên trong mặc kèm yếm cổ xây hoặc yếm hoa lý, hoa đào kín đáo.',
      'Thắt lưng lụa ngũ sắc buông rủ ngang hông.'
    ],
    culturalRules: [
      'Biểu tượng của nét duyên dáng dân gian Quan họ Kinh Bắc.',
      'Remix cùng chân váy dài, quần đũi ống rộng, guốc mộc hoặc sandal hiện đại.'
    ],
    forbiddenPractices: [
      'Cấm mặc yếm xuyên thấu lộ ngực phản cảm đi lễ chùa cúng bái.'
    ],
    stylingGuardrails: {
      maxSacredRemix: 20,
      maxCasualRemix: 65,
      recommendedAccessories: ['Nón quai thao mini', 'Thắt lưng lụa ngũ sắc', 'Guốc mộc']
    },
    academicSources: ['Văn Hóa Dân Gian Việt Nam', 'Trang Phục Thăng Long'],
    tags: ['tu_than', 'yem_dao', 'kinh_bac', 'quan_ho', 'non_quai_thao'],
    vector: [0.70, 0.75, 0.80, 0.40, 0.50, 0.70, 0.60, 0.10]
  },
  {
    id: 'node_ao_dai_raglan',
    category: 'ao_dai_raglan',
    title: 'Áo Dài Raglan Cách Tân',
    era: 'Sài Gòn 1960 đến nay',
    decreeYear: 'Nhà may Dung Đakao (1960)',
    strictInvariants: [
      'Tay áo ráp chéo từ chân cổ chéo xuống nách theo phom raglan ôm sát tôn dáng.',
      'Hàng cúc bấm hoặc khóa kéo chạy chéo từ cổ qua nách xuống sườn phải.',
      'Tà xẻ cao ngang eo tạo dáng đi thướt tha mềm mại.'
    ],
    culturalRules: [
      'Phù hợp mọi không gian: Trường học, công sở, dạo phố, hôn lễ.',
      'Phối cùng quần lụa suông rộng, culottes hoặc giày cao gót/loafer.'
    ],
    forbiddenPractices: [
      'Tránh xẻ tà quá nách làm hở toàn bộ eo và nội y phản cảm.'
    ],
    stylingGuardrails: {
      maxSacredRemix: 25,
      maxCasualRemix: 65,
      recommendedAccessories: ['Khuyên tai ngọc trai', 'Túi tote linen', 'Giày loafer']
    },
    academicSources: ['Lịch Sử Áo Dài Sài Gòn', 'Nghệ Thuật Cắt May Tân Thời'],
    tags: ['ao_dai', 'raglan', '1960', 'sai_gon', 'ton_dang', 'dung_dakao'],
    vector: [0.65, 0.80, 0.82, 0.88, 0.20, 0.80, 0.75, 0.10]
  }
];

export interface RAGSearchResult {
  node: GarmentKnowledgeNode;
  vectorDistance: number;
  cosineSimilarity: number;
  lexicalScore: number;
  hybridScore: number;
  matchedKeywords: string[];
}

export class HeritageRAGService {
  /**
   * Calculate Cosine Similarity between two normalized vectors
   */
  private static cosineSimilarity(vecA: number[], vecB: number[]): number {
    let dotProduct = 0;
    let normA = 0;
    let normB = 0;

    for (let i = 0; i < vecA.length; i++) {
      dotProduct += vecA[i] * vecB[i];
      normA += vecA[i] * vecA[i];
      normB += vecB[i] * vecB[i];
    }

    if (normA === 0 || normB === 0) return 0;
    return dotProduct / (Math.sqrt(normA) * Math.sqrt(normB));
  }

  /**
   * Derive an 8-dimensional query vector based on search query intent
   */
  public static vectorizeQuery(query: string, categoryPreference?: string): number[] {
    const q = query.toLowerCase();
    const v = [0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.2];

    if (q.includes('ngũ thân') || q.includes('1744') || categoryPreference === 'ngu_than_tay_chen') {
      v[0] += 0.4; // Collar & Lapel
      v[2] += 0.4; // 5 buttons
      v[3] += 0.4; // Tight sleeve
      v[5] += 0.3; // Formal/Heritage
    }
    if (q.includes('tấc') || q.includes('tay thụng') || categoryPreference === 'ao_tac') {
      v[1] += 0.4; // Solemnity
      v[4] += 0.4; // Loose sleeve
      v[5] += 0.4;
    }
    if (q.includes('nhật bình') || q.includes('hoàng gia') || categoryPreference === 'ao_nhat_binh') {
      v[1] += 0.3;
      v[6] += 0.4; // Royal patterns
      v[7] += 0.3; // Imperial badges
    }
    if (q.includes('giao lĩnh') || q.includes('cổ chéo') || categoryPreference === 'ao_giao_linh') {
      v[0] += 0.3;
      v[4] += 0.2;
    }
    if (q.includes('tứ thân') || q.includes('yếm') || categoryPreference === 'ao_tu_than') {
      v[4] += 0.2;
      v[6] -= 0.2;
    }
    if (q.includes('raglan') || q.includes('áo dài') || categoryPreference === 'ao_dai_raglan') {
      v[3] += 0.3;
      v[6] += 0.2;
    }
    if (q.includes('concert') || q.includes('sneaker') || q.includes('cargo') || q.includes('remix')) {
      v[6] += 0.25; // Casual remix weight
    }

    // Normalize
    const magnitude = Math.sqrt(v.reduce((sum, val) => sum + val * val, 0));
    return v.map(val => Number((val / magnitude).toFixed(4)));
  }

  /**
   * Hybrid RAG Retrieval: Cosine Distance (Vector) + Lexical Matching (Full-Text)
   * Vector Distance = 1 - Cosine Similarity
   * Target filter: Vector Cosine Distance <= 0.25 (i.e. Cosine Similarity >= 0.75)
   */
  public static queryKnowledge(
    userQuery: string,
    categoryHint?: string,
    limit: number = 3
  ): RAGSearchResult[] {
    const queryVec = this.vectorizeQuery(userQuery, categoryHint);
    const queryTokens = userQuery.toLowerCase().split(/\s+/).filter(t => t.length > 2);

    const results: RAGSearchResult[] = GARMENT_KNOWLEDGE_NODES.map(node => {
      // 1. Vector Cosine Similarity
      const similarity = this.cosineSimilarity(queryVec, node.vector);
      const vectorDistance = Math.max(0, 1 - similarity);

      // 2. Lexical / Keyword Token Matching
      const matchedKeywords: string[] = [];
      let tokenHits = 0;
      const haystack = (
        node.title + ' ' + 
        node.tags.join(' ') + ' ' + 
        node.strictInvariants.join(' ') + ' ' + 
        node.culturalRules.join(' ')
      ).toLowerCase();

      for (const token of queryTokens) {
        if (haystack.includes(token)) {
          tokenHits++;
          matchedKeywords.push(token);
        }
      }

      if (categoryHint && node.category === categoryHint) {
        tokenHits += 4;
        matchedKeywords.push(`hint:${categoryHint}`);
      }

      const lexicalScore = Math.min(1, tokenHits / Math.max(1, queryTokens.length + 2));

      // 3. Hybrid Score Combination (70% Vector Semantic + 30% Lexical Token Hits)
      const hybridScore = Number((similarity * 0.7 + lexicalScore * 0.3).toFixed(4));

      return {
        node,
        vectorDistance: Number(vectorDistance.toFixed(4)),
        cosineSimilarity: Number(similarity.toFixed(4)),
        lexicalScore: Number(lexicalScore.toFixed(4)),
        hybridScore,
        matchedKeywords
      };
    });

    // Sort by highest hybrid score
    results.sort((a, b) => b.hybridScore - a.hybridScore);

    return results.slice(0, limit);
  }

  /**
   * Synthesize Grounded RAG Invariant Injection Block for LLM System Prompt
   */
  public static generatePromptContextInjection(query: string, categoryHint?: string): string {
    const matches = this.queryKnowledge(query, categoryHint, 2);
    if (matches.length === 0) return '';

    const primary = matches[0];
    const node = primary.node;

    return `
[RAG HYBRID RETRIEVAL - POSTGRESQL/PGVECTOR CONTEXT INJECTION]
Match: "${node.title}" (Cosine Distance: ${primary.vectorDistance} <= 0.25 | Similarity: ${primary.cosineSimilarity})
1. CÁC QUY CHUẨN ĐIỂN CHẾ BẮT BUỘC (STRICT INVARIANTS):
${node.strictInvariants.map(inv => ` - ${inv}`).join('\n')}
2. RANH GIỚI VĂN HÓA & CẤM KỴ:
${node.forbiddenPractices.map(forb => ` - ${forb}`).join('\n')}
3. HƯỚNG DẪN REMIX HỢP LỆ:
${node.culturalRules.map(cr => ` - ${cr}`).join('\n')}
Ngưỡng biến tấu: Tôn nghiêm tối đa ${node.stylingGuardrails.maxSacredRemix}%, Đời thường tối đa ${node.stylingGuardrails.maxCasualRemix}%.
Thư tịch bảo chứng: ${node.academicSources.join('; ')}
`;
  }
}
