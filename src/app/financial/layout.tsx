import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "AKR Financial Sharjah | Banking, Risk & Brand Architecture",
  description:
    "SHAMS-licensed UAE consultation across Tier-1 mortgages, executive credit, independent investment & insurance protection, and corporate brand positioning.",
};

export default function FinancialLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
