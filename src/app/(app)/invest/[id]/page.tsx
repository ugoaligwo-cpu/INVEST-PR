import type { Metadata } from "next";
import { InvestmentDetailView } from "@/components/dashboard/investment-detail-view";

export const metadata: Metadata = {
  title: "Investment Detail",
};

export default async function InvestmentDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  return <InvestmentDetailView id={id} />;
}
