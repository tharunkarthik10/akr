import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "AKR Realty LLC Dubai | RERA & DLD Real Estate Architecture",
  description:
    "RERA & DLD-licensed Dubai property brokerage. Explore prime residential & commercial developments, off-market estates, and 10-year UAE Golden Visa pathways.",
};

export default function RealtyLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
