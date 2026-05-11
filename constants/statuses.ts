// constants/statuses.ts
//
// Ziyo Yog'dusi xususiy maktabi — lead pipeline statuslari
//

export const LEAD_STATUSES = [
  "LID",                   // yangi keldi (forma orqali)
  "QO'NG'IROQ QILINDI",    // operator gaplashdi
  "KO'TARMADI",            // telefon ko'tarmadi
  "O'YLAB KO'RAMAN",       // ota-ona o'ylab ko'rmoqchi
  "TANISHUVGA KELDI",      // maktabga keldi, tanishdi
  "QABUL QILINDI",         // o'qiydi (muvaffaqiyat)
  "TO'LOV QILDI",          // to'lov amalga oshirildi
  "KEYINGI YIL",           // bu yil emas, keyingi o'quv yili
  "QABUL EMAS",            // qabul qilinmadi / rad etdi
] as const;

export type LeadStatus = (typeof LEAD_STATUSES)[number];

// Eski kod bilan moslik uchun
export const PIPELINE = LEAD_STATUSES;

export function isValidLeadStatus(s: string): s is LeadStatus {
  return (LEAD_STATUSES as readonly string[]).includes(s);
}
