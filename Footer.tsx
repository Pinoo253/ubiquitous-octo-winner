import { Instagram } from "lucide-react";
import { IG_URL } from "./Navbar";
export default function Footer() {
  return (
    <footer className="mt-20 border-t border-blue-100 bg-sky-soft py-10 text-center text-sm">
      <p className="font-semibold">ADB CREATIVE TEAM</p>
      <a href={IG_URL} target="_blank" rel="noopener noreferrer" className="mt-3 inline-flex items-center gap-2 hover:text-blue-600">
        <Instagram size={16} />Kunjungi Instagram Kami (@adbcreative_team)
      </a>
    </footer>
  );
}
