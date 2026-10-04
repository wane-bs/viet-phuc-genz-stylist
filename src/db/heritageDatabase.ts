/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT_DIR = path.resolve(__dirname, '../..');
const DATA_DIR = path.join(ROOT_DIR, 'data');
const DB_FILE = path.join(DATA_DIR, 'heritage_vault_db.json');
const REFERENCES_DIR = path.join(ROOT_DIR, 'public/references');
const UPLOADS_DIR = path.join(ROOT_DIR, 'public/uploads');

export interface DatabaseSchema {
  references: Array<{
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
    imageFilePath?: string; // e.g., '/references/ref_ngu_than_do_do.jpg'
    previewUrl?: string;
    fullBodyPhotorealisticUrl?: string;
    sampleReferenceUrl?: string;
    img2imgPromptModifier?: string;
    isCustom?: boolean;
    createdAt: string;
  }>;
  blueprints: Array<{
    id: string;
    title: string;
    category: 'blueprint_technical' | 'anatomy_structure';
    source: string;
    description: string;
    keySpecs: { label: string; value: string }[];
    guardrailRule: string;
    imageFilePath?: string;
    svgDrawing: string;
    createdAt: string;
  }>;
  tryon_history: Array<{
    id: string;
    userOriginalImage: string;
    userImageFilePath?: string;
    referenceGarmentId: string;
    referenceGarmentName: string;
    denoisingStrength: number;
    preserveFace: boolean;
    aiModel: string;
    aiSource: string;
    aiDescription: string;
    generatedResultImage: string;
    resultImageFilePath?: string;
    culturalScore: number;
    guardrailStatus: string;
    createdAt: string;
  }>;
  settings: {
    openRouterModel: string;
    defaultDenoising: number;
    preserveFaceDefault: boolean;
    lastUpdated: string;
  };
}

class HeritageDatabase {
  private db: DatabaseSchema = {
    references: [],
    blueprints: [],
    tryon_history: [],
    settings: {
      openRouterModel: 'openai/gpt-4o',
      defaultDenoising: 0.65,
      preserveFaceDefault: true,
      lastUpdated: new Date().toISOString()
    }
  };

  constructor() {
    this.ensureDirectories();
    this.initDatabase();
  }

  private ensureDirectories() {
    try {
      if (!fs.existsSync(DATA_DIR)) fs.mkdirSync(DATA_DIR, { recursive: true });
      if (!fs.existsSync(REFERENCES_DIR)) fs.mkdirSync(REFERENCES_DIR, { recursive: true });
      if (!fs.existsSync(UPLOADS_DIR)) fs.mkdirSync(UPLOADS_DIR, { recursive: true });
    } catch (err) {
      console.error('Error creating storage directories:', err);
    }
  }

  private initDatabase() {
    try {
      if (fs.existsSync(DB_FILE)) {
        const raw = fs.readFileSync(DB_FILE, 'utf-8');
        this.db = JSON.parse(raw);
      } else {
        this.seedInitialData();
        this.save();
      }
    } catch (err) {
      console.error('Failed to initialize database, resetting default state:', err);
      this.seedInitialData();
    }
  }

  private save() {
    try {
      this.ensureDirectories();
      fs.writeFileSync(DB_FILE, JSON.stringify(this.db, null, 2), 'utf-8');
    } catch (err) {
      console.error('Error saving database to file:', err);
    }
  }

  /**
   * Save a base64 image or buffer directly to a physical .jpg/.png file on disk
   */
  public saveImageFile(base64OrDataUrl: string, targetDir: 'references' | 'uploads', filenamePrefix: string): string {
    try {
      this.ensureDirectories();
      const destDir = targetDir === 'references' ? REFERENCES_DIR : UPLOADS_DIR;
      
      let mime = 'image/jpeg';
      let rawBase64 = base64OrDataUrl;

      if (base64OrDataUrl.startsWith('data:')) {
        const match = base64OrDataUrl.match(/^data:([^;]+);base64,(.+)$/);
        if (match) {
          mime = match[1];
          rawBase64 = match[2];
        }
      }

      const ext = mime.includes('png') ? 'png' : mime.includes('webp') ? 'webp' : 'jpg';
      const filename = `${filenamePrefix}_${Date.now()}.${ext}`;
      const filePath = path.join(destDir, filename);

      const buffer = Buffer.from(rawBase64, 'base64');
      fs.writeFileSync(filePath, buffer);

      return `/${targetDir}/${filename}`;
    } catch (e) {
      console.warn('Could not save physical image file:', e);
      return '';
    }
  }

