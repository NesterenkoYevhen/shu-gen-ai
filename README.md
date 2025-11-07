# ShuGenAI 🤖

A powerful, full-stack web application built with **Next.js** that integrates **Artificial Intelligence** to provide a comprehensive suite of tools for image processing, text manipulation, file conversion, video editing, and PDF handling. ShuGenAI leverages modern web technologies like **Server-Side Rendering (SSR)**, **React Server Components (RSCs)**, and a robust tech stack to deliver a high-performance, SEO-friendly, and user-friendly experience.

![ShuGenAI Screenshot](https://via.placeholder.com/1200x600/4F46E5/FFFFFF?text=ShuGenAI+Modern+AI+Platform)

---

## ✨ Features

### 🖼️ Image Processing
- **Background Removal:** Automatically remove backgrounds from images.  
- **Object Manipulation:** Cut out, pick, or edit specific objects.  
- **Filters & Effects:** Apply Black & White, Blur, Pixelate, and Round filters.  
- **Format Conversion:** Convert between HEIC, TIFF, RAW, PNG, and JPG formats.  
- **Compression:** Reduce image file size while maintaining quality.  

### 📝 Text Transformation
- **Summarization:** Generate concise summaries from long texts.  
- **Rewriting & Paraphrasing:** Rephrase sentences and paragraphs.  
- **Content Generation:** Create essays, posts, paragraphs, and code documentation.  
- **Grammar Checker:** Identify and correct grammatical errors.  

### 📄 File Conversion
- **Data Formats:** Convert between XML, JSON, CSV, and XLS/XLSX.  
- **Structured Data Transformation:** Easily transform data for integration and analysis.  

### 📑 PDF Tools
- **Compression:** Reduce the size of PDF documents.  
- **Format Conversion:** Convert PDF to DOCX and DOCX to PDF.  

### 🎬 Video Utilities
- **Compression:** Reduce video file size.  
- **Format Conversion:** Convert MKV to MP4, MP4 to MP3, and video to GIF.  

### 👤 User & Subscription Management
- **Authentication:** Secure sign-up, login, and session management with NextAuth.js.  
- **Profile Management:** User profiles with personal information and subscription details.  
- **Multi-tier Subscription Plans:** Access to features is gated by flexible subscription plans.  

### 🌐 User Experience
- **Internationalization (i18n):** Full support for English (en) and Ukrainian (ua).  
- **Dark/Light Mode:** Toggle between themes for comfortable viewing.  
- **Fully Responsive Design:** Optimized for desktop, tablet, and mobile devices.  
- **Modern UI/UX:** Designed in Figma with a focus on clarity and ease of use.  

---

## 🛠️ Tech Stack

### Frontend & Core Framework
- **Next.js 14 (App Router)** — React framework with SSR and RSC support.  
- **React 18** — Library for building UIs.  
- **TypeScript** — Type-safe development.  

### Styling & UI
- **Tailwind CSS** — Utility-first CSS framework.  
- **SCSS/Sass** — Preprocessor for advanced styling.  
- **Headless UI** — Accessible UI components.  
- **Swiper** — Touch sliders and carousels.  

### Authentication & State Management
- **NextAuth.js (Auth.js)** — Complete authentication solution.  
- **React Context** — Global state management.  

### API & Data Fetching
- **Axios** — HTTP client for API requests.  
- **React Query (TanStack Query)** — Efficient server-state management.  

### Forms & File Handling
- **React-Dropzone**, **React-Images-Uploading** — Drag-and-drop file uploads.  
- **CKEditor 5** — Rich text editor.  

### Internationalization
- **next-intl** — Internationalized routing and translations.  

### Development Tools
- **ESLint** — Code linting (Airbnb config).  
- **PostCSS** — CSS transformations.  

### Backend Integration
The frontend communicates with a dedicated **Django backend API** via Axios, using **token-based authentication** (`Token <token>`).

---

## 🚀 Getting Started

### Prerequisites
- Node.js (v18+)
- npm, yarn, or pnpm

### Installation

```bash
git clone <your-repository-url>
cd shugenai
npm install
# or
yarn install
# or
pnpm install
```

### Environment Variables

Create a `.env` file in the project root:

```env
API_URL=your_backend_api_url_here
NEXTAUTH_SECRET=your_nextauth_secret_here
NEXTAUTH_URL=http://localhost:3000
```

### Run the development server

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

Then open **http://localhost:3000** in your browser.

---

## 📁 Project Structure

```
shugenai/
├── app/
│   ├── [locale]/
│   │   ├── layout.tsx
│   │   ├── page.tsx
│   │   ├── image/
│   │   ├── write/
│   │   ├── file/
│   │   ├── pdf/
│   │   ├── video/
│   │   ├── profile/
│   │   └── ...
│   ├── api/
│   ├── globals.css
│   └── layout.tsx
├── src/
│   ├── components/
│   ├── features/
│   ├── locales/
│   ├── shared/
│   ├── styles/
│   └── utils/
├── public/
├── next.config.mjs
├── tailwind.config.ts
├── tsconfig.json
└── middleware.ts
```

---

## 🧪 Testing

```bash
npm run test
```

---

## 🏗️ Build for Production

```bash
npm run build
npm start
```

---

## 🤝 Contributing

1. Fork the Project  
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)  
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)  
4. Push to the Branch (`git push origin feature/AmazingFeature`)  
5. Open a Pull Request  

---

## 📜 License

This project is part of a **Master's Thesis**. Please refer to the thesis document and academic guidelines for licensing information.

---

## 👨‍🎓 Acknowledgments

Developed as a Master's Thesis at **Lviv National University named after Ivan Franko**.
Built with cutting-edge technologies from the **React** and **Next.js** ecosystems.

**Live Demo without API:** _https://shu-gen-ai.vercel.app/_  
**Thesis Document:** _[Link to your thesis PDF if publicly available]_
