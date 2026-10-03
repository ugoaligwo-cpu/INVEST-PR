"use client";

import { ArrowLeft, CalendarDays, TrendingUp } from "lucide-react";
import Link from "next/link";
import { useDemo } from "@/components/providers/demo-provider";
import { cn, formatCurrency, formatDate } from "@/lib/utils";

export function InvestmentDetailView({ id }: { id: string }) {
  const { investments } = useDemo();
  const investment =
    investments.find((item) => item.id === id) ?? investments[0];
  if (!investment) return null;

  const daily = investment.earned / 7;
  const expected = investment.amount * 0.15;
  const ongoing = investment.status === "ongoing";
  const daysLeft = Math.max(0, 7 - Math.round((investment.progress / 100) * 7));

  const rows: Array<[string, string]> = [
    ["Amount Invested", formatCurrency(investment.amount)],
    ["Daily Profit", formatCurrency(daily)],
    ["Profit Received", formatCurrency(investment.earned)],
    ["Expected Total Profit", formatCurrency(expected)],
    ["Started", formatDate(investment.startedAt)],
    ["Ends", formatDate(investment.endsAt)],
    ["Total Duration", "7 Day(s)"],
    ["Duration Remaining", `${daysLeft} Day(s) Left`],
  ];

  return (
    <div className="flex w-full flex-col gap-6">
      <Link
        href="/invest"
        className="inline-flex w-fit items-center gap-2 text-sm font-bold text-primary transition-opacity hover:opacity-80"
      >
        <ArrowLeft size={16} /> Go Back
      </Link>

      <header className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <p className="text-[11px] font-bold uppercase tracking-[0.14em] text-muted-foreground">
            Investment detail
          </p>
          <h1 className="mt-1 text-2xl font-extrabold tracking-[-0.03em] sm:text-3xl">
            {investment.plan} Plan
          </h1>
        </div>
        <span
          className={cn(
            "rounded-full px-3 py-1.5 text-[11px] font-extrabold uppercase tracking-[0.1em]",
            ongoing
              ? "bg-success/12 text-success"
              : "bg-surface-3 text-muted-foreground",
          )}
        >
          {investment.status}
        </span>
      </header>

      <div className="grid grid-cols-1 gap-5 lg:grid-cols-[1.4fr_1fr]">
        <section className="ui-card rounded-2xl p-6">
          <h2 className="text-base font-extrabold tracking-tight">Summary</h2>
          <dl className="mt-4 flex flex-col">
            {rows.map(([label, value]) => (
              <div
                key={label}
                className="flex items-center justify-between gap-4 border-b border-line py-3 last:border-b-0"
              >
                <dt className="text-sm text-muted-foreground">{label}</dt>
                <dd className="text-sm font-bold">{value}</dd>
              </div>
            ))}
          </dl>
        </section>

        <div className="flex flex-col gap-5">
          <section className="ui-card rounded-2xl p-6">
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-[0.14em] text-muted-foreground">
              <TrendingUp size={15} className="text-primary" />
              Profit received
            </div>
            <p className="mt-3 text-3xl font-extrabold tracking-[-0.04em] text-primary">
              {formatCurrency(investment.earned)}
            </p>
            <div
              className="mt-4 h-2 w-full overflow-hidden rounded-full bg-surface-3"
              role="progressbar"
              aria-valuenow={investment.progress}
              aria-valuemin={0}
              aria-valuemax={100}
              aria-label="Investment progress"
            >
              <div
                className="h-full rounded-full bg-primary"
                style={{ width: `${investment.progress}%` }}
              />
            </div>
            <p className="mt-2 text-xs text-muted-foreground">
              {investment.progress}% of the plan duration completed
            </p>
          </section>

          <section className="ui-card rounded-2xl p-6">
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-[0.14em] text-muted-foreground">
              <CalendarDays size={15} className="text-primary" />
              Profits history
            </div>
            <div className="mt-4 flex flex-col gap-2.5">
              <div className="flex items-center justify-between gap-3 rounded-xl border border-line px-4 py-3">
                <span className="text-sm font-bold text-primary">
                  Daily Profit
                </span>
                <span className="text-sm font-extrabold">
                  {formatCurrency(daily)}
                </span>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
