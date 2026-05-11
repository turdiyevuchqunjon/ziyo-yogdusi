"use client";

export default function AboutSection() {
  return (
    <section id="about" className="max-w-6xl mx-auto px-6 py-20">
      <div className="grid md:grid-cols-2 gap-12 items-center">
        <div>
          <span className="inline-block px-4 py-1.5 rounded-full bg-red-50 border border-red-100 text-red-700 text-sm font-bold">
            BIZ HAQIMIZDA
          </span>
          <h2 className="mt-4 text-3xl md:text-4xl font-extrabold leading-tight">
            <span className="zy-gradient-text">Ziyo Yog&apos;dusi</span> — bu
            <br />
            <span className="text-gray-900">bilim va kelajak markazi</span>
          </h2>

          <p className="mt-5 text-gray-700 text-lg leading-relaxed">
            Maktabimiz Pastdarg&apos;om tumani, Juma shahrida joylashgan.
            1-sinfdan 11-sinfgacha bo&apos;lgan o&apos;quvchilar uchun zamonaviy
            ta&apos;lim sharoitlarini taklif etamiz.
          </p>

          <p className="mt-3 text-gray-700 text-lg leading-relaxed">
            Bizning maqsadimiz — bilimli, mas&apos;uliyatli va mustaqil fikrlay
            oladigan, kelajakda jamiyatda yetakchi bo&apos;la oladigan yoshlarni
            tarbiyalash.
          </p>

          <div className="mt-8 grid grid-cols-3 gap-4">
            <StatCard number="500+" label="O'quvchi" />
            <StatCard number="40+" label="O'qituvchi" />
            <StatCard number="11" label="Sinflar" />
          </div>
        </div>

        <div className="relative">
          <div className="absolute inset-0 zy-gradient-bg rounded-3xl blur-3xl opacity-30 -z-10" />
          <div className="zy-card p-8">
            <h3 className="text-2xl font-extrabold zy-gradient-text mb-5">
              Bizning qadriyatlarimiz
            </h3>
            <ul className="space-y-4">
              {VALUES.map((v) => (
                <li key={v.title} className="flex items-start gap-3">
                  <div className="w-9 h-9 rounded-xl zy-gradient-bg text-white flex items-center justify-center text-lg flex-shrink-0">
                    {v.icon}
                  </div>
                  <div>
                    <div className="font-bold text-gray-900">{v.title}</div>
                    <div className="text-sm text-gray-600">{v.desc}</div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}

function StatCard({ number, label }: { number: string; label: string }) {
  return (
    <div className="text-center p-4 rounded-2xl bg-gradient-to-br from-red-50 to-yellow-50 border border-red-100">
      <div className="text-2xl md:text-3xl font-extrabold zy-gradient-text">
        {number}
      </div>
      <div className="text-xs md:text-sm text-gray-600 font-semibold mt-1">
        {label}
      </div>
    </div>
  );
}

const VALUES = [
  {
    icon: "📖",
    title: "Bilim",
    desc: "Sifatli va chuqur ta'lim — har bir dars amaliyotga yo'naltirilgan",
  },
  {
    icon: "❤️",
    title: "Mehr",
    desc: "Har bir bola — alohida individ. Uni hurmat va g'amxo'rlik bilan o'rganamiz",
  },
  {
    icon: "🚀",
    title: "Rivojlanish",
    desc: "Zamonaviy metodikalar, texnologiyalar va innovatsiyalar",
  },
  {
    icon: "🤝",
    title: "Mas'uliyat",
    desc: "Ota-onalar va maktab birgalikda — natija aniq bo'ladi",
  },
];
