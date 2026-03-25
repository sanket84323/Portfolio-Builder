# Portfolio Builder

A production-ready, full-stack SaaS platform for creating, customizing, and publishing professional portfolio websites — built with **Next.js 16**, **MongoDB**, and **TypeScript**.

![Portfolio Builder](https://img.shields.io/badge/Next.js-16-black?logo=nextdotjs) ![MongoDB](https://img.shields.io/badge/MongoDB-Mongoose-green?logo=mongodb) ![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?logo=typescript) ![Tailwind CSS](https://img.shields.io/badge/Tailwind-CSS-38bdf8?logo=tailwindcss)

---

## ✨ Features

- **16 stunning templates** — Developer, Cyberpunk, Retro Terminal, Pastel Garden, Rose Gold, and more
- **Live preview** — real-time iframe-based preview with desktop/mobile toggle
- **Section-based builder** — Hero, About, Education, Skills, Projects, Achievements, Contact
- **Deep customization** — colors, fonts, hero layouts, background patterns, gradients, nav styles, section visibility, custom CSS
- **Publish with unique URL** — every portfolio gets a public slug like `/p/username`
- **Video projects** — YouTube, Vimeo embeds + local video uploads
- **File uploads** — profile photo, resume, project images
- **JWT auth** — secure, stateless httpOnly cookie auth
- **Autosave** — 3-second debounced autosave while editing
- **SEO optimized** — custom title/description per portfolio
- **Analytics** — track portfolio view counts

---

## 🚀 Getting Started

### Prerequisites
- Node.js 18+
- MongoDB (local or [MongoDB Atlas](https://cloud.mongodb.com))

### Setup

```bash
# 1. Clone the repo
git clone https://github.com/sanket84323/Portfolio-Builder.git
cd Portfolio-Builder

# 2. Install dependencies
npm install

# 3. Create your environment file
cp .env.example .env.local
# Fill in your MongoDB URI and JWT secret

# 4. Run the development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Environment Variables

Create `.env.local` with:

```env
MONGODB_URI=mongodb://localhost:27017/portfolio-builder
JWT_SECRET=your-super-secret-key-min-32-chars
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

For production, use MongoDB Atlas URI and a strong JWT secret.

---

## 🗂️ Project Structure

```
src/
├── app/
│   ├── api/             # API routes (auth, portfolios, upload, public)
│   ├── dashboard/       # Dashboard pages (home, builder, analytics, settings)
│   ├── p/[slug]/        # Public portfolio pages
│   ├── templates/       # Templates gallery
│   ├── login/           # Auth pages
│   └── register/
├── components/
│   ├── builder/         # Section editors (Hero, About, Skills, etc.)
│   ├── preview/         # Live preview iframe component
│   └── PublicPortfolio  # Public portfolio renderer
├── contexts/            # AuthContext
├── hooks/               # usePortfolio (autosave)
├── lib/                 # MongoDB, JWT auth, constants, utils
└── models/              # Mongoose models (User, Portfolio)
```

---

## 🎨 Templates

| Template | Style | Mode |
|---|---|---|
| Developer | Indigo glassmorphism | Dark |
| Minimal | Clean sky blue | Light |
| Creative | Pink/rose vibrant | Dark |
| Placement Ready | Professional green | Dark |
| Academic | Calm blue | Light |
| Premium Card | Gold luxury | Dark |
| Cyberpunk | Neon teal + magenta | Dark |
| Glass Noir | Purple frosted glass | Dark |
| Retro Terminal | Matrix green | Dark |
| Brutalist | Bold yellow/orange | Dark |
| Pastel Garden | Soft pink/purple | Light |
| Sunset | Orange-to-pink glow | Dark |
| Ocean Deep | Cool teal blues | Dark |
| Rose Gold | Elegant pink/purple | Light |
| Monochrome | Grayscale + accent | Dark |
| Neon Flux | Multi-color neon | Dark |

---

## 🛠️ Tech Stack

| Layer | Technology |
|---|---|
| Framework | Next.js 16 (App Router) |
| Language | TypeScript |
| Styling | Tailwind CSS + Custom CSS |
| Database | MongoDB + Mongoose |
| Auth | JWT (httpOnly cookies) |
| Animations | Framer Motion |
| Icons | Lucide React |
| Notifications | React Hot Toast |

---

## 📦 Deployment

### Vercel (Recommended)

1. Push to GitHub (already done)
2. Import repo at [vercel.com](https://vercel.com)
3. Add environment variables in Vercel dashboard
4. Deploy!

### Environment Variables for Production

```env
MONGODB_URI=mongodb+srv://user:pass@cluster.mongodb.net/portfolio-builder
JWT_SECRET=super-long-random-secret-at-least-32-chars
NEXT_PUBLIC_APP_URL=https://your-domain.vercel.app
```

---

## 📄 License

MIT — free to use, modify, and distribute.

---

**Built with ❤️ using PortfolioBuilder**
