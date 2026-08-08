# 🏆 LexiMed.ai — Enterprise Health Orchestration System & CDSS
### Karya untuk GEMASTIK XIX 2026 — Divisi H: Pengembangan Perangkat Lunak
**Tim AAI CLAN | Sekolah Vokasi, Universitas Sebelas Maret (UNS) PSDKU Madiun**

<div align="center">

[![Live App](https://img.shields.io/badge/Live%20App-www.leximedai.web.id-emerald?style=for-the-badge&logo=google-chrome)](https://www.leximedai.web.id/)
[![GEMASTIK XIX 2026](https://img.shields.io/badge/GEMASTIK%20XIX-Divisi%20H%20Software-blue?style=for-the-badge&logo=github)](https://github.com/IlhamEkaa93/LexiMed.ai-GEMASTIK-2026)
[![Compliance](https://img.shields.io/badge/Permenkes%20No.24%252F2022-Compliant-orange?style=for-the-badge)](https://www.leximedai.web.id/)
[![License](https://img.shields.io/badge/License-Dual%20Licensed-purple?style=for-the-badge)]()

</div>

---

## 📋 Ringkasan Eksekutif (Executive Summary)
**LexiMed.ai** adalah platform *Clinical Decision Support System* (CDSS) dan stasiun kerja PACS berbasis *Multimodal Artificial Intelligence* yang dirancang untuk mentransformasi alur administrasi dan klinis rumah sakit serta puskesmas di Indonesia. 

Berdasarkan studi literatur, tenaga kesehatan menghabiskan hingga **49% waktu kerjanya untuk tugas administratif** manual. LexiMed.ai hadir memotong waktu tunggu (*turnaround time*) pembacaan citra radiologi dan rekam medis dari jam ke hitungan detik, sekaligus menjamin kepatuhan penuh terhadap **Permenkes RI No. 24 Tahun 2022** tentang Rekam Medis Elektronik (RME).

---

## 🎯 Penyelarasan dengan 6 Kriteria Penilaian GEMASTIK XIX
Repositori dan sistem ini dirancang memenuhi seluruh kriteria penilaian babak penyisihan Divisi Pengembangan Perangkat Lunak:
1. **Aspek Inovasi (20%)**: Menggunakan *Dual-Engine Pipeline AI* (Groq Llama 3.3 untuk *text reasoning* + Google Gemini 1.5 Flash Vision untuk analisis biner PACS) serta modul *Grad-CAM Heatmap Attention Map*.
2. **Dampak & Sustainability (20%)**: Mereduksi waktu tunggu diagnosis gawat darurat, menekan beban administrasi dokter hingga 70%, serta mendemokratisasi akses diagnostik spesialis ke wilayah 3T.
3. **Desain UI/UX & Usability (20%)**: Antarmuka berbasis *PACS HUD v2.4*, mode input ganda (file & kamera live), serta panduan *Guided Tour 5-Langkah* interaktif bagi juri.
4. **Proses Pengembangan SW (20%)**: Mengikuti standar *Software as a Medical Device* (SaMD), isolasi *role-based workflow* (5 role aktif), *Audit Log System* terenkripsi, dan prinsip *Human-in-the-Loop* (HITL).
5. **Kesesuaian Ide & Perangkat Lunak (10%)**: Integrasi penuh antara naskah rancangan dan implementasi basis data Supabase Cloud (mencakup 60 pasien riset subspesialis).
6. **Urgensi Masalah (10%)**: Solusi nyata atas krisis ketimpangan rasio dokter spesialis radiologi nasional dan mandat migrasi RME nasional.

---

## 👥 Identitas Tim Pengembang (AAI CLAN)
* **Ketua Tim**: Muhammad Akyas Febryansah (`V3925029`)
* **Anggota 1**: Ilham Eka Saputra (`V3924005`) — *AI Integration Lead*
* **Anggota 2**: Aisyah Nurul Ilmi Prianto (`V3925018`) — *UI/UX Designer*
* **Dosen Pembimbing**: Darmawan Lahru Riatma, S.Kom., M.MT. (`NIP 1991091420200801`)
* **Institusi**: D3 Teknik Informatika PSDKU Madiun, Sekolah Vokasi, Universitas Sebelas Maret (UNS)

---

## 🔑 Kredensial Akun Demo Juri (13 Personil Medis Terintegrasi)
Untuk memudahkan dewan juri mengevaluasi seluruh fitur multi-role, sistem telah menyediakan 13 akun personil medis teruji. 
* **Password Universal**: `password` *(Berlaku seragam untuk seluruh akun di bawah ini)*

| Username / ID | Nama Lengkap | Role Access | Ruang Lingkup & Fungsionalitas |
| :--- | :--- | :--- | :--- |
| `admin` | Super Admin | Admin | Audit Trail, User CRUD, RAG Vector Knowledge Base Injection |
| `ADMIN-2` | Ilham A-2 | Admin | Manajemen Konfigurasi Cloud Node & Failover Interceptor |
| `dr_tirta` | Dr. Tirta Mandira S., ARS | Dokter | Clinical CDSS Workstation Poliklinik Umum & UGD |
| `dr_budi` | Dr. Budi Setiawan, Sp.PD | Dokter | Clinical CDSS Partner Poli Penyakit Dalam |
| `dr_paru` | Dr. Susi Susanti, Sp.P | Dokter | Clinical CDSS Partner Poli Paru & Respirasi |
| `asisten_tirta` | Asisten Dr. Tirta, S.Kep | Asisten Medis | Loket Triage UGD & Input Metrik TTV |
| `asisten_budi` | Asisten Dr. Budi, S.Kep | Asisten Medis | Registrasi & Triage Klinis Poli Penyakit Dalam |
| `asisten_paru` | Asisten Dr. Paru, S.Kep | Asisten Medis | Registrasi & Triage Klinis Poli Paru & Respirasi |
| `PERAWAT-1` | Aisyah N. I. P., S.Kep., Ns | Perawat | Handover Shift Dashboard (Shift Pagi) |
| `PERAWAT-2` | Budi Raharjo, S.Kep., Ns | Perawat | Handover Shift Dashboard (Shift Siang) |
| `PERAWAT-3` | Citra Dewi, S.Kep., Ns | Perawat | Handover Shift Dashboard (Shift Malam) |
| `RADIOLOGI-01` | Ilham Eka S., S.Tr.Kes | Radiologi | PACS DICOM Workstation, Gemini Vision AI, Live Camera & Heatmap |
| `MANAJEMEN-1` | M. Akyas F. | Manajemen | Executive Command Center, BOR & Sebaran Tren Penyakit |

---

## 🛠️ Stack Teknologi Utama
* **Frontend**: React.js 18, Vite, Tailwind CSS, Framer Motion, Lucide React, React Router v6
* **Backend**: Laravel 11 REST API, Laravel Sanctum, Eloquent ORM
* **Database & Infrastruktur**: Supabase Cloud (PostgreSQL), pgvector extension
* **AI Infrastructure**: Groq SDK (Llama 3.3 70B), Google Generative AI SDK (Gemini 1.5 Flash Vision), VoltAgent Orchestrator

---

## 🌐 Tautan Akses Resmi
* **Live Production App**: [https://www.leximedai.web.id/](https://www.leximedai.web.id/)
* **Alternative Deployment**: [https://llm-rs-leximed-ai-olivia2026.vercel.app/](https://llm-rs-leximed-ai-olivia2026.vercel.app/)
* **Repository GitHub**: [https://github.com/IlhamEkaa93/LexiMed.ai-GEMASTIK-2026](https://github.com/IlhamEkaa93/LexiMed.ai-GEMASTIK-2026)

---
© 2026 Tim AAI CLAN — D3 Teknik Informatika PSDKU Madiun, Universitas Sebelas Maret.
