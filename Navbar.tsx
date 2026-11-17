import Link from "next/link";
import { Instagram } from "lucide-react";
export const IG_URL = "https://www.instagram.com/adbcreative_team?rpxt=enF3Y3VtZnpkdHRs";
const links = [["/", "Home"], ["/feedback", "Saran & Kritik"]];
export default function Navbar() {
  return (
    <header className="sticky top-0 z-20 border-b border-blue-100 bg-white/90 backdrop-blur">
      <nav className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-3 px-4 py-3">
        <Link href="/" className="font-bold tracking-wide">ADB CREATIVE TEAM</Link>
        <div className="flex flex-wrap items-center gap-4 text-sm">
          {links.map(([h, l]) => <Link key={h} href={h} className="hover:text-blue-600">{l}</Link>)}
          <a href={IG_URL} target="_blank" rel="noopener noreferrer" className="btn"><Instagram size={16} />Follow Instagram ADB</a>
        </div>
      </nav>
    </header>
  );
}
