"use client";

import { Calculator, Check, Coins, TrendingUp, X } from "lucide-react";
import Link from "next/link";
import { useMemo, useState } from "react";
import { PlanCard } from "@/components/marketing/plan-card";
import { useDemo } from "@/components/providers/demo-provider";
import { plans } from "@/lib/data";
import { siteConfig } from "@/config/site";
import { cn, formatCurrency } from "@/lib/utils";

export function NewInvestmentView({
  initialPlanId,
  initialAmount,
}: {
  initialPlanId?: string;
  initialAmount?: number;
}) {
  const { balance, createInvestment } = useDemo();
  const firstPlan = plans.find((item) => item.id === initialPlanId) ?? plans[0];
  const [planId, setPlanId] = useState(firstPlan.id);
  const [amount, setAmount] = useState(
    Math.min(
      Math.max(initialAmount || firstPlan.min, firstPlan.min),
      firstPlan.max,
    ),
  );
  const [dialogOpen, setDialogOpen] = useState(false);
  const [status, setStatus] = useState("");

  const plan = plans.find((item) => item.id === planId) ?? plans[0];

  const projection = useMemo(
    () => amount * (plan.projectedReturn / 100),
    [amount, plan.projectedReturn],
  );
  const rangeProgress =
    ((amount - plan.min) / Math.max(plan.max - plan.min, 1)) * 100;
  const valid = amount >= plan.min && amount <= plan.max && amount <= balance;

  const choosePlan = (id: string) => {
    const next = plans.find((item) => item.id === id);
    setPlanId(id);
    if (next) {
      setAmount((current) => Math.min(Math.max(current, next.min), next.max));
    }
  };

  const confirm = () => {
    createInvestment(plan.id, amount);
    setDialogOpen(false);
    setStatus("Your investment has started");
    window.setTimeout(() => setStatus(""), 3000);
  };

  return (
    <div className="flex w-full flex-col gap-7">
      <h1 className="text-2xl font-extrabold tracking-[-0.03em] sm:text-3xl">
        Choose An Investment Plan
      </h1>

      {status ? (
        <p
          role="status"
          className="rounded-xl border border-success/30 bg-success/10 px-4 py-3 text-sm font-bold text-success"
        >
          {status}
        </p>
      ) : null}

      <div className="ui-card grid w-full grid-cols-1 overflow-hidden rounded-2xl lg:grid-cols-[1.45fr_1fr]">
        <div className="flex w-full flex-col gap-7 p-6 sm:p-7">
          <div className="flex items-center gap-3.5">
            <span className="grid size-11 shrink-0 place-items-center rounded-xl bg-primary/12 text-primary">
              <Calculator size={20} />
            </span>
            <div>
              <h2 className="text-lg font-extrabold tracking-tight">
                Investment Calculator
              </h2>
              <p className="text-xs text-muted-foreground">
                Estimate your potential returns
              </p>
            </div>
          </div>

          <fieldset className="flex flex-col gap-2.5">
            <legend className="text-xs font-bold uppercase tracking-[0.14em] text-muted-foreground">
              Choose Plan
            </legend>
            <div className="flex flex-wrap gap-2">
              {plans.map((item) => {
                const isActive = plan.id === item.id;
                return (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => choosePlan(item.id)}
                    aria-pressed={isActive}
                    className={cn(
                      "inline-flex items-center gap-1.5 rounded-xl border px-4 py-2.5 text-sm font-bold transition-all duration-300",
                      isActive
                        ? "border-primary bg-primary text-white shadow-[0_10px_26px_rgba(248,129,45,0.3)]"
                        : "border-line text-muted-foreground hover:-translate-y-0.5 hover:border-primary/45 hover:text-primary",
                    )}
                  >
                    {item.name}
                    {isActive ? <Check size={14} /> : null}
                  </button>
                );
              })}
            </div>
          </fieldset>

          <div className="flex flex-col gap-2">
            <label
              htmlFor="invest-amount"
              className="text-xs font-bold uppercase tracking-[0.14em] text-muted-foreground"
            >
              Investment Amount ({siteConfig.currencyCode})
            </label>
            <div className="relative">
              <span className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-sm font-bold text-muted-foreground">
                {siteConfig.currencySymbol}
              </span>
              <input
                id="invest-amount"
                type="number"
                inputMode="numeric"
                value={amount}
                min={plan.min}
                max={plan.max}
                onChange={(event) => {
                  const next = Number(event.target.value);
                  setAmount(
                    Number.isFinite(next)
                      ? Math.min(Math.max(next, plan.min), plan.max)
                      : plan.min,
                  );
                }}
                className="h-12 w-full rounded-xl border border-line bg-surface-2/60 pl-9 pr-4 text-[15px] font-bold outline-none transition-colors focus:border-primary"
              />
            </div>
            {amount < plan.min ? (
              <p className="text-xs font-semibold text-danger">
                Minimum: {siteConfig.currencySymbol}
                {plan.min}
              </p>
            ) : null}
            {amount > plan.max ? (
              <p className="text-xs font-semibold text-danger">
                Maximum: {siteConfig.currencySymbol}
                {plan.max}
              </p>
            ) : null}
            {amount > balance ? (
              <p className="text-xs font-semibold text-danger">
                Exceeds your available balance of {formatCurrency(balance)}
              </p>
            ) : null}
          </div>

          <div className="flex w-full flex-col gap-2">
            <input
              type="range"
              min={plan.min}
              max={plan.max}
              value={amount}
              onChange={(event) => setAmount(Number(event.target.value))}
              className="range-primary h-2 w-full cursor-pointer appearance-none rounded-full"
              style={{
                background: `linear-gradient(to right, var(--primary) 0%, var(--primary) ${rangeProgress}%, var(--surface-3) ${rangeProgress}%, var(--surface-3) 100%)`,
              }}
              aria-label="Investment amount"
            />
            <div className="flex w-full items-center justify-between text-xs font-semibold text-muted-foreground">
              <span>
                {siteConfig.currencySymbol}
                {plan.min}
              </span>
              <span className="rounded-full border border-line px-2.5 py-0.5 text-foreground">
                {plan.duration} Days
              </span>
              <span>
                {siteConfig.currencySymbol}
                {plan.max}
              </span>
            </div>
          </div>
        </div>

        <div
          className="relative flex flex-col justify-between gap-6 overflow-hidden p-6 sm:p-7"
          style={{
            background:
              "linear-gradient(150deg, color-mix(in srgb, var(--primary) 34%, transparent), color-mix(in srgb, var(--primary) 10%, transparent) 70%)",
          }}
        >
          <div className="relative">
            <h3 className="text-xs font-bold uppercase tracking-[0.16em] text-white/75">
              Projected Returns
            </h3>

            <div className="mt-5 flex flex-col gap-5">
              <div className="flex items-start gap-3.5">
                <span className="grid size-10 shrink-0 place-items-center rounded-xl bg-white/12">
                  <TrendingUp size={18} />
                </span>
                <div>
                  <p className="text-xs font-semibold text-white/70">
                    Daily Profit
                  </p>
                  <p className="text-2xl font-extrabold tracking-tight">
                    {formatCurrency(projection / plan.duration)}
                  </p>
                </div>
              </div>

              <div aria-hidden className="border-t border-white/15" />

              <div className="flex items-start gap-3.5">
                <span className="grid size-10 shrink-0 place-items-center rounded-xl bg-white/12">
                  <Coins size={18} />
                </span>
                <div>
                  <p className="text-xs font-semibold text-white/70">
                    Total Profit
                  </p>
                  <p className="text-[1.75rem] font-extrabold leading-tight tracking-[-0.04em]">
                    {formatCurrency(projection)}
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="relative">
            <button
              type="button"
              disabled={!valid}
              onClick={() => setDialogOpen(true)}
              className="inline-flex h-12 w-full items-center justify-center rounded-xl bg-white text-[15px] font-bold text-primary shadow-[0_12px_32px_rgba(0,0,0,0.24)] transition-all duration-300 hover:-translate-y-0.5 hover:bg-white/90 disabled:pointer-events-none disabled:opacity-50"
            >
              Invest Now →
            </button>
            <p className="mt-2.5 text-center text-xs text-white/75">
              Balance {formatCurrency(balance)}
            </p>
          </div>
        </div>
      </div>

      <section className="flex flex-col gap-5">
        <h2 className="text-lg font-extrabold tracking-tight">All plans</h2>
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-3">
          {plans.map((item) => (
            <PlanCard key={item.id} plan={item} />
          ))}
        </div>
      </section>

      {dialogOpen ? (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Confirm investment"
          className="fixed inset-0 z-[90] grid place-items-center bg-black/70 p-4 backdrop-blur-sm"
        >
          <div className="ui-card w-full max-w-md rounded-2xl p-6 shadow-[0_30px_80px_rgba(0,0,0,0.5)]">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-extrabold tracking-tight">
                Confirm Investment
              </h2>
              <button
                type="button"
                onClick={() => setDialogOpen(false)}
                aria-label="Close dialog"
                className="grid size-9 place-items-center rounded-lg border border-line text-muted-foreground transition-colors hover:border-primary/40 hover:text-primary"
              >
                <X size={17} />
              </button>
            </div>

            <p className="mt-4 text-sm leading-6 text-muted-foreground">
              Your current account balance is{" "}
              <span className="font-bold text-foreground">
                {formatCurrency(balance)}
              </span>
              . The amount below will be deducted from your balance when the
              investment starts.
            </p>

            <div className="mt-5 flex flex-col items-center gap-2">
              <p className="text-xs font-bold uppercase tracking-[0.14em] text-muted-foreground">
                Investment amount
              </p>
              <p className="text-4xl font-extrabold tracking-[-0.04em] text-primary">
                {formatCurrency(amount)}
              </p>
            </div>

            <div className="mt-6">
              {balance >= amount ? (
                <button
                  type="button"
                  onClick={confirm}
                  className="h-12 w-full rounded-xl bg-primary text-[15px] font-bold text-white shadow-[0_12px_32px_rgba(248,129,45,0.3)] transition-all duration-300 hover:-translate-y-0.5 hover:bg-primary-strong"
                >
                  Start Investment
                </button>
              ) : (
                <div className="flex flex-col gap-3">
                  <p className="text-center text-sm font-semibold text-danger">
                    Insufficient balance
                  </p>
                  <Link
                    href="/deposit"
                    className="inline-flex h-12 w-full items-center justify-center rounded-xl bg-primary text-[15px] font-bold text-white"
                  >
                    Make a deposit
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}
