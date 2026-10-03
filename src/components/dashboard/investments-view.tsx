"use client";

import { History, PiggyBank, Send, TrendingUp } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { InvestmentCard } from "@/components/dashboard/investment-card";
import { useDemo } from "@/components/providers/demo-provider";
import { cn, formatCurrency } from "@/lib/utils";

export function InvestmentsView() {
  const { investments, investedBalance, profitBalance } = useDemo();
  const [tab, setTab] = useState<"ongoing" | "completed">("ongoing");

  const ongoing = investments.filter((item) => item.status === "ongoing");
  const completed = investments.filter((item) => item.status === "completed");
  const filtered = tab === "ongoing" ? ongoing : completed;
  const withdrawable = profitBalance * 0.72;

  const summary = [
    {
      label: "Investment",
      value: investedBalance,
      icon: PiggyBank,
      iconClass: "text-primary",
      bloom: "var(--primary)",
      action: (
        <Link
          href="/invest/new"
          className="inline-flex w-full items-center justify-center rounded-xl border border-line px-4 py-2.5 text-sm font-bold transition-all duration-300 hover:-translate-y-0.5 hover:border-primary/45 hover:text-primary"
        >
          Create New Investment
        </Link>
      ),
    },
    {
      label: "Profit",
      value: profitBalance,
      icon: TrendingUp,
      iconClass: "text-success",
      bloom: "#22c55e",
      action: (
        <button
          type="button"
          className="inline-flex w-full items-center justify-center gap-2 rounded-xl border border-line px-4 py-2.5 text-sm font-bold transition-all duration-300 hover:-translate-y-0.5 hover:border-primary/45 hover:text-primary"
        >
          <History size={16} /> Profit History
        </button>
      ),
    },
    {
      label: "Withdrawable",
      value: withdrawable,
      icon: Send,
      iconClass: "text-sky-400",
      bloom: "#38bdf8",
      action: (
        <Link
          href="/withdrawal"
          className="inline-flex w-full items-center justify-center rounded-xl border border-line px-4 py-2.5 text-sm font-bold transition-all duration-300 hover:-translate-y-0.5 hover:border-primary/45 hover:text-primary"
        >
          Withdraw to Main Balance
        </Link>
      ),
    },
  ];

  return (
    <div className="flex w-full flex-col gap-7">
      <h1 className="text-2xl font-extrabold tracking-[-0.03em] sm:text-3xl">
        Invest and Earn
      </h1>

      <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3">
        {summary.map((item) => {
          const Icon = item.icon;
          return (
            <article
              key={item.label}
              className="ui-card relative flex flex-col overflow-hidden rounded-2xl p-6"
            >
              <div
                aria-hidden
                className="bloom -right-12 -top-12 size-40 opacity-20"
                style={{ background: item.bloom }}
              />
              <div className="relative flex items-center gap-2 text-xs font-bold uppercase tracking-[0.14em] text-muted-foreground">
                <Icon size={15} className={item.iconClass} />
                {item.label}
              </div>
              <p className="relative mt-4 text-3xl font-extrabold tracking-[-0.04em]">
                {formatCurrency(item.value)}
              </p>
              <p className="relative mt-1 text-sm text-muted-foreground">
                United States Dollar
              </p>
              <div className="relative mt-5">{item.action}</div>
            </article>
          );
        })}
      </div>

      <section className="flex flex-col gap-5">
        <div
          aria-hidden
          className="h-px w-full bg-[var(--line-strong)]"
        />

        <div
          role="tablist"
          aria-label="Investment status"
          className="flex flex-wrap items-center gap-2"
        >
          {(
            [
              ["ongoing", "Ongoing", ongoing.length],
              ["completed", "Completed", completed.length],
            ] as const
          ).map(([key, label, count]) => {
            const active = tab === key;
            return (
              <button
                key={key}
                type="button"
                role="tab"
                aria-selected={active}
                onClick={() => setTab(key)}
                className={cn(
                  "rounded-xl border px-4 py-2.5 text-sm font-bold transition-all duration-300",
                  active
                    ? "border-primary bg-primary text-white shadow-[0_10px_26px_rgba(248,129,45,0.28)]"
                    : "border-line text-muted-foreground hover:border-primary/45 hover:text-primary",
                )}
              >
                {label} ({count})
              </button>
            );
          })}
        </div>

        {filtered.length > 0 ? (
          <div className="grid w-full grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-3">
            {filtered.map((investment) => (
              <InvestmentCard key={investment.id} investment={investment} />
            ))}
          </div>
        ) : (
          <div className="ui-card flex flex-col items-center gap-2 rounded-2xl px-6 py-14 text-center">
            <p className="text-sm font-bold">No {tab} investments</p>
            <p className="text-sm text-muted-foreground">
              Investments you start will appear here.
            </p>
          </div>
        )}
      </section>
    </div>
  );
}
