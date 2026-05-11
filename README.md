# 🎓 Ziyo Yog'dusi — Xususiy Maktab CRM/Landing

Next.js 16 + MongoDB + Telegram bot asosida qurilgan xususiy maktab landing
sahifasi va lead-management tizimi.

> Biz kelajak uchun, liderlarni tayyorlaymiz!

---

## 🚀 Boshlash

### 1. Bog'liqliklarni o'rnatish

```bash
npm install
```

### 2. Environment o'zgaruvchilari

`.env.local.example` faylini nusxalang va `.env.local` deb saqlang, so'ng qiymatlarni to'ldiring:

```bash
cp .env.local.example .env.local
```

**Majburiy o'zgaruvchilar:**

| O'zgaruvchi             | Tavsif                                       |
| ----------------------- | -------------------------------------------- |
| `MONGODB_URI`           | MongoDB Atlas connection string              |
| `MONGODB_DB`            | DB nomi (`ziyo_yogdusi`)                     |
| `TELEGRAM_BOT_TOKEN`    | @BotFather'dan olingan token                 |
| `TELEGRAM_CHAT_ID`      | Guruh yoki shaxsiy chat ID                   |
| `ADMIN_DELETE_PASSWORD` | Adminkada lead o'chirish paroli              |
| `TARGET_DELETE_PASSWORD`| Target leadlarini o'chirish paroli           |

### 3. Dev serverni ishga tushirish

```bash
npm run dev
```

[http://localhost:3000](http://localhost:3000) — sayt
[http://localhost:3000/sotuv](http://localhost:3000/sotuv) — adminka (lead'lar)

---

## 🎨 Dizayn

- **Asosiy ranglar:** qizil (`#e63946`) → to'q qizil (`#c41e2e`) → sariq (`#f9b233`)
- **Uslub:** zamonaviy gradient, jonli
- **Tailwind CSS v4** + maxsus `zy-*` CSS klasslari (`app/globals.css`)

### Dizayn klasslari

| Klass                | Vazifasi                                  |
| -------------------- | ----------------------------------------- |
| `zy-gradient-hero`   | Hero qism uchun katta gradient fon        |
| `zy-gradient-bg`     | Asosiy qizil-sariq gradient               |
| `zy-gradient-soft`   | Yumshoq krem fon                          |
| `zy-gradient-text`   | Gradient matn                             |
| `zy-gradient-btn`    | Gradient tugma                            |
| `zy-card`            | Oq kartochka, qizil soya                  |
| `zy-input`           | Forma maydonlari                          |
| `zy-float`           | Float animatsiya                          |
| `zy-animated-gradient` | Harakatlanuvchi gradient                |
| `zy-glass`           | Glassmorphism effekt                      |

---

## 📂 Loyiha tuzilishi (DDD)

```
app/                   # Next.js App Router sahifalari
  api/                 # API routelar (leads, target, webhook, telegram)
  (dashboard)/sotuv/   # Lead admin paneli
  target/              # Target reklama landing
  target-kursi/        # Target kurs landing
  lid-magnit/          # Lid magnit landing
components/            # React komponentlar
  ui/                  # Asosiy UI elementlar
  target/              # Target landing komponentlari
  comments/            # Otziflar / sharhlar
domain/                # Domain layer (entities, repositories)
application/           # Use cases va DTO lar
infra/                 # MongoDB modellar va repository implementatsiyalari
lib/                   # Yordamchi funksiyalar (mongodb, error)
models/                # Mongoose modellari
```

---

## 🌐 Vercel'ga deploy

1. GitHub'ga push qiling
2. [vercel.com/new](https://vercel.com/new) — yangi loyiha
3. Repository'ni tanlang
4. **Environment Variables** bo'limida `.env.local.example` dagi barcha
   o'zgaruvchilarni qo'shing
5. Deploy bosing

---

## 📞 Aloqa

- 📍 Pastdarg'om, Juma shahri
- 📞 +998 77 060 88 77
- 📞 +998 90 357 81 31
- 📱 Instagram: [@ziyoyogdusi_school](https://www.instagram.com/ziyoyogdusi_school/)

---

© Ziyo Yog'dusi xususiy maktabi
# ziyo-yogdusi
