import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About AKR Group UAE | 25+ Years of Wealth & Property Mastery",
  description:
    "Discover AKR Group UAE—uniting AKR Realty LLC (Dubai) and AKR Financial (Sharjah) to architect lasting generational wealth with integrity and discretion.",
};

export default function AboutLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
