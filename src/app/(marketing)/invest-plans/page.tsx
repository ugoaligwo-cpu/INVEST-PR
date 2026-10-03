import type { Metadata } from "next";
import { Clock3, ShieldCheck, TrendingUp } from "lucide-react";
import { CallToAction } from "@/components/marketing/cta";
import { HowItWorks } from "@/components/marketing/how-it-works";
import { InvestmentShowcase } from "@/components/marketing/investment-showcase";
import { PageHero } from "@/components/marketing/page-hero";
import { TestimonialsSection } from "@/components/marketing/testimonials-section";

export const metadata: Metadata = {
  title: "Investment Plans",
  description:
    "Explore carefully curated investment plans designed for every level of investor.",
};

export default function InvestmentPlansPage() {
  return (
    <>
      <PageHero
        eyebrow="Investment Plans"
        icon={TrendingUp}
        title={
          <>
            Invest Smarter, <span className="text-primary">Earn More</span>
          </>
        }
        description="Explore our carefully curated investment plans designed for every level of investor. Calculate your potential returns in real time."
      >
        <span className="flex items-center gap-1.5">
          <ShieldCheck size={15} className="text-primary" /> Capital Protected
        </span>
        <span className="flex items-center gap-1.5">
          <Clock3 size={15} className="text-primary" /> Daily Returns
        </span>
        <span className="flex items-center gap-1.5">
          <TrendingUp size={15} className="text-primary" /> Flexible Plans
        </span>
      </PageHero>

      <InvestmentShowcase />
      <HowItWorks />
      <TestimonialsSection />
      <CallToAction />
    </>
  );
}
