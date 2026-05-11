import type { ILeadRepository } from "@/domain/repositories/ILeadRepository";
import { normalizePhone } from "@/domain/value-objects/Phone";
import { LEAD_STATUSES } from "@/constants/statuses";

export class CreateLead {
  constructor(private repo: ILeadRepository) {}

  async exec(input: { fullName: string; phone: string; source?: string; note?: string; }) {
    const phone = normalizePhone(input.phone);
    const status = LEAD_STATUSES[0]; // "LID"
    const lead = await this.repo.create({
      fullName: input.fullName,
      phone,
      source: input.source ?? "unknown",
      status,                       // ✅ endi ruxsat etiladi
      note: input.note,
    });
    return lead;
  }
}
