// application/usecases/ListLeads.ts
import type { ILeadRepository } from "@/domain/repositories/ILeadRepository";
import type { LeadStatus } from "@/constants/statuses";

export class ListLeads {
  constructor(private repo: ILeadRepository) {}

  async exec(params: { status?: LeadStatus; search?: string }) {
    return this.repo.list(params);
  }
}
