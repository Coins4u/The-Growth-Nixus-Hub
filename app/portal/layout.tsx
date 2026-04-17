import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Member Portal",
  description:
    "Secure member portal for Growth Hub executive operators with private curriculum, resources, and operational dashboards.",
  robots: {
    index: false,
    follow: false,
  },
};

export default function PortalLayout({ children }: { children: React.ReactNode }) {
  return children;
}
