"use client";

import { ChevronLeft, ChevronRight, TrendingUp } from "lucide-react";
import { useState } from "react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { chartData } from "@/lib/data";
import { formatCurrency } from "@/lib/utils";

const months = [
  "January 2026",
  "February 2026",
  "March 2026",
  "April 2026",
  "May 2026",
  "June 2026",
  "July 2026",
  "August 2026",
  "September 2026",
];

export function ProfitChart() {
  const [monthIndex, setMonthIndex] = useState(months.length - 1);
  const total = chartData.reduce((sum, row) => sum + row.profit, 0);

  return (
    <div className="flex flex-col">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h2 className="text-base font-extrabold tracking-tight">Profit</h2>
          <p className="mt-0.5 text-xs text-muted-foreground">
            Daily profit distribution across the period
          </p>
        </div>

        <div className="flex items-center gap-3 select-none">
          <button
            type="button"
            onClick={() => setMonthIndex((current) => Math.max(0, current - 1))}
            className="grid size-8 place-items-center rounded-lg border border-line text-muted-foreground transition-colors hover:border-primary/40 hover:text-primary active:scale-90"
            aria-label="Previous month"
          >
            <ChevronLeft size={16} />
          </button>
          <span className="min-w-[9.5rem] text-center text-sm font-bold">
            {months[monthIndex]}
          </span>
          <button
            type="button"
            onClick={() =>
              setMonthIndex((current) => Math.min(months.length - 1, current + 1))
            }
            className="grid size-8 place-items-center rounded-lg border border-line text-muted-foreground transition-colors hover:border-primary/40 hover:text-primary active:scale-90"
            aria-label="Next month"
          >
            <ChevronRight size={16} />
          </button>
        </div>
      </div>

      {/* Definite height: ResponsiveContainer resolves `height="100%"`,
          which collapses against a min-height-only parent. */}
      <div className="mt-4 h-[240px] w-full sm:h-[280px]">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={chartData}
            margin={{ top: 8, right: 8, left: -12, bottom: 10 }}
          >
            <CartesianGrid
              strokeDasharray="4 5"
              vertical={false}
              stroke="rgba(140,140,150,.18)"
            />
            <XAxis
              dataKey="month"
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: 11, fill: "#8b8b95" }}
            />
            <YAxis
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: 10, fill: "#8b8b95" }}
              tickFormatter={(value) => `$${value}`}
            />
            <Tooltip
              cursor={{ fill: "rgba(248,129,45,.08)" }}
              content={({ active, payload, label }) => {
                if (!active || !payload?.length) return null;
                const point = payload[0].payload as (typeof chartData)[number];
                return (
                  <div className="ui-card rounded-xl px-3 py-2">
                    <p className="text-[10px] text-muted-foreground">{label}</p>
                    <p className="text-xs font-extrabold text-primary">
                      {formatCurrency(point.profit)}
                    </p>
                  </div>
                );
              }}
            />
            <Bar
              dataKey="profit"
              fill="#f8812d"
              radius={[6, 6, 0, 0]}
              maxBarSize={48}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div className="mt-4 flex items-center justify-between gap-4 rounded-xl border border-line bg-surface-2/50 px-4 py-3">
        <span className="flex items-center gap-2 text-xs font-semibold text-muted-foreground">
          <TrendingUp size={14} className="text-primary" />
          Period total
        </span>
        <span className="text-sm font-extrabold text-primary">
          {formatCurrency(total)}
        </span>
      </div>
    </div>
  );
}
