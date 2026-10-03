"use client";

import {
  ArrowLeftRight,
  ArrowUpRight,
  CircleDollarSign,
  Send,
  TrendingUp,
  Wallet,
  Zap,
} from "lucide-react";
import Link from "next/link";
import { useDemo } from "@/components/providers/demo-provider";
import { ProfitChart } from "@/components/dashboard/profit-chart";
import { TransactionList } from "@/components/dashboard/transaction-list";
import { formatCurrency } from "@/lib/utils";

const actions = [
  { label: "Make Deposit", href: "/deposit", icon: CircleDollarSign },
  { label: "Internal Transfer", href: "/transactions", icon: ArrowLeftRight },
  { label: "Withdraw Money", href: "/withdrawal", icon: Send },
];

export function DashboardOverview() {
  const { balance, todayProfit, transactions } = useDemo();

  return (
    <div className="flex flex-col gap-6">
      {/* Stat cards */}
      <div className="grid grid-cols-1 gap-5 lg:grid-cols-3">
        <article className="ui-card relative flex flex-col overflow-hidden rounded-2xl p-6">
          <div
            aria-hidden
            className="bloom -right-12 -top-12 size-40 opacity-25"
            style={{ background: "var(--primary)" }}
          />
          <div className="relative flex items-center justify-between">
            <span className="flex items-center gap-2 text-xs font-bold uppercase tracking-[0.14em] text-muted-foreground">
              <Wallet size={15} className="text-primary" />
              Total Balance
            </span>
            <Link
              href="/deposit"
              aria-label="Deposit funds"
              className="grid size-8 place-items-center rounded-lg border border-line text-muted-foreground transition-colors hover:border-primary/40 hover:text-primary"
            >
              <ArrowUpRight size={15} />
            </Link>
          </div>
          <p className="relative mt-5 text-3xl font-extrabold tracking-[-0.04em] sm:text-4xl">
            {formatCurrency(balance)}
          </p>
          <p className="relative mt-1.5 text-sm text-muted-foreground">
            United States Dollar
          </p>
          <div className="relative mt-auto flex items-center justify-between gap-3 border-t border-line pt-4 text-xs text-muted-foreground">
            <span>Available for withdrawal</span>
            <span className="font-bold text-foreground">100%</span>
          </div>
        </article>

        <article className="ui-card relative flex flex-col overflow-hidden rounded-2xl p-6">
          <div
            aria-hidden
            className="bloom -right-12 -top-12 size-40 opacity-20"
            style={{ background: "#22c55e" }}
          />
          <div className="relative flex items-center justify-between">
            <span className="flex items-center gap-2 text-xs font-bold uppercase tracking-[0.14em] text-muted-foreground">
              <TrendingUp size={15} className="text-success" />
              Today&apos;s Profit
            </span>
            <span className="inline-flex items-center gap-1 rounded-full bg-success/12 px-2 py-0.5 text-[11px] font-extrabold text-success">
              +12.8%
            </span>
          </div>
          <p className="relative mt-5 text-3xl font-extrabold tracking-[-0.04em] sm:text-4xl">
            {formatCurrency(todayProfit)}
          </p>
          <p className="relative mt-1.5 text-sm text-muted-foreground">
            Credited today
          </p>
          <div className="relative mt-auto flex items-center justify-between gap-3 border-t border-line pt-4 text-xs text-muted-foreground">
            <span>Yesterday</span>
            <span className="font-bold text-foreground">
              {formatCurrency(todayProfit * 0.89)}
            </span>
          </div>
        </article>

        {/* Quick actions */}
        <article className="ui-card flex flex-col rounded-2xl p-6">
          <p className="flex items-center gap-2 text-xs font-bold uppercase tracking-[0.14em] text-muted-foreground">
            <Zap size={15} className="text-primary" />
            Take Action
          </p>
          <div className="mt-4 flex flex-col gap-2.5">
            {actions.map((action) => {
              const Icon = action.icon;
              return (
                <Link
                  key={action.href}
                  href={action.href}
                  className="group flex items-center justify-between rounded-xl border border-line px-4 py-3 text-sm font-bold transition-all duration-300 hover:-translate-y-0.5 hover:border-primary/40 hover:text-primary"
                >
                  {action.label}
                  <Icon
                    size={16}
                    className="text-primary transition-transform duration-300 group-hover:translate-x-0.5"
                  />
                </Link>
              );
            })}
          </div>
        </article>
      </div>

      {/* Chart + transactions */}
      <div className="grid grid-cols-1 gap-5 lg:grid-cols-[1.6fr_1fr]">
        <section className="ui-card rounded-2xl p-5 sm:p-6">
          <ProfitChart />
        </section>
        <section className="ui-card rounded-2xl p-5 sm:p-6">
          <h2 className="mb-5 text-base font-extrabold tracking-tight">
            Recent Transactions
          </h2>
          <TransactionList transactions={transactions} limit={5} />
        </section>
      </div>
    </div>
  );
}
