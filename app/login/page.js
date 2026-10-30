import Link from "next/link";
import { redirect } from "next/navigation";
import { getCurrentUser } from "@/lib/auth";
import { createClient } from "@/lib/supabase/server";

export const metadata = {
  title: "Log in",
};

async function logIn(formData) {
  "use server";

  const email = formData.get("email");
  const password = formData.get("password");

  const supabase = await createClient();
  const { error } = await supabase.auth.signInWithPassword({ email, password });

  if (error) {
    redirect("/login?error=true");
  }

  redirect("/profile");
}

export default async function LoginPage({ searchParams }) {
  const user = await getCurrentUser();

  if (user) {
    redirect("/profile");
  }

  const params = await searchParams;

  return (
    <main>
      <h1>Log in</h1>
      {params.error && (
        <p className="form-error" role="alert">
          Wrong email or password.
        </p>
      )}
      <form className="auth-form" action={logIn}>
        <label htmlFor="email">E-mail</label>
        <input
          id="email"
          type="email"
          name="email"
          placeholder="Your email"
          autoComplete="email"
          required
        />
        <label htmlFor="password">Password</label>
        <input
          id="password"
          type="password"
          name="password"
          placeholder="Your password"
          autoComplete="current-password"
          required
        />
        <button type="submit">Log in</button>
      </form>
      <p>
        No account yet? <Link href="/signup">Sign up</Link>
      </p>
    </main>
  );
}
