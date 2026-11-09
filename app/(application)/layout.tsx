import { Suspense } from "react";
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