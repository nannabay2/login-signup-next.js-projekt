import { redirect } from "next/navigation";
import { getCurrentUser } from "@/lib/auth";

export const metadata = {
  title: "Members",
};

export default async function MembersPage() {
  const user = await getCurrentUser();

  if (!user) {
    redirect("/login");
  }

  return (
    <main>
      <h1>Members</h1>
      <p>This page is only visible to logged-in users.</p>
    </main>
  );
}
