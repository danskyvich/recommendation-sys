"use client"

import DashboardPage from "@/app/components/ui/dashboard-page";
import { auth0 } from "@/lib/auth0";
import { useRouter } from "next/navigation";

export default async function Dashboard() {
    const router = useRouter();
    
    const session = auth0.getSession();
    if (!session) {
        router.push("/login");
    };
    
    return(
        <DashboardPage/>
    )
}