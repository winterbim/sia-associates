import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Admin · SIA Associates",
  robots: { index: false, follow: false },
};

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return <div className="min-h-screen bg-bone pt-20 md:pt-24">{children}</div>;
}
