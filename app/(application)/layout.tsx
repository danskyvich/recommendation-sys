import AppSidebar from "@/app/components/layout/app-sidebar"
import { SidebarProvider } from "@/components/ui/sidebar"
import { redirect } from "next/navigation";
import { Suspense } from "react";
import Header from "../components/layout/header";
import { getUser } from "../lib/auth/get-user";

export default async function AppLayout({children}: {children: React.ReactNode}) {

    const { session } = await getUser();
    if (!session) redirect("/login");

    return (
      <main className="flex w-screen h-screen bg-black/45">
        <Suspense>
          <SidebarProvider defaultOpen className="w-fit">
            <AppSidebar user={session.user} />
          </SidebarProvider>
          <div className="flex flex-col w-full h-full">
            <Header />
            <div className="flex w-full h-[95%]">{children}</div>
          </div>
        </Suspense>
      </main>
    );
}