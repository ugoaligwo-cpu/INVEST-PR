import type { Metadata } from "next";
import {
  ArrowRight,
  Lightbulb,
  TrendingUp,
  UserPlus,
  Wallet,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { PageSection } from "@/components/ui/page-section";
import { ButtonLink } from "@/components/ui/button";
import { CallToAction } from "@/components/marketing/cta";
import { PageHero } from "@/components/marketing/page-hero";
import { TestimonialsSection } from "@/components/marketing/testimonials-section";

export const metadata: Metadata = {
  title: "How it works",
  description:
    "Getting started is easy. Follow three simple steps and begin your investment journey in minutes.",
};

type Step = {
  icon: LucideIcon;
  title: string;
  description: string;
};

const steps: Step[] = [
  {
    icon: UserPlus,
    title: "Create Account",
    description:
      "Go to the registration page to create an account. Fill in your details and submit. You will receive an email to verify your account.",
  },
  {
    icon: Wallet,
    title: "Make a Deposit",
    description:
      "Deposit funds into your account to start investing. You can choose from various payment methods available.",
  },
  {
    icon: TrendingUp,
    title: "Earn Daily Profits",
    description:
      "Sit back and relax while we do the work. You will start earning profits daily based on your investment plan.",
  },
];

export default function HowItWorksPage() {
  return (
    <>
      <PageHero
        eyebrow="How It Works"
        icon={Lightbulb}
        title={
          <>
            Simple Steps to <span className="text-primary">Start Earning</span>
          </>
        }
        description="Getting started is easy. Follow these three simple steps and begin your investment journey in minutes."
      />

      <PageSection tone="base" spacing="lg">
        <div className="relative mx-auto w-full max-w-5xl">
          {/* Vertical connector rail, centred on the node column */}
          <div
            aria-hidden
            className="pointer-events-none absolute bottom-28 left-6 top-28 w-px -translate-x-1/2 md:left-1/2"
            style={{
              background:
                "linear-gradient(to bottom, transparent, color-mix(in srgb, var(--primary) 70%, transparent) 14%, color-mix(in srgb, var(--primary) 70%, transparent) 86%, transparent)",
            }}
          />

          {steps.map((step, index) => {
            const Icon = step.icon;
            const reversed = index % 2 !== 0;

            return (
              <div
                key={step.title}
                className="relative grid grid-cols-[auto_1fr] items-center gap-x-5 gap-y-4 py-9 md:grid-cols-[1fr_96px_1fr] md:gap-x-8"
              >
                {/* Node — mobile: left rail. Desktop: centre column. */}
                <div className="col-start-1 row-start-1 flex justify-center md:col-start-2">
                  <span className="relative z-10 grid size-12 place-items-center rounded-full border-4 border-[var(--shell)] bg-primary text-base font-extrabold text-white shadow-[0_12px_30px_rgba(248,129,45,0.38)] md:size-14">
                    {index + 1}
                  </span>
                </div>

                {/* Icon — mobile: beside the node. Desktop: opposite flank. */}
                <div
                  className={`col-start-2 row-start-1 flex justify-start md:row-start-1 md:justify-center ${
                    reversed ? "md:col-start-1" : "md:col-start-3"
                  }`}
                >
                  <span className="grid size-20 place-items-center rounded-2xl border border-primary/20 bg-primary/10 text-primary transition-transform duration-300 hover:scale-105 md:size-24">
                    <Icon size={34} />
                  </span>
                </div>

                {/* Copy — mobile: below. Desktop: alternating flank. */}
                <div
                  className={`col-start-2 row-start-2 flex flex-col gap-2.5 md:row-start-1 md:col-span-1 ${
                    reversed ? "md:col-start-3 md:text-right" : "md:col-start-1"
                  }`}
                >
                  <p className="text-xs font-extrabold uppercase tracking-[0.18em] text-primary">
                    Step {index + 1}
                  </p>
                  <h2 className="text-xl font-extrabold tracking-[-0.03em] md:text-2xl lg:text-3xl">
                    {step.title}
                  </h2>
                  <p className="text-sm leading-7 text-muted-foreground lg:text-[15px]">
                    {step.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </PageSection>

      {/* Gradient mid-page CTA */}
      <PageSection tone="base" spacing="sm" width="narrow" bleed={false}>
        <div className="relative overflow-hidden rounded-3xl bg-primary p-8 text-white md:p-12">
          <div
            aria-hidden
            className="bloom -right-20 -top-20 size-64 opacity-30"
            style={{ background: "#ffffff" }}
          />
          <div className="relative flex flex-col items-center justify-between gap-6 text-center md:flex-row md:text-left">
            <div className="flex flex-col gap-2">
              <h2 className="text-2xl font-extrabold tracking-tight md:text-3xl">
                Ready to Get Started?
              </h2>
              <p className="max-w-md text-sm leading-6 text-white/85">
                Join thousands of investors already earning daily returns.
                Create your free account today.
              </p>
            </div>
            <ButtonLink href="/register" size="lg" variant="inverse">
              Get Started <ArrowRight size={17} />
            </ButtonLink>
          </div>
        </div>
      </PageSection>

      <TestimonialsSection />
      <CallToAction />
    </>
  );
}
