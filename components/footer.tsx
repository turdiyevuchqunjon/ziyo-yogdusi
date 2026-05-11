import React from "react";

export default function Footer() {
  return (
    <footer className="zy-gradient-hero text-white relative overflow-hidden">
      <div className="absolute -top-20 -left-20 h-72 w-72 rounded-full bg-yellow-400/15 blur-3xl" />
      <div className="absolute -bottom-20 -right-20 h-72 w-72 rounded-full bg-red-500/25 blur-3xl" />

      <div className="relative max-w-6xl mx-auto px-6 py-12">
        <div className="grid md:grid-cols-3 gap-8">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center text-red-700 font-extrabold shadow-lg">
                ZY
              </div>
              <div>
                <div className="text-lg font-extrabold">
                  Ziyo Yog&apos;dusi
                </div>
                <div className="text-xs text-white/70 tracking-wider">
                  XUSUSIY MAKTABI
                </div>
              </div>
            </div>
            <p className="mt-4 text-sm text-white/80 max-w-xs">
              Biz kelajak uchun, liderlarni tayyorlaymiz! Sifatli ta&apos;lim,
              zamonaviy yondashuv va qulay sharoit.
            </p>
          </div>

          {/* Aloqa */}
          <div>
            <h3 className="font-bold text-yellow-300 mb-3">Aloqa</h3>
            <div className="flex flex-col gap-2 text-sm text-white/90">
              <a href="tel:+998770608877" className="hover:text-yellow-300 transition">
                📞 +998 77 060 88 77
              </a>
              <a href="tel:+998903578131" className="hover:text-yellow-300 transition">
                📞 +998 90 357 81 31
              </a>
              <span className="text-white/80">📍 Pastdarg&apos;om, Juma shahri</span>
            </div>
          </div>

          {/* Ijtimoiy */}
          <div>
            <h3 className="font-bold text-yellow-300 mb-3">Ijtimoiy tarmoqlar</h3>
            <div className="flex flex-col gap-2 text-sm text-white/90">
              <a
                href="https://www.instagram.com/ziyoyogdusi_school/"
                target="_blank"
                rel="noreferrer"
                className="hover:text-yellow-300 transition"
              >
                Instagram
              </a>
              <a
                href="#"
                target="_blank"
                rel="noreferrer"
                className="hover:text-yellow-300 transition"
              >
                Telegram
              </a>
              <a
                href="#"
                target="_blank"
                rel="noreferrer"
                className="hover:text-yellow-300 transition"
              >
                YouTube
              </a>
            </div>
          </div>
        </div>

        <div className="mt-10 pt-6 border-t border-white/15 flex flex-col md:flex-row items-center justify-between gap-3 text-xs text-white/70">
          <p>
            © {new Date().getFullYear()} Ziyo Yog&apos;dusi xususiy maktabi. Barcha
            huquqlar himoyalangan.
          </p>
          <p>Biz kelajak uchun, liderlarni tayyorlaymiz! 🎓</p>
        </div>
      </div>
    </footer>
  );
}
