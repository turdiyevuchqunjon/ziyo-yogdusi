import type { Lead } from "@/domain/entities/Lead";
import type { LeadStatus } from "@/constants/statuses";

export interface ListParams {
  status?: LeadStatus;
  search?: string;
  limit?: number;
}

export interface ILeadRepository {
  list(params?: ListParams): Promise<Lead[]>;
  create(data: {
    fullName: string;
    phone: string;
    source?: string;
    note?: string;
    status?: LeadStatus;           // ✅ qo‘shildi
  }): Promise<Lead>;
  updateStatus(id: string, status: LeadStatus): Promise<Lead>;
  delete(id: string): Promise<void>;
  addComment(id: string, comment: { text: string; author?: string }): Promise<void>;
}
