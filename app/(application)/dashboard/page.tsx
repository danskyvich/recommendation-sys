"use server"
import DashboardPage from "@/app/features/dashboard/dashboard-page";
import { Suspense } from "react";

export default async function Dashboard() {
    return (
      <Suspense>
        <DashboardPage />
      </Suspense>
    );
}