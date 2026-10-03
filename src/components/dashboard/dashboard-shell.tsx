"use client";

import {
  Copy,
  LayoutDashboard,
  PiggyBank,
  ReceiptText,
  Settings,
  ShieldCheck,
  UserPlus,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import type { ReactNode } from "react";
import { useDemo } from "@/components/providers/demo-provider";
import { Logo } from "@/components/ui/logo";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import { cn, formatCurrency } from "@/lib/utils";

const navigation = [
  { label: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { label: "Transactions", href: "/transactions", icon: ReceiptText },
  { label: "Invest and Earn", href: "/invest", icon: PiggyBank },
  { label: "Referral", href: "/referral", icon: UserPlus },
  { label: "Settings", href: "/profile", icon: Settings },
];

// Reference order for the compact mobile bottom bar.
const mobileOrder = [
  navigation[1],
  navigation[2],
  navigation[0],
  navigation[3],
  navigation[4],
];

export function DashboardShell({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const { balance } = useDemo();
  const referralLink = "https://investinnova.skirypt.xyz/register?referrer=alexmorgan";

  const isActive = (href: string) =>
    href === "/dashboard" ? pathname === href : pathname.startsWith(href);

  return (
    <div className="min-h-screen w-full bg-shell text-foreground">
      {/* ------------------------------------------------------------------
          Top bar
          ------------------------------------------------------------------ */}
      <header className="sticky top-0 z-40 w-full border-b border-line bg-[var(--shell)]/85 backdrop-blur-xl">
        <div className="mx-auto flex h-16 w-[92%] max-w-[1440px] items-center justify-between gap-4 md:h-[72px] md:pl-0">
          {/* Referral pill (desktop) */}
          <div className="flex items-center lg:hidden">
            <Logo href="/dashboard" compact />
          </div>
          <div className="hidden items-center lg:flex">
            <div className="flex items-center gap-2.5 rounded-full border border-line bg-card px-2.5 py-1.5">
              <UserPlus size={15} className="text-primary" />
              <span className="text-sm font-semibold text-muted-foreground">
                Referred
              </span>
              <span className="rounded-full bg-primary/12 px-2.5 py-0.5 text-sm font-extrabold text-primary">
                24
              </span>
              <button
                type="button"
                onClick={() => navigator.clipboard?.writeText(referralLink)}
                className="inline-flex items-center gap-1.5 rounded-full bg-primary px-3.5 py-1.5 text-xs font-extrabold text-white transition hover:bg-primary-strong"
              >
                <Copy size={13} /> Copy Ref Link
              </button>
            </div>
          </div>

          <div className="flex w-full items-center justify-end gap-2.5 lg:w-auto">
            <span className="hidden items-center gap-1.5 rounded-full border border-line px-3 py-1.5 text-xs font-bold text-muted-foreground xl:inline-flex">
              <ShieldCheck size={14} className="text-success" /> KYC Off
            </span>

            <Link
              href="/profile"
              className="flex items-center gap-2.5 rounded-full border border-line bg-card py-1.5 pl-1.5 pr-3 transition-colors hover:border-primary/40"
            >
              <span className="grid size-8 shrink-0 place-items-center rounded-full bg-primary text-[11px] font-extrabold text-white">
                AM
              </span>
              <span className="truncate text-sm font-extrabold text-primary">
                {formatCurrency(balance)}
              </span>
            </Link>

            <ThemeToggle className="size-10" />
          </div>
        </div>
      </header>

      {/* ------------------------------------------------------------------
          Desktop rail
          ------------------------------------------------------------------ */}
      <aside className="fixed bottom-0 left-0 top-16 z-30 hidden w-[88px] flex-col items-center justify-between border-r border-line bg-[var(--shell)] py-6 md:top-[72px] md:flex">
        <div className="grid size-11 place-items-center rounded-xl">
          <Logo href="/dashboard" compact />
        </div>

        <nav className="flex flex-col items-center gap-1.5">
          {navigation.map((item) => {
            const Icon = item.icon;
            const active = isActive(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                aria-label={item.label}
                aria-current={active ? "page" : undefined}
                className="group flex flex-col items-center gap-1"
              >
                <span
                  className={cn(
                    "grid size-11 place-items-center rounded-xl transition-all duration-300",
                    active
                      ? "bg-primary/12 text-primary"
                      : "text-muted-foreground group-hover:bg-surface-3/60 group-hover:text-foreground",
                  )}
                >
                  <Icon size={20} />
                </span>
                <span
                  className={cn(
                    "max-w-[74px] truncate text-[10px] font-bold text-center transition-colors",
                    active ? "text-primary" : "text-muted-foreground",
                  )}
                >
                  {item.label}
                </span>
              </Link>
            );
          })}
        </nav>
      </aside>

      {/* ------------------------------------------------------------------
          Content
          ------------------------------------------------------------------ */}
      <main className="pb-24 md:pb-10 md:pl-[88px]">
        <div className="mx-auto w-[92%] max-w-[1440px] py-7 md:py-9">
          {children}
        </div>
      </main>

      {/* ------------------------------------------------------------------
          Mobile bottom bar
          ------------------------------------------------------------------ */}
      <nav className="fixed inset-x-0 bottom-0 z-40 flex border-t border-line bg-[var(--shell)]/95 pb-[env(safe-area-inset-bottom)] backdrop-blur-xl md:hidden">
        <div className="grid w-full grid-cols-5">
          {mobileOrder.map((item) => {
            const Icon = item.icon;
            const active = isActive(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                aria-label={item.label}
                aria-current={active ? "page" : undefined}
                className="flex flex-col items-center gap-1 py-2.5"
              >
                <span
                  className={cn(
                    "grid size-9 place-items-center rounded-xl transition-colors",
                    active
                      ? "bg-primary/12 text-primary"
                      : "text-muted-foreground",
                  )}
                >
                  <Icon size={19} />
                </span>
                <span
                  className={cn(
                    "max-w-full truncate px-1 text-[10px] font-bold",
                    active ? "text-primary" : "text-muted-foreground",
                  )}
                >
                  {item.label}
                </span>
              </Link>
            );
          })}
        </div>
      </nav>
    </div>
  );
}
