import { Suspense } from "react";

export default function DashboardLayout({children, modal}: {children: React.ReactNode, modal: React.ReactNode}) {
    return (
      <>
        <Suspense>{children}</Suspense>
        <Suspense> {modal}</Suspense>
      </>
    );
}