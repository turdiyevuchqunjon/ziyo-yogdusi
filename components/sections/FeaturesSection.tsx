"use client";

export default function FeaturesSection() {
  return (
    <section id="features" className="bg-white py-20">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-14">
          <span className="inline-block px-4 py-1.5 rounded-full bg-red-50 border border-red-100 text-red-700 text-sm font-bold">
            AFZALLIKLAR
          </span>
          <h2 className="mt-4 text-3xl md:text-5xl font-extrabold">
            Nega <span className="zy-gradient-text">Ziyo Yog&apos;dusi?</span>
          </h2>
          <p className="mt-4 text-gray-600 max-w-2xl mx-auto text-lg">
            Bizning maktab — bu bilim, tarbiya va kelajakni birlashtiruvchi
            zamonaviy o&apos;quv markazi
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {FEATURES.map((f, i) => (
            <div
              key={f.title}
              className="zy-card p-7 hover:-translate-y-2 hover:shadow-2xl transition group"
            >
              <div className="w-14 h-14 rounded-2xl zy-gradient-bg flex items-center justify-center text-2xl mb-5 group-hover:scale-110 transition">
                {f.icon}
              </div>
              <h3 className="text-xl font-extrabold mb-2 text-gray-900">
                {f.title}
              </h3>
              <p className="text-gray-600 text-sm leading-relaxed">{f.desc}</p>
              <div className="mt-4 text-xs font-bold text-red-600">
                #{(i + 1).toString().padStart(2, "0")}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

const FEATURES = [
  {
    icon: "📚",
    title: "Sifatli ta'lim",
    desc: "1-sinfdan 11-sinfgacha davlat standartlariga muvofiq, kuchaytirilgan dastur asosida o'qitiladi.",
  },
  {
    icon: "🌐",
    title: "Til o'rganish",
    desc: "Ingliz va rus tillari kichkina yoshdan boshlab kuchli baza bilan o'rgatiladi.",
  },
  {
    icon: "👨‍🏫",
    title: "Tajribali pedagoglar",
    desc: "Malaka oshirilgan, zamonaviy metodlarda ishlaydigan o'qituvchilar jamoasi.",
  },
  {
    icon: "🏠",
    title: "Yotoqxona xizmati",
    desc: "Uzoqdan keladigan o'quvchilar uchun qulay, xavfsiz va sof turar joy.",
  },
  {
    icon: "🍽️",
    title: "Sog'lom ovqat",
    desc: "Maktab oshxonasida 3 mahal sifatli, balanslangan va mazali ovqatlanish.",
  },
  {
    icon: "🎯",
    title: "Individual yondashuv",
    desc: "Har bir bolaning iste'dodi, qiziqishlari va imkoniyatlari hisobga olinadi.",
  },
 {
  icon: "🥋",
  title: "Sport va Taekwondo",
  desc: "Taekwondo, jismoniy tarbiya va sport mashg'ulotlari — har tomonlama rivojlanish uchun.",
},
  {
    icon: "💻",
    title: "IT va texnologiyalar",
    desc: "Dasturlash, robototexnika va zamonaviy texnologiyalar bilan tanishish.",
  },
 {
  icon: "🏆",
  title: "Xalqaro sertifikatlar va olimpiadalar",
  desc: "IELTS, SAT imtihonlari hamda fan olimpiadalari va sport musobaqalarida g'oliblar.",
},
];


