import { createClient } from "@/utils/supabase/server";
export const dynamic = "force-dynamic";
async function count(table: string) {
  const supabase = await createClient();
  const { count: n } = await supabase.from(table).select("*", { count: "exact", head: true }).eq("published", true);
  return n ?? 0;
}
export default async function Home() {
  const [a, p, g, ac] = await Promise.all([count("activities"), count("projects"), count("gallery"), count("achievements")]);
  const stats = [["Kegiatan", a], ["Proyek", p], ["Galeri", g], ["Prestasi", ac]] as const;
  return (
    <main>
      <section className="bg-gradient-to-b from-sky-soft to-white py-24 text-center">
        <h1 className="text-4xl font-extrabold md:text-6xl">ADB CREATIVE TEAM</h1>
        <p className="mx-auto mt-4 max-w-xl px-4">Wadah kreativitas, karya, dan prestasi anggota ekstrakurikuler.</p>
      </section>
      <section className="mx-auto grid max-w-6xl grid-cols-2 gap-4 px-4 md:grid-cols-4">
        {stats.map(([l, n]) => (<div key={l} className="card text-center"><p className="text-3xl font-bold">{n}</p><p className="text-sm">{l}</p></div>))}
      </section>
    </main>
  );
}
