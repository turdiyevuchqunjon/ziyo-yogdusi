
import { Schema, model, models, type Model, type Types } from "mongoose";
import { PIPELINE } from "@/constants/statuses";

export interface IComment {
  _id: Types.ObjectId;
  text: string;
  author?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface ILead {
  map(arg0: (x: any) => any): unknown;
  _id: Types.ObjectId;
  fullName: string;
  phone: string;
  source: string;
  status: (typeof PIPELINE)[number];
  note?: string;
  comments: IComment[];
  createdAt?: Date;
  updatedAt?: Date;
}

const CommentSchema = new Schema<IComment>(
  {
    text:   { type: String, required: true, trim: true },
    author: { type: String, default: "Operator" },
  },
  { _id: true, timestamps: true }
);

const LeadSchema = new Schema<ILead>(
  {
    fullName: {
      type: String,
      required: true,
      index: true,          // <— Ism bo‘yicha qidiruv tezlashadi
    },

    phone: {
      type: String,
      required: true,
      index: true,          // <— Telefon bo‘yicha qidiruv ancha tez bo‘ladi
    },

    source: {
      type: String,
      default: "unknown",
    },

    status: {
      type: String,
      enum: Array.from(PIPELINE),
      default: "LID",
      required: true,
    },

    note: { type: String },
  
    comments: {
      type: [CommentSchema],
      default: [],
    },

 // 🔴 Yangi maydon: admin belgilagan lead
 flagged: {
  type: Boolean,
  default: false,
},

  },

  { timestamps: true }
);

// 👇 Telefonni normalize qilish (faqat +998…, 90…, 9012… kelsa ham toza ko‘rinishga o‘tadi)
LeadSchema.pre("save", function (next) {
  if (this.phone) {
    this.phone = this.phone.replace(/\D/g, ""); // faqat raqamlar
  }
  next();
});


  // models/Lead.ts (parcha)
export interface IComment { /* ... */ }
export interface ILead {
  _id: Types.ObjectId;
  fullName: string;
  phone: string;
  source: string;
  status: (typeof PIPELINE)[number];
  note?: string;
  comments: IComment[];
  createdAt?: Date;
  updatedAt?: Date;
}
export const LeadModel: Model<ILead> =
  (models.Lead as Model<ILead>) || model<ILead>("Lead", LeadSchema);

  export { LeadModel as Lead };


  export interface IComment {
    _id: Types.ObjectId;
    text: string;
    author?: string;
    createdAt?: Date;
    updatedAt?: Date;
  }
  
  export interface ILead {
    _id: Types.ObjectId;
    fullName: string;
    phone: string;
    source: string;
    status: (typeof PIPELINE)[number];
    note?: string;
    comments: IComment[];
    flagged?: boolean;
    createdAt?: Date;
    updatedAt?: Date;
  }
  

  