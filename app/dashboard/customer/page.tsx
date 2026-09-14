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

export default async function CustomerDashboardPage() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  // RLS ensures this only ever returns rows where user_id = auth.uid(),
  // regardless of what we query here — see supabase/migrations/0001_init.sql.
  const { data: inquiries, error } = await supabase
    .from("inquiries")
    .select("inquiry_number, event_type, event_date, status, created_at")
    .order("created_at", { ascending: false });

  return (
    <div className="grid lg:grid-cols-[230px_1fr] min-h-[70vh]">
      <aside className="bg-ink text-[#cfc4b6] p-7 hidden lg:block">
        <div className="font-serif text-xl text-white mb-9">Eventico</div>
        <ul className="flex flex-col gap-1.5">
          <li className="px-3 py-2.5 rounded-sm bg-white/10 text-white text-sm">My Inquiries</li>
          <li className="px-3 py-2.5 rounded-sm text-sm">My Events</li>
          <li className="px-3 py-2.5 rounded-sm text-sm">Profile</li>
          <li className="px-3 py-2.5 rounded-sm text-sm">
            <SignOutButton />
          </li>
        </ul>
      </aside>

      <main className="p-10 bg-sand-2">
        <h2 className="font-serif text-2xl font-medium mb-6.5">My Inquiries</h2>

        {error && (
          <p className="text-maroon text-sm mb-4">
            Could not load inquiries. If this is a fresh Supabase project,
            make sure the migrations in supabase/migrations have been run.
          </p>
        )}

        <table className="w-full border-collapse bg-ivory border border-stone">
          <thead>
            <tr>
              {["ID", "Event Type", "Date", "Status", "Submitted"].map((h) => (
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
                  <td className="px-4 py-3.5 border-b border-stone text-sm">{inq.event_type}</td>
                  <td className="px-4 py-3.5 border-b border-stone text-sm">{inq.event_date ?? "—"}</td>
                  <td className="px-4 py-3.5 border-b border-stone text-sm">
                    <span className={`badge ${STATUS_STYLE[inq.status] ?? "badge-new"}`}>
                      {inq.status.replace("_", " ")}
                    </span>
                  </td>
                  <td className="px-4 py-3.5 border-b border-stone text-sm">
                    {new Date(inq.created_at).toLocaleDateString()}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={5} className="px-4 py-8 text-center text-sm text-text-soft">
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
