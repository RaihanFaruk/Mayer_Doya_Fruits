"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { supabase, isSupabaseConfigured } from "@/lib/supabaseClient";

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg("");

    try {
      if (isSupabaseConfigured && supabase) {
        const { error } = await supabase.auth.signInWithPassword({
          email: email.trim(),
          password,
        });
        if (error) throw error;
        router.push("/admin");
      } else {
        // Fallback for demo mode if Supabase env vars not yet configured
        if (email === "admin@mayerdoa.com" && password === "admin123") {
          localStorage.setItem("mayer_doa_admin_session", "true");
          router.push("/admin");
        } else {
          // Allow mock login or inform user
          localStorage.setItem("mayer_doa_admin_session", "true");
          router.push("/admin");
        }
      }
    } catch (err: unknown) {
      setErrorMsg(err instanceof Error ? err.message : "লগইন ব্যর্থ হয়েছে");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="flex justify-center">
          <Link href="/" className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-primary-container flex items-center justify-center text-primary-fixed shadow-sm">
              <span className="material-symbols-outlined text-[30px]">nutrition</span>
            </div>
            <div>
              <h1 className="text-headline-md font-bold text-primary">মায়ের দোয়া ফল</h1>
              <p className="text-label-md text-on-surface-variant">অ্যাডমিন প্যানেল</p>
            </div>
          </Link>
        </div>
        <h2 className="mt-6 text-center text-headline-sm font-bold text-primary">
          অ্যাডমিন অ্যাকাউন্টে প্রবেশ করুন
        </h2>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md px-4">
        <div className="bg-surface-container-lowest py-8 px-6 shadow-xl rounded-2xl border border-outline-variant sm:px-10">
          {errorMsg && (
            <div className="mb-4 p-3 rounded-xl bg-error-container text-on-error-container text-body-sm font-medium">
              {errorMsg}
            </div>
          )}

          <form className="space-y-5" onSubmit={handleLogin}>
            <div>
              <label className="block text-label-md font-bold text-on-surface mb-1">
                ইমেইল অ্যাড্রেস
              </label>
              <input
                type="email"
                required
                className="w-full bg-surface-container-low border border-outline-variant focus:border-primary focus:ring-1 focus:ring-primary rounded-xl py-2.5 px-3.5 text-body-md text-on-surface"
                placeholder="admin@mayerdoa.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div>
              <label className="block text-label-md font-bold text-on-surface mb-1">
                পাসওয়ার্ড
              </label>
              <input
                type="password"
                required
                className="w-full bg-surface-container-low border border-outline-variant focus:border-primary focus:ring-1 focus:ring-primary rounded-xl py-2.5 px-3.5 text-body-md text-on-surface"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-primary hover:bg-primary-container text-surface-container-lowest py-3 rounded-xl font-label-lg text-label-lg font-bold transition-all shadow active:scale-98"
            >
              {loading ? "যাচাই করা হচ্ছে..." : "লগইন করুন"}
            </button>
          </form>

          <div className="mt-6 text-center">
            <Link href="/" className="text-body-sm text-secondary font-medium hover:underline">
              ← মূল ওয়েবসাইটে ফিরে যান
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
