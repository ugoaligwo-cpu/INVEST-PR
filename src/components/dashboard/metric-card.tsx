import type { LucideIcon } from "lucide-react";
import { ArrowDownRight, ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils";

export function MetricCard({
  label,
  value,
  detail,
  icon: Icon,
  trend,
  tone = "orange",
}: {
  label: string;
  value: string;
  detail?: string;
  icon: LucideIcon;
  trend?: "up" | "down";
  tone?: "orange" | "green" | "blue" | "purple";
}) {
  const toneClasses = {
    orange: "bg-primary-soft text-primary",
    green: "bg-success/10 text-success",
    blue: "bg-sky-500/10 text-sky-500",
    purple: "bg-violet-500/10 text-violet-500",
  };

  return (
    <article className="group rounded-2xl border border-border bg-surface p-5 transition duration-300 hover:-translate-y-0.5 hover:border-primary/20 hover:shadow-[0_18px_50px_rgba(248,129,45,0.08)] sm:p-6">
      <div className="flex items-start justify-between gap-4">
        <div className={cn("grid size-11 place-items-center rounded-2xl", toneClasses[tone])}>
          <Icon className="size-5" />
        </div>
        {trend && (
          <span
            className={cn(
              "inline-flex items-center gap-1 rounded-full px-2 py-1 text-[10px] font-extrabold",
              trend === "up"
                ? "bg-success/10 text-success"
                : "bg-danger/10 text-danger",
            )}
          >
            {trend === "up" ? (
              <ArrowUpRight className="size-3" />
            ) : (
              <ArrowDownRight className="size-3" />
            )}
            {trend === "up" ? "Growing" : "Review"}
          </span>
        )}
      </div>
      <p className="mt-6 text-xs font-semibold text-muted-foreground">{label}</p>
      <p className="mt-1 text-2xl font-extrabold tracking-[-0.045em] sm:text-3xl">
        {value}
      </p>
      {detail && <p className="mt-2 text-[11px] text-muted-foreground">{detail}</p>}
    </article>
  );
}
