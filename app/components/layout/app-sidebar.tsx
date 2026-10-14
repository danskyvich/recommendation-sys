"use client"

import { Sidebar, SidebarContent, SidebarFooter, SidebarGroup, SidebarGroupAction, SidebarGroupContent, SidebarGroupLabel, SidebarHeader, SidebarMenu, SidebarMenuBadge, SidebarMenuButton, SidebarMenuItem, SidebarTrigger } from "@/components/ui/sidebar";
import { ChevronRight, Eye, Home, Star, Toolbox } from "lucide-react";
import Link from "next/link";
import { User } from "@auth0/nextjs-auth0/types";
import ProfileDialog from "./profile-dialog";
import { useState } from "react";

export default function AppSidebar({ user }: { user: User }) {

    const [profileOpen, setProfileOpen] = useState(false);

    const SIDEBAR_CONTENT = [
      {
        name: "Home",
        icon: <Home size={15} className="min-w-3 h-auto text-white/70" />,
        link: "/dashboard",
      },
      {
        name: "Watchlist",
        icon: <Eye size={15} className="min-w-3 h-auto text-white/70" />,
        link: "/watchlist",
      },
      {
        name: "Ratings",
        icon: <Star size={15} className="min-w-3 h-auto text-white/70" />,
        link: "/ratings",
      },
      {
        name: "Settings",
        icon: <Toolbox size={15} className="min-w-3 h-auto text-white/70" />,
        link: "/settings",
      },
    ];
    return (
      <div className="flex h-full">
        <Sidebar
          variant="sidebar"
          collapsible="icon"
          side="left"
          className="border-r border-gray-800 bg-black/35"
        >
          <SidebarHeader className="flex w-full"></SidebarHeader>

          {/* Content */}
          <SidebarContent>
            <SidebarGroup>
              <SidebarGroupLabel>
                <p className="text-sm font-sans text-white/60">Movies</p>
              </SidebarGroupLabel>
              <SidebarGroupAction />
              <SidebarGroupContent>
                {/* Menu */}
                <SidebarMenu>
                  {SIDEBAR_CONTENT.map((item, id) => (
                    <SidebarMenuItem key={id}>
                      <SidebarMenuButton className="flex cursor-pointer hover:bg-(--color-brand-black)/60">
                        <Link
                          href={item.link}
                          className="flex w-full items-center justify-between"
                        >
                          <div className="flex justify-center gap-3">
                            {item.icon}
                            <span>{item.name}</span>
                          </div>
                          <ChevronRight size={15} className="min-w-3 h-auto" />
                        </Link>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  ))}
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
          </SidebarContent>
          <SidebarFooter className="relative flex w-full h-fit py-5 gap-3 items-center">
            <ProfileDialog user={ user }/>
          </SidebarFooter>
        </Sidebar>
        <SidebarTrigger className="cursor-pointer" />
      </div>
    );
}