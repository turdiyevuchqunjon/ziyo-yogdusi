// application/dto/LeadDTO.ts


// application/dto/LeadDTO.ts
export type LeadDTO = {
    id: string;
    fullName: string;
    phone: string;
    source: string;
    status: string;
    note?: string;
    createdAt?: string | Date | null;
    updatedAt?: string | Date | null;
  };
  