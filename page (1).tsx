import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { createClient } from "@/utils/supabase/server";
export const dynamic = "force-dynamic";
async function markRead(fd: FormData) { "use server"; const s = await createClient(); await s.from("feedback").update({ is_read: true }).eq("id", String(fd.get("id"))); revalidatePath("/admin"); }
async function remove(fd: FormData) { "use server"; const s = await createClient(); await s.from("feedback").delete().eq("id", String(fd.get("id"))); revalidatePath("/admin"); }
async function logout() { "use server"; const s = await createClient(); await s.auth.signOut(); redirect("/login"); }
export default async function Admin() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect("/login");
  const { data: isAdmin } = await supabase.rpc("is_admin");
  if (!isAdmin) return <main className="py-24 text-center">Akun ini bukan admin.</main>;
  const { data: items } = await supabase.from("feedback").select("*").order("created_at", { ascending: false });
  const unread = items?.filter((i) => !i.is_read).length ?? 0;
  return (
    <main className="mx-auto max-w-4xl px-4 py-12">
      <div className="mb-6 flex items-center justify-between"><h1 className="text-2xl font-bold">Dashboard Admin</h1><form action={logout}><button className="btn">Logout</button></form></div>
      <p className="mb-4">Feedback: {items?.length ?? 0} · Belum dibaca: {unread}</p>
      <ul className="space-y-3">
        {items?.map((f) => (
          <li key={f.id} className="card">
            <p className="text-xs">{f.category} · {f.name ?? "Anonim"} · {new Date(f.created_at).toLocaleString("id-ID")} {f.is_read ? "" : "· BARU"}</p>
            <p className="my-2 whitespace-pre-wrap">{f.message}</p>
            <div className="flex gap-2">
              {!f.is_read && <form action={markRead}><input type="hidden" name="id" value={f.id} /><button className="btn">Tandai dibaca</button></form>}
              <form action={remove}><input type="hidden" name="id" value={f.id} /><button className="btn !bg-red-700">Hapus</button></form>
            </div>
          </li>
        ))}
        {!items?.length && <li className="card text-center">Belum ada feedback.</li>}
      </ul>
    </main>
  );
}
