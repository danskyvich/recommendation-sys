"use server"

import LoginPage from "@/app/components/ui/login-page";
import { auth0 } from "@/app/lib/auth/auth0";
import { redirect } from "next/navigation";

export default async function Login() {

  const session = await auth0.getSession();
  if (session) {
    redirect("/dashboard")
  }

  return (
    <main className="flex flex-col w-full h-full">
      <LoginPage/>
    </main>
  );
}
