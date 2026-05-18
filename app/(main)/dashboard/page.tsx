import { auth } from "@/auth";
import DashboardBanner from "@/components/dashboard/DashboardBanner";
import DashboardBody from "@/components/dashboard/DashboardBody";

export default async function DashboardPage() {
  const session = await auth();

  if (!session?.user) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        Please log in
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-base-50">
      <DashboardBanner user={session.user} />
      <DashboardBody user={session.user} />
    </div>
  );
}
