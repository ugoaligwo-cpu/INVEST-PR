"use client";

import { Landmark, Wallet, X } from "lucide-react";
import { useState, type FormEvent } from "react";
import { useDemo } from "@/components/providers/demo-provider";
import { siteConfig } from "@/config/site";

const inputClass =
  "h-11 w-full rounded-xl border border-line bg-surface-2/60 px-3.5 text-sm outline-none transition-colors focus:border-primary";

const options = [
  {
    id: "crypto" as const,
    title: "Crypto",
    description: "Withdraw straight to your coin wallet address.",
    icon: Wallet,
  },
  {
    id: "bank" as const,
    title: "Bank Transfer",
    description: "Withdraw to your registered bank account.",
    icon: Landmark,
  },
];

export function WithdrawalView() {
  const { withdraw, balance } = useDemo();
  const [method, setMethod] = useState<"crypto" | "bank" | null>(null);
  const [amount, setAmount] = useState(100);
  const [destination, setDestination] = useState("");
  const [status, setStatus] = useState("");

  const submit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    withdraw(amount, method === "crypto" ? "Crypto" : "Bank Transfer");
    setMethod(null);
    setDestination("");
    setStatus("Withdrawal request submitted for review");
    window.setTimeout(() => setStatus(""), 3000);
  };

  return (
    <div className="flex w-full flex-col gap-7">
      <h1 className="text-2xl font-extrabold tracking-[-0.03em] sm:text-3xl">
        Select Withdrawal Option
      </h1>

      {status ? (
        <p
          role="status"
          className="rounded-xl border border-success/30 bg-success/10 px-4 py-3 text-sm font-bold text-success"
        >
          {status}
        </p>
      ) : null}

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {options.map((option) => {
          const Icon = option.icon;
          return (
            <button
              key={option.id}
              type="button"
              onClick={() => setMethod(option.id)}
              className="ui-card ui-card-hover group flex w-full flex-col items-start gap-4 rounded-2xl p-6 text-left"
            >
              <span className="grid size-12 place-items-center rounded-xl bg-primary/12 text-primary transition-all duration-300 group-hover:bg-primary group-hover:text-white">
                <Icon size={22} />
              </span>
              <div className="min-w-0">
                <h2 className="text-lg font-extrabold tracking-tight">
                  {option.title}
                </h2>
                <p className="mt-1.5 text-sm leading-6 text-muted-foreground">
                  {option.description}
                </p>
              </div>
              <span className="mt-auto inline-flex h-10 w-full items-center justify-center rounded-xl border border-line text-sm font-bold transition-colors group-hover:border-primary/45 group-hover:text-primary">
                Select
              </span>
            </button>
          );
        })}

        <article className="ui-card flex flex-col rounded-2xl p-6">
          <p className="text-[11px] font-bold uppercase tracking-[0.14em] text-muted-foreground">
            Withdrawable balance
          </p>
          <p className="mt-3 text-2xl font-extrabold tracking-[-0.04em] text-primary">
            {siteConfig.currencySymbol}
            {balance.toLocaleString("en-US", { minimumFractionDigits: 2 })}
          </p>
          <p className="mt-1.5 text-sm leading-6 text-muted-foreground">
            Fee {siteConfig.currencySymbol}
            {siteConfig.withdrawalFee} · Minimum{" "}
            {siteConfig.currencySymbol}
            {siteConfig.withdrawalMin}
          </p>
        </article>
      </div>

      {method ? (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Request withdrawal"
          className="fixed inset-0 z-[90] grid place-items-center bg-black/70 p-4 backdrop-blur-sm"
        >
          <div className="ui-card w-full max-w-md rounded-2xl p-6 shadow-[0_30px_80px_rgba(0,0,0,0.5)]">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-extrabold tracking-tight">
                {method === "crypto" ? "Crypto Withdrawal" : "Bank Withdrawal"}
              </h2>
              <button
                type="button"
                onClick={() => setMethod(null)}
                aria-label="Close dialog"
                className="grid size-9 place-items-center rounded-lg border border-line text-muted-foreground transition-colors hover:border-primary/40 hover:text-primary"
              >
                <X size={17} />
              </button>
            </div>

            <form onSubmit={submit} className="mt-6 flex w-full flex-col gap-5">
              <label className="flex flex-col gap-2">
                <span className="text-xs font-bold uppercase tracking-[0.14em] text-muted-foreground">
                  Enter amount ({siteConfig.currencyCode})
                </span>
                <input
                  type="number"
                  inputMode="numeric"
                  min={siteConfig.withdrawalMin}
                  max={siteConfig.withdrawalMax}
                  required
                  value={amount}
                  onChange={(event) => setAmount(Number(event.target.value))}
                  className={inputClass}
                />
              </label>

              <label className="flex flex-col gap-2">
                <span className="text-xs font-bold uppercase tracking-[0.14em] text-muted-foreground">
                  {method === "crypto" ? "Wallet Address" : "Bank Details"}
                </span>
                <textarea
                  required
                  value={destination}
                  onChange={(event) => setDestination(event.target.value)}
                  placeholder={
                    method === "crypto"
                      ? "Enter the coin wallet address"
                      : "Enter full bank details"
                  }
                  className="min-h-28 w-full resize-y rounded-xl border border-line bg-surface-2/60 p-3.5 text-sm leading-6 outline-none transition-colors focus:border-primary"
                />
              </label>

              <button
                type="submit"
                className="h-12 rounded-xl bg-primary text-[15px] font-bold text-white shadow-[0_12px_32px_rgba(248,129,45,0.3)] transition-all duration-300 hover:-translate-y-0.5 hover:bg-primary-strong"
              >
                Request Withdrawal
              </button>
            </form>
          </div>
        </div>
      ) : null}
    </div>
  );
}
