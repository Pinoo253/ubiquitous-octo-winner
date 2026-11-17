import type { Config } from "tailwindcss";
export default { content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"], theme: { extend: { colors: { navy: "#0b1f44", sky: { soft: "#e8f2fd" } } } }, plugins: [] } satisfies Config;
