"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { createClient } from "@/lib/supabase/client";

export default function SignupForm() {
  const router = useRouter();
  const supabase = createClient();
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    confirm: "",
  });
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  function update<K extends keyof typeof form>(key: K, value: string) {
    setForm((f) => ({ ...f, [key]: value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);

    if (form.password !== form.confirm) {
      setError("Passwords do not match.");
      return;
    }

    setLoading(true);

    // Public signup always results in role CUSTOMER — a database trigger
    // (see supabase/migrations/0001_init.sql: handle_new_user) creates the
    // matching `profiles` row server-side. There is no client-side way to
    // request ADMIN; admin accounts are created manually in Supabase.
    const { error: signUpError } = await supabase.auth.signUp({
      email: form.email,
      password: form.password,
      options: {
        data: { name: form.name, phone: form.phone },
      },
    });

    if (signUpError) {
      setError(signUpError.message);
      setLoading(false);
      return;
    }

    router.push("/dashboard/customer");
    router.refresh();
  }

  return (
    <div className="max-w-[440px] mx-auto px-7 py-20">
      <div className="bg-ivory border border-stone p-10">
        <div className="arch-mark mb-4.5" />
        <h2 className="font-serif text-2xl mb-1">Create your account</h2>
        <p className="text-text-soft text-sm mb-7">Track inquiries and events from your dashboard.</p>

        <form onSubmit={handleSubmit}>
          <TextField label="Full Name" value={form.name} onChange={(v) => update("name", v)} placeholder="Your full name" />
          <TextField label="Email" type="email" value={form.email} onChange={(v) => update("email", v)} placeholder="you@example.com" />
          <TextField label="Phone" value={form.phone} onChange={(v) => update("phone", v)} placeholder="+974 ..." />
          <TextField label="Password" type="password" value={form.password} onChange={(v) => update("password", v)} placeholder="••••••••" />
          <TextField label="Confirm Password" type="password" value={form.confirm} onChange={(v) => update("confirm", v)} placeholder="••••••••" />

          {error && <p className="text-maroon text-sm mb-4">{error}</p>}

          <button
            type="submit"
            disabled={loading}
            className="btn btn-maroon w-full justify-center mb-4 disabled:opacity-60"
          >
            {loading ? "Creating account..." : "Sign Up"}
          </button>
        </form>

        <p className="text-center text-sm text-text-soft">
          Already have an account?{" "}
          <Link href="/login" className="text-maroon font-semibold">
            Log in
          </Link>
        </p>
      </div>
    </div>
  );
}

function TextField({
  label,
  value,
  onChange,
  placeholder,
  type = "text",
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  placeholder: string;
  type?: string;
}) {
  return (
    <div className="mb-5">
      <label className="block text-sm font-semibold mb-1.5">{label}</label>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        required
        className="w-full px-3.5 py-3 border border-stone bg-sand"
      />
    </div>
  );
}
