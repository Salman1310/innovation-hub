"use client";

import { useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import { db } from "@/lib/db";
import BottomNav from "./BottomNav";

export default function AppShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();

  // Register service worker for offline + install support.
  useEffect(() => {
    if ("serviceWorker" in navigator && process.env.NODE_ENV === "production") {
      navigator.serviceWorker.register("/sw.js").catch(() => {});
    }
  }, []);

  // First run → onboarding.
  useEffect(() => {
    let cancelled = false;
    db.profiles.get("me").then((p) => {
      if (!cancelled && !p && pathname !== "/onboarding") {
        router.replace("/onboarding");
      }
    });
    return () => {
      cancelled = true;
    };
  }, [pathname, router]);

  const hideNav = pathname === "/onboarding" || pathname.startsWith("/workout");

  return (
    <div className="mx-auto flex min-h-dvh w-full max-w-lg flex-col">
      <main className={`flex-1 ${hideNav ? "" : "pb-24"}`}>{children}</main>
      {!hideNav && <BottomNav />}
    </div>
  );
}
