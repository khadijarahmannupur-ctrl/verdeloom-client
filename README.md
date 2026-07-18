# 🌿 Verdeloom

Verdeloom is a full-stack plant, seeds, and gardening essentials e-commerce platform. It combines a clean, theme-driven storefront with AI-powered plant care guidance, letting users discover plants, get personalized care instructions, and receive plant recommendations based on their environment.

---

## ✨ Features

- **Product Catalog** — Browse, search, filter by category, sort, and paginate through products (Live Plants, Seeds, Pots, Fertilizers, Gardening Tools).
- **Product Details** — Full product view with stock status, related products, and an AI-generated quick care summary.
- **Authentication** — Secure email/password and Google sign-in/sign-up powered by Better Auth, with protected routes and session-based access control.
- **Add & Manage Products** — Authenticated users can list new products and manage (view/delete) their own listings.
- **AI Care Guide** — Get a custom care guide for any plant based on its problem and the current season, powered by Google Gemini.
- **AI Plant Recommendation** — Get structured plant recommendations based on environment, sunlight, experience level, pet safety, and budget.
- **Responsive Design** — Fully responsive UI across mobile, tablet, and desktop.

---

## 🛠️ Tech Stack

### Frontend (`verdeloom-client`)
- [Next.js](https://nextjs.org/) (App Router) + TypeScript
- [Tailwind CSS](https://tailwindcss.com/)
- [Better Auth](https://www.better-auth.com/) — authentication (email/password + Google OAuth)
- [Framer Motion](https://www.framer.com/motion/) — animations
- [React Hot Toast](https://react-hot-toast.com/) — notifications
- [React Icons](https://react-icons.github.io/react-icons/) — icon library
- [Recharts](https://recharts.org/) — data visualization

### Backend (`verdeloom-server`)
- [Node.js](https://nodejs.org/) + [Express](https://expressjs.com/) + TypeScript
- [MongoDB](https://www.mongodb.com/) (native driver) — database
- [Google Gemini API](https://ai.google.dev/) (`@google/genai`) — AI care guides & recommendations
- `dotenv`, `cors`

---

## 📁 Project Structure

```
verdeloom/
├── verdeloom-client/          # Next.js frontend
│   ├── src/
│   │   ├── app/
│   │   │   ├── about/
│   │   │   ├── add-product/       # Protected
│   │   │   ├── ai-care/
│   │   │   ├── ai-recommendation/
│   │   │   ├── api/auth/[...all]/ # Better Auth route handler
│   │   │   ├── contact/
│   │   │   ├── explore/
│   │   │   ├── login/
│   │   │   ├── manage-products/   # Protected
│   │   │   ├── products/[id]/
│   │   │   ├── register/
│   │   │   ├── layout.tsx
│   │   │   └── page.tsx           # Home
│   │   ├── components/
│   │   ├── context/                # AppContext (product state, fetch helpers)
│   │   └── lib/                    # auth.ts, auth-client.ts
│   └── .env
│
└── verdeloom-server/           # Express backend
    ├── index.ts                # All routes + server bootstrap
    └── .env
```

---

## 🔌 API Reference

Base URL: `http://localhost:5000`

| Method | Endpoint              | Auth      | Description                              |
|--------|------------------------|-----------|-------------------------------------------|
| GET    | `/`                     | Public    | Health check                              |
| GET    | `/products`             | Public    | List products — supports `search`, `category`, `sortBy`, `sortOrder`, `page`, `limit` |
| GET    | `/products/:id`         | Public    | Get a single product by ID                |
| POST   | `/products`              | Required  | Create a new product                      |
| DELETE | `/products/:id`          | Required  | Delete a product (owner only)             |
| POST   | `/ai/care-guide`         | Optional  | Generate an AI plant care guide           |
| POST   | `/ai/recommendation`     | Optional  | Generate structured AI plant recommendations |

**Auth headers** (for protected routes): send either
```
x-user-id: <userId>
```
or
```
Authorization: Bearer <userId>
```

---

## 🚀 Getting Started

### Prerequisites
- Node.js 18+
- A MongoDB connection URI (local or Atlas)
- A Google Gemini API key
- Google OAuth credentials (for Better Auth social login)

### 1. Clone the repository
```bash
git clone <https://github.com/khadijarahmannupur-ctrl/verdeloom-client>
cd verdeloom
```

### 2. Backend setup
```bash
cd verdeloom-server
npm install
```

Create a `.env` file:
```env
PORT=5000
MONGODB_URI=your_mongodb_connection_string
GEMINI_API_KEY=your_gemini_api_key
CLIENT_URL=http://localhost:3000
```

Run the server:
```bash
npm run dev
```

### 3. Frontend setup
```bash
cd verdeloom-client
npm install
```

Create a `.env` file:
```env
NEXT_PUBLIC_BASE_URL=http://localhost:5000
BETTER_AUTH_URL=http://localhost:3000
BETTER_AUTH_SECRET=your_better_auth_secret
MONGODB_URI=your_mongodb_connection_string
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
```

Run the app:
```bash
npm run dev
```

The frontend will be available at `http://localhost:3000` and the backend at `http://localhost:5000`.

---

## 🎨 Theme

| Color            | Hex       |
|-------------------|-----------|
| Primary Green      | `#005F02` |
| Secondary Green     | `#427A43` |
| Accent Gold         | `#C0B87A` |
| Cream Background     | `#F2E3BB` |

---

## 📌 Roadmap

- [ ] Shopping cart & checkout flow
- [ ] Order history
- [ ] Product reviews & ratings
- [ ] Admin dashboard with analytics (Recharts)
- [ ] Wishlist

---

## 📄 License

This project is currently for personal/educational use. Add a license of your choice before public release.
