import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Client Stories & Reviews | AKR Group UAE Dubai & Sharjah",
  description:
    "Read verified experiences from UAE investors, business leaders, and families partnering with AKR Group UAE across real estate, banking, and asset protection.",
};

export default function TestimonialsLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
