import { ArrowUpRight, CalendarDays, TrendingUp } from "lucide-react";
import Link from "next/link";
import type { DemoInvestment } from "@/lib/data";
import { cn, formatCurrency, formatDate } from "@/lib/utils";

export function InvestmentCard({ investment }: { investment: DemoInvestment }) {
  const ongoing = investment.status === "ongoing";
  const daily = investment.earned / 7;

  return (
    <article className="ui-card ui-card-hover group flex h-full w-full flex-col gap-5 rounded-2xl p-5">
      <header className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <p className="text-[11px] font-bold uppercase tracking-[0.14em] text-muted-foreground">
            {investment.plan} plan
          </p>
          <h3 className="mt-1 truncate text-lg font-extrabold tracking-tight">
            {formatCurrency(investment.amount)}
          </h3>
        </div>
        <span
          className={cn(
            "shrink-0 rounded-full px-2.5 py-1 text-[10px] font-extrabold uppercase tracking-[0.1em]",
            ongoing
              ? "bg-success/12 text-success"
              : "bg-surface-3 text-muted-foreground",
          )}
        >
          {investment.status}
        </span>
      </header>

      <div
        className="rounded-xl bg-primary/[0.08] p-4 ring-1 ring-inset ring-primary/20"
        role="group"
        aria-label="Investment performance"
      >
        <div className="flex items-center justify-between gap-3">
          <span className="flex items-center gap-1.5 text-xs font-semibold text-muted-foreground">
            <TrendingUp size={13} className="text-primary" />
            Profit received
          </span>
          <span className="text-sm font-extrabold text-primary">
            {formatCurrency(investment.earned)}
          </span>
        </div>
        <div
          className="mt-3 h-1.5 w-full overflow-hidden rounded-full bg-surface-3"
          role="progressbar"
          aria-valuenow={investment.progress}
          aria-valuemin={0}
          aria-valuemax={100}
          aria-label="Investment progress"
        >
          <div
            className="h-full rounded-full bg-primary transition-[width] duration-700 ease-out"
            style={{ width: `${investment.progress}%` }}
          />
        </div>
        <p className="mt-2 text-[11px] text-muted-foreground">
          {formatCurrency(daily)} daily · {investment.progress}% complete
        </p>
      </div>

      <dl className="flex flex-col gap-2 text-xs">
        <div className="flex items-center justify-between gap-3">
          <dt className="text-muted-foreground">Amount invested</dt>
          <dd className="font-bold">{formatCurrency(investment.amount)}</dd>
        </div>
        <div className="flex items-center justify-between gap-3">
          <dt className="flex items-center gap-1.5 text-muted-foreground">
            <CalendarDays size={12} className="text-primary" />
            Started
          </dt>
          <dd className="font-bold">{formatDate(investment.startedAt)}</dd>
        </div>
      </dl>

      <Link
        href={`/invest/${investment.id}`}
        className="mt-auto inline-flex h-10 items-center justify-center gap-1.5 rounded-xl border border-line text-sm font-bold transition-all duration-300 hover:border-primary/45 hover:text-primary"
      >
        View Details
        <ArrowUpRight
          size={15}
          className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
        />
      </Link>
    </article>
  );
}
