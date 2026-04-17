"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { BarChart3, Briefcase, GalleryVerticalEnd } from "lucide-react";

export function Sidebar() {
  const pathname = usePathname();

  const isActive = (path: string) => pathname === path;

  return (
    <aside className="w-64 border-r border-border bg-sidebar text-sidebar-foreground">
      <div className="space-y-2 p-6 flex items-center gap-3 mb-4">
        <div className="bg-primary text-primary-foreground flex size-8 items-center justify-center rounded-md m-0">
          <GalleryVerticalEnd className="size-4" />
        </div>
        <h1 className="text-xl font-bold">Jobles</h1>
      </div>
      <nav className="space-y-2 p-6">
        <Link
          href="/"
          className={`flex items-center gap-3 rounded-md px-3 py-2 text-sm transition-colors ${
            isActive("/")
              ? "bg-sidebar-primary text-sidebar-primary-foreground"
              : "hover:bg-sidebar-accent"
          }`}
        >
          <BarChart3 className="h-5 w-5" />
          <span>Dashboard</span>
        </Link>

        <Link
          href="/jobs"
          className={`flex items-center gap-3 rounded-md px-3 py-2 text-sm transition-colors ${
            isActive("/jobs")
              ? "bg-sidebar-primary text-sidebar-primary-foreground"
              : "hover:bg-sidebar-accent"
          }`}
        >
          <Briefcase className="h-5 w-5" />
          <span>Jobs</span>
        </Link>
      </nav>
    </aside>
  );
}
