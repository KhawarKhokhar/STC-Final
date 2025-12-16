"use client";

import { ReactNode, useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import Loader from "@/components/ui/Loader";
import { useAuth } from "@/context/AuthContext";

export default function ProtectedRoute({ children }: { children: ReactNode }) {
  const { user, loading } = useAuth();
  const router = useRouter();
  const pathname = usePathname();

  // ✅ avoid SSR/client mismatch, and avoid redirect before mount
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  useEffect(() => {
    if (mounted && !loading && !user) {
      const continueTo = encodeURIComponent(pathname || "/dashboard");
      router.replace(`/login?continueTo=${continueTo}`);
    }
  }, [mounted, loading, user, router, pathname]);

  // Stable fallback while checking auth
  if (!mounted || loading) {
    return (
      <div className="h-screen w-screen flex items-center justify-center">
        <Loader />
      </div>
    );
  }

  if (!user) return null;

  return <>{children}</>;
}
