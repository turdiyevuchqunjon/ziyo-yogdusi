// app/layout.tsx  (server component)
import Script from "next/script";
import "./globals.css";
import { SpeedInsights } from "@vercel/speed-insights/next";
import Topbar from "@/components/topbar";
import Footer from "@/components/footer";

const PIXEL_ID_SALES =
  process.env.NEXT_PUBLIC_FACEBOOK_PIXEL_ID_SALES ?? "";
const PIXEL_ID_TARGET =
  process.env.NEXT_PUBLIC_FACEBOOK_PIXEL_ID_TARGET ?? "";
const PIXEL_ID_TARGET_KOURSE =
  process.env.NEXT_PUBLIC_FACEBOOK_PIXEL_ID_TARGET_KOURSE ?? "";
const PIXEL_ID_TARGET_LID_MAGNIT =
  process.env.NEXT_PUBLIC_FACEBOOK_PIXEL_ID_TARGET_LID_MAGNIT ?? "";
const PIXEL_ID_TARGET_VISION =
  process.env.NEXT_PUBLIC_FACEBOOK_PIXEL_ID_TARGET_LID_MAGNIT ?? "";

const TRACK_PAGEVIEW = true;

export const metadata = {
  icons: {
    icon: [
      { url: "/favicon.ico" },
      { url: "/icon.png", type: "image/png", sizes: "512x512" },
    ],
    apple: [{ url: "/apple-icon.png", sizes: "180x180" }],
  },
  title: "Ziyo Yog'dusi — Xususiy maktab | Kelajak liderlarini tayyorlaymiz",
  description:
    "Ziyo Yog'dusi xususiy maktabi — 1-sinfdan 11-sinfgacha sifatli ta'lim, ingliz va rus tillari, zamonaviy o'quv jarayoni. Pastdarg'om, Juma shahri.",
  keywords: [
    "Ziyo Yog'dusi",
    "xususiy maktab",
    "Pastdarg'om maktab",
    "Juma shahri maktab",
    "Samarqand xususiy maktab",
    "1-sinfdan 11-sinfgacha",
    "ingliz tili maktabi",
    "rus tili maktabi",
    "Yotoqxonali maktab",
    "sifatli ta'lim",
    "lider tayyorlash",
    "private school Uzbekistan",
  ],
  openGraph: {
    title: "Ziyo Yog'dusi — Xususiy maktab",
    description:
      "Biz kelajak uchun, liderlarni tayyorlaymiz! 1-sinfdan 11-sinfgacha sifatli ta'lim, ingliz va rus tillari, yotoqxona xizmati.",
    url: "https://ziyo-yogdusi.uz",
    type: "website",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const lang = "uz";

  return (
    <html lang={lang} suppressHydrationWarning>
      <head>
        {/* Google Analytics (GA4) */}
        {process.env.NEXT_PUBLIC_GA_ID && (
          <>
            <Script
              src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GA_ID}`}
              strategy="afterInteractive"
            />
            <Script id="ga4-init" strategy="afterInteractive">
              {`
                window.dataLayer = window.dataLayer || [];
                function gtag(){window.dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', '${process.env.NEXT_PUBLIC_GA_ID}', {
                  page_path: window.location.pathname,
                });
              `}
            </Script>
          </>
        )}

        <link rel="preconnect" href="https://i.ytimg.com" crossOrigin="" />
        <link rel="preconnect" href="https://www.youtube-nocookie.com" crossOrigin="" />

        <link rel="icon" href="/logo.png" sizes="48x48" />
        <meta name="google" content="notranslate" />

        <title>Ziyo Yog'dusi — Xususiy maktab</title>
        <meta
          name="description"
          content="Ziyo Yog'dusi xususiy maktabi — 1-sinfdan 11-sinfgacha sifatli ta'lim, ingliz va rus tillari, zamonaviy o'quv jarayoni va yotoqxona xizmati."
        />
        <meta
          name="keywords"
          content="Ziyo Yog'dusi, xususiy maktab, Pastdarg'om, Juma shahri, Samarqand, ingliz tili, rus tili, sifatli ta'lim"
        />

        {/* Meta Pixel (faqat ID berilgan bo'lsa ishlaydi) */}
        {PIXEL_ID_SALES && (
          <Script id="fb-pixel-base" strategy="lazyOnload">
            {`
              !function(f,b,e,v,n,t,s){
                if(f.fbq)return;
                n=f.fbq=function(){n.callMethod?
                n.callMethod.apply(n,arguments):n.queue.push(arguments)};
                if(!f._fbq)f._fbq=n;
                n.push=n; n.loaded=!0; n.version='2.0';
                n.queue=[]; t=b.createElement(e); t.async=!0;
                t.src=v; s=b.getElementsByTagName(e)[0];
                s.parentNode.insertBefore(t,s);
              }(window, document,'script','https://connect.facebook.net/en_US/fbevents.js');

              ${PIXEL_ID_SALES ? `fbq('init', '${PIXEL_ID_SALES}');` : ""}
              ${PIXEL_ID_TARGET ? `fbq('init', '${PIXEL_ID_TARGET}');` : ""}
              ${PIXEL_ID_TARGET_KOURSE ? `fbq('init', '${PIXEL_ID_TARGET_KOURSE}');` : ""}
              ${PIXEL_ID_TARGET_LID_MAGNIT ? `fbq('init', '${PIXEL_ID_TARGET_LID_MAGNIT}');` : ""}
              ${PIXEL_ID_TARGET_VISION ? `fbq('init', '${PIXEL_ID_TARGET_VISION}');` : ""}
              ${TRACK_PAGEVIEW ? "fbq('track','PageView');" : ""}
            `}
          </Script>
        )}
      </head>

      <body className="min-h-screen antialiased">
        <div className="min-h-screen zy-gradient-soft text-[#1a0a05]">
          <Topbar />
          <div className="flex">
            <main className="flex-1">{children}</main>
          </div>
          <Footer />
        </div>

        <SpeedInsights />
      </body>
    </html>
  );
}
