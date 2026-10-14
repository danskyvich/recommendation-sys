import AppSidebar from "@/app/components/layout/app-sidebar"
import Sidebar from "@/app/components/layout/app-sidebar"
import { SidebarProvider } from "@/components/ui/sidebar"
import { auth0 } from "../lib/auth/auth0"
import { redirect } from "next/navigation";

export default async function AppLayout({ children }: { children: React.ReactNode }) {

    const session = await auth0.getSession();
    if (!session) redirect("/login");

    return(
        <main className="flex w-screen h-screen bg-gray-900">
            <SidebarProvider
                defaultOpen={true}
                open={true}
            >
                <AppSidebar user={session.user}/>
            </SidebarProvider>
            <div className="flex w-[85%] h-full">

            </div>
        </main>
    )
}