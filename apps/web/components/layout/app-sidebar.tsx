"use client";

import * as React from "react";
import Link from "next/link";
import {
  IconHelp,
  IconSettings,
  IconChartBar,
  IconDashboard,
  IconBriefcase2,
  IconInnerShadowTop,
} from "@tabler/icons-react";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { NavMain } from "@/components/layout/nav-main";
import { authClient } from "@/lib/auth-client";
import { NavSecondary } from "@/components/layout/nav-secondary";
import { NavUser, NavUserSkeleton } from "@/components/layout/nav-user";

const nav = {
  navMain: [
    {
      title: "Dashboard",
      url: "/",
      icon: IconDashboard,
    },
    {
      title: "Jobs",
      url: "/jobs",
      icon: IconBriefcase2,
    },
    {
      title: "Analytics",
      url: "/analytics",
      icon: IconChartBar,
    },
  ],
  navSecondary: [
    {
      title: "Settings",
      url: "/settings",
      icon: IconSettings,
    },
    {
      title: "Get Help",
      url: "/help",
      icon: IconHelp,
    },
  ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const { data: session, isPending } = authClient.useSession();

  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              asChild
              className="data-[slot=sidebar-menu-button]:p-1.5!"
            >
              <Link href="/">
                <IconInnerShadowTop className="size-5!" />
                <span className="text-base font-semibold">Jobles</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={nav.navMain} />
        <NavSecondary items={nav.navSecondary} className="mt-auto" />
      </SidebarContent>
      <SidebarFooter>
        {isPending ? <NavUserSkeleton /> : <NavUser user={session?.user} />}
      </SidebarFooter>
    </Sidebar>
  );
}
