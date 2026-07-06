"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import clsx from "clsx";

const TABS = [
  { href: "/", label: "Home", icon: "▣" },
  { href: "/history", label: "History", icon: "▤" },
  { href: "/workout", label: "Train", icon: "＋", primary: true },
  { href: "/exercises", label: "Library", icon: "☰" },
  { href: "/nutrition", label: "Food", icon: "◐" },
] as const;

export default function BottomNav() {
  const pathname = usePathname();
  return (
    <nav
      className="fixed inset-x-0 bottom-0 z-40 mx-auto max-w-lg border-t px-2 pb-[max(env(safe-area-inset-bottom),8px)] pt-2"
      style={{ background: "rgba(14,17,22,0.92)", backdropFilter: "blur(14px)", borderColor: "var(--border)" }}
    >
      <div className="flex items-end justify-around">
        {TABS.map((t) => {
          const active = t.href === "/" ? pathname === "/" : pathname.startsWith(t.href);
          if ("primary" in t && t.primary) {
            return (
              <Link key={t.href} href={t.href} className="flex flex-col items-center gap-1 -mt-6">
                <span className="accent-glow flex h-14 w-14 items-center justify-center rounded-full bg-accent text-2xl font-bold text-black">
                  {t.icon}
                </span>
                <span className="text-[10px] font-medium text-ink-2">{t.label}</span>
              </Link>
            );
          }
          return (
            <Link
              key={t.href}
              href={t.href}
              className={clsx(
                "flex w-14 flex-col items-center gap-1 rounded-lg py-1 text-lg",
                active ? "text-accent" : "text-ink-3"
              )}
            >
              <span aria-hidden>{t.icon}</span>
              <span className="text-[10px] font-medium">{t.label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
