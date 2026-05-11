"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { LEAD_STATUSES, type LeadStatus } from "@/constants/statuses";

type Lead = {
  id: string;
  _id?: string;
  fullName: string;
  phone: string;
  source: string;
  status: LeadStatus;
  note?: string;
  createdAt?: string;
  lastCommentText?: string;
  flagged?: boolean;
};

const STATUS_COLORS: Record<string, string> = {
  "LID": "bg-blue-100 text-blue-800 border-blue-200",
  "QO'NG'IROQ QILINDI": "bg-purple-100 text-purple-800 border-purple-200",
  "KO'TARMADI": "bg-orange-100 text-orange-800 border-orange-200",
  "O'YLAB KO'RAMAN": "bg-yellow-100 text-yellow-800 border-yellow-200",
  "TANISHUVGA KELDI": "bg-cyan-100 text-cyan-800 border-cyan-200",
  "QABUL QILINDI": "bg-green-100 text-green-800 border-green-200",
  "TO'LOV QILDI": "bg-emerald-100 text-emerald-800 border-emerald-200",
  "KEYINGI YIL": "bg-gray-100 text-gray-800 border-gray-200",
  "QABUL EMAS": "bg-red-100 text-red-800 border-red-200",
};

export default function LeadsClient() {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [loading, setLoading] = useState(true);
  const [query, setQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("");

  const load = useCallback(async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      if (statusFilter) params.set("status", statusFilter);
      if (query.trim()) params.set("q", query.trim());

      const res = await fetch(`/api/leads?${params.toString()}`, {
        cache: "no-store",
      });
      const data = await res.json();
      setLeads(Array.isArray(data?.leads) ? data.leads : []);
    } catch {
      setLeads([]);
    } finally {
      setLoading(false);
    }
  }, [query, statusFilter]);

  useEffect(() => {
    load();
  }, [load]);

  const counts = useMemo(() => {
    const map: Record<string, number> = { ALL: leads.length };
    for (const s of LEAD_STATUSES) map[s] = 0;
    for (const l of leads) {
      if (map[l.status] != null) map[l.status]++;
    }
    return map;
  }, [leads]);

  const updateStatus = async (id: string, newStatus: LeadStatus) => {
    try {
      await fetch(`/api/leads/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: newStatus }),
      });
      setLeads((prev) =>
        prev.map((l) => (l.id === id ? { ...l, status: newStatus } : l))
      );
    } catch {
      alert("Statusni yangilashda xato");
    }
  };

  return (
    <main className="min-h-screen bg-gray-50">
      {/* Top header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 md:px-6 py-4 flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full zy-gradient-bg flex items-center justify-center text-white font-extrabold text-sm">
              ZY
            </div>
            <div>
              <div className="text-lg font-extrabold text-red-700">
                CRM — Lidlar
              </div>
              <div className="text-xs text-gray-500">
                Ziyo Yog&apos;dusi xususiy maktabi
              </div>
            </div>
          </div>
          <Link
            href="/"
            className="text-sm font-semibold text-red-600 hover:text-red-800 transition"
          >
            ← Saytga qaytish
          </Link>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 md:px-6 py-6">
        {/* Filter tugmalari */}
        <div className="flex flex-wrap gap-2 mb-5">
          <FilterBtn
            label={`Hammasi (${counts.ALL})`}
            active={!statusFilter}
            onClick={() => setStatusFilter("")}
          />
          {LEAD_STATUSES.map((s) => (
            <FilterBtn
              key={s}
              label={`${s} (${counts[s] ?? 0})`}
              active={statusFilter === s}
              onClick={() => setStatusFilter(s)}
            />
          ))}
        </div>

        {/* Qidiruv */}
        <div className="mb-5">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Ism yoki telefon raqami bo'yicha qidirish..."
            className="zy-input w-full md:w-96 px-4 py-2.5 rounded-xl"
          />
        </div>

        {/* Lidlar jadvali */}
        <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden shadow-sm">
          {loading ? (
            <div className="p-12 text-center text-gray-500">Yuklanmoqda...</div>
          ) : leads.length === 0 ? (
            <div className="p-12 text-center text-gray-500">
              Hozircha lidlar yo&apos;q
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="bg-gray-50 text-gray-600 text-xs uppercase tracking-wider">
                  <tr>
                    <th className="px-4 py-3 text-left">Ism</th>
                    <th className="px-4 py-3 text-left">Telefon</th>
                    <th className="px-4 py-3 text-left">Status</th>
                    <th className="px-4 py-3 text-left">Izoh</th>
                    <th className="px-4 py-3 text-left">Sana</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {leads.map((lead) => (
                    <tr key={lead.id} className="hover:bg-red-50/30 transition">
                      <td className="px-4 py-3 font-semibold text-gray-900">
                        {lead.fullName}
                      </td>
                      <td className="px-4 py-3 text-gray-700">
                        <a
                          href={`tel:${lead.phone}`}
                          className="hover:text-red-600 font-mono"
                        >
                          {formatPhone(lead.phone)}
                        </a>
                      </td>
                      <td className="px-4 py-3">
                        <select
                          value={lead.status}
                          onChange={(e) =>
                            updateStatus(lead.id, e.target.value as LeadStatus)
                          }
                          className={`text-xs font-bold px-3 py-1.5 rounded-lg border ${
                            STATUS_COLORS[lead.status] ??
                            "bg-gray-100 text-gray-800 border-gray-200"
                          }`}
                        >
                          {LEAD_STATUSES.map((s) => (
                            <option key={s} value={s}>
                              {s}
                            </option>
                          ))}
                        </select>
                      </td>
                      <td className="px-4 py-3 text-gray-600 max-w-xs truncate">
                        {lead.note || "—"}
                      </td>
                      <td className="px-4 py-3 text-gray-500 text-xs whitespace-nowrap">
                        {lead.createdAt
                          ? new Date(lead.createdAt).toLocaleString("uz-UZ")
                          : "—"}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}

function FilterBtn({
  label,
  active,
  onClick,
}: {
  label: string;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className={`px-3 py-1.5 rounded-lg text-xs font-bold border transition ${
        active
          ? "bg-red-600 text-white border-red-600"
          : "bg-white text-gray-700 border-gray-200 hover:bg-red-50 hover:border-red-200"
      }`}
    >
      {label}
    </button>
  );
}

function formatPhone(phone: string) {
  const d = phone.replace(/\D/g, "");
  if (d.length === 12 && d.startsWith("998")) {
    return `+${d.slice(0, 3)} ${d.slice(3, 5)} ${d.slice(5, 8)} ${d.slice(8, 10)} ${d.slice(10)}`;
  }
  return phone;
}
