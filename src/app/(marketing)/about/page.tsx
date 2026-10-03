import type { Metadata } from "next";
import {
  Award,
  Building2,
  Globe2,
  ShieldCheck,
  Target,
  Users,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { PageSection } from "@/components/ui/page-section";
import { Reveal } from "@/components/ui/reveal";
import { SectionBadge } from "@/components/ui/section-badge";
import { CallToAction } from "@/components/marketing/cta";
import { PageHero } from "@/components/marketing/page-hero";
import { TestimonialsSection } from "@/components/marketing/testimonials-section";

export const metadata: Metadata = {
  title: "About Us",
  description:
    "Learn about our mission, our values, and why thousands of investors trust us with their financial future.",
};

type Value = {
  icon: LucideIcon;
  title: string;
  description: string;
};

const values: Value[] = [
  {
    icon: ShieldCheck,
    title: "Security First",
    description:
      "Your investments and data are protected with industry-leading security measures.",
  },
  {
    icon: Users,
    title: "Community Driven",
    description:
      "We build trust through transparency and put our investors at the center of everything.",
  },
  {
    icon: Globe2,
    title: "Global Reach",
    description:
      "Serving investors worldwide with localized support and multi-currency options.",
  },
  {
    icon: Target,
    title: "Results Focused",
    description:
      "Every decision we make is driven by delivering consistent returns to our investors.",
  },
];

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="About Us"
        icon={Building2}
        title={
          <>
            The Story Behind{" "}
            <span className="text-primary">Investinnova</span>
          </>
        }
        description="Learn about our mission, our values, and why thousands of investors trust us with their financial future."
      />

      {/* Introduction */}
      <PageSection tone="base" spacing="lg" width="narrow">
        <Reveal className="flex flex-col items-start gap-6">
          <SectionBadge>Our Story</SectionBadge>
          <h2 className="text-[clamp(1.75rem,1.2rem+2vw,2.75rem)] font-extrabold leading-[1.12] tracking-[-0.04em]">
            Welcome to Investinnova
          </h2>
          <div className="flex flex-col gap-5 text-[15px] leading-8 text-muted-foreground md:text-base md:leading-9">
            <p>
              At Investinnova, we believe in empowering individuals and
              businesses to achieve their financial goals. With a commitment to
              innovation, transparency, and growth, we provide tailored
              investment solutions that align with your aspirations.
            </p>
            <p>
              Our platform offers a secure, user-friendly interface for managing
              your investments, with expert insights and real-time analytics to
              help you make informed decisions. Join our growing community of
              investors and take the first step toward a brighter financial
              future.
            </p>
            <p>
              Together, let&apos;s build wealth, create opportunities, and make
              a lasting impact. Your journey to financial freedom starts here
              with Investinnova.
            </p>
          </div>
        </Reveal>
      </PageSection>

      {/* Values */}
      <PageSection tone="raised" spacing="lg" className="section-hairline">
        <div className="flex flex-col items-center gap-14">
          <Reveal className="flex flex-col items-center gap-5 text-center">
            <SectionBadge icon={Award}>Our Values</SectionBadge>
            <h2 className="max-w-2xl text-[clamp(1.75rem,1.2rem+2vw,2.75rem)] font-extrabold leading-[1.12] tracking-[-0.04em] text-balance">
              What We Stand For
            </h2>
            <p className="max-w-2xl text-[15px] leading-7 text-muted-foreground sm:text-base md:leading-8">
              Four principles guide every product decision, partnership, and
              support interaction on the platform.
            </p>
          </Reveal>

          <div className="grid w-full grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {values.map((value, index) => {
              const Icon = value.icon;
              return (
                <Reveal key={value.title} delay={index * 80} className="h-full">
                  <article className="ui-card ui-card-hover group flex h-full flex-col rounded-2xl p-6">
                    <span className="grid size-12 place-items-center rounded-xl bg-primary/12 text-primary transition-all duration-300 group-hover:bg-primary">
                      <Icon size={22} />
                    </span>
                    <h3 className="mt-5 text-base font-extrabold">
                      {value.title}
                    </h3>
                    <p className="mt-2.5 text-sm leading-6 text-muted-foreground">
                      {value.description}
                    </p>
                  </article>
                </Reveal>
              );
            })}
          </div>
        </div>
      </PageSection>

      <TestimonialsSection />
      <CallToAction />
    </>
  );
}
