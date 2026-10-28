import { Suspense } from "react";
import DashboardFetch from "./dashboard-fetch";

export default function Dashboard() {
    return (
      <Suspense fallback={null}>
        <DashboardFetch/>
      </Suspense>
    );
}