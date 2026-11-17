import Link from "next/link";
export default function NotFound() {
  return (<main className="py-32 text-center"><h1 className="text-4xl font-bold">404</h1><p className="mt-2">Halaman tidak ditemukan.</p><Link href="/" className="btn mt-6">Kembali ke Home</Link></main>);
}
