# 🥭 Food Basket Farm

A high-performance e-commerce platform for **Food Basket Farm**—a premier Pakistani fresh fruit brand specializing in tree-matured mangoes (Sindhri, Chaunsa, Anwar Ratol, Langra) and artisanal desi pantry staples, delivered nationwide across Pakistan.

---

## 🛠️ Technology Stack

- **Framework**: [Next.js 14 (App Router)](https://nextjs.org/)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/) with a custom brand palette (`mango`, `orchard`, `husk`, `sindhri`, `dusk-teal`, `bark`)
- **Database & ORM**: [Prisma ORM](https://www.prisma.io/) with SQLite (local) / PostgreSQL (production)
- **State Management**: [Zustand](https://github.com/pmndrs/zustand) with localStorage persistence for cart management
- **Icons**: [Lucide React](https://lucide.dev/)
- **Typography**: Next.js Google Fonts (`Fraunces` display font & `Inter` body font)

---

## 🚀 Getting Started

### 1. Prerequisites
Ensure you have Node.js 18.x or later installed on your machine.

### 2. Installation
Clone the repository and install project dependencies:

```bash
npm install
```

### 3. Environment Variables
Copy `.env.example` to create your local `.env` file:

```bash
cp .env.example .env
```

### 4. Database Setup & Seeding
Initialize the SQLite database and seed sample categories, mango varieties, and pantry products:

```bash
# Push schema changes to the local SQLite database
npx prisma db push

# Seed the database with mango varieties & desi pantry items
npx prisma db seed
```

### 5. Running Local Development Server
Start the Next.js development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to view the web application.

---

## 📦 Available Scripts

- `npm run dev`: Runs the development server at `http://localhost:3000`.
- `npm run build`: Compiles TypeScript types and builds the production Next.js application bundle.
- `npm run start`: Starts the compiled production server.
- `npm run lint`: Runs ESLint checks.
- `npx prisma studio`: Launches the interactive Prisma ORM database GUI at `http://localhost:5555`.

---

## 📂 Project Architecture

```
src/
├── app/
│   ├── page.tsx                      # Homepage (Hero, Fresh This Week, Spotlights)
│   ├── shop/                         # Full Product Catalog Page
│   ├── category/[slug]/              # Dynamic Category Pages (/mangoes, /pantry)
│   ├── product/[slug]/               # Dynamic Product Detail Pages
│   ├── cart/                         # Full Table/Card Basket Page
│   ├── checkout/                     # Checkout Form with Inline PK Validation
│   ├── order-confirmation/[orderId]/ # Order Confirmation Page
│   ├── admin/orders/                 # Admin Orders Dashboard
│   ├── about/                        # Brand Story Page
│   ├── corporate-orders/             # Corporate & Eid Hamper Inquiry Page
│   ├── faq/                          # Categorized Interactive Accordion FAQ
│   ├── policies/                     # Shipping, Returns & Privacy Draft Policies
│   ├── contact/                      # Contact Page & General Inquiry Form
│   └── api/payments/                 # JazzCash & Easypaisa Gateway Initiate/Callback Skeletons
├── components/
│   ├── cart/                         # CartDrawer Component
│   ├── home/                         # Homepage Sections (Hero, FreshThisWeek, etc.)
│   ├── layout/                       # Header & Footer
│   └── ui/                           # Reusable UI Tokens (StencilBadge, Buttons)
└── lib/
    ├── db.ts                         # Prisma Client Instance
    └── store/cart.ts                 # Zustand Cart State Management
```

---

## 🔒 Payment Gateways Integration

Payment initiation and webhook callback routes are architected under `src/app/api/payments/`:
- **JazzCash**: `/api/payments/jazzcash/initiate` and `/api/payments/jazzcash/callback`
- **Easypaisa**: `/api/payments/easypaisa/initiate` and `/api/payments/easypaisa/callback`

When live credentials and merchant integration specifications are available, replace the hash generation logic in these endpoints.

---

## 📄 License

Proprietary © Food Basket Farm. All rights reserved.
