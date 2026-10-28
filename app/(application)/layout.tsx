import AppSidebar from "@/app/components/layout/app-sidebar"
import { SidebarProvider } from "@/components/ui/sidebar"
import { redirect } from "next/navigation";
import { Suspense } from "react";
import Header from "../components/layout/header";
import { auth0 } from "../lib/auth/auth0";
import { cacheLife, cacheTag } from "next/cache";
import SessionShell from "./session-shell";

//layout children
export default function AppLayout({children}: {children: React.ReactNode}) {
    return (
      <main className="flex w-full h-dvh overflow-hidden bg-black/45">
        <Suspense fallback={null}>
          <SessionShell>
            {children}
          </SessionShell>
        </Suspense>
      </main>
    );
}