# 🍇 মায়ের দোয়া ফল — Mayer Doya Fol

**মায়ের দোয়া ফল (Mayer Doya Fol)** is a modern, production-ready fruit e-commerce Progressive Web App (PWA) modeled after `ghorerbazar.com`. Crafted with authentic Bengali copy, tactile organic aesthetics, and high-trust familial branding, the platform delivers 100% fresh and formalin-free produce directly from Bangladeshi orchards to customers' doorsteps.

Built on a zero-cost architecture utilizing free-tier services, the application requires no paid SMS gateways or third-party APIs while providing a seamless shopping and store management experience.

---

## ✨ Features

- **Fruit & Product Browsing**: Interactive catalog featuring seasonal harvest highlights (Rajshahi mangoes, Dinajpur litchis, citrus, apples, dates), real-time search, and category-based filtering.
- **Shopping Cart**: Fully functional cart backed by client-side `localStorage`, supporting instant quantity increments/decrements (+ / -), item removal, and subtotal calculation.
- **Customer Checkout**: Frictionless order form capturing customer name, phone number, and delivery address. Phone number acts as the unique customer identifier—eliminating expensive SMS/OTP services.
- **WhatsApp Order Confirmation**: Automatically formats an itemized Bengali order summary with pricing and opens WhatsApp in a new tab for one-tap order submission.
- **Offline & PWA Support**: Installable on Android, iOS, and desktop devices. The service worker caches static assets and fruit catalogs for offline browsing.
- **Admin Dashboard**: Dedicated `/admin` interface secured via email/password authentication.
- **Product Management**: Full administrative control to add, edit, and delete products, update pricing and units (kg/piece), manage inventory stock, and toggle product visibility.
- **Order Management**: Chronological order feed with customer contact details, itemized breakdown, and live status updates (`pending` → `confirmed` → `delivered` → `cancelled`).
- **Supabase Integration**: Robust relational data storage with PostgreSQL, secured by Row Level Security (RLS) policies and dedicated storage bucket support.

---

## 🛠️ Tech Stack

| Technology | Purpose |
| :--- | :--- |
| **Next.js (App Router)** | Full-stack React framework for high-performance rendering & API routing |
| **TypeScript** | End-to-end type safety across components, models, and API endpoints |
| **Tailwind CSS** | Custom design system implementing warm organic palettes and typography |
| **Supabase** | Backend-as-a-Service providing PostgreSQL database, Auth, and Storage |
| **PostgreSQL** | Relational database schema with foreign keys and Row Level Security |
| **PWA (Service Worker)** | Offline asset caching, web app manifest, and home-screen installability |
| **LocalStorage** | Persistent offline cart storage and customer profile caching |

---

## 📁 Project Structure

```text
├── public/
│   ├── icons/                  # PWA application icons (192x192, 512x512, SVG)
│   ├── manifest.json           # Web App Manifest for mobile/desktop install
│   └── sw.js                   # Service Worker for offline asset & catalog caching
├── src/
│   ├── app/
│   │   ├── admin/              # Admin dashboard & login routes
│   │   ├── api/                # Next.js API routes (orders, products)
│   │   ├── globals.css         # Global stylesheet with Tailwind & Google fonts
│   │   ├── layout.tsx          # Root HTML layout with PWA meta & font definitions
│   │   └── page.tsx            # Main storefront page assembling all sections
│   ├── components/             # Reusable UI sections matching code.html
│   ├── context/
│   │   └── CartContext.tsx     # Global cart state, offline listener, and modals
│   ├── lib/
│   │   ├── initialData.ts      # Fallback seed catalog for offline and demo mode
│   │   ├── supabaseClient.ts   # Client-side Supabase initialization
│   │   └── whatsapp.ts         # WhatsApp Bengali message formatting helper
│   └── types/
│       └── index.ts            # TypeScript interfaces (Product, Customer, Order)
├── supabase/
│   └── migrations/
│       └── 20240101000000_init_schema.sql # Database DDL, RLS policies, and seed data
├── scripts/
│   └── generate-icons.js       # Script to generate valid PNG icon files
├── package.json                # Project dependencies and operational scripts
├── tailwind.config.ts          # Custom design tokens extracted from DESIGN.md
└── tsconfig.json               # TypeScript compiler configuration
```

---

## 🚀 Getting Started

Follow these instructions to run the application locally on your machine.

### Prerequisites

