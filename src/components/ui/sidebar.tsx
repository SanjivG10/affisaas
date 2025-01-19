"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import {
  Store,
  Users,
  CreditCard,
  Settings,
  LayoutDashboard,
  LogOut,
  Menu,
  X,
} from "lucide-react";
import { Button } from "./button";
import { PAGES } from "@/lib/urls";
import { useState } from "react";

const routes = [
  {
    label: "Dashboard",
    icon: LayoutDashboard,
    href: "/dashboard",
  },
  {
    label: "Marketplace",
    icon: Store,
    href: "/marketplace",
  },
  {
    label: "Affiliates",
    icon: Users,
    href: "/affiliates",
  },
  {
    label: "Billing",
    icon: CreditCard,
    href: "/billing",
  },
  {
    label: "Settings",
    icon: Settings,
    href: "/settings",
  },
];

export function Sidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem("jwt");
    localStorage.removeItem("user");
    router.push(PAGES.SIGN_IN);
  };

  return (
    <>
      <button
        className="lg:hidden fixed top-2 right-4 z-50 p-2 rounded-md bg-gray-200 hover:bg-gray-300"
        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
      >
        {isSidebarOpen ? (
          <X className="w-6 h-6" />
        ) : (
          <Menu className="w-6 h-6" />
        )}
      </button>
      <div
        className={cn(
          "fixed inset-y-0 left-0 z-40 transition-transform duration-300 transform lg:translate-x-0 lg:relative",
          "space-y-4 py-4 flex flex-col h-full bg-gray-100 text-gray-800 w-64",
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        <div className="space-y-4 py-4 flex flex-col h-full bg-gray-100 text-gray-800 w-64">
          <div className="px-3 py-2 flex-1">
            <Link href="/dashboard" className="flex items-center pl-3 mb-14">
              <h1 className="text-2xl font-bold">AffiSaaS</h1>
            </Link>
            <div className="space-y-1">
              {routes.map((route) => (
                <Link
                  key={route.href}
                  href={route.href}
                  className={cn(
                    "text-sm group flex p-3 w-full justify-start font-medium cursor-pointer hover:text-gray-900 hover:bg-gray-200 rounded-lg transition",
                    pathname === route.href
                      ? "text-gray-900 bg-gray-200"
                      : "text-gray-500"
                  )}
                >
                  <div className="flex items-center flex-1">
                    <route.icon className={cn("h-5 w-5 mr-3")} />
                    {route.label}
                  </div>
                </Link>
              ))}
            </div>
          </div>

          <Button
            variant="outline"
            className="w-full mt-auto"
            onClick={handleLogout}
          >
            <LogOut className="w-4 h-4 mr-2" />
            Logout
          </Button>
        </div>
      </div>

      {/* Overlay for mobile */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-30 lg:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}
    </>
  );
}
