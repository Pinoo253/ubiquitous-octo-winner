import FeedbackForm from "./form";
export const metadata = { title: "Saran & Kritik — ADB CREATIVE TEAM" };
export default function Page() {
  return (
    <main className="mx-auto max-w-xl px-4 py-16">
      <h1 className="mb-3 text-3xl font-bold">Saran &amp; Kritik</h1>
      <p className="mb-8">Setiap saran dan kritik sangat berarti bagi perkembangan ADB CREATIVE TEAM. Sampaikan pendapat, ide, dan masukan kamu agar kami bisa terus berkembang menjadi lebih baik.</p>
      <FeedbackForm />
    </main>
  );
}
