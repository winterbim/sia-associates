import { getSiteContent } from "@/lib/admin/content-store";
import { AdminDashboard } from "@/components/admin/AdminDashboard";

export const dynamic = "force-dynamic";

export default async function AdminPage() {
  const content = await getSiteContent();
  return <AdminDashboard initialContent={content} />;
}
