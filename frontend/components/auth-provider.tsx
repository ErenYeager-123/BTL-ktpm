"use client";

import { AuthProvider as InternalAuthProvider } from "@/hooks/use-auth";

export function AuthProvider({ children }: { children: React.ReactNode }) {
  return <InternalAuthProvider>{children}</InternalAuthProvider>;
}