// components/ui/select.tsx
"use client";
import * as React from "react";

type SelectProps = {
  value: string;
  onChange: (val: string) => void;
  options: string[];
  className?: string; // ✅ qo'shdik
};

export function Select({ value, onChange, options, className }: SelectProps) {
  return (
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className={`w-full h-9 rounded-md border border-white/10 bg-white/5 px-3 text-sm text-white outline-none ${className ?? ""}`}
    >
      {options.map((opt) => (
        <option key={opt || "all"} value={opt}>
          {opt || "Barchasi"}
        </option>
      ))}
    </select>
  );
}
