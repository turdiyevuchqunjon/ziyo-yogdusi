"use client";

export default function ContactSection() {
  return (
    <section id="contact" className="bg-white py-20">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-12">
          <span className="inline-block px-4 py-1.5 rounded-full bg-red-50 border border-red-100 text-red-700 text-sm font-bold">
            ALOQA
          </span>
          <h2 className="mt-4 text-3xl md:text-5xl font-extrabold">
            Biz bilan <span className="zy-gradient-text">bog&apos;laning</span>
          </h2>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          <ContactCard
            icon="📞"
            title="Telefon"
            lines={[
              { text: "+998 77 060 88 77", href: "tel:+998770608877" },
              { text: "+998 90 357 81 31", href: "tel:+998903578131" },
            ]}
          />
          <ContactCard
            icon="📍"
            title="Manzil"
            lines={[
              { text: "Pastdarg'om tumani" },
              { text: "Juma shahri, Samarqand" },
            ]}
          />
          <ContactCard
            icon="📱"
            title="Ijtimoiy tarmoq"
            lines={[
              {
                text: "Instagram",
                href: "https://www.instagram.com/ziyoyogdusi_school/",
              },
              { text: "Telegram", href: "#" },
            ]}
          />
        </div>

        <div className="mt-10 text-center">
          <a
            href="https://www.instagram.com/ziyoyogdusi_school/"
            target="_blank"
            rel="noreferrer"
            className="zy-gradient-btn inline-flex items-center gap-2 px-8 py-4 rounded-2xl font-extrabold text-lg"
          >
            📷 Instagram'da kuzating
          </a>
        </div>
      </div>
    </section>
  );
}

function ContactCard({
  icon,
  title,
  lines,
}: {
  icon: string;
  title: string;
  lines: Array<{ text: string; href?: string }>;
}) {
  return (
    <div className="zy-card p-7 text-center hover:-translate-y-1 transition">
      <div className="w-16 h-16 mx-auto rounded-2xl zy-gradient-bg flex items-center justify-center text-3xl mb-4 shadow-lg">
        {icon}
      </div>
      <h3 className="text-xl font-extrabold mb-3 text-gray-900">{title}</h3>
      <div className="space-y-1">
        {lines.map((line, i) =>
          line.href ? (
            <a
              key={i}
              href={line.href}
              target={line.href.startsWith("http") ? "_blank" : undefined}
              rel={line.href.startsWith("http") ? "noreferrer" : undefined}
              className="block text-gray-700 hover:text-red-600 font-semibold transition"
            >
              {line.text}
            </a>
          ) : (
            <div key={i} className="text-gray-700 font-semibold">
              {line.text}
            </div>
          )
        )}
      </div>
    </div>
  );
}
