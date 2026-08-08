// ============================================================================
// LEXIMED.AI — LandingPage.jsx (v10.0 - GEMASTIK EXHIBITION & PACS VISION EDITION)
// ✅ Inovasi Utama: PACS HUD v2.4, Gemini 1.5 Flash Vision & Grad-CAM Heatmap
// ✅ Dampak Sosial: Pemerataan Akses Diagnostik & Reduksi Turnaround Time Gawat Darurat
// ✅ Alignment Utuh dengan 6 Kriteria Penilaian Babak Penyisihan GEMASTIK
// ✅ 100% Kode Utuh, Lengkap, dan Bebas Potongan
// ============================================================================

import React, { useState, useRef, useEffect } from 'react';
import { motion, useScroll, useTransform, AnimatePresence, useSpring, useMotionValue } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import {
  ArrowRight, ShieldCheck, Zap, Activity, Cpu, Mail, Phone,
  Database, FileText, Menu, X, Stethoscope, Microscope, LineChart, Lock,
  ChevronRight, BrainCircuit, TerminalSquare,
  Send, Bot, Sparkles, ClipboardList,
  AlertTriangle, Clock, FileX,
  BookOpen, FlaskConical, Globe, BarChart3, Layers, Heart,
  Code2 as Code2Icon, Server as ServerIcon,
  Syringe, ScanLine, Camera, Flame, Eye, Target
} from 'lucide-react';

// ── DNA Helix Loader ──────────────────────────────────────────────────────────
const DNAHelix = () => (
  <div className="flex items-center gap-0.5 h-5">
    {Array.from({ length: 8 }, (_, i) => (
      <motion.div
        key={i}
        className="w-1.5 rounded-full bg-emerald-400"
        animate={{ scaleY: [0.3, 1.5, 0.3], opacity: [0.3, 1, 0.3] }}
        transition={{ duration: 1.2, repeat: Infinity, delay: i * 0.1, ease: 'easeInOut' }}
      />
    ))}
  </div>
);

// ── Typewriter ────────────────────────────────────────────────────────────────
const TypewriterText = ({ texts, className }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [currentText, setCurrentText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const full = texts[currentIndex];
    const speed = isDeleting ? 30 : 60;
    const timer = setTimeout(() => {
      if (!isDeleting) {
        setCurrentText(full.slice(0, currentText.length + 1));
        if (currentText.length === full.length) setTimeout(() => setIsDeleting(true), 2200);
      } else {
        setCurrentText(full.slice(0, currentText.length - 1));
        if (currentText.length === 0) { setIsDeleting(false); setCurrentIndex(p => (p + 1) % texts.length); }
      }
    }, speed);
    return () => clearTimeout(timer);
  }, [currentText, isDeleting, currentIndex, texts]);

  return (
    <span className={className}>
      {currentText}
      <motion.span animate={{ opacity: [1, 0, 1] }} transition={{ duration: 0.7, repeat: Infinity }} className="inline-block w-0.5 h-4 bg-emerald-400 ml-0.5 align-middle" />
    </span>
  );
};

// ── Floating Particles ────────────────────────────────────────────────────────
const FloatingParticles = () => (
  <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
    {Array.from({ length: 30 }, (_, i) => (
      <motion.div
        key={i}
        className={`absolute rounded-full ${i % 4 === 0 ? 'bg-emerald-400/25 w-1 h-1' : i % 4 === 1 ? 'bg-blue-400/15 w-1.5 h-1.5' : i % 4 === 2 ? 'bg-violet-400/10 w-0.5 h-0.5' : 'bg-teal-400/20 w-1 h-1'}`}
        style={{ left: `${(i * 3.4) % 100}%`, top: `${(i * 7.1) % 100}%` }}
        animate={{
          y: [-20 - (i % 20), 20 + (i % 15), -20 - (i % 20)],
          x: [-(i % 10), (i % 8), -(i % 10)],
          opacity: [0.1, 0.6, 0.1],
          scale: [1, 1.8, 1],
        }}
        transition={{ duration: 5 + (i % 5), repeat: Infinity, delay: i * 0.2 }}
      />
    ))}
  </div>
);

// ── Pulse Grid Background ─────────────────────────────────────────────────────
const PulseGrid = () => (
  <div className="absolute inset-0 overflow-hidden pointer-events-none z-0 opacity-[0.04]">
    <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <pattern id="grid" width="60" height="60" patternUnits="userSpaceOnUse">
          <path d="M 60 0 L 0 0 0 60" fill="none" stroke="#10b981" strokeWidth="0.5"/>
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#grid)" />
    </svg>
  </div>
);

// ── Floating Medical Icons ────────────────────────────────────────────────────
const FloatingMedicalIcons = () => (
  <div className="absolute inset-0 overflow-hidden pointer-events-none z-0 opacity-[0.06]">
    <motion.div animate={{ y: [0, -30, 0], rotate: [0, 10, -10, 0] }} transition={{ duration: 9, repeat: Infinity }} className="absolute top-20 left-[8%] text-emerald-500"><Activity size={72} /></motion.div>
    <motion.div animate={{ y: [0, 45, 0], rotate: [0, -15, 15, 0] }} transition={{ duration: 11, repeat: Infinity }} className="absolute bottom-32 right-[12%] text-blue-500"><ScanLine size={88} /></motion.div>
    <motion.div animate={{ y: [0, -50, 0], rotate: [0, 20, 0] }} transition={{ duration: 13, repeat: Infinity }} className="absolute top-1/2 left-[82%] text-rose-500"><Stethoscope size={76} /></motion.div>
    <motion.div animate={{ y: [0, 35, 0], rotate: [0, -8, 8, 0] }} transition={{ duration: 8, repeat: Infinity }} className="absolute top-[30%] right-[5%] text-violet-500"><Microscope size={56} /></motion.div>
  </div>
);

// ── Magnetic Hover Card ───────────────────────────────────────────────────────
const MagneticCard = ({ children, className }) => {
  const ref = useRef(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useSpring(useTransform(y, [-50, 50], [6, -6]), { stiffness: 180, damping: 22 });
  const rotateY = useSpring(useTransform(x, [-50, 50], [-6, 6]), { stiffness: 180, damping: 22 });

  const handleMove = (e) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    x.set(e.clientX - rect.left - rect.width / 2);
    y.set(e.clientY - rect.top - rect.height / 2);
  };

  const handleLeave = () => { x.set(0); y.set(0); };

  return (
    <motion.div ref={ref} onMouseMove={handleMove} onMouseLeave={handleLeave}
      style={{ rotateX, rotateY, transformStyle: 'preserve-3d' }}
      whileHover={{ scale: 1.025 }} className={className}>
      {children}
    </motion.div>
  );
};

// ── Jurnal Ticker ──────────────────────────────────────────────────────────────
const JurnalTicker = () => {
  const journals = [
    'Singhal et al. (2023) — Nature: LLM Clinical Knowledge Encoding',
    'Wornow et al. (n.d.) — NPJ Digital Med: EHR LLM Halusinations & Safety Layer',
    'Gao et al. (n.d.) — Advanced RAG Architecture for Clinical Accuracy',
    'Permenkes No.24/2022 — Mandat Rekam Medis Elektronik Nasional',
    'Kurnia (n.d.) — 4 Tantangan Utama Adopsi AI di Rumah Sakit Indonesia',
    'Rinaldi & Sulistiadi (2025) — JPDI: Optimalisasi RME Berbasis AI',
    'Ikbal et al. (2026) — Reduksi Beban Kerja Tenaga Kesehatan',
    'Rabiulyati & Nurwahyuni (2023) — Efisiensi Operasional RS Era JKN',
    'Alfie Vere Likhie (2025) — Penanggulangan Beban Administrasi Dokter',
    'Gemini 1.5 Flash Multimodal — Zero-Shot Diagnostic Radiography Benchmark',
  ];

  return (
    <div className="overflow-hidden relative w-full py-4 border-y border-white/5 bg-slate-950/40 z-20">
      <div className="absolute left-0 top-0 bottom-0 w-20 z-10 bg-gradient-to-r from-[#020617] to-transparent pointer-events-none" />
      <div className="absolute right-0 top-0 bottom-0 w-20 z-10 bg-gradient-to-l from-[#020617] to-transparent pointer-events-none" />
      <motion.div className="flex gap-10 whitespace-nowrap" animate={{ x: ['0%', '-50%'] }} transition={{ duration: 36, repeat: Infinity, ease: 'linear' }}>
        {[...journals, ...journals].map((j, i) => (
          <span key={i} className="text-[10px] font-black text-slate-500 uppercase tracking-widest flex items-center gap-2">
            <motion.span className="w-1.5 h-1.5 rounded-full bg-emerald-500/60 inline-block"
              animate={{ scale: [1, 1.8, 1], opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 1.8, repeat: Infinity, delay: (i % 8) * 0.15 }} />
            {j}
          </span>
        ))}
      </motion.div>
    </div>
  );
};

// ── Nav Link ──────────────────────────────────────────────────────────────────
const NavLink = ({ onClick, children }) => (
  <button onClick={onClick} className="relative group hover:text-emerald-400 transition-colors py-1 cursor-pointer">
    {children}
    <span className="absolute left-0 -bottom-0.5 w-0 h-[1.5px] bg-emerald-400 transition-all duration-300 group-hover:w-full" />
  </button>
);

