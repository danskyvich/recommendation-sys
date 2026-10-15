import AppSidebar from "@/app/components/layout/app-sidebar"
import { SidebarProvider } from "@/components/ui/sidebar"
import { auth0 } from "../lib/auth/auth0"
import { redirect } from "next/navigation";
import { ReactNode } from "react";
import Header from "../components/layout/header";

export default async function AppLayout({children}: {children: React.ReactNode}) {

    const session = await auth0.getSession();
    if (!session) redirect("/login");

    return (
      <main className="flex w-screen h-screen bg-gray-900">
        <SidebarProvider defaultOpen className="w-fit">
          <AppSidebar user={session.user} />
        </SidebarProvider>
        <div className="flex flex-col w-full h-full">
          <Header />
          <div className="flex w-full h-[95%]">{children}</div>
        </div>
      </main>
    );
}