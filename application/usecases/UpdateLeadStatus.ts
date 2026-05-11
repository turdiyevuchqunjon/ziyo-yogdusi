import type { ILeadRepository } from "@/domain/repositories/ILeadRepository";
import type { LeadStatus } from "@/constants/statuses";


export class UpdateLeadStatus {
constructor(private repo: ILeadRepository) {}
async exec(id: string, status: LeadStatus) { return this.repo.updateStatus(id, status); }
}