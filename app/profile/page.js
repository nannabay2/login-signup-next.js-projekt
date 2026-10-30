import { redirect } from "next/navigation";
import { getCurrentUser } from "@/lib/auth";
import { signOut } from "@/lib/actions";

export const metadata = {
  title: "Profile",
};

export default async function ProfilePage() {
  const user = await getCurrentUser();

  if (!user) {
    redirect("/login");
  }

  return (
    <main>
      <h1>Profile</h1>
      <p>Email: {user.email}</p>
      <p>User id: {user.sub}</p>
      <form className="auth-form" action={signOut}>
        <button type="submit">Log out</button>
      </form>
    </main>
  );
}