  /**
   * Read physical image file from disk and return clean base64 data for API requests
   */
  public getImageBase64(relativeUrlOrPath: string): { mimeType: string; base64: string; dataUrl: string } | null {
    try {
      if (!relativeUrlOrPath) return null;
      
      // If already a base64 string
      if (relativeUrlOrPath.startsWith('data:image')) {
        const match = relativeUrlOrPath.match(/^data:([^;]+);base64,(.+)$/);
        if (match) {
          return {
            mimeType: match[1],
            base64: match[2],
            dataUrl: relativeUrlOrPath
          };
        }
      }

      // If relative file path e.g. /uploads/xyz.jpg or /references/abc.jpg
      const cleanPath = relativeUrlOrPath.startsWith('/') ? relativeUrlOrPath.slice(1) : relativeUrlOrPath;
      const fullPath = path.join(ROOT_DIR, 'public', cleanPath);

      if (fs.existsSync(fullPath)) {
        const buffer = fs.readFileSync(fullPath);
        const ext = path.extname(fullPath).toLowerCase();
        const mime = ext === '.png' ? 'image/png' : ext === '.webp' ? 'image/webp' : 'image/jpeg';
        const base64 = buffer.toString('base64');
        return {
          mimeType: mime,
          base64: base64,
          dataUrl: `data:${mime};base64,${base64}`
        };
      }
    } catch (e) {
      console.warn('Error reading image file from disk:', e);
    }
    return null;
  }

