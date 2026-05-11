import * as React from "react";
export function Input(props: React.InputHTMLAttributes<HTMLInputElement>) {
return (
<input
{...props}
className={[
"w-full px-3 py-2 rounded-2xl text-lg bg-white/300 border border-red-600 text-gray-200 placeholder:text-gray-300",
"outline-none focus:ring-2 focus:ring-red-500",
props.className ?? "",
].join(" ")}
/>
);
}