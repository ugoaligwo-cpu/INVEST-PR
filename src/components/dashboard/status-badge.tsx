import { cn } from "@/lib/utils";

type Status =
  | "successful"
  | "pending"
  | "processing"
  | "failed"
  | "ongoing"
  | "completed";

export function StatusBadge({ status }: { status: Status }) {
  const labels: Record<Status, string> = {
    successful: "Successful",
    pending: "Pending",
    processing: "Processing",
    failed: "Failed",
    ongoing: "Ongoing",
    completed: "Completed",
  };

  return (
    <span
      className={cn(
        "inline-flex w-fit items-center gap-1.5 rounded-full px-2.5 py-1 text-[10px] font-extrabold capitalize",
        status === "successful" || status === "completed"
          ? "bg-success/10 text-success"
          : status === "failed"
            ? "bg-danger/10 text-danger"
            : status === "ongoing"
              ? "bg-primary-soft text-primary"
              : "bg-sky-500/10 text-sky-500",
      )}
    >
      <span className="size-1.5 rounded-full bg-current" />
      {labels[status]}
    </span>
  );
}