  private seedInitialData() {
    this.db.references = [
      {
        id: 'ref_ngu_than_do_do',
        name: 'Áo Ngũ Thân Tay Chẽn (Đỏ Đô Hoàng Triều)',
        category: 'ngu_than_tay_chen',
        period: 'Định chế 1744 Chúa Nguyễn Phúc Khoát - Chuẩn quốc phục 1837',
        gender: 'nam',
        imageFilePath: '/references/ao_ngu_than_nam_do.jpg',
        colorPalette: {
          primary: '#7f1d1d',
          secondary: '#ffffff',
          accent: '#d97706',
          description: 'Gấm lụa sa tanh đỏ đô vương giả, quần lụa trắng, mấn đỏ xếp nếp, giày đen'
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
        img2imgPromptModifier: 'Full-body studio portrait of a young Vietnamese man with glasses wearing authentic deep burgundy red Ao Ngu Than Tay Chen silk robe, mandarin collar, right lapel closure, matching red turban, loose white silk trousers, neutral studio background.',
        isCustom: false,
        createdAt: new Date().toISOString()
      },
      {
        id: 'ref_ngu_than_tim_chen',
        name: 'Áo Ngũ Thân Tay Chẽn (Tím Hoa Cà Hoàng Gia)',
        category: 'ngu_than_tay_chen',
        period: 'Định chế 1744 Võ Vương Nguyễn Phúc Khoát',
        gender: 'nu',
        imageFilePath: '/references/ao_ngu_than_nu_tim.jpg',
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
        img2imgPromptModifier: 'Full-body studio portrait of a young Vietnamese woman wearing authentic Ao Ngu Than Tay Chen in royal purple silk, stand-up collar, 5 jade buttons, white trousers, matching purple turban, pearl necklace.',
        isCustom: false,
        createdAt: new Date().toISOString()
      },
      {
        id: 'ref_ao_tac_tay_thung_nam_nu',
        name: 'Áo Tấc Lễ Phục Tay Thụng (Lam Ngọc & Lục Bảo)',
        category: 'ao_tac',
        period: 'Lễ phục truyền thống Triều Nguyễn (Thế kỷ 19 - 20)',
        gender: 'couple',
        imageFilePath: '/references/ao_tac_nam_nu.jpg',
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
        img2imgPromptModifier: 'Full-body fashion editorial of a young Vietnamese couple wearing authentic Ao Tac ceremonial robes with wide sleeves, light cyan blue and dark emerald green silk.',
        isCustom: false,
        createdAt: new Date().toISOString()
      }
    ];

    this.db.blueprints = [
      {
        id: 'bp_ngu_than_tay_chen',
        title: 'Bản Vẽ Thiết Kế Rập: Áo Ngũ Thân Tay Chẽn',
        category: 'blueprint_technical',
        source: 'Tài liệu chuẩn hóa Rập Cổ phục Việt Nam',
        description: 'Sơ đồ kỹ thuật cấu tạo phom dáng áo ngũ thân tay chẽn: 6 đường ráp vải (đường trung phùng), cổ tròn thẳng đứng ôm khít, form chữ A xòe dần xuống tà.',
        guardrailRule: 'Tay áo liền với vai, hẹp dần và vừa khít cổ tay. Áo không bó nách. Tà áo cong nhẹ mềm mại. Bắt buộc 5 cúc cài bên sườn phải.',
        keySpecs: [
          { label: 'Cổ áo', value: 'Cổ tròn, thẳng đứng (Cổ lập lĩnh)' },
          { label: 'Tay áo', value: 'Liền với vai, hẹp dần vừa khít cổ tay, không bó nách' },
          { label: 'Phom dáng', value: 'Form chữ "A", càng xuống thì tà áo càng xòe ra' },
          { label: 'Quy cách nút', value: '5 nút cài sang phải (Hữu Nhậm)' },
          { label: '6 đường ráp vải', value: '2 ống tay (1-2), 2 dọc sườn (3-4), 2 giữa áo (5,6)' }
        ],
        svgDrawing: '',
        createdAt: new Date().toISOString()
      }
    ];
  }

  // --- REFERENCES CRUD ---
  public getReferences() {
    return this.db.references;
  }

  public getReferenceById(id: string) {
    return this.db.references.find(r => r.id === id);
  }

  public addReference(item: Omit<DatabaseSchema['references'][0], 'id' | 'createdAt'> & { id?: string; imageBase64?: string }) {
    let imageFilePath = item.imageFilePath;
    if (item.imageBase64) {
      imageFilePath = this.saveImageFile(item.imageBase64, 'references', item.id || 'ref');
    }

    const newItem = {
      ...item,
      id: item.id || `ref_${Date.now()}`,
      imageFilePath: imageFilePath,
      createdAt: new Date().toISOString()
    };
    this.db.references.unshift(newItem);
    this.save();
    return newItem;
  }

  public deleteReference(id: string) {
    const idx = this.db.references.findIndex(r => r.id === id);
    if (idx !== -1) {
      const deleted = this.db.references.splice(idx, 1)[0];
      this.save();
      return deleted;
    }
    return null;
  }

  // --- TRYON HISTORY CRUD ---
  public getTryonHistory() {
    return this.db.tryon_history;
  }

  public addTryonHistory(record: Omit<DatabaseSchema['tryon_history'][0], 'id' | 'createdAt'> & { userImageBase64?: string; resultImageBase64?: string }) {
    let userImageFilePath = record.userImageFilePath;
    let resultImageFilePath = record.resultImageFilePath;

    if (record.userImageBase64) {
      userImageFilePath = this.saveImageFile(record.userImageBase64, 'uploads', 'user_portrait');
    }
    if (record.resultImageBase64) {
      resultImageFilePath = this.saveImageFile(record.resultImageBase64, 'uploads', 'tryon_result');
    }

    const newRecord = {
      ...record,
      id: `tryon_${Date.now()}`,
      userImageFilePath: userImageFilePath,
      resultImageFilePath: resultImageFilePath,
      createdAt: new Date().toISOString()
    };
    this.db.tryon_history.unshift(newRecord);
    if (this.db.tryon_history.length > 50) {
      this.db.tryon_history = this.db.tryon_history.slice(0, 50);
    }
    this.save();
    return newRecord;
  }

  public deleteTryonHistory(id: string) {
    const idx = this.db.tryon_history.findIndex(h => h.id === id);
    if (idx !== -1) {
      const deleted = this.db.tryon_history.splice(idx, 1)[0];
      this.save();
      return deleted;
    }
    return null;
  }

  public clearTryonHistory() {
    this.db.tryon_history = [];
    this.save();
    return true;
  }

  // --- BLUEPRINTS ---
  public getBlueprints() {
    return this.db.blueprints;
  }

  // --- SETTINGS ---
  public getSettings() {
    return this.db.settings;
  }

  public updateSettings(settings: Partial<DatabaseSchema['settings']>) {
    this.db.settings = {
      ...this.db.settings,
      ...settings,
      lastUpdated: new Date().toISOString()
    };
    this.save();
    return this.db.settings;
  }
}

export const heritageDb = new HeritageDatabase();
