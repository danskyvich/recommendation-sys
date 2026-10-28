import { SidebarProvider } from "@/components/ui/sidebar";
import Header from "../components/layout/header";
import AppSidebar from "../components/layout/app-sidebar";
import { auth0 } from "../lib/auth/auth0";
import { connection } from "next/server";

// layout of the web application
export default async function SessionShell({children}: {children: React.ReactNode}) {
    await connection();
    const session = await auth0.getSession();
    return (
      <>
        <Header />
        <div className="flex w-full h-full min-h-0">
          <SidebarProvider defaultOpen className="w-fit h-full min-h-0">
            <AppSidebar user={session?.user} />
          </SidebarProvider>
          <div className="flex flex-1 min-w-0 h-full">{children}</div>
        </div>
      </>
    );
}