import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact AKR Group UAE | Dubai & Sharjah Consultation Offices",
  description:
    "Schedule a confidential one-on-one consultation with AKR Group UAE in Al Garhoud, Dubai or SHAMS, Sharjah. Direct phone, WhatsApp & office timings.",
};

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
