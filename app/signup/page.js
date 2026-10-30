import { redirect } from "next/navigation";
import { getCurrentUser } from "@/lib/auth";
import { createClient } from "@/lib/supabase/server";

async function signUp(formData) {
  "use server";

  const email = formData.get("email");
  const password = formData.get("password");

  const supabase = await createClient();
  const { error } = await supabase.auth.signUp({ email, password });

  if (error) {
    redirect("/signup?error=true");
  }

  redirect("/profile");
}
export const metadata = {
  title: "Sign up",
};

export default async function SignupPage({ searchParams }) {
  const user = await getCurrentUser();

  if (user) {
    redirect("/profile");
  }

  const params = await searchParams;

  return (
    <main>
      <h1>Sign up</h1>
      {params.error && <p role="alert">Der opstod en fejl. Prøv igen.</p>}
      <form className="auth-form" action={signUp}>
        <label htmlFor="email">E-mail</label>
        <input
          id="email"
          type="email"
          name="email"
          placeholder="Indtast din e-mail"
        />
        <label htmlFor="password">Adgangskode</label>
        <input
          id="password"
          type="password"
          name="password"
          placeholder="minimum 6 karaktere"
          autoComplete="new-password"
          minLength={6}
          required
        />
        <button type="submit">Opret konto</button>
      </form>
    </main>
  );
}
