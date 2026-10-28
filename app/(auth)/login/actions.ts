import { redirect } from "next/navigation";

export const handleSubmit = (connection: string) => {
    const params = new URLSearchParams({
      connection,
      returnTo: "/dashboard",
    });
    redirect(`/auth/login?${params.toString()}`);
  }