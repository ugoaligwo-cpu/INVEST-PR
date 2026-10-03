"use client";

import { useDemo } from "@/components/providers/demo-provider";
import { TransactionList } from "@/components/dashboard/transaction-list";
import { formatCurrency } from "@/lib/utils";

export function TransactionsView() {
  const { transactions } = useDemo();

  const credits = transactions
    .filter((transaction) => transaction.direction === "credit")
    .reduce((sum, transaction) => sum + transaction.amount, 0);
  const debits = transactions
    .filter((transaction) => transaction.direction === "debit")
    .reduce((sum, transaction) => sum + transaction.amount, 0);

  return (
    <div className="flex w-full flex-col gap-7">
      <h1 className="text-2xl font-extrabold tracking-[-0.03em] sm:text-3xl">
        Transactions
      </h1>

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-3">
        {[
          { label: "Total records", value: String(transactions.length) },
          { label: "Total credited", value: formatCurrency(credits), tone: "text-success" },
          { label: "Total debited", value: formatCurrency(debits) },
        ].map((item) => (
          <article key={item.label} className="ui-card rounded-2xl p-5">
            <p className="text-[11px] font-bold uppercase tracking-[0.14em] text-muted-foreground">
              {item.label}
            </p>
            <p
              className={`mt-2 text-2xl font-extrabold tracking-[-0.04em] ${
                item.tone ?? ""
              }`}
            >
              {item.value}
            </p>
          </article>
        ))}
      </div>

      <section className="ui-card w-full rounded-2xl p-4 sm:p-5">
        <TransactionList transactions={transactions} />
      </section>
    </div>
  );
}
