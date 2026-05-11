"use client";

import { useState } from "react";

type FormState = {
  parentName: string;
  childName: string;
  phone: string;
  classGrade: string;
  note: string;
};

const INITIAL: FormState = {
  parentName: "",
  childName: "",
  phone: "",
  classGrade: "",
  note: "",
};

export default function ApplicationForm() {
  const [form, setForm] = useState<FormState>(INITIAL);
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");

  const onChange =
    (key: keyof FormState) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) =>
      setForm((prev) => ({ ...prev, [key]: e.target.value }));

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("idle");
    setErrorMsg("");

    // Validatsiya
    if (!form.parentName.trim() || !form.childName.trim() || !form.phone.trim()) {
      setStatus("error");
      setErrorMsg("Iltimos, ism, farzand ismi va telefonni to'ldiring.");
      return;
    }
    const digits = form.phone.replace(/\D/g, "");
    if (digits.length < 9) {
      setStatus("error");
      setErrorMsg("Telefon raqami noto'g'ri. Masalan: +998 90 123 45 67");
      return;
    }

    setLoading(true);

    const fullName = `${form.parentName.trim()} (farzand: ${form.childName.trim()})`;
    const note = [
      form.classGrade ? `Sinf: ${form.classGrade}` : "",
      form.note ? `Izoh: ${form.note}` : "",
    ]
      .filter(Boolean)
      .join(" | ");

    const payload = {
      fullName,
      phone: form.phone,
      source: "landing",
      note,
    };

    try {
      // 1) CRM bazaga yozish
      const dbRes = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      // 2) Telegram'ga xabar yuborish (CRM muvaffaqiyatsiz bo'lsa ham)
      await fetch("/api/telegram-lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      }).catch(() => null);

      if (!dbRes.ok) {
        const err = await dbRes.json().catch(() => ({}));
        throw new Error(err?.error || "Server xatosi");
      }

      setStatus("success");
      setForm(INITIAL);
    } catch (err) {
      setStatus("error");
      setErrorMsg(
        err instanceof Error
          ? err.message
          : "Yuborishda xato. Qaytadan urinib ko'ring."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="ariza" className="py-20 relative overflow-hidden">
      <div className="absolute inset-0 zy-gradient-hero -z-10" />
      <div className="absolute top-0 left-0 w-96 h-96 bg-yellow-400/15 rounded-full blur-3xl -z-10" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-red-500/25 rounded-full blur-3xl -z-10" />

      <div className="max-w-3xl mx-auto px-6">
        <div className="text-center mb-10">
          <span className="inline-block px-4 py-1.5 rounded-full bg-white/15 border border-white/25 backdrop-blur text-white text-sm font-bold">
            QABUL JARAYONI
          </span>
          <h2 className="mt-4 text-3xl md:text-5xl font-extrabold text-white">
            Ariza qoldiring 📝
          </h2>
          <p className="mt-3 text-white/90 text-lg max-w-xl mx-auto">
            Ma&apos;lumotlaringizni qoldiring — operatorimiz tez orada siz bilan
            bog&apos;lanadi va barcha savollarga javob beradi.
          </p>
        </div>

        <div className="bg-white rounded-3xl p-7 md:p-10 shadow-2xl">
          {status === "success" ? (
            <SuccessMessage onReset={() => setStatus("idle")} />
          ) : (
            <form onSubmit={onSubmit} className="space-y-5">
              <div className="grid md:grid-cols-2 gap-5">
                <Field
                  label="Ota-onaning ismi *"
                  placeholder="Masalan: Aliyev Akmal"
                  value={form.parentName}
                  onChange={onChange("parentName")}
                  disabled={loading}
                />
                <Field
                  label="Farzandning ismi *"
                  placeholder="Masalan: Aliyev Sardor"
                  value={form.childName}
                  onChange={onChange("childName")}
                  disabled={loading}
                />
              </div>

              <Field
                label="Telefon raqami *"
                placeholder="+998 90 123 45 67"
                value={form.phone}
                onChange={onChange("phone")}
                disabled={loading}
                type="tel"
              />

              <div>
                <label className="block text-sm font-bold text-gray-800 mb-2">
                  Sinf
                </label>
                <select
                  value={form.classGrade}
                  onChange={onChange("classGrade")}
                  disabled={loading}
                  className="zy-input w-full px-4 py-3 rounded-xl text-base font-medium"
                >
                  <option value="">Tanlang</option>
                  {Array.from({ length: 11 }, (_, i) => i + 1).map((n) => (
                    <option key={n} value={`${n}-sinf`}>
                      {n}-sinf
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-bold text-gray-800 mb-2">
                  Qo&apos;shimcha izoh
                </label>
                <textarea
                  value={form.note}
                  onChange={onChange("note")}
                  disabled={loading}
                  rows={3}
                  placeholder="Savollaringiz yoki qo'shimcha ma'lumot..."
                  className="zy-input w-full px-4 py-3 rounded-xl text-base resize-none"
                />
              </div>

              {status === "error" && (
                <div className="rounded-xl bg-red-50 border border-red-200 text-red-700 px-4 py-3 text-sm">
                  ⚠️ {errorMsg}
                </div>
              )}

              <button
                type="submit"
                disabled={loading}
                className="zy-gradient-btn w-full py-4 rounded-2xl font-extrabold text-lg disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {loading ? "Yuborilmoqda..." : "Arizani yuborish →"}
              </button>

              <p className="text-xs text-gray-500 text-center">
                Ariza yuborish orqali siz shaxsiy ma&apos;lumotlaringizni qayta
                ishlashga rozilik bildirasiz.
              </p>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}

function Field({
  label,
  ...props
}: {
  label: string;
} & React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <div>
      <label className="block text-sm font-bold text-gray-800 mb-2">
        {label}
      </label>
      <input
        {...props}
        className="zy-input w-full px-4 py-3 rounded-xl text-base font-medium"
      />
    </div>
  );
}

function SuccessMessage({ onReset }: { onReset: () => void }) {
  return (
    <div className="text-center py-8">
      <div className="w-20 h-20 mx-auto rounded-full zy-gradient-bg flex items-center justify-center text-4xl shadow-xl">
        ✓
      </div>
      <h3 className="mt-5 text-2xl md:text-3xl font-extrabold zy-gradient-text">
        Rahmat!
      </h3>
      <p className="mt-3 text-gray-700 text-lg">
        Arizangiz qabul qilindi. Operatorimiz tez orada siz bilan
        bog&apos;lanadi.
      </p>
      <button
        onClick={onReset}
        className="mt-6 px-6 py-2.5 rounded-xl border-2 border-red-200 text-red-700 font-bold hover:bg-red-50 transition"
      >
        Yana ariza qoldirish
      </button>
    </div>
  );
}
