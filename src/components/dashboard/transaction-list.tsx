"use client";

import { ChevronRight, WalletCards } from "lucide-react";
import type { DemoTransaction } from "@/lib/data";
import { cn, formatCurrency, formatDate } from "@/lib/utils";

const statusClass: Record<DemoTransaction["status"], string> = {
  successful: "bg-success/12 text-success",
  processing: "bg-primary/12 text-primary",
  pending: "bg-sky-500/12 text-sky-400",
};

export function TransactionList({
  transactions,
  limit,
}: {
  transactions: DemoTransaction[];
  limit?: number;
}) {
  const visibleTransactions =
    typeof limit === "number" ? transactions.slice(0, limit) : transactions;

  if (visibleTransactions.length === 0) {
    return (
      <p className="py-8 text-center text-sm text-muted-foreground">
        No transactions yet.
      </p>
    );
  }

  return (
    <ul className="flex flex-col gap-2">
      {visibleTransactions.map((transaction) => {
        const credit = transaction.direction === "credit";
        return (
          <li key={transaction.id}>
            <div className="flex items-center justify-between gap-3 rounded-xl border border-transparent px-3 py-3.5 transition-colors duration-300 hover:border-line hover:bg-surface-2/60">
              <div className="flex min-w-0 items-center gap-3.5">
                <span className="grid size-10 shrink-0 place-items-center rounded-xl bg-primary/12 text-primary">
                  <WalletCards size={18} />
                </span>
                <div className="min-w-0">
                  <p className="truncate text-sm font-bold">
                    {transaction.label}
                  </p>
                  <p className="truncate text-xs text-muted-foreground">
                    {formatDate(transaction.date)} · {transaction.method}
                  </p>
                </div>
              </div>

              <div className="flex shrink-0 items-center gap-2.5">
                <div className="flex flex-col items-end">
                  <span
                    className={cn(
                      "text-sm font-extrabold",
                      credit ? "text-success" : "text-foreground",
                    )}
                  >
                    {credit ? "+" : "-"}
                    {formatCurrency(transaction.amount)}
                  </span>
                  <span
                    className={cn(
                      "rounded-full px-2 py-0.5 text-[10px] font-bold capitalize",
                      statusClass[transaction.status],
                    )}
                  >
                    {transaction.status}
                  </span>
                </div>
                <ChevronRight size={16} className="text-muted-foreground" />
              </div>
            </div>
          </li>
        );
      })}
    </ul>
  );
}
