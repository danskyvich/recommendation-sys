"use client";

import { Progress } from "@/components/ui/progress";
import { useEffect } from "react";

export default function OnboardingLayout({
  children,
}: {
  step: number;
  children: React.ReactNode;
}) {

    useEffect(() => {
        document.title = "Pick your genres | Film.io"
    })
  return (
    <main className="flex flex-col w-full h-dvh items-center justify-center py-15">
      {/* Card */}
      <section className="flex flex-col w-full h-fit min-w-0 max-w-xl bg-slate-800/45 rounded-2xl shadow-xl">
        {/* Header */}
        <section className="flex flex-col w-full h-fit p-5 gap-5">
          <Progress
            className="border rounded-lg border-white/25 shrink-0"
            value={33}
          />
        </section>

        <section className="flex flex-1 min-h-0 flex-col w-full h-full">
          {children}
        </section>
      </section>
    </main>
  );
}
