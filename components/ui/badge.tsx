export function Badge({ children, intent = "default" }: { children: React.ReactNode; intent?: "default" | "success" | "warning" | "danger" | "info" }) {
    const map: Record<string, string> = {
    default: "bg-white/8 border border-white/10 text-white/80",
    success: "bg-yellow-500/15 border border-yellow-400/20 text-yellow-300",
    warning: "bg-amber-500/15 border border-amber-400/20 text-amber-300",
    danger: "bg-rose-500/15 border border-rose-400/20 text-rose-300",
    info: "bg-sky-500/15 border border-sky-400/20 text-sky-300",
    };
    return <span className={["inline-block text-xs px-2.5 py-1 rounded-full", map[intent] ?? map.default].join(" ")}>{children}</span>;
    }