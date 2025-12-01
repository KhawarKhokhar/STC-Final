// app/login/page.tsx
"use client";

import { useEffect, useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/lib/firebase";
import { useRouter, useSearchParams } from "next/navigation";
import { motion } from "framer-motion";
import { useAuth } from "@/context/AuthContext";

export default function LoginPage() {
  const { user, loading } = useAuth();
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [err, setErr] = useState("");

  useEffect(() => {
    if (!loading && user) router.replace("/dashboard");
  }, [user, loading, router]);

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    setErr("");

    try {
      await signInWithEmailAndPassword(auth, email, password);
      router.replace("/dashboard");
    } catch (error: any) {
      setErr(error.message);
    }
  }

  if (loading) return null;

  return (
    <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-[#F7F5F0] to-[#E4DED4] px-6 py-4">
      <motion.form
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        onSubmit={handleLogin}
        className="
          backdrop-blur-xl bg-white/60 border border-white/40
          w-full max-w-sm p-8 rounded-3xl shadow-lg space-y-6
        "
      >
        <div className="text-center space-y-1">
          <h1 className="text-xl font-bold text-gray-900 tracking-tight">
            Welcome To STC Dashboard
          </h1>
          <p className="text-xs text-gray-600 pt-5">Login to continue</p>
        </div>

        <div className="space-y-4">
          <div>
            <label className="text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              className="
                w-full mt-1 p-2 rounded-xl border border-gray-300 
                focus:outline-none focus:ring-2 focus:ring-black/80 transition
              "
              placeholder="your@email.com"
              type="email"
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div>
            <label className="text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              className="
                w-full mt-1 p-2 rounded-xl border border-gray-300 
                focus:outline-none focus:ring-2 focus:ring-black/80 transition
              "
              placeholder="••••••••"
              type="password"
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
        </div>

        {err && (
          <p className="text-sm text-red-600 wrap-break-word">
            {err}
          </p>
        )}

        <button
          className="
            w-full p-3 rounded-xl bg-black text-white font-medium
            hover:bg-neutral-800 transition active:scale-[0.98]
          "
        >
          Login
        </button>

        <p className="text-center text-xs text-gray-600 pt-2">
          © {new Date().getFullYear()} Sales Tax Corp
        </p>
      </motion.form>
    </div>
  );
}
