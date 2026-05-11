"use client";

export default function GallerySection() {
  return (
    <section id="gallery" className="zy-gradient-soft py-20">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-14">
          <span className="inline-block px-4 py-1.5 rounded-full bg-red-50 border border-red-100 text-red-700 text-sm font-bold">
            BIZNING MAKTAB
          </span>
          <h2 className="mt-4 text-3xl md:text-5xl font-extrabold">
            <span className="zy-gradient-text">Hayot</span> Ziyo
            Yog&apos;dusi&apos;da
          </h2>
          <p className="mt-4 text-gray-600 max-w-2xl mx-auto text-lg">
            Maktabimizning kunlik hayoti, tadbirlar va o&apos;quv jarayoni
          </p>
        </div>

        {/* Highlight grid (Instagram-style) */}
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-4 mb-10">
          {HIGHLIGHTS.map((h) => (
            <div
              key={h.label}
              className="flex flex-col items-center group cursor-pointer"
            >
              <div className="w-20 h-20 md:w-24 md:h-24 rounded-full zy-gradient-bg p-1 group-hover:scale-105 transition shadow-lg">
                <div className="w-full h-full rounded-full bg-white flex items-center justify-center text-3xl md:text-4xl">
                  {h.icon}
                </div>
              </div>
              <div className="mt-3 text-sm font-bold text-gray-800">
                {h.label}
              </div>
            </div>
          ))}
        </div>

        {/* Gallery cards */}
        <div className="grid md:grid-cols-3 gap-6">
          {GALLERY.map((g, i) => (
            <div
              key={g.title}
              className="relative rounded-3xl overflow-hidden shadow-xl group cursor-pointer"
              style={{ aspectRatio: "4 / 5" }}
            >
              <div className={`absolute inset-0 ${g.gradient} group-hover:scale-110 transition duration-500`} />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
              <div className="absolute inset-0 flex items-center justify-center text-7xl opacity-80">
                {g.icon}
              </div>
              <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                <div className="text-xs font-bold opacity-80">#{i + 1}</div>
                <h3 className="text-xl font-extrabold mt-1">{g.title}</h3>
                <p className="text-sm opacity-90 mt-1">{g.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

const HIGHLIGHTS = [
  { icon: "📍", label: "Manzil" },
  { icon: "👨‍👩‍👧", label: "Ota-onalar" },
  { icon: "👥", label: "Jamoa" },
  { icon: "🎬", label: "Jarayon" },
  { icon: "🍽️", label: "Oshxona" },
  { icon: "⭐", label: "Tadbirlar" },
  { icon: "🛏️", label: "Yotoqxona" },
];

const GALLERY = [
  {
    icon: "🎓",
    title: "Bilim olamga eshik",
    desc: "Maktabimiz darvozasi — yangi imkoniyatlar boshlanishi",
    gradient: "zy-gradient-bg",
  },
  {
    icon: "🏫",
    title: "Zamonaviy bino",
    desc: "Yorug', toza va qulay o'quv sinflari",
    gradient: "bg-gradient-to-br from-red-500 via-red-700 to-yellow-500",
  },
  {
    icon: "🇺🇿",
    title: "Vatanparvarlik",
    desc: "Milliy qadriyatlar va madaniyatga sodiq tarbiya",
    gradient: "bg-gradient-to-br from-yellow-400 via-orange-500 to-red-600",
  },
];
