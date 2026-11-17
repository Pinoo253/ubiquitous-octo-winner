"use client";
import { useActionState } from "react";
import { sendFeedback } from "./actions";
export default function FeedbackForm() {
  const [s, action, pending] = useActionState(sendFeedback, null);
  return (
    <form action={action} className="card space-y-4">
      <input name="name" placeholder="Nama (opsional)" maxLength={80} className="input" />
      <select name="category" required className="input">{["Saran", "Kritik", "Ide kegiatan", "Evaluasi", "Lainnya"].map((c) => <option key={c}>{c}</option>)}</select>
      <textarea name="message" required minLength={10} maxLength={2000} rows={6} placeholder="Tulis masukanmu…" className="input" />
      <input name="website" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden />
      <button disabled={pending} className="btn">{pending ? "Mengirim…" : "Kirim"}</button>
      {s && <p role="status" className={s.ok ? "text-green-700" : "text-red-600"}>{s.msg}</p>}
    </form>
  );
}
