"use client"

import { ThemeProvider } from "next-themes";
import { ReactNode } from "react";

export default function Provider<T>({ children }: {children: ReactNode}) {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="dark"
      forcedTheme="dark"
      disableTransitionOnChange
    >
      {children}
    </ThemeProvider>
  );
}
