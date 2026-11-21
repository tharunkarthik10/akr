import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "UAE Mortgage, ROI & XIRR Calculators | AKR Group UAE",
  description:
    "Interactive UAE real estate and wealth calculators for mortgages, off-plan ROI, rental yield, XIRR, mutual funds, child education, and retirement planning.",
};

export default function CalculatorsLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
