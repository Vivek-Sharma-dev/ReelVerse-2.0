# 🎬 ReelVerse 2.0 – Your Ultimate Cinematic Hub

**ReelVerse 2.0** is a premium, high-performance web application designed for movie enthusiasts and trailer bingers. Inspired by the dynamic, engaging, and fast-paced layout of modern short-form video platforms, ReelVerse 2.0 brings official cinematic trailers and movie data straight to your fingertips with fluid animations and seamless interactions.

---

## ✨ Features

### 1. 🎬 Reel-Style Trailer Feed

- **Immersive View:** A vertical, mobile-first rolling feed (`h-dvh` snap-scrolling) that displays movie trailers in full screen.
- **Auto Play/Pause Engine:** Powered by `react-intersection-observer` and YouTube's `postMessage` API, videos automatically play when in view and pause when scrolled away, eliminating layout shifting and unnecessary resource consumption.
- **Instagram-Style Controls:** Tap anywhere on the player container to toggle play/pause with a dynamic, blurred central overlay animation.

### 2. ⚡ Infinite Scroll Buffer

- Seamlessly fetches continuous batches of movie metadata and trailers using **TanStack Query (React Query)** for efficient state caching and background pre-fetching.

### 3. 🔍 Premium UI Skeletons & Aesthetics

- A custom, dark-themed **Dynamic Shimmer Framework** ensures that while data is buffering, a smooth pulsing wave matching the actual page structure (hero banner, circular cast profile cards, and metadata grids) is shown to eradicate loading shocks.

### 4. 🛠️ Strict TypeScript Architecture

- 100% type-safe codebase using clear interfaces and custom types ensuring strict development compilation and easy debugging.

### 5. 📦 High-Performance Production Bundling

- Configured with Vite 8 and **Rolldown Chunk Splitting** optimization, reducing the main vendor bundle from a heavy 542kB down to small, lightning-fast split assets under the strict 500kB warning threshold.
- Production router configurations deployed smoothly with Vercel SPA rewrites to ensure full sub-route hard refreshes (`vercel.json` routing patch).

---

## 🛠️ Tech Stack

- **Frontend Core:** React (Vite 8, TypeScript)
- **Routing:** React Router DOM
- **Data Fetching & Caching:** @tanstack/react-query (React Query)
- **Viewport Tracking:** react-intersection-observer
- **Icons:** Lucide React
- **Animations:** Custom CSS / Tailwind CSS (with `snap-y` snap-mandatory structures)
- **Bundler:** Vite 8 / Rolldown

---

## 🚀 Getting Started

### 1. Clone the repository

```bash
git clone [https://github.com/Vivek-Sharma-dev/ReelVerse-2.0.git](https://github.com/Vivek-Sharma-dev/ReelVerse-2.0.git)
cd ReelVerse-2.0

2. Install dependencies
Bash
npm install
3. Run Development Server
Bash
npm run dev
4. Build for Production
To trigger the optimized Rolldown code-splitting compilation:

Bash
npm run build
5. Preview Production Build Locally
Bash
npm run preview
```
