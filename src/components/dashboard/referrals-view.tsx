"use client";

import { Copy, Trophy, UserCheck } from "lucide-react";
import { useState } from "react";
import { useDemo } from "@/components/providers/demo-provider";
import { formatCurrency } from "@/lib/utils";

export function ReferralsView() {
  const { transactions } = useDemo();
  const [copied, setCopied] = useState(false);

  const referralTransactions = transactions.filter(
    (transaction) => transaction.type === "referral",
  );
  const total =
    referralTransactions.reduce(
      (sum, transaction) => sum + transaction.amount,
      1860,
    ) + 75;
  const today = 75;
  const count = 84;
  const link = "https://investinnova.skirypt.xyz/register?referrer=alexmorgan";

  const copy = async () => {
    await navigator.clipboard?.writeText(link);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1400);
  };

  const steps = [
    {
      step: "01",
      icon: UserCheck,
      title: "Share the Love",
      description:
        "Sign up and invite your friends with your personal referral link.",
    },
    {
      step: "02",
      icon: Trophy,
      title: "Get Rewarded",
      description:
        "You get rewarded each time a referred friend purchases a plan.",
    },
  ];

  return (
    <div className="flex w-full flex-col gap-7">
      <h1 className="text-2xl font-extrabold tracking-[-0.03em] sm:text-3xl">
        Referral
      </h1>

      <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
        <article className="ui-card relative flex flex-col overflow-hidden rounded-2xl p-6">
          <div
            aria-hidden
            className="bloom -right-12 -top-12 size-40 opacity-25"
            style={{ background: "var(--primary)" }}
          />
          <div className="relative flex items-center gap-2 text-xs font-bold uppercase tracking-[0.14em] text-muted-foreground">
            <Trophy size={15} className="text-primary" />
            Referral Rewards
          </div>
          <div className="relative mt-5 flex items-end gap-5">
            <div>
              <p className="text-3xl font-extrabold tracking-[-0.04em]">
                {formatCurrency(total)}
              </p>
              <p className="mt-1 text-sm text-muted-foreground">
                Total reward
              </p>
            </div>
            <div aria-hidden className="mb-1 h-10 w-px bg-[var(--line-strong)]" />
            <div>
              <p className="text-2xl font-extrabold tracking-[-0.04em] text-primary">
                {formatCurrency(today)}
              </p>
              <p className="mt-1 text-sm text-muted-foreground">
                Today&apos;s reward
              </p>
            </div>
          </div>
        </article>

        <article className="ui-card relative flex flex-col overflow-hidden rounded-2xl p-6">
          <div
            aria-hidden
            className="bloom -right-12 -top-12 size-40 opacity-20"
            style={{ background: "#38bdf8" }}
          />
          <div className="relative flex items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-[0.14em] text-muted-foreground">
                <UserCheck size={15} className="text-sky-400" />
                Referrals
              </div>
              <p className="mt-4 text-3xl font-extrabold tracking-[-0.04em]">
                {count}
              </p>
              <p className="mt-1 text-sm text-muted-foreground">
                People you referred
              </p>
            </div>
            <button
              type="button"
              onClick={copy}
              className="inline-flex h-10 shrink-0 items-center gap-2 rounded-xl bg-primary px-4 text-sm font-bold text-white transition-all duration-300 hover:-translate-y-0.5 hover:bg-primary-strong"
            >
              {copied ? "Copied" : "Copy Link"}
              <Copy size={15} />
            </button>
          </div>
        </article>
      </div>

      <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
        {steps.map((step) => {
          const Icon = step.icon;
          return (
            <article
              key={step.step}
              className="ui-card ui-card-hover group flex items-center gap-5 rounded-2xl p-6"
            >
              <span className="text-5xl font-extrabold leading-none tracking-tight text-primary/25 transition-colors duration-300 group-hover:text-primary/45">
                {step.step}
              </span>
              <div className="min-w-0">
                <h2 className="flex items-center gap-2 text-lg font-extrabold tracking-tight">
                  <Icon size={18} className="text-primary" />
                  {step.title}
                </h2>
                <p className="mt-1.5 text-sm leading-6 text-muted-foreground">
                  {step.description}
                </p>
              </div>
            </article>
          );
        })}
      </div>
    </div>
  );
}
