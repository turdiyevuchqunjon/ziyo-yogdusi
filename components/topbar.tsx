"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";

const NAV = [
  { href: "#about", label: "Biz haqimizda" },
  { href: "#features", label: "Afzalliklar" },
  { href: "#gallery", label: "Maktab" },
  { href: "#ariza", label: "Qabul" },
  { href: "#contact", label: "Aloqa" },
];

export default function Topbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-50 transition-all ${
        scrolled
          ? "bg-white/95 backdrop-blur-lg shadow-md border-b border-red-100"
          : "bg-white/80 backdrop-blur-md border-b border-red-100/60"
      }`}
    >
      <div className="h-16 flex items-center justify-between px-4 md:px-6 max-w-7xl mx-auto">
        <Link className="flex items-center gap-2" href="/">
          <div className="w-10 h-10 rounded-full zy-gradient-bg flex items-center justify-center text-white font-extrabold text-sm shadow-md">
            ZY
          </div>
          <div className="leading-tight">
            <div className="text-lg font-extrabold text-red-700">
              Ziyo <span className="text-yellow-600">Yog&apos;dusi</span>
            </div>
            <div className="text-[10px] text-gray-500 font-medium tracking-wider">
              XUSUSIY MAKTABI
            </div>
          </div>
        </Link>

        {/* Desktop nav */}
        <nav className="flex gap-1 max-md:hidden">
          {NAV.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="inline-flex items-center text-sm font-semibold transition px-3 py-2 rounded-lg text-gray-700 hover:text-red-600 hover:bg-red-50/60"
            >
              {item.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <a
            href="#ariza"
            className="max-md:hidden zy-gradient-btn px-5 py-2.5 rounded-xl text-sm font-bold"
          >
            Ariza qoldirish
          </a>

          <button
            type="button"
            aria-label="Menu"
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
            className="md:hidden inline-flex h-10 w-10 items-center justify-center rounded-xl border border-red-200 bg-red-50/50 text-red-700 hover:bg-red-100 transition"
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Mobile dropdown */}
      <div
        className={`md:hidden overflow-hidden border-t border-red-100 bg-white/95 backdrop-blur transition-[max-height,opacity] duration-300 ${
          open ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <nav className="px-4 py-3 flex flex-col gap-2">
          {NAV.map((item) => (
            <a
              key={item.href}
              href={item.href}
              onClick={() => setOpen(false)}
              className="rounded-xl px-4 py-3 text-base font-semibold transition text-gray-700 hover:bg-red-50/70 hover:text-red-600"
            >
              {item.label}
            </a>
          ))}
          <a
            href="#ariza"
            onClick={() => setOpen(false)}
            className="zy-gradient-btn rounded-xl px-4 py-3 text-base font-bold text-center mt-2"
          >
            Ariza qoldirish
          </a>
        </nav>
      </div>
    </header>
  );
}
