import DashboardPage from "@/app/components/ui/dashboard-page";
import { auth0 } from "@/app/lib/auth/auth0";
import { redirect } from "next/navigation";

export default async function Dashboard() {
    return(
        <DashboardPage/>
    )
}