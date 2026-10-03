"use client";

import { Wallet, X } from "lucide-react";
import { useState, type FormEvent } from "react";
import { useDemo } from "@/components/providers/demo-provider";
import { siteConfig } from "@/config/site";

const inputClass =
  "h-11 w-full rounded-xl border border-line bg-surface-2/60 px-3.5 text-sm outline-none transition-colors focus:border-primary";

export function DepositView() {
  const { deposit, balance } = useDemo();
  const [open, setOpen] = useState(false);
  const [amount, setAmount] = useState(100);
  const [coin, setCoin] = useState("BTC");
  const [status, setStatus] = useState("");

  const submit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    deposit(amount, `Crypto (${coin})`);
    setOpen(false);
    setStatus("Deposit transaction created successfully");
    window.setTimeout(() => setStatus(""), 3000);
  };

  return (
    <div className="flex w-full flex-col gap-7">
      <h1 className="text-2xl font-extrabold tracking-[-0.03em] sm:text-3xl">
        Select Payment Option
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
        <button
          type="button"
          onClick={() => setOpen(true)}
          className="ui-card ui-card-hover group flex w-full flex-col items-start gap-4 rounded-2xl p-6 text-left"
        >
          <span className="grid size-12 place-items-center rounded-xl bg-primary/12 text-primary transition-all duration-300 group-hover:bg-primary group-hover:text-white">
            <Wallet size={22} />
          </span>
          <div className="min-w-0">
            <h2 className="text-lg font-extrabold tracking-tight">
              Crypto (manual)
            </h2>
            <p className="mt-1.5 text-sm leading-6 text-muted-foreground">
              Requires manual verification after transfer.
            </p>
          </div>
          <span className="mt-auto inline-flex h-10 w-full items-center justify-center rounded-xl border border-line text-sm font-bold transition-colors group-hover:border-primary/45 group-hover:text-primary">
            Select
          </span>
        </button>

        <article className="ui-card flex flex-col rounded-2xl p-6">
          <p className="text-[11px] font-bold uppercase tracking-[0.14em] text-muted-foreground">
            Available balance
          </p>
          <p className="mt-3 text-2xl font-extrabold tracking-[-0.04em] text-primary">
            {siteConfig.currencySymbol}
            {balance.toLocaleString("en-US", { minimumFractionDigits: 2 })}
          </p>
          <p className="mt-1.5 text-sm leading-6 text-muted-foreground">
            Minimum {siteConfig.currencySymbol}
            {siteConfig.depositMin} · Maximum{" "}
            {siteConfig.currencySymbol}
            {siteConfig.depositMax}
          </p>
        </article>

        <article className="ui-card flex flex-col rounded-2xl p-6">
          <p className="text-[11px] font-bold uppercase tracking-[0.14em] text-muted-foreground">
            How it works
          </p>
          <ol className="mt-3 flex flex-col gap-2.5 text-sm text-muted-foreground">
            <li>1. Choose your deposit amount.</li>
            <li>2. Send the funds to the provided wallet.</li>
            <li>3. Submit the payment proof for review.</li>
          </ol>
        </article>
      </div>

      {open ? (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Pay with crypto"
          className="fixed inset-0 z-[90] grid place-items-center bg-black/70 p-4 backdrop-blur-sm"
        >
          <div className="ui-card w-full max-w-md rounded-2xl p-6 shadow-[0_30px_80px_rgba(0,0,0,0.5)]">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-extrabold tracking-tight">
                Pay with crypto
              </h2>
              <button
                type="button"
                onClick={() => setOpen(false)}
                aria-label="Close dialog"
                className="grid size-9 place-items-center rounded-lg border border-line text-muted-foreground transition-colors hover:border-primary/40 hover:text-primary"
              >
                <X size={17} />
              </button>
            </div>

            <form onSubmit={submit} className="mt-6 flex w-full flex-col gap-5">
              <label className="flex flex-col gap-2">
                <span className="text-xs font-bold uppercase tracking-[0.14em] text-muted-foreground">
                  Amount ({siteConfig.currencyCode})
                </span>
                <input
                  type="number"
                  inputMode="numeric"
                  min={siteConfig.depositMin}
                  max={siteConfig.depositMax}
                  required
                  value={amount}
                  onChange={(event) => setAmount(Number(event.target.value))}
                  placeholder="Enter amount to deposit"
                  className={inputClass}
                />
              </label>

              <label className="flex flex-col gap-2">
                <span className="text-xs font-bold uppercase tracking-[0.14em] text-muted-foreground">
                  Select coin
                </span>
                <select
                  value={coin}
                  onChange={(event) => setCoin(event.target.value)}
                  className={inputClass}
                >
                  <option>BTC</option>
                  <option>ETH</option>
                  <option>USDT</option>
                </select>
              </label>

              <button
                type="submit"
                className="h-12 rounded-xl bg-primary text-[15px] font-bold text-white shadow-[0_12px_32px_rgba(248,129,45,0.3)] transition-all duration-300 hover:-translate-y-0.5 hover:bg-primary-strong"
              >
                Proceed
              </button>
            </form>
          </div>
        </div>
      ) : null}
    </div>
  );
}
