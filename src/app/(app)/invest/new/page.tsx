import type { Metadata } from "next";
import { NewInvestmentView } from "@/components/dashboard/new-investment-view";

export const metadata: Metadata = {
  title: "New Investment",
};

export default async function NewInvestmentPage({
  searchParams,
}: {
  searchParams: Promise<{ plan?: string; amount?: string }>;
}) {
  const params = await searchParams;
  const initialAmount = params.amount ? Number(params.amount) : undefined;

  return (
    <NewInvestmentView
      initialPlanId={params.plan}
      initialAmount={Number.isFinite(initialAmount) ? initialAmount : undefined}
    />
  );
}