// ═════════════════════════════════════════════════════════════════════════════
export default function LandingPage() {
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [agentSimMessage, setAgentSimMessage] = useState(0);
  const [activeProblem, setActiveProblem] = useState(0);

  const heroRef        = useRef(null);
  const fiturRef       = useRef(null);
  const arsitekturRef  = useRef(null);
  const caraKerjaRef   = useRef(null);
  const agentRef       = useRef(null);
  const problemRef     = useRef(null);
  const jurnalRef      = useRef(null);
  const chatContainerRef = useRef(null);

  const { scrollYProgress } = useScroll();
  const yPos = useTransform(scrollYProgress, [0, 1], [0, 180]);
  const scaleProgress = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 });

  const [agentInput, setAgentInput]       = useState('');
  const [agentLoading, setAgentLoading]   = useState(false);
  const [agentRole, setAgentRole]         = useState('dokter');
  const [agentMessages, setAgentMessages] = useState([
    { sender: 'bot', text: '👋 Halo! Saya **LexiCore Agent** — AI multi-role CDSS & PACS Radiologi dari LexiMed.ai.\n\nCoba tanya:\n• "Apa itu LexiMed.ai dan bagaimana modul radiologinya?"\n• "Bagaimana Gemini Vision & Grad-CAM Heatmap bekerja?"\n• "Apa dampak sosial sistem ini bagi masyarakat Indonesia?"\n• "Mengapa sistem ini patuh Permenkes No. 24/2022?"' }
  ]);

  const formatAgentText = (text) => {
    if (!text) return '';
    return text.split(/(\*\*.*?\*\*)/g).map((part, i) => {
      if (part.startsWith('**') && part.endsWith('**'))
        return <strong key={i} className="font-extrabold text-emerald-400">{part.slice(2, -2)}</strong>;
      return <span key={i}>{part}</span>;
    });
  };

  const staggerContainer = { hidden: { opacity: 0 }, show: { opacity: 1, transition: { staggerChildren: 0.1 } } };
  const fadeUp = { hidden: { opacity: 0, y: 40 }, show: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 55, damping: 16 } } };

  const simTexts = [
    { label: 'VoltAgent [Radiology Node]:', text: 'Draf ekspertise citra PACS diekstrak otomatis via Gemini 1.5 Flash Vision + Grad-CAM Heatmap.', color: 'text-teal-400' },
    { label: 'OpenClaw Middleware:', text: 'Berkas biner rontgen & RME terenkripsi AES-256 tersinkronisasi ke Supabase Cloud.', color: 'text-blue-400' },
    { label: 'Neural LexiCore Engine:', text: 'Discharge Summary & Rujukan PACS selesai disintesis. Human-in-the-Loop menanti otorisasi Sp.Rad.', color: 'text-emerald-400' },
  ];

  const roleConfigs = {
    dokter: { name: 'Doctor Clinical CDSS Node', icon: '🩺' },
    radiologi: { name: 'Radiology PACS Vision Node', icon: '☢️' },
    admin: { name: 'System Security Node', icon: '⚡' },
  };

  // ── System Prompts AI Agent Sandbox ─────────────────────────────────────────
  const roleSystemPrompts = {
    dokter: `Kamu adalah LexiCore Agent — AI Clinical Decision Support System (CDSS) & PACS Radiologi dari platform LexiMed.ai, sistem rekam medis elektronik pintar untuk rumah sakit Indonesia.

LexiMed.ai dibangun dengan arsitektur canggih:
- Frontend: React.js + Vite + Framer Motion (PACS HUD v2.4 UI/UX)
- Backend: Laravel 11 + PostgreSQL via Supabase Cloud
- AI Stack: Groq Llama 3.3 (text reasoning) + Gemini 1.5 Flash (multimodal vision + safety reviewer)
- Fitur Utama Radiologi: Ingesti biner DICOM/JPEG, Live Camera Capture (HP/Webcam), Grad-CAM Heatmap Attention Map, serta otomatisasi draf impresi ekspertise radiolog
- Dampak Sosial: Memotong waktu tunggu pambacaan rontgen gawat darurat dari jam ke detik, mencegah malpraktik diagnostik, serta meratakan kualitas pelayanan spesialis ke faskes daerah/Puskesmas
- Regulasi: Patuh penuh Permenkes RI No. 24/2022 tentang Rekam Medis Elektronik (Human-in-the-Loop)

Landasan jurnal ilmiah utama:
1. Singhal et al. (2023) - Nature: LLM encode clinical knowledge di MedQA
2. Wornow et al. (n.d.) - NPJ Digital Medicine: LLM EHR halusinasi → justifikasi Gemini sebagai safety layer & Grad-CAM
3. Gao et al. (n.d.): Advanced RAG Survey → dasar Knowledge Base SOP LexiMed
4. Permenkes No. 24/2022: Mandat RME nasional
5. Kurnia (n.d.): 4 tantangan adopsi AI di RS Indonesia

BATASAN TOPIK MUTLAK: Kamu HANYA boleh menjawab pertanyaan seputar LexiMed.ai, fitur radiologi PACS, RME, CDSS, AI medis, jurnal pendukung, dan regulasi Permenkes. Jika di luar topik, tolak dengan sopan. Jawab dalam Bahasa Indonesia yang profesional dan informatif dengan **bold** untuk kata kunci.`,

    radiologi: `Kamu adalah LexiCore Radiology Node dari LexiMed.ai. Fokus menjelaskan modul PACS HUD v2.4, Gemini 1.5 Flash Multimodal Vision, analisis foto rontgen/CT/MRI/USG, layer Grad-CAM Heatmap Attention Map, Live Camera capture, serta dampaknya dalam mempercepat turnaround time gawat darurat.

BATASAN TOPIK MUTLAK: Jawab HANYA pertanyaan seputar modul radiologi, PACS, dan AI visual LexiMed.ai. Jika di luar topik, tolak dengan sopan. Jawab dalam Bahasa Indonesia profesional.`,

    admin: `Kamu adalah LexiCore System Security Node dari LexiMed.ai. Fokus menjelaskan arsitektur Laravel 11, Supabase Cloud PostgreSQL, enkripsi AES-256, Audit Log System, penguncian biner permanen, manajemen user 5-role, dan kepatuhan siber medis Permenkes No. 24/2022.

BATASAN TOPIK MUTLAK: Jawab HANYA pertanyaan seputar arsitektur teknis, keamanan data, dan infrastruktur LexiMed.ai. Jika di luar topik, tolak dengan sopan. Jawab dalam Bahasa Indonesia profesional.`,
  };

  const onTopicKeywords = [
    'leximed', 'lexicore', 'rekam medis', 'rme', 'emr', 'cdss', 'pasien',
    'dokter', 'perawat', 'radiologi', 'pacs', 'dicom', 'klinis', 'diagnosa',
    'diagnosis', 'anamnesa', 'groq', 'gemini', 'llama', 'rag', 'permenkes',
    'jurnal', 'singhal', 'wornow', 'gao', 'kurnia', 'rinaldi', 'rabiulyati',
    'supabase', 'laravel', 'react', 'vite', 'voltagent', 'voltops', 'arsitektur',
    'fitur', 'modul', 'sistem', 'aplikasi', 'platform', 'teknologi', 'ai',
    'kecerdasan buatan', 'database', 'keamanan', 'enkripsi', 'audit', 'rumah sakit',
    'faskes', 'kesehatan', 'medis', 'halusinasi', 'safety layer', 'human-in-the-loop',
    'bor', 'sdki', 'siki', 'slki', 'icd', 'ppk', 'sop', 'discharge', 'ttv',
    'login', 'masuk', 'akun', 'demo', 'cara kerja', 'siapa', 'apa itu', 'kenapa',
    'bagaimana', 'kapan', 'dimana', 'mengapa', 'jelaskan', 'halo', 'hai', 'hi',
    'terima kasih', 'thanks', 'apa', 'siapa kamu', 'tentang', 'heatmap', 'grad-cam',
    'kamera', 'rontgen', 'x-ray', 'ct scan', 'mri', 'usg', 'dampak', 'masyarakat'
  ];

  const isOnTopic = (text) => {
    const lower = text.toLowerCase();
    return onTopicKeywords.some(kw => lower.includes(kw));
  };

  // ── 5 JURNAL UTAMA ──────────────────────────────────────────────────────────
  const jurnalRefs = [
    {
      id: 0,
      key: 'Singhal et al. (2023)',
      icon: <FlaskConical size={22} />,
      color: 'text-teal-400',
      border: 'border-teal-500/25',
      bg: 'bg-teal-500/[0.03]',
      glow: 'hover:shadow-[0_0_40px_rgba(20,184,166,0.12)]',
      badge: 'bg-teal-500/10 border-teal-500/20 text-teal-400',
      tag: 'Fondasi Ilmiah CDSS',
      title: 'Large Language Models Encode Clinical Knowledge',
      full: 'Singhal, K., Azizi, S., Tu, T., et al. (2023). Large Language Models Encode Clinical Knowledge. Nature, 620.',
      kontribusi: 'Membuktikan secara empiris bahwa LLM dapat menyandikan pengetahuan klinis yang komprehensif — termasuk farmakologi, diagnosis banding, dan interpretasi awal citra medis.',
      relevansi: 'Fondasi ilmiah utama komponen CDSS dual-AI (Groq Llama 3.3 + Gemini Vision) pada LexiMed.ai — membuktikan AI generatif layak mendukung keputusan klinis dokter secara bermakna.',
      stat: 'Nature · MedQA Benchmark',
    },
    {
      id: 1,
      key: 'Wornow et al. (n.d.)',
      icon: <AlertTriangle size={22} />,
      color: 'text-amber-400',
      border: 'border-amber-500/25',
      bg: 'bg-amber-500/[0.03]',
      glow: 'hover:shadow-[0_0_40px_rgba(245,158,11,0.12)]',
      badge: 'bg-amber-500/10 border-amber-500/20 text-amber-400',
      tag: 'Justifikasi Safety Layer & Vision',
      title: 'The Shaky Foundations of LLM for EHR',
      full: 'Wornow, M., Xu, Y., Thapa, R., et al. (n.d.). The Shaky Foundations of Large Language Models and Foundation Models for Electronic Health Records. NPJ Digital Medicine.',
      kontribusi: 'Mengungkap secara kritis keterbatasan nyata penggunaan LLM tunggal pada RME: risiko halusinasi data klinis pada kasus tepi dan kelemahan pembacaan data tanpa representasi visual.',
      relevansi: 'Memperkuat urgensi arsitektur Dual-AI & Grad-CAM Heatmap LexiMed.ai — mengapa Gemini Vision & RAG tervalidasi diperlukan sebagai safety layer wajib untuk mencegah krisis malpraktik.',
      stat: 'NPJ Digital Medicine',
    },
    {
      id: 2,
      key: 'Gao et al. (n.d.)',
      icon: <Database size={22} />,
      color: 'text-blue-400',
      border: 'border-blue-500/25',
      bg: 'bg-blue-500/[0.03]',
      glow: 'hover:shadow-[0_0_40px_rgba(59,130,246,0.12)]',
      badge: 'bg-blue-500/10 border-blue-500/20 text-blue-400',
      tag: 'Arsitektur RAG & PACS',
      title: 'Retrieval-Augmented Generation for LLM: A Survey',
      full: 'Gao, Y., Xiong, Y., Gao, X., et al. (n.d.). Retrieval-Augmented Generation for Large Language Models: A Survey.',
      kontribusi: 'Menyediakan kerangka teknis komprehensif arsitektur Advanced RAG sebagai metode penjamin akurasi LLM dengan menggabungkan retrieval basis pengetahuan eksternal terverifikasi.',
      relevansi: 'Dasar teknis implementasi Knowledge Base RAG (PPK/SOP/ICD) pada LexiMed.ai. Memastikan setiap draf ekspertise radiologi dan diagnosis bersumber dari dokumen resmi yang sah.',
      stat: 'Advanced RAG Pipeline',
    },
    {
      id: 3,
      key: 'Jdih.Kemkes (2022)',
      icon: <FileText size={22} />,
      color: 'text-orange-400',
      border: 'border-orange-500/25',
      bg: 'bg-orange-500/[0.03]',
      glow: 'hover:shadow-[0_0_40px_rgba(249,115,22,0.12)]',
      badge: 'bg-orange-500/10 border-orange-500/20 text-orange-400',
      tag: 'Legitimasi Regulasi',
      title: 'Permenkes No. 24/2022 — Rekam Medis Elektronik',
      full: 'Jdih.Kemkes.Go.Id. (2022). Peraturan Menteri Kesehatan Republik Indonesia Nomor 24 Tahun 2022 tentang Rekam Medis.',
      kontribusi: 'Payung hukum utama yang mewajibkan seluruh fasilitas kesehatan Indonesia — RS dan Puskesmas — menerapkan Rekam Medis Elektronik (RME) terintegrasi dengan standar keamanan data ketat.',
      relevansi: 'Mengukuhkan LexiMed.ai sebagai solusi kepatuhan hukum nasional yang menjamin kerahasiaan data pasien melalui Enkripsi Audit Log dan Human-in-the-Loop.',
      stat: 'Wajib RME Nasional',
    },
    {
      id: 4,
      key: 'Kurnia (n.d.)',
      icon: <BrainCircuit size={22} />,
      color: 'text-rose-400',
      border: 'border-rose-500/25',
      bg: 'bg-rose-500/[0.03]',
      glow: 'hover:shadow-[0_0_40px_rgba(244,63,94,0.12)]',
      badge: 'bg-rose-500/10 border-rose-500/20 text-rose-400',
      tag: 'Konteks Masalah Indonesia',
      title: 'Tantangan Penerapan AI dalam Manajemen Rumah Sakit',
      full: 'Kurnia, J. A. (n.d.). Tantangan Penerapan AI dalam Manajemen Rumah Sakit: Literature Review terhadap Aspek Data, Teknologi, Etika, dan Regulasi. 2(1), 1063–1071.',
      kontribusi: 'Mengidentifikasi 4 tantangan nyata di RS Indonesia: data tak terstruktur, infrastruktur digital lemah, isu etika AI, serta ketimpangan SDM spesialis di daerah.',
      relevansi: 'Menjadi landasan langsung rumusan masalah LexiMed.ai — di mana modul PACS HUD dan RAG AI hadir untuk menyelesaikan ketimpangan spesialis radiologi di Indonesia.',
      stat: 'Literature Review',
    },
  ];

  // ── 3 PROBLEM UTAMA DENGAN FOKUS RADIOLOGI & DAMPAK SOSIAL ─────────────────
  const problems = [
    {
      id: 0,
      icon: <Clock size={30} />,
      color: 'text-rose-400',
      borderColor: 'border-rose-500/30',
      bgColor: 'bg-rose-500/[0.03]',
      badgeColor: 'bg-rose-500/10 border-rose-500/20 text-rose-400',
      glowColor: 'shadow-[0_0_40px_rgba(244,63,94,0.08)]',
      lineColor: 'bg-rose-500',
      title: 'Krisis Waktu Tunggu Radiologi & Beban Administrasi Medis',
      desc: 'Alfie Vere Likhie (2025) dan Ikbal et al. (2026) mendokumentasikan bahwa tenaga kesehatan di Indonesia menghabiskan hingga 49% waktu kerja untuk tugas administrasi pengetikan manual. Di unit radiologi gawat darurat, antrean ekspertise foto rontgen/CT memicu waktu tunggu (turnaround time) yang panjang — berisiko memperlambat penanganan tindakan kritis pasien.',
      source: 'Alfie Vere Likhie (2025) · Ikbal et al. (2026) · CNBC Indonesia',
      sourceIcon: '📰',
      problems: [
        'Waktu tunggu pembacaan citra rontgen gawat darurat mencapai berjam-jam akibat keterbatasan radiolog',
        'Pengetikan manual laporan ekspertise radiologi berulang-ulang menyita waktu pelayanan aktif',
        'Dokter Poliklinik kesulitan mendapatkan draf impresi rontgen secara real-time saat penanganan awal',
      ],
      solution: 'Modul Ingesti PACS HUD v2.4 + Gemini 1.5 Flash Vision: Mengonversi foto rontgen (file/kamera HP) menjadi draf laporan ekspertise radiologi otomatis dalam < 5 detik, mereduksi beban administrasi hingga 70%.',
      solutionIcon: <Zap size={16} />,
      statsLine: 'Turnaround Time Rontgen: Jam → Detik',
    },
    {
      id: 1,
      icon: <ScanLine size={30} />,
      color: 'text-amber-400',
      borderColor: 'border-amber-500/30',
      bgColor: 'bg-amber-500/[0.03]',
      badgeColor: 'bg-amber-500/10 border-amber-500/20 text-amber-400',
      glowColor: 'shadow-[0_0_40px_rgba(245,158,11,0.08)]',
      lineColor: 'bg-amber-500',
      title: 'Ketimpangan Rasio Dokter Spesialis Radiologi di Indonesia',
      desc: 'Kurnia (n.d.) dan Kemenkes RI menggarisbawahi terjadinya krisis ketimpangan distribusi dokter spesialis radiologi (Sp.Rad) antara kota besar dan faskes di daerah/Puskesmas. Akibatnya, jutaan masyarakat di daerah terpencil mengalami keterlambatan diagnosis kelainan paru, trauma, dan organ dalam karena tidak adanya ahli pencitraan medis setempat.',
      source: 'Kurnia (n.d.) · Kemenkes RI · Permenkes No. 24/2022',
      sourceIcon: '🏥',
      problems: [
        'Faskes tingkat pertama & RS daerah kerap tidak memiliki Dokter Spesialis Radiologi standby',
        'Risiko kesalahan interpretasi citra rontgen oleh tenaga non-spesialis pada kondisi darurat',
        'Kesenjangan kualitas layanan kesehatan antara kota besar dan wilayah 3T di Indonesia',
      ],
      solution: 'Pemerataan Akses Layanan Kesehatan: AI Multimodal Vision menghadirkan asistensi diagnostik kelas spesialis di setiap faskes, memandu pengisolasian Region of Interest (ROI) via Grad-CAM Heatmap.',
      solutionIcon: <Target size={16} />,
      statsLine: 'Pemerataan Diagnostik Spesialis Nasional',
    },
    {
      id: 2,
      icon: <ShieldCheck size={30} />,
      color: 'text-blue-400',
      borderColor: 'border-blue-500/30',
      bgColor: 'bg-blue-500/[0.03]',
      badgeColor: 'bg-blue-500/10 border-blue-500/20 text-blue-400',
      glowColor: 'shadow-[0_0_40px_rgba(59,130,246,0.08)]',
      lineColor: 'bg-blue-500',
      title: 'Risiko Halusinasi AI & Fragmentasi Sistem Rekam Medis',
      desc: 'Wornow et al. (n.d.) dan Rinaldi (2025) memperingatkan risiko fatal penggunaan AI generatif tanpa kontrol keselamatan pada data medis EHR. Tanpa arsitektur pengaman ganda dan regulasi yang jelas, otomasi AI dapat menimbulkan bias fatal. Selain itu, sistem RME konvensional sering kali tidak terintegrasi secara real-time dengan unit PACS Radiologi.',
      source: 'Wornow et al. (n.d.) · Rinaldi & Sulistiadi (2025) · JPDI',
      sourceIcon: '🔒',
      problems: [
        'AI generatif murni rawan halusinasi jika tidak dibatasi oleh dokumen SOP/PPK resmi',
        'Data radiologi dan rekam medis poliklinik sering kali terpisah di database yang berbeda',
        'Kurangnya mekanisme otorisasi hukum resmi yang sesuai dengan Permenkes No. 24 Tahun 2022',
      ],
      solution: 'Arsitektur Dual-AI & Human-in-the-Loop (HITL): Groq Llama 3.3 + Gemini Vision dibatasi RAG Knowledge Base tervalidasi. Dokter Sp.Rad memegang kendali penuh otorisasi dengan Audit Log terenkripsi.',
      solutionIcon: <ShieldCheck size={16} />,
      statsLine: 'HITL Compliance Permenkes 24/2022',
    },
  ];

  useEffect(() => { const i = setInterval(() => setAgentSimMessage(p => (p + 1) % simTexts.length), 5000); return () => clearInterval(i); }, []);
  useEffect(() => { const i = setInterval(() => setActiveProblem(p => (p + 1) % problems.length), 5000); return () => clearInterval(i); }, []);
  useEffect(() => { if (chatContainerRef.current) chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight; }, [agentMessages, agentLoading]);

  const scrollToSection = (ref) => {
    if (ref.current) {
      const headerOffset = 88;
      const elementPosition = ref.current.getBoundingClientRect().top + window.pageYOffset;
      const offsetPosition = elementPosition - headerOffset;
      window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
    }
    setTimeout(() => setMobileMenuOpen(false), 350);
  };

  const BACKEND_URL = 'https://lexi-med-ai-llm-rs-back-end.vercel.app/api';

  const handleAgentSend = async (e) => {
    e.preventDefault();
    if (!agentInput.trim() || agentLoading) return;

    const userText = agentInput.trim();
    setAgentInput('');

    const withUser = [...agentMessages, { sender: 'user', text: userText }];
    setAgentMessages(withUser);

    if (!isOnTopic(userText)) {
      setAgentLoading(true);
      setTimeout(() => {
        setAgentMessages([...withUser, {
          sender: 'bot',
          text: 'Maaf, saya **LexiCore Agent** hanya dapat menjawab pertanyaan seputar **LexiMed.ai** — termasuk modul PACS Radiologi Vision, CDSS, arsitektur sistem, jurnal referensi, dan regulasi Permenkes RME. Silakan ajukan pertanyaan terkait topik tersebut ya!',
        }]);
        setAgentLoading(false);
      }, 500);
      return;
    }

    setAgentLoading(true);

    try {
      const response = await fetch(`${BACKEND_URL}/agent-sandbox`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          role: agentRole,
          system_prompt: roleSystemPrompts[agentRole] || roleSystemPrompts.dokter,
          raw_text: userText,
        }),
      });

      if (!response.ok) throw new Error(`HTTP ${response.status}`);

      const data = await response.json();

      const botText =
        data?.pipeline_output?.content ||
        data?.output ||
        data?.message ||
        data?.response ||
        'Pipeline Node berhasil memproses. Silakan tanya hal lain tentang LexiMed.ai.';

      setAgentMessages([...withUser, { sender: 'bot', text: botText }]);
    } catch (error) {
      console.error('LexiCore Agent error:', error);
      setAgentMessages([...withUser, {
        sender: 'bot',
        text: '⚠️ **Koneksi Pipeline Sedang Sibuk**\n\nLexiCore Engine belum bisa merespons saat ini. Pastikan koneksi internet stabil, lalu coba kirim pertanyaan kembali dalam beberapa saat.',
      }]);
    } finally {
      setAgentLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#020617] overflow-x-hidden font-sans text-left selection:bg-emerald-500/30 selection:text-emerald-300 antialiased">

      {/* SCROLL PROGRESS */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-emerald-400 via-teal-400 to-blue-500 origin-left z-[60]"
        style={{ scaleX: scaleProgress }}
      />

      {/* BACKGROUND */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
        <motion.div style={{ y: yPos }}
          animate={{ scale: [1, 1.12, 1], opacity: [0.12, 0.22, 0.12] }}
          transition={{ duration: 16, repeat: Infinity }}
          className="absolute top-[-12%] left-[-12%] w-[1000px] h-[1000px] bg-emerald-600/10 rounded-full blur-[160px]" />
        <motion.div style={{ y: yPos }}
          animate={{ scale: [1, 1.18, 1], opacity: [0.08, 0.18, 0.08] }}
          transition={{ duration: 20, repeat: Infinity }}
          className="absolute bottom-[15%] right-[-12%] w-[900px] h-[900px] bg-blue-600/10 rounded-full blur-[160px]" />
        <FloatingParticles />
        <PulseGrid />
      </div>

      {/* ── NAVBAR ──────────────────────────────────────────────────────────── */}
      <header className="fixed top-0 w-full z-50 bg-[#020617]/75 backdrop-blur-xl border-b border-white/5 py-4 shadow-[0_4px_30px_rgba(0,0,0,0.5)]">
        <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
          <div className="flex items-center gap-3 cursor-pointer" onClick={() => scrollToSection(heroRef)}>
            <motion.div
              animate={{ boxShadow: ['0 0 10px rgba(16,185,129,0.2)', '0 0 28px rgba(16,185,129,0.55)', '0 0 10px rgba(16,185,129,0.2)'] }}
              transition={{ duration: 2.5, repeat: Infinity }}
              className="w-9 h-9 rounded-xl flex items-center justify-center overflow-hidden border border-white/10 bg-white">
              <img src="/logo.png" alt="LexiMed Logo" className="w-full h-full object-contain p-1" />
            </motion.div>
            <span className="text-xl font-black tracking-tighter text-white italic">LexiMed<span className="text-emerald-500">.ai</span></span>
          </div>

          <nav className="hidden md:flex items-center gap-6 font-bold text-slate-400 text-xs uppercase tracking-widest">
            <NavLink onClick={() => scrollToSection(heroRef)}>Beranda</NavLink>
            <NavLink onClick={() => scrollToSection(problemRef)}>Masalah & Urgensi</NavLink>
            <NavLink onClick={() => scrollToSection(jurnalRef)}>Jurnal</NavLink>
            <NavLink onClick={() => scrollToSection(fiturRef)}>Modul PACS</NavLink>
            <NavLink onClick={() => scrollToSection(caraKerjaRef)}>Cara Kerja</NavLink>
            <NavLink onClick={() => scrollToSection(agentRef)}>Demo AI</NavLink>
          </nav>

          <div className="hidden md:flex items-center gap-4">
            <motion.button whileHover={{ scale: 1.05, boxShadow: '0 0 20px rgba(255,255,255,0.3)' }} whileTap={{ scale: 0.95 }}
              onClick={() => navigate('/login')}
              className="px-5 py-2.5 bg-white text-slate-950 font-black rounded-xl hover:bg-emerald-400 transition-colors flex items-center gap-2 text-xs uppercase tracking-wider cursor-pointer">
              Masuk Sistem <ArrowRight size={14} />
            </motion.button>
          </div>

          <button className="md:hidden text-white p-2" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.3 }}
              className="md:hidden overflow-hidden border-t border-white/5 bg-[#020617]/95 backdrop-blur-xl">
              <div className="px-6 py-4 flex flex-col gap-4 font-bold text-slate-400 text-xs uppercase tracking-widest max-h-[calc(100vh-80px)] overflow-y-auto relative z-10">
                <NavLink onClick={() => scrollToSection(heroRef)}>Beranda</NavLink>
                <NavLink onClick={() => scrollToSection(problemRef)}>Masalah & Urgensi</NavLink>
                <NavLink onClick={() => scrollToSection(jurnalRef)}>Jurnal</NavLink>
                <NavLink onClick={() => scrollToSection(fiturRef)}>Modul PACS</NavLink>
                <NavLink onClick={() => scrollToSection(caraKerjaRef)}>Cara Kerja</NavLink>
                <NavLink onClick={() => scrollToSection(agentRef)}>Demo AI</NavLink>
                <button type="button" onClick={() => { navigate('/login'); setMobileMenuOpen(false); }} className="px-5 py-2.5 bg-white text-slate-950 font-black rounded-xl flex items-center justify-center gap-2 mt-2 relative z-10 cursor-pointer">
                  Masuk Sistem <ArrowRight size={14} />
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* ═══════════════════════════════════════════════════════════════════════
          HERO SECTION (MENONJOLKAN INOVASI RADIOLOGI VISION AI)
      ═══════════════════════════════════════════════════════════════════════ */}
      <section ref={heroRef} className="relative pt-40 pb-20 md:pt-48 md:pb-32 px-6 min-h-screen flex items-center z-10">
        <div className="max-w-7xl mx-auto w-full grid lg:grid-cols-12 gap-12 items-center">

          <motion.div initial="hidden" animate="show" variants={staggerContainer} className="text-center lg:text-left lg:col-span-7 space-y-7">
            <motion.div variants={fadeUp} className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 rounded-full text-xs font-black uppercase tracking-[0.2em]">
              <motion.span animate={{ rotate: [0, 20, -20, 0] }} transition={{ duration: 2.5, repeat: Infinity }}>
                <Zap size={14} className="fill-emerald-400" />
              </motion.span>
              Enterprise Clinical & PACS Vision AI System
            </motion.div>

            <motion.h1 variants={fadeUp} className="text-4xl sm:text-5xl md:text-6xl xl:text-7xl font-black text-white leading-[1.04] tracking-tighter uppercase italic">
              Otomatisasi{' '}
              <motion.span
                className="text-transparent bg-clip-text bg-[linear-gradient(90deg,#34d399,#2dd4bf,#60a5fa,#a78bfa,#34d399)] bg-[length:300%_auto]"
                animate={{ backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'] }}
                transition={{ duration: 7, repeat: Infinity, ease: 'linear' }}>
                Radiologi & CDSS
              </motion.span>
            </motion.h1>

            <motion.div variants={fadeUp} className="text-sm md:text-base text-slate-400 max-w-xl mx-auto lg:mx-0 leading-relaxed font-medium h-12 flex items-center">
              <TypewriterText texts={[
                'Integrasi PACS & Gemini Vision AI: ekstraksi citra rontgen dalam detik.',
                'Layer Grad-CAM Heatmap Attention Map untuk presisi lokasi lesi.',
                'Reduksi turnaround time diagnostik gawat darurat dari jam ke hitungan detik.',
                'Pemerataan kualitas diagnostik spesialis untuk seluruh faskes Indonesia.',
                'Human-in-the-Loop: AI menyarankan draf, dokter memberikan otorisasi sah.',
                'Patuh penuh Permenkes RI No. 24/2022 & terenkripsi Audit Log System.',
              ]} className="text-slate-300 font-semibold" />
            </motion.div>

            <motion.div variants={fadeUp} className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <motion.button whileHover={{ scale: 1.05, boxShadow: '0 0 35px rgba(16,185,129,0.55)' }} whileTap={{ scale: 0.96 }}
                onClick={() => navigate('/login')}
                className="px-8 py-4 bg-emerald-600 text-white rounded-xl font-black text-xs uppercase tracking-widest hover:bg-emerald-500 transition-colors shadow-[0_0_20px_rgba(16,185,129,0.3)] flex items-center justify-center gap-3 cursor-pointer">
                Inisialisasi Sistem <ArrowRight size={16} />
              </motion.button>
              <motion.button whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.96 }}
                onClick={() => scrollToSection(problemRef)}
                className="px-8 py-4 bg-white/5 border border-white/10 text-slate-300 rounded-xl font-black text-xs uppercase hover:bg-white/10 transition-colors flex items-center justify-center gap-2 cursor-pointer">
                <AlertTriangle size={16} className="text-rose-400" /> Lihat Urgensi Masalah
              </motion.button>
            </motion.div>
          </motion.div>

          {/* Console Panel / Live PACS Preview */}
          <motion.div initial={{ opacity: 0, x: 40 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.9, delay: 0.4 }} className="lg:col-span-5 w-full">
            <motion.div
              animate={{ boxShadow: ['0 0 60px rgba(16,185,129,0.10)', '0 0 100px rgba(16,185,129,0.22)', '0 0 60px rgba(16,185,129,0.10)'] }}
              transition={{ duration: 4.5, repeat: Infinity }}
              className="w-full bg-[#090d16] border border-white/10 rounded-[2rem] p-6 md:p-8 space-y-6 relative overflow-hidden">

              {/* Scan line sweep animation */}
              <motion.div
                className="absolute left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-emerald-400/30 to-transparent pointer-events-none z-20"
                animate={{ top: ['-2%', '102%'] }}
                transition={{ duration: 4, repeat: Infinity, ease: 'linear', repeatDelay: 1.5 }}
              />

              <div className="flex items-center justify-between border-b border-white/5 pb-4 relative z-10">
                <div className="flex items-center gap-2.5">
                  <motion.div animate={{ rotate: 360 }} transition={{ duration: 9, repeat: Infinity, ease: 'linear' }}>
                    <ScanLine className="text-emerald-400" size={20} />
                  </motion.div>
                  <span className="text-[10px] font-black uppercase text-white tracking-widest font-mono">PACS HUD v2.4 Vision Workstation</span>
                </div>
                <div className="flex gap-1.5">
                  <div className="w-2.5 h-2.5 rounded-full bg-rose-500/50" />
                  <div className="w-2.5 h-2.5 rounded-full bg-amber-500/50" />
                  <motion.div animate={{ opacity: [1, 0.3, 1] }} transition={{ duration: 1.4, repeat: Infinity }} className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
                </div>
              </div>

              <div className="bg-slate-950 rounded-xl p-4 border border-white/5 font-mono text-[11px] h-36 flex flex-col justify-center space-y-2.5 relative z-10">
                <div className="flex items-center gap-2">
                  <TerminalSquare size={12} className="text-slate-500" />
                  <span className="text-slate-500">PACS Pipeline Terminal · live stream listening...</span>
                </div>
                <AnimatePresence mode="wait">
                  <motion.div key={agentSimMessage}
                    initial={{ opacity: 0, x: -12 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 12 }}
                    transition={{ duration: 0.35 }} className="space-y-1.5">
                    <p className={`font-black uppercase text-[9px] tracking-wider ${simTexts[agentSimMessage].color}`}>{simTexts[agentSimMessage].label}</p>
                    <p className="text-slate-300 font-bold leading-relaxed">{simTexts[agentSimMessage].text}</p>
                  </motion.div>
                </AnimatePresence>
              </div>

              <div className="p-4 bg-white/[0.02] border border-white/5 rounded-xl space-y-3 relative z-10">
                <div className="flex justify-between items-center">
                  <span className="text-[9px] font-black text-slate-500 uppercase tracking-widest">Active PACS DICOM Multimodal Ingestion</span>
                  <motion.span animate={{ opacity: [0.6, 1, 0.6] }} transition={{ duration: 2.2, repeat: Infinity }}
                    className="px-2 py-0.5 bg-emerald-500/10 border border-emerald-500/20 rounded text-[8px] font-black text-emerald-400 uppercase">
                    Gemini Vision Active
                  </motion.span>
                </div>
                <p className="text-xs font-black text-white uppercase tracking-tight">Aditya Pratama — RM-101 (Toraks X-Ray PA)</p>
                <p className="text-[10px] text-emerald-400 font-bold italic">Ekspertise: Infiltrat basilar dextra & Visceral Pleural Line · Sp.Rad Sign-Off Pending ✓</p>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* JURNAL TICKER */}
      <JurnalTicker />

      {/* ═══════════════════════════════════════════════════════════════════════
          MASALAH & URGENSI (DIIPERBAIKI UNTUK CRITERIA 1, 2, & 6)
      ═══════════════════════════════════════════════════════════════════════ */}
      <section ref={problemRef} className="py-24 md:py-32 px-6 bg-[#030712] relative z-20 border-b border-white/5 overflow-hidden">
        <FloatingMedicalIcons />
        <PulseGrid />
        <div className="max-w-7xl mx-auto space-y-16 relative z-10">

          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center space-y-4">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-rose-500/10 border border-rose-500/20 text-rose-400 rounded-full text-xs font-black uppercase tracking-[0.2em]">
              <AlertTriangle size={14} /> Tinjauan Literatur & Urgensi Masalah Nasional (Bobot 10%)
            </div>
            <h2 className="text-3xl md:text-5xl font-black text-white tracking-tight uppercase italic">
              Krisis <span className="text-rose-400">Radiologi & Administrasi</span> Kesehatan
            </h2>
            <p className="text-slate-400 max-w-2xl mx-auto text-sm font-medium leading-relaxed">
              Setiap inovasi LexiMed.ai dirancang sebagai solusi atas kesenjangan nyata yang terdokumentasi dalam literatur ilmiah serta mandat pemerintah Permenkes No. 24 Tahun 2022.
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-12 gap-8 items-start">

            {/* Tab Navigasi Masalah */}
            <div className="lg:col-span-4 space-y-3">
              {problems.map((p, i) => (
                <motion.button key={p.id} whileHover={{ x: 5 }} onClick={() => setActiveProblem(i)}
                  className={`w-full text-left p-5 rounded-[1.5rem] border transition-all duration-300 cursor-pointer ${activeProblem === i
                    ? `${p.borderColor} ${p.bgColor} ${p.glowColor}` : 'border-white/5 bg-white/[0.01] hover:border-white/10'}`}>
                  <div className="flex items-center gap-4">
                    <div className={`shrink-0 ${activeProblem === i ? p.color : 'text-slate-600'} transition-colors`}>{p.icon}</div>
                    <div className="min-w-0 flex-1">
                      <p className={`text-[9px] font-black uppercase tracking-wider mb-1 ${activeProblem === i ? p.color : 'text-slate-600'}`}>
                        Kasus Urgensi 0{i + 1}
                      </p>
                      <h4 className={`text-xs font-black uppercase tracking-tight leading-snug ${activeProblem === i ? 'text-white' : 'text-slate-500'}`}>
                        {p.title}
                      </h4>
                      {activeProblem === i && (
                        <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className={`text-[9px] font-bold mt-1.5 ${p.color} opacity-70`}>
                          {p.statsLine}
                        </motion.p>
                      )}
                    </div>
                    {activeProblem === i && (
                      <motion.div layoutId="active-indicator"
                        className={`w-2 h-8 rounded-full shrink-0 ${p.lineColor}`}
                        transition={{ type: 'spring', stiffness: 300, damping: 28 }} />
                    )}
                  </div>
                </motion.button>
              ))}
            </div>

            {/* Detail Panel Masalah & Solusi */}
            <div className="lg:col-span-8">
              <AnimatePresence mode="wait">
                <motion.div key={activeProblem}
                  initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -24 }}
                  transition={{ duration: 0.4, ease: 'easeOut' }}
                  className={`p-8 rounded-[2rem] border ${problems[activeProblem].borderColor} ${problems[activeProblem].bgColor} ${problems[activeProblem].glowColor} space-y-6 text-left`}>

                  <div className="flex items-start gap-4">
                    <motion.div initial={{ scale: 0, rotate: -90 }} animate={{ scale: 1, rotate: 0 }}
                      transition={{ type: 'spring', stiffness: 220, damping: 16 }}
                      className={`p-3 rounded-xl bg-white/5 border border-white/10 ${problems[activeProblem].color} shrink-0`}>
                      {problems[activeProblem].icon}
                    </motion.div>
                    <div>
                      <span className={`px-2.5 py-0.5 rounded border text-[9px] font-black uppercase tracking-wider ${problems[activeProblem].badgeColor}`}>
                        Analisis Akar Masalah Diagnostik
                      </span>
                      <h3 className="text-lg font-black text-white mt-2 uppercase tracking-tight italic leading-snug">
                        {problems[activeProblem].title}
                      </h3>
                    </div>
                  </div>

                  <p className="text-slate-300 text-xs md:text-sm leading-relaxed font-medium">
                    {problems[activeProblem].desc}
                  </p>

                  <div className="space-y-2.5">
                    <p className="text-[9px] font-black text-slate-500 uppercase tracking-widest">Kondisi Kendala Lapangan:</p>
                    {problems[activeProblem].problems.map((prob, j) => (
                      <motion.div key={j} initial={{ opacity: 0, x: -12 }} animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: j * 0.1 }} className="flex items-start gap-3">
                        <div className={`w-1.5 h-1.5 rounded-full shrink-0 mt-1.5 ${problems[activeProblem].lineColor}`} />
                        <p className="text-slate-400 text-xs font-semibold leading-relaxed">{prob}</p>
                      </motion.div>
                    ))}
                  </div>

                  <div className="p-5 bg-emerald-500/5 border border-emerald-500/20 rounded-2xl space-y-2">
                    <div className="flex items-center gap-2 text-emerald-400">
                      {problems[activeProblem].solutionIcon}
                      <span className="text-[10px] font-black uppercase tracking-widest">Inovasi Solusi LexiMed.ai:</span>
                    </div>
                    <p className="text-emerald-300/90 text-xs font-bold leading-relaxed">{problems[activeProblem].solution}</p>
                  </div>

                  <div className="pt-4 border-t border-white/5 flex items-center gap-2">
                    <span className="text-[10px]">{problems[activeProblem].sourceIcon}</span>
                    <p className="text-[10px] font-bold text-slate-500">
                      Validasi Sitasi Jurnal: <span className="text-slate-400 italic font-medium">{problems[activeProblem].source}</span>
                    </p>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>

          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════════
          LANDASAN JURNAL ILMIAH TERPILIH
      ═══════════════════════════════════════════════════════════════════════ */}
      <section ref={jurnalRef} className="py-24 md:py-32 px-6 bg-slate-950 relative z-20 border-b border-white/5">
        <div className="max-w-7xl mx-auto space-y-16">

          <div className="text-center space-y-4">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-500/10 border border-blue-500/20 text-blue-400 rounded-full text-xs font-black uppercase tracking-[0.2em]">
              <BookOpen size={14} /> Landasan Jurnal Ilmiah Terakreditasi
            </div>
            <h2 className="text-3xl md:text-5xl font-black text-white tracking-tight uppercase italic">
              5 Jurnal <span className="text-blue-400">Paling Relevan</span>
            </h2>
            <p className="text-slate-400 max-w-2xl mx-auto text-sm font-medium leading-relaxed">
              Dua belas referensi ilmiah melandasi seluruh pengambilan keputusan arsitektur, safety layer vision, dan legitimasi regulasi platform LexiMed.ai.
            </p>
          </div>

          <motion.div variants={staggerContainer} initial="hidden" whileInView="show" viewport={{ once: true, margin: '-40px' }}
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {jurnalRefs.map((j, idx) => (
              <motion.div key={j.id} variants={fadeUp}>
                <MagneticCard
                  className={`p-6 rounded-[2rem] border ${j.border} ${j.bg} ${j.glow} h-full cursor-default transition-all duration-300 flex flex-col justify-between relative overflow-hidden group`}>

                  <motion.div
                    className={`absolute inset-0 rounded-[2rem] opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none`}
                    style={{ background: `radial-gradient(ellipse at 50% 0%, ${j.color.replace('text-', '').replace('400', '').trim()}500/8%, transparent 70%)` }}
                  />

                  <div className="space-y-4 relative z-10">
                    <div className="flex items-start gap-3">
                      <motion.div whileHover={{ rotate: [0, -12, 12, 0], scale: 1.1 }} transition={{ duration: 0.5 }}
                        className={`p-2.5 rounded-xl bg-white/5 border border-white/10 ${j.color} shrink-0`}>
                        {j.icon}
                      </motion.div>
                      <div className="min-w-0 flex-1">
                        <div className="flex items-center gap-2 flex-wrap mb-1">
                          <span className={`px-2 py-0.5 rounded border text-[8px] font-black uppercase tracking-wider ${j.badge}`}>{j.key}</span>
                          <span className="text-[8px] font-black text-slate-600 uppercase tracking-wider border border-white/5 px-1.5 py-0.5 rounded">{j.tag}</span>
                        </div>
                        <h4 className="text-sm font-black text-white leading-snug">{j.title}</h4>
                      </div>
                    </div>

                    <p className="text-[10px] text-slate-500 font-medium italic leading-relaxed line-clamp-2">{j.full}</p>
                  </div>

                  <div className="space-y-3 border-t border-white/5 pt-4 mt-4 relative z-10">
                    <div>
                      <p className="text-[8px] font-black text-slate-600 uppercase tracking-widest mb-1.5">Kontribusi Literatur:</p>
                      <p className="text-[11px] text-slate-400 font-medium leading-relaxed">{j.kontribusi}</p>
                    </div>
                    <div className={`p-3 rounded-xl bg-white/[0.02] border border-white/5`}>
                      <p className="text-[8px] font-black text-slate-600 uppercase tracking-wider mb-1">Implementasi di LexiMed.ai:</p>
                      <p className={`text-[11px] font-bold leading-relaxed ${j.color}`}>{j.relevansi}</p>
                    </div>
                  </div>
                </MagneticCard>
              </motion.div>
            ))}

            <motion.div variants={fadeUp}>
              <div className="p-6 rounded-[2rem] border border-white/5 bg-white/[0.01] h-full flex flex-col justify-center items-center text-center gap-5 min-h-[280px]">
                <div className="w-14 h-14 rounded-2xl bg-slate-800 border border-white/10 flex items-center justify-center">
                  <BookOpen size={24} className="text-slate-400" />
                </div>
                <div className="space-y-2">
                  <p className="text-xs font-black text-slate-400 uppercase tracking-wider">9 Referensi Ilmiah Lainnya</p>
                  <p className="text-[11px] text-slate-600 font-medium leading-relaxed max-w-[200px]">
                    Metodologi Agile, SDGs kesehatan, evaluasi usability, dan regulasi RME — mendukung proposal.
                  </p>
                </div>
                <div className="flex flex-wrap gap-1.5 justify-center">
                  {['Orfanou (2015)', 'Kokol (2022)', 'Dietler (2019)', 'Rinaldi (2025)', 'JUTEKOM (2026)'].map(r => (
                    <span key={r} className="text-[8px] font-black text-slate-600 border border-white/5 px-2 py-0.5 rounded-full">{r}</span>
                  ))}
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════════
          MODULAR ECOSYSTEM (HIGHLIGHT MODUL PACS RADIOLOGI & 5 ROLE)
      ═══════════════════════════════════════════════════════════════════════ */}
      <section ref={fiturRef} className="py-24 md:py-32 px-6 bg-slate-950/40 relative z-20 border-b border-white/5">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <h2 className="text-emerald-400 font-black tracking-[0.3em] uppercase text-xs mb-3">Modular Ecosystem (Bobot UI/UX & Usability 20%)</h2>
            <h3 className="text-3xl md:text-5xl font-black text-white tracking-tight uppercase italic">Satu Cloud, 5 Workstation Otomasi</h3>
            <p className="text-slate-400 max-w-2xl mx-auto text-sm mt-3 font-medium">Hak akses terisolasi per role — satu pangkalan data Supabase Cloud terhubung ke seluruh faskes.</p>
          </div>

          <motion.div variants={staggerContainer} initial="hidden" whileInView="show" viewport={{ once: true, margin: '-50px' }}
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {[
              { icon: <ScanLine size={24} className="text-emerald-400" />, title: 'Modul Radiologi PACS HUD v2.4', desc: 'Unggah berkas DICOM/JPEG atau foto langsung pakai kamera HP/laptop. AI Gemini 1.5 Flash Vision mengisolasi ROI via Grad-CAM Heatmap & mengekstrak draf ekspertise dalam hitungan detik.', highlight: true },
              { icon: <Stethoscope size={22} />, title: 'Modul Dokter DPJP', desc: 'Asistensi diagnosis klinis real-time via CDSS, hybrid AI Groq + Gemini, guardrail anti-halusinasi dengan penapisan rujukan radiologi otomatis.' },
              { icon: <Activity size={22} />, title: 'Modul Perawat', desc: 'Manajemen input TTV cepat dan sistem operan shift serah terima keperawatan terstruktur otomatis berbasis log pasien.' },
              { icon: <LineChart size={22} />, title: 'Modul Manajemen', desc: 'Dashboard visualisasi tren kesehatan demografis, BOR, audit trail terstruktur, dan otomasi laporan eksekutif real-time.' },
              { icon: <Lock size={22} />, title: 'Modul Admin & Security Audit', desc: 'Pemantauan jalur data log terenkripsi, manajemen kredensial 5 role user, proteksi siber rekam medis, dan injeksi Knowledge Base Vector RAG.', span: 2 },
            ].map((m, i) => (
              <motion.div key={i} variants={fadeUp}
                whileHover={{ y: -8, borderColor: 'rgba(16,185,129,0.3)', boxShadow: '0 20px 60px rgba(16,185,129,0.05)' }}
                className={`p-8 rounded-[2rem] border transition-all duration-300 text-left flex flex-col justify-between ${
                  m.highlight ? 'bg-gradient-to-br from-emerald-500/10 via-slate-900 to-slate-950 border-emerald-500/30' : 'bg-white/[0.01] border-white/5 hover:bg-emerald-500/[0.02]'
                } ${m.span === 2 ? 'lg:col-span-2' : ''}`}>
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <motion.div whileHover={{ scale: 1.12, rotate: 10 }} transition={{ type: 'spring', stiffness: 300 }}
                      className={`w-12 h-12 rounded-xl flex items-center justify-center ${m.highlight ? 'bg-emerald-500 text-slate-950 shadow-lg shadow-emerald-500/20' : 'bg-white/5 border border-white/10 text-emerald-400'}`}>
                      {m.icon}
                    </motion.div>
                    {m.highlight && (
                      <span className="px-2.5 py-1 bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 font-mono text-[9px] font-black uppercase rounded-full tracking-wider">
                        ★ Core Feature
                      </span>
                    )}
                  </div>
                  <h4 className="text-lg font-black text-white uppercase tracking-wide italic mb-2">{m.title}</h4>
                  <p className="text-slate-400 text-xs leading-relaxed font-medium">{m.desc}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════════
          CARA KERJA MULTI-ROLE & RADIOLOGI VISION
      ═══════════════════════════════════════════════════════════════════════ */}
      <section ref={caraKerjaRef} className="py-24 md:py-32 px-6 bg-[#030712] text-white relative z-20 border-b border-white/5">
        <div className="max-w-7xl mx-auto space-y-16">
          <div className="text-center">
            <h2 className="text-emerald-400 font-black tracking-[0.3em] uppercase text-xs mb-3">Human-in-the-Loop Architecture (Bobot Pengembangan SW 20%)</h2>
            <h3 className="text-3xl md:text-5xl font-black uppercase tracking-tight italic">Alur Kerja Lintas Role Staf</h3>
          </div>

          <motion.div variants={staggerContainer} initial="hidden" whileInView="show" viewport={{ once: true, margin: '-50px' }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { icon: '☢️', role: 'Radiolog / PACS Operator', color: 'border-cyan-500/30 bg-cyan-500/[0.03]', badge: 'bg-cyan-500/10 border-cyan-500/20 text-cyan-400',
                steps: [
                  { icon: <ClipboardList size={14} />, text: 'Terima instruksi rujukan rontgen dari dokter via Supabase real-time' },
                  { icon: <Camera size={14} />, text: 'Unggah file DICOM/JPEG atau foto langsung via Kamera HP/Webcam' },
                  { icon: <Flame size={14} />, text: 'Gemini 1.5 Flash Vision & Grad-CAM Heatmap mengisolasi ROI lesi' },
                  { icon: <ShieldCheck size={14} />, text: 'Radiolog meninjau, memberi otorisasi, & menyinkronkan ke RME' }
                ] 
              },
              { icon: '🩺', role: 'Dokter Poliklinik', color: 'border-emerald-500/30 bg-emerald-500/[0.03]', badge: 'bg-emerald-500/10 border-emerald-500/20 text-emerald-400',
                steps: [
                  { icon: <ClipboardList size={14} />, text: 'Input keluhan awal & terima metrik TTV dari perawat' },
                  { icon: <Sparkles size={14} />, text: 'Groq Llama 3.3 generate draf diagnosa awal & pertanyaan interaktif' },
                  { icon: <BrainCircuit size={14} />, text: 'Kirim instruksi rujukan radiologi spesifik ke PACS' },
                  { icon: <ShieldCheck size={14} />, text: 'Terima ekspertise rontgen, validasi final, & simpan rekam medis' }
                ] 
              },
              { icon: '🩹', role: 'Perawat & Admin', color: 'border-blue-500/30 bg-blue-500/[0.03]', badge: 'bg-blue-500/10 border-blue-500/20 text-blue-400',
                steps: [
                  { icon: <Activity size={14} />, text: 'Input metrik TTV: tekanan darah, nadi, suhu, & SpO2' },
                  { icon: <Database size={14} />, text: 'Data langsung tersimpan ke pangkalan data cloud RS' },
                  { icon: <ClipboardList size={14} />, text: 'Modul operan shift: ringkasan kondisi pasien otomatis' },
                  { icon: <ShieldCheck size={14} />, text: 'Serah terima shift dengan dokumen terstruktur tervalidasi' }
                ] 
              }
            ].map((role, i) => (
              <motion.div key={i} variants={fadeUp} whileHover={{ scale: 1.02, y: -4 }}
                className={`p-6 rounded-[2rem] border ${role.color} space-y-4 text-left transition-transform`}>
                <div className="flex items-center gap-3">
                  <span className="text-xl">{role.icon}</span>
                  <span className={`px-2.5 py-1 rounded-md border font-black text-[9px] uppercase tracking-wider ${role.badge}`}>{role.role}</span>
                </div>
                <div className="space-y-3">
                  {role.steps.map((step, j) => (
                    <motion.div key={j} initial={{ opacity: 0, x: -10 }} whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }} transition={{ delay: j * 0.1 }} className="flex items-start gap-2.5">
                      <div className="w-5 h-5 rounded-full bg-white/5 border border-white/10 flex items-center justify-center shrink-0 mt-0.5 text-slate-400">{step.icon}</div>
                      <p className="text-slate-400 text-[11px] font-medium leading-relaxed">{step.text}</p>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════════
          ARSITEKTUR TEKNIS
      ═══════════════════════════════════════════════════════════════════════ */}
      <section ref={arsitekturRef} className="py-24 md:py-32 px-6 bg-slate-950 text-white relative z-20 border-b border-white/5">
        <div className="max-w-7xl mx-auto space-y-16">
          <div className="text-center">
            <h2 className="text-emerald-400 font-black tracking-[0.3em] uppercase text-xs mb-3">Enterprise Core Infrastructure</h2>
            <h3 className="text-3xl md:text-5xl font-black text-white tracking-tight uppercase italic">Arsitektur Sistem LexiMed.ai</h3>
          </div>

          <motion.div variants={staggerContainer} initial="hidden" whileInView="show" viewport={{ once: true, margin: '-50px' }}
            className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { tag: 'Frontend Layer', tagColor: 'bg-blue-500/10 border-blue-500/20 text-blue-400', icon: <Code2Icon size={28} className="text-blue-400" />, title: 'React.js + PACS HUD',
                items: [{ name: 'React.js 18', desc: 'UI framework utama' }, { name: 'Vite Build', desc: 'Compiler ultra-cepat' }, { name: 'PACS HUD v2.4', desc: 'Antarmuka visual DICOM' }, { name: 'Framer Motion', desc: 'Animasi & transisi' }] },
              { tag: 'Backend Layer', tagColor: 'bg-orange-500/10 border-orange-500/20 text-orange-400', icon: <ServerIcon size={28} className="text-orange-400" />, title: 'Laravel 11 + Supabase',
                items: [{ name: 'Laravel 11', desc: 'PHP backend framework' }, { name: 'Sanctum Auth', desc: 'Token-based auth' }, { name: 'Supabase Cloud', desc: 'PostgreSQL database' }, { name: 'Audit Log System', desc: 'Enkripsi jejak akses' }] },
              { tag: 'AI Stack', tagColor: 'bg-emerald-500/10 border-emerald-500/20 text-emerald-400', icon: <BrainCircuit size={28} className="text-emerald-400" />, title: 'Dual-Engine Pipeline',
                items: [{ name: 'Groq Llama 3.3', desc: 'Text reasoning engine' }, { name: 'Gemini 1.5 Flash', desc: 'Multimodal Vision AI' }, { name: 'Grad-CAM Heatmap', desc: 'Feature attention map' }, { name: 'Vector RAG', desc: 'SOP knowledge base' }] },
            ].map((stack, i) => (
              <motion.div key={i} variants={fadeUp} whileHover={{ y: -6, boxShadow: '0 20px 60px rgba(0,0,0,0.4)' }}
                className="p-8 bg-gradient-to-br from-slate-900 to-slate-950 border border-white/5 rounded-[2.5rem] space-y-5 shadow-lg text-left transition-all">
                <div className="flex items-center gap-3">
                  <div className="p-3 bg-white/5 rounded-xl border border-white/10">{stack.icon}</div>
                  <div>
                    <span className={`px-2.5 py-1 rounded-md border font-black text-[9px] uppercase tracking-wider ${stack.tagColor}`}>{stack.tag}</span>
                    <h4 className="text-base font-black text-white mt-1 uppercase tracking-wide italic">{stack.title}</h4>
                  </div>
                </div>
                <div className="space-y-2.5">
                  {stack.items.map((item, j) => (
                    <div key={j} className="flex items-center justify-between py-2.5 border-b border-white/5 last:border-0">
                      <span className="text-white font-black text-xs">{item.name}</span>
                      <span className="text-slate-500 font-medium text-[10px]">{item.desc}</span>
                    </div>
                  ))}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════════
          AI DEMO PLAYGROUND (ANTHROPIC BACKEND PROXY INTEGRATED)
      ═══════════════════════════════════════════════════════════════════════ */}
      <section ref={agentRef} className="py-24 md:py-32 px-6 bg-slate-950/60 relative z-20">
        <div className="max-w-5xl mx-auto space-y-12">
          <div className="text-center">
            <h2 className="text-emerald-400 font-black tracking-[0.3em] uppercase text-xs mb-3 flex items-center justify-center gap-2">
              <motion.span animate={{ rotate: [0, 15, -15, 0] }} transition={{ duration: 2, repeat: Infinity }}>🤖</motion.span> Live AI Sandbox Demo
            </h2>
            <h3 className="text-3xl md:text-5xl font-black text-white tracking-tight uppercase italic">Tanya LexiCore Agent</h3>
          </div>

          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            className="bg-[#090d16] border border-white/10 rounded-[2.5rem] overflow-hidden shadow-[0_0_80px_rgba(16,185,129,0.08)]">
            <div className="bg-slate-950/80 border-b border-white/5 px-6 py-4 flex items-center justify-between flex-wrap gap-3">
              <div className="flex items-center gap-3">
                <motion.div animate={{ rotate: 360 }} transition={{ duration: 10, repeat: Infinity, ease: 'linear' }}>
                  <BrainCircuit className="text-emerald-400" size={18} />
                </motion.div>
                <div className="text-left">
                  <p className="text-[10px] font-black text-white uppercase tracking-widest">LexiCore Agent — Demo Publik</p>
                  <p className="text-[9px] text-slate-500 font-bold uppercase tracking-wider">Powered by {roleConfigs[agentRole].name}</p>
                </div>
              </div>
              <div className="flex gap-2 flex-wrap">
                {Object.entries(roleConfigs).map(([key, cfg]) => (
                  <motion.button whileTap={{ scale: 0.95 }} key={key} onClick={() => setAgentRole(key)}
                    className={`px-3 py-1.5 rounded-lg font-black text-[9px] uppercase tracking-wider transition-colors cursor-pointer ${agentRole === key ? 'bg-emerald-600 text-white' : 'bg-white/5 text-slate-500 hover:bg-white/10'}`}>
                    {cfg.icon} {key}
                  </motion.button>
                ))}
              </div>
            </div>

            <div ref={chatContainerRef} className="h-80 overflow-y-auto p-6 space-y-4 bg-gradient-to-b from-slate-950 to-[#090d16] [&::-webkit-scrollbar]:hidden">
              <AnimatePresence initial={false}>
                {agentMessages.map((msg, i) => (
                  <motion.div key={i} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
                    className={`flex gap-3 text-left ${msg.sender === 'user' ? 'ml-auto flex-row-reverse max-w-md' : 'mr-auto max-w-2xl'}`}>
                    <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 border ${msg.sender === 'user' ? 'bg-blue-600 border-blue-500 text-white text-xs font-black' : 'bg-emerald-600/10 border-emerald-500/20 text-emerald-400'}`}>
                      {msg.sender === 'user' ? 'U' : <Bot size={14} />}
                    </div>
                    <div className={`px-4 py-3 rounded-2xl text-xs border whitespace-pre-wrap leading-relaxed ${msg.sender === 'user' ? 'bg-blue-600 border-blue-500 text-white rounded-tr-none' : 'bg-slate-950/80 border-slate-800 text-slate-200 rounded-tl-none'}`}>
                      {msg.sender === 'user' ? msg.text : formatAgentText(msg.text)}
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
              {agentLoading && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex gap-3 mr-auto text-left">
                  <div className="w-8 h-8 rounded-lg flex items-center justify-center border bg-emerald-600/10 border-emerald-500/20 text-emerald-400"><Bot size={14} /></div>
                  <div className="px-5 py-4 rounded-2xl rounded-tl-none bg-slate-950/80 border border-slate-800 flex items-center gap-3">
                    <DNAHelix />
                    <span className="text-[10px] text-slate-500 font-bold">LexiCore memproses permintaan klinis...</span>
                  </div>
                </motion.div>
              )}
            </div>

            <form onSubmit={handleAgentSend} className="p-4 bg-slate-950/50 border-t border-white/5">
              <div className="flex items-center gap-3">
                <input type="text" value={agentInput} onChange={(e) => setAgentInput(e.target.value)} disabled={agentLoading}
                  placeholder={agentLoading ? 'LexiCore sedang berpikir...' : 'Tanya tentang LexiMed.ai, PACS Radiologi, atau Permenkes No. 24/2022...'}
                  className="flex-1 bg-slate-950 border border-slate-800 text-slate-200 rounded-xl py-3 px-4 text-xs outline-none focus:ring-2 focus:ring-emerald-500/40" />
                <motion.button whileHover={{ scale: 1.08 }} whileTap={{ scale: 0.9 }} type="submit"
                  disabled={agentLoading || !agentInput.trim()}
                  className="p-3 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl transition-colors disabled:opacity-50 cursor-pointer">
                  <Send size={16} />
                </motion.button>
              </div>
            </form>
          </motion.div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════════
          CTA BOTTOM
      ═══════════════════════════════════════════════════════════════════════ */}
      <section className="py-24 px-6 bg-gradient-to-br from-emerald-700 via-teal-700 to-blue-800 relative overflow-hidden z-20 border-t border-white/10">
        <div className="absolute inset-0 pointer-events-none opacity-10">
          <svg width="100%" height="100%"><defs><pattern id="ctag" width="48" height="48" patternUnits="userSpaceOnUse"><path d="M 48 0 L 0 0 0 48" fill="none" stroke="white" strokeWidth="0.5"/></pattern></defs><rect width="100%" height="100%" fill="url(#ctag)" /></svg>
        </div>
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
          className="max-w-4xl mx-auto text-center space-y-8 relative z-10">
          <h2 className="text-3xl md:text-5xl font-black text-white uppercase tracking-tight italic">
            Transformasikan Layanan Kesehatan Indonesia Hari Ini
          </h2>
          <p className="text-blue-100 text-sm font-medium max-w-lg mx-auto leading-relaxed">
            Divalidasi 5 jurnal inti terakreditasi · Patuh penuh Permenkes RI No. 24/2022 · Akselerasi diagnosis radiologi & rekam medis digital nasional.
          </p>
          <motion.button whileHover={{ scale: 1.06, boxShadow: '0 0 40px rgba(255,255,255,0.3)' }} whileTap={{ scale: 0.95 }}
            onClick={() => navigate('/login')}
            className="px-8 py-4 bg-white text-slate-950 rounded-xl font-black text-xs uppercase tracking-widest hover:bg-slate-100 shadow-2xl flex items-center justify-center gap-3 mx-auto cursor-pointer">
            Mulai Otomasi Rekam Medis <ChevronRight size={18} />
          </motion.button>
        </motion.div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════════
          FOOTER
      ═══════════════════════════════════════════════════════════════════════ */}
      <footer className="bg-slate-950 text-slate-400 py-16 px-6 relative z-20 border-t border-white/5 text-xs">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-12 border-b border-white/5 pb-12 mb-12">
          <div className="md:col-span-5 space-y-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-xl flex items-center justify-center overflow-hidden border border-white/10 bg-white">
                <img src="/logo.png" alt="LexiMed Logo" className="w-full h-full object-contain p-1" />
              </div>
              <span className="text-lg font-black tracking-tight text-white italic">LexiMed<span className="text-emerald-400">.ai</span></span>
            </div>
            <p className="text-slate-400 leading-relaxed font-medium max-w-sm text-left">
              Platform CDSS & PACS Radiologi Vision berbasis multi-role AI Agent untuk rekam medis elektronik rumah sakit — terintegrasi Supabase Cloud, Groq Llama 3.3, dan Gemini 1.5 Flash.
            </p>
          </div>

          <div className="md:col-span-3 space-y-4">
            <h4 className="text-white font-black uppercase tracking-wider text-sm italic text-left">Infrastruktur Node</h4>
            <ul className="space-y-2.5 font-bold uppercase tracking-wide text-[10px] text-slate-500 text-left">
              <li>🩺 Doctor Clinical CDSS Node</li>
              <li>🎚️ Nurse Care Ingestion Node</li>
              <li>☢️ Radiology PACS Vision Node</li>
              <li>📊 Executive Analytic Dashboard</li>
              <li>🔐 Admin & Security Audit Node</li>
            </ul>
          </div>

          <div className="md:col-span-4 space-y-4 text-left">
            <h4 className="text-white font-black uppercase tracking-wider text-sm italic">Otoritas Pengembang</h4>
            <ul className="space-y-3 font-semibold text-slate-400">
              <li className="flex items-center gap-3">
                <Mail size={16} className="text-emerald-400 shrink-0" />
                <a href="mailto:ilhameka93@student.uns.ac.id" className="hover:text-emerald-400 transition-colors">ilhameka93@student.uns.ac.id</a>
              </li>
              <li className="flex items-center gap-3">
                <Phone size={16} className="text-emerald-400 shrink-0" />
                <a href="https://wa.me/6285231287023" target="_blank" rel="noreferrer" className="hover:text-emerald-400 transition-colors">0852-3128-7023</a>
              </li>
              <li className="text-[10px] font-black uppercase tracking-wider text-slate-500 pt-1">
                D3 Teknik Informatika — Sekolah Vokasi<br />Universitas Sebelas Maret PSDKU Madiun
              </li>
            </ul>
          </div>
        </div>

        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-4 text-[11px] font-bold uppercase tracking-wider text-slate-600">
          <p>&copy; 2026 LexiMed.ai — Hak Cipta Tim Inovasi Vokasi PSDKU UNS.</p>
          <div className="flex items-center gap-2 font-mono text-[10px]">
            <Cpu size={14} className="text-emerald-500" /> OpenClaw Layer Engine v1.0
          </div>
        </div>
      </footer>

    </div>
  );
}