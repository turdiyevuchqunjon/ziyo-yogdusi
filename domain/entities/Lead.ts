// domain/entities/Lead.ts
import type { LeadStatus } from "@/constants/statuses";

export type LeadComment = {
  text: string;
  author?: string;
  createdAt?: Date | string | null;
};

export interface Lead {
  id: string;
  fullName: string;
  phone: string;
  source: string;
  status: LeadStatus;
  note?: string;
  createdAt?: Date | string | null;
  updatedAt?: Date | string | null;
  comments?: LeadComment[];
}

// Agar boshqa joyda default import ishlatilgan bo‘lsa ham mos bo‘lsin:
export default Lead;
