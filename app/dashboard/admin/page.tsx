import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { SignOutButton } from "@/components/ui/SignOutButton";

const STATUS_STYLE: Record<string, string> = {
  NEW: "badge-new",
  CONTACTED: "badge-contacted",
  QUOTATION_SENT: "badge-quote",
  CONFIRMED: "badge-confirmed",
  COMPLETED: "badge-confirmed",
  CANCELLED: "badge-contacted",
};

export default async function AdminDashboardPage() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  // Role check here is for navigation/UX only — the real enforcement is
  // the RLS policy on every admin-only table (see 0001_init.sql), which
  // checks profiles.role = 'ADMIN' regardless of what this page does.
  const { data: profile } = await supabase
    .from("profiles")
    .select("role")
    .eq("id", user.id)
    .single();

  if (profile?.role !== "ADMIN") {
    redirect("/dashboard/customer");
  }

  const [{ count: totalInquiries }, { count: newInquiries }, { data: inquiries }] =
    await Promise.all([
      supabase.from("inquiries").select("*", { count: "exact", head: true }),
      supabase.from("inquiries").select("*", { count: "exact", head: true }).eq("status", "NEW"),
      supabase
        .from("inquiries")
        .select("inquiry_number, name, event_type, status")
        .order("created_at", { ascending: false })
        .limit(10),
    ]);

  return (
    <div className="grid lg:grid-cols-[230px_1fr] min-h-[70vh]">
      <aside className="bg-ink text-[#cfc4b6] p-7 hidden lg:block">
        <div className="font-serif text-xl text-white mb-9">Eventico Admin</div>
        <ul className="flex flex-col gap-1.5">
          <li className="px-3 py-2.5 rounded-sm bg-white/10 text-white text-sm">Overview</li>
          <li className="px-3 py-2.5 rounded-sm text-sm">Inquiries</li>
          <li className="px-3 py-2.5 rounded-sm text-sm">Services</li>
          <li className="px-3 py-2.5 rounded-sm text-sm">Gallery</li>
          <li className="px-3 py-2.5 rounded-sm text-sm">
            <SignOutButton />
          </li>
        </ul>
      </aside>

      <main className="p-10 bg-sand-2">
        <h2 className="font-serif text-2xl font-medium mb-6.5">Overview</h2>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4.5 mb-8.5">
          <StatCard n={totalInquiries ?? 0} label="Total Inquiries" />
          <StatCard n={newInquiries ?? 0} label="New Inquiries" />
          <StatCard n={0} label="Active Events" />
          <StatCard n={0} label="Customers" />
        </div>

        <table className="w-full border-collapse bg-ivory border border-stone">
          <thead>
            <tr>
              {["ID", "Client", "Event Type", "Status"].map((h) => (
                <th key={h} className="text-left px-4 py-3.5 border-b border-stone text-[11px] uppercase tracking-wide text-text-soft">
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {inquiries && inquiries.length > 0 ? (
              inquiries.map((inq) => (
                <tr key={inq.inquiry_number}>
                  <td className="px-4 py-3.5 border-b border-stone text-sm">{inq.inquiry_number}</td>
                  <td className="px-4 py-3.5 border-b border-stone text-sm">{inq.name}</td>
                  <td className="px-4 py-3.5 border-b border-stone text-sm">{inq.event_type}</td>
                  <td className="px-4 py-3.5 border-b border-stone text-sm">
                    <span className={`badge ${STATUS_STYLE[inq.status] ?? "badge-new"}`}>
                      {inq.status.replace("_", " ")}
                    </span>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={4} className="px-4 py-8 text-center text-sm text-text-soft">
                  No inquiries yet.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </main>
    </div>
  );
}

function StatCard({ n, label }: { n: number; label: string }) {
  return (
    <div className="bg-ivory border border-stone p-5.5">
      <div className="font-serif text-3xl">{n}</div>
      <div className="text-xs text-text-soft uppercase tracking-wide">{label}</div>
    </div>
  );
}
