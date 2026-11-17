"use server";
import { createClient } from "@/utils/supabase/server";
const CATS = ["Saran", "Kritik", "Ide kegiatan", "Evaluasi", "Lainnya"];
export async function sendFeedback(_: unknown, fd: FormData): Promise<{ ok: boolean; msg: string }> {
  if (fd.get("website")) return { ok: true, msg: "Terkirim." }; // honeypot
  const name = String(fd.get("name") ?? "").trim().slice(0, 80) || null;
  const category = String(fd.get("category") ?? "");
  const message = String(fd.get("message") ?? "").trim();
  if (!CATS.includes(category)) return { ok: false, msg: "Kategori tidak valid." };
  if (message.length < 10 || message.length > 2000) return { ok: false, msg: "Pesan harus 10–2000 karakter." };
  const supabase = await createClient();
  const { error } = await supabase.from("feedback").insert({ name, category, message });
  return error ? { ok: false, msg: "Gagal mengirim. Coba lagi." } : { ok: true, msg: "Terima kasih sudah menjadi bagian dari perkembangan ADB CREATIVE TEAM." };
}
