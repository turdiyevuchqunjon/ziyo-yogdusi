import * as React from "react";
export function Card({ children, className = "" }: { children: React.ReactNode; className?: string }) {
return (
<div className={["rounded-3xl border border-white/10 bg-white/5 backdrop-blur-sm shadow-[0_8px_30px_rgba(0,0,0,.25)]", className].join(" ")}>{children}</div>
);
}
export function CardTitle({ children }: { children: React.ReactNode }) {
return <div className="font-semibold text-base md:text-lg text-white/90 mb-2">{children}</div>;
}
export function CardContent({ children }: { children: React.ReactNode }) {
return <div className="text-white/80">{children}</div>;
}

