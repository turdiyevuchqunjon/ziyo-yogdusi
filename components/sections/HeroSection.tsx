"use client";

import Link from "next/link";

export default function HeroSection() {
  return (
    <section id="hero" className="zy-gradient-hero text-white relative overflow-hidden">
      {/* Dekoratsiya */}
      <div className="pointer-events-none absolute -top-20 -left-20 h-72 w-72 rounded-full bg-yellow-400/20 blur-3xl zy-float" />
      <div className="pointer-events-none absolute bottom-0 right-0 h-96 w-96 rounded-full bg-red-500/30 blur-3xl" />
      <div className="pointer-events-none absolute top-1/2 left-1/3 h-64 w-64 rounded-full bg-orange-400/20 blur-3xl" />

      <div className="relative max-w-6xl mx-auto px-6 py-20 md:py-28">
        <div className="grid md:grid-cols-2 gap-10 items-center">
          {/* Chap tomoni */}
          <div>
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 border border-white/20 backdrop-blur text-sm font-medium">
              🎓 Pastdarg&apos;om, Juma shahri
            </span>

            <h1 className="mt-6 text-4xl md:text-6xl font-extrabold leading-tight">
              <span className="block">Ziyo</span>
              <span className="block zy-gradient-text">Yog&apos;dusi</span>
              <span className="block text-2xl md:text-3xl mt-3 text-white/90 font-semibold">
                Xususiy maktabi
              </span>
            </h1>

            <p className="mt-6 text-lg md:text-xl text-white/90 max-w-xl leading-relaxed">
              Biz kelajak uchun liderlarni tayyorlaymiz. 1-sinfdan 11-sinfgacha
              sifatli ta&apos;lim, ingliz va rus tillari, zamonaviy o&apos;quv jarayoni
              va qulay sharoit.
            </p>

            <div className="mt-8 flex flex-wrap gap-4">
              <Link
                href="#ariza"
                className="zy-gradient-btn px-7 py-3.5 rounded-2xl font-bold text-base inline-flex items-center gap-2"
              >
                Qabulga ariza →
              </Link>
              <a
                href="tel:+998770608877"
                className="px-7 py-3.5 rounded-2xl font-bold text-base zy-glass text-white inline-flex items-center gap-2 hover:bg-white/15 transition"
              >
                📞 +998 77 060 88 77
              </a>
            </div>

            <div className="mt-10 flex flex-wrap gap-6 text-sm text-white/85">
              <div className="flex items-center gap-2">
                <span className="text-2xl">💡</span>
                <span>1–11 sinflar</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-2xl">🌍</span>
                <span>Ingliz va rus tillari</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-2xl">🏠</span>
                <span>Yotoqxona</span>
              </div>
            </div>
          </div>

          {/* O'ng tomoni — logo */}
          <div className="flex justify-center md:justify-end">
            <div className="relative">
              <div className="absolute inset-0 zy-animated-gradient rounded-full blur-3xl opacity-60" />
              <div className="relative bg-white rounded-full p-6 shadow-2xl zy-float">
                <div className="w-60 h-60 md:w-80 md:h-80 rounded-full zy-gradient-bg flex items-center justify-center text-white text-center p-6">
                  <div>
                    <div className="text-6xl md:text-7xl font-extrabold drop-shadow-lg">
                      ZY
                    </div>
                    <div className="mt-3 text-sm md:text-base font-bold tracking-widest opacity-95">
                      XUSUSIY MAKTABI
                    </div>
                    <div className="mt-1 text-xs md:text-sm font-medium opacity-80">
                      Biz kelajak uchun
                    </div>
                  </div>
                </div>
              </div>

              {/* Aylanuvchi yulduzcha */}
              <div className="absolute -top-2 -right-2 w-14 h-14 rounded-full bg-yellow-400 flex items-center justify-center text-2xl shadow-xl zy-float">
                ⭐
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Pastki to'lqin */}
      <svg
        className="block w-full h-12 md:h-16"
        viewBox="0 0 1440 80"
        preserveAspectRatio="none"
      >
        <path
          fill="#fff8f1"
          d="M0,32 C240,80 480,0 720,32 C960,64 1200,16 1440,40 L1440,80 L0,80 Z"
        />
      </svg>
    </section>
  );
}