- **Node.js**: v18.0.0 or higher
- **npm** or **yarn** / **pnpm**

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/RaihanFaruk/Mayer_Doya_Fruits.git
   cd Mayer_Doya_Fruits
   ```

2. Install project dependencies:
   ```bash
   npm install
   ```

3. Configure your local environment variables (see [Environment Variables](#-environment-variables) below).

4. Start the development server:
   ```bash
   npm run dev
   ```

5. Open your browser and visit:
   ```text
   http://localhost:3000
   ```

---

## 🔐 Environment Variables

Create a file named `.env.local` in the root directory of your project.

> [!CAUTION]
> The `.env.local` file contains private configuration settings and **MUST NOT** be committed to GitHub or any public repository. It is already added to `.gitignore`.

Use the following template with your own Supabase project values:

```env
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=your-supabase-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
```

*Note: If environment variables are not immediately supplied, the application will automatically run in demo mode using built-in initial product data.*

---

## 🗄️ Supabase Setup

The repository includes a complete PostgreSQL migration file located at `supabase/migrations/20240101000000_init_schema.sql`.

To initialize your Supabase database:

1. Create a free project at [supabase.com](https://supabase.com).
2. Open your project dashboard and navigate to the **SQL Editor**.
3. Copy and execute the contents of `supabase/migrations/20240101000000_init_schema.sql`.
4. The migration script will automatically:
   - Create `customers`, `products`, `orders`, and `order_items` tables.
   - Enforce database indexing and unique phone number constraints.
   - Configure **Row Level Security (RLS)** policies for read and write operations.
   - Create the `product-images` storage bucket.
   - Populate initial product records for the storefront.

---

## 👨‍💼 Admin Dashboard

The application includes an administrative management portal accessible at `/admin`.

- **Access**: Navigate to `/admin/login` and authenticate with your Supabase credentials.
- **Orders View**: Review all incoming customer orders sorted chronologically. View customer names, phone numbers, delivery addresses, and itemized fruit lists. Update order statuses (`pending`, `confirmed`, `delivered`, `cancelled`).
- **Product Management**: Add new fruits with pricing, custom units (e.g., `প্রতি কেজি`, `১০০ পিস`), stock quantities, and images. Edit details or delete products at any time.

To create your initial admin account, navigate to **Authentication → Users** in your Supabase dashboard and add an email and password user.

---

## 📱 PWA & Offline Support

- **Installable**: Includes a compliant `manifest.json` with theme colors (`#00351b`) and high-resolution icons, allowing customers to add the app directly to their home screen.
- **Offline Catalog Browsing**: The custom service worker (`public/sw.js`) caches static assets, Google fonts, and produce catalog data.
- **Strict Offline Checkout Logic**: If a user loses internet connectivity (`navigator.onLine === false`), the storefront displays a warning banner and the "Place Order" button is completely disabled. No unconfirmed orders are submitted or queued in the background. As soon as connectivity returns, the button re-enables for manual submission.

---

## 📲 WhatsApp Checkout

Customer orders are routed through WhatsApp without requiring costly server-side WhatsApp Business APIs:

1. When the customer submits an order, the system saves the record in the database.
2. A structured, itemized Bengali message is generated containing:
   - Customer Name, Mobile Number, and Address
   - Itemized product list with quantities and prices
   - Total amount and Cash on Delivery confirmation
   - Unique Order ID
3. The platform automatically opens `https://wa.me/<configured-phone-number>?text=...` in a new tab so the customer can tap **Send** once to notify the store.

---

## 🌐 Deployment

The project is optimized for zero-configuration deployment on **Vercel** (Hobby/Free Tier):

1. Push your code to your GitHub repository.
2. Log into [Vercel](https://vercel.com) and import the `Mayer_Doya_Fruits` repository.
3. In the project **Environment Variables** settings, add:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - `SUPABASE_SERVICE_ROLE_KEY`
4. Click **Deploy**. Vercel will automatically build the Next.js production bundle.

---

## 🔒 Security Notes

- **Protect Environment Files**: Never commit `.env` or `.env.local` to source control.
- **Service Role Key**: Keep `SUPABASE_SERVICE_ROLE_KEY` strictly secret on the server side; never prefix it with `NEXT_PUBLIC_` or expose it in client-side bundles.
- **Row Level Security**: Keep Supabase RLS enabled on all tables to prevent unauthorized data mutations.

---

## 📄 License

License information can be added here. understand
