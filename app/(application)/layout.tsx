import AppSidebar from "@/app/components/layout/app-sidebar"
import { SidebarProvider } from "@/components/ui/sidebar"
import { redirect } from "next/navigation";
import { Suspense } from "react";
import Header from "../components/layout/header";
import { auth0 } from "../lib/auth/auth0";
import { cacheLife, cacheTag } from "next/cache";

export default async function AppLayout({children}: {children: React.ReactNode}) {
    const session = await auth0.getSession();

    return (
      <main className="flex w-full h-dvh overflow-hidden bg-black/45">
        <Suspense>
          <Header />
          <div className="flex w-full h-full min-h-0">
            <SidebarProvider defaultOpen className="w-fit h-full min-h-0">
              <AppSidebar user={session?.user} />
            </SidebarProvider>
            <div className="flex flex-1 min-w-0 h-full">{children}</div>
          </div>
        </Suspense>
      </main>
    );
}