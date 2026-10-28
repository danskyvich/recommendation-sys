import React, { Suspense } from "react";

export default function DashboardIdLayout({children}: {children: React.ReactNode}) {
    return (
      <>
        <Suspense>{children}</Suspense>
      </>
    );
}