"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { createClient } from "@/lib/supabase/client";

export default function LoginForm() {
  const router = useRouter();
  const supabase = createClient();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setLoading(true);

    const { data, error: signInError } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (signInError) {
      setError(signInError.message);
      setLoading(false);
      return;
    }

    // Look up role to route to the right dashboard. RLS still governs what
    // data each dashboard can actually see — this is just for navigation.
    const { data: profile } = await supabase
      .from("profiles")
      .select("role")
      .eq("id", data.user.id)
      .single();

    router.push(profile?.role === "ADMIN" ? "/dashboard/admin" : "/dashboard/customer");
    router.refresh();
  }

  return (
    <div className="max-w-[440px] mx-auto px-7 py-20">
      <div className="bg-ivory border border-stone p-10">
        <div className="arch-mark mb-4.5" />
        <h2 className="font-serif text-2xl mb-1">Welcome back</h2>
        <p className="text-text-soft text-sm mb-7">Log in to view your inquiries and events.</p>

        <form onSubmit={handleSubmit}>
          <label className="block text-sm font-semibold mb-1.5">Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@example.com"
            required
            className="w-full px-3.5 py-3 border border-stone bg-sand mb-5"
          />
          <label className="block text-sm font-semibold mb-1.5">Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="••••••••"
            required
            className="w-full px-3.5 py-3 border border-stone bg-sand mb-5"
          />

          {error && <p className="text-maroon text-sm mb-4">{error}</p>}

          <button
            type="submit"
            disabled={loading}
            className="btn btn-maroon w-full justify-center mb-4 disabled:opacity-60"
          >
            {loading ? "Logging in..." : "Log In"}
          </button>
        </form>

        <p className="text-center text-sm text-text-soft">
          Don&apos;t have an account?{" "}
          <Link href="/signup" className="text-maroon font-semibold">
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
}
