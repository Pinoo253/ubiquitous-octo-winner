import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
export const metadata: Metadata = { title: "ADB CREATIVE TEAM", description: "Portofolio ekstrakurikuler ADB CREATIVE TEAM." };
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (<html lang="id"><body><Navbar />{children}<Footer /></body></html>);
}
