import { redirect } from "next/navigation";
import { createClient } from "@/utils/supabase/server";
async function login(fd: FormData) {
  "use server";
  const supabase = await createClient();
  const { error } = await supabase.auth.signInWithPassword({ email: String(fd.get("email")), password: String(fd.get("password")) });
  redirect(error ? "/login?error=1" : "/admin");
}
export default async function Login({ searchParams }: { searchParams: Promise<{ error?: string }> }) {
  const { error } = await searchParams;
  return (
    <main className="mx-auto max-w-sm px-4 py-24">
      <form action={login} className="card space-y-4">
        <h1 className="text-xl font-bold">Login Admin</h1>
        <input name="email" type="email" required placeholder="Email" className="input" />
        <input name="password" type="password" required placeholder="Password" className="input" />
        <button className="btn">Masuk</button>
        {error && <p className="text-red-600">Email atau password salah.</p>}
      </form>
    </main>
  );
}
