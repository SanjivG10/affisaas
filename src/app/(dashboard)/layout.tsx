"use client";

import { Sidebar } from "@/components/ui/sidebar";
import { useAuth } from "../context/AuthContext";
import { useEffect } from "react";
import { PAGES } from "@/lib/urls";
import { useRouter } from "next/navigation";
import Spinner from "@/components/ui/spinner";

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  const { user, isAuthLoading } = useAuth();

  const router = useRouter();

  useEffect(() => {
    if (!user && !isAuthLoading) {
      router.push(PAGES.SIGN_IN);
      return;
    }

    if (user && user.businessName && user.domain) {
      router.push(PAGES.DASHBOARD);
    } else if (user && !user.businessName && !user.domain) {
      router.push(PAGES.ONBOARDING);
    }
  }, [user, isAuthLoading]);

  if (isAuthLoading) {
    return <Spinner />;
  }

  return (
    <div className="flex h-screen">
      <Sidebar />
      <main className="flex-1 overflow-y-auto p-8">{children}</main>
    </div>
  );
};

export default DashboardLayout;
