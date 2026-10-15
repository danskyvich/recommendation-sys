"use client"

import { Sidebar, SidebarContent, SidebarFooter, SidebarGroup, SidebarGroupAction, SidebarGroupContent, SidebarGroupLabel, SidebarHeader, SidebarMenu, SidebarMenuBadge, SidebarMenuButton, SidebarMenuItem, SidebarRail, SidebarTrigger, useSidebar } from "@/components/ui/sidebar";
import { ChevronDown, ChevronRight, Eye, Film, Home, Star, Toolbox, User2 } from "lucide-react";
import Link from "next/link";
import { User } from "@auth0/nextjs-auth0/types";
import ProfileDialog from "./profile-dialog";
import {useState } from "react";

export default function AppSidebar({
  user,
}: {
  user: User;
}) {
  const [expanded, setExpanded] = useState<boolean>(true);
  const { state, setOpen, open } = useSidebar();

  const SIDEBAR_CONTENT = [
    {
      name: "Home",
      icon: <Home size={15} className="min-w-3 h-auto text-white/70" />,
      link: "/dashboard",
      isExpanded: false,
    },
    {
      name: "Watchlist",
      icon: <Eye size={15} className="min-w-3 h-auto text-white/70" />,
      link: "/watchlist",
      isExpanded: false,
    },
    {
      name: "Ratings",
      icon: <Star size={15} className="min-w-3 h-auto text-white/70" />,
      link: "/ratings",
      isExpanded: false,
    },
    {
      name: "Settings",
      icon: <Toolbox size={15} className="min-w-3 h-auto text-white/70" />,
      link: "/settings",
      isExpanded: true,
    },
  ];

  const SETTINGS = [
    {
      name: "General",
      link: "/settings#general"
    },
    {
      name: "Profile",
      link: "/settings#profile",
    },
    {
      name: "Security",
      link: "/settings#security",
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
        <SidebarHeader className="flex w-full items-center justify-center pt-5 pb-0 px-3"></SidebarHeader>

        {/* Content */}
        <SidebarContent>
          <SidebarGroup>
            <SidebarGroupAction />
            <SidebarGroupContent>
              {/* Menu */}
              <SidebarMenu>
                {SIDEBAR_CONTENT.map((item, id) => (
                  <SidebarMenuItem key={id}>
                    <SidebarMenuButton className="flex cursor-pointer hover:bg-(--color-brand-black)/60">
                      <Link
                        href={item.link}
                        onClick={() =>
                          item.isExpanded && setExpanded((prev) => !prev)
                        }
                        className="flex w-full items-center justify-between "
                      >
                        <div className="flex justify-center gap-3">
                          {item.icon}
                          <span>{item.name}</span>
                        </div>
                        {item.isExpanded &&
                          (!expanded ? (
                            <ChevronRight
                              size={15}
                              className="min-w-3 h-auto text-white/50"
                            />
                          ) : (
                            <ChevronDown
                              size={15}
                              className="min-w-3 h-auto text-white/50"
                            />
                          ))}
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
              {expanded && state === "expanded" && (
                <SidebarMenu className="pl-5">
                  {SETTINGS.map((item) => (
                    <SidebarMenuItem
                      key={item.name}
                      className="border-l border-white/25"
                    >
                      <SidebarMenuButton className="flex w-full hover:bg-(--color-brand-black)/75 cursor-pointer">
                        <Link href={item.link}>
                          <span className="text-sm font-light text-white/75 font-sans">
                            {item.name}
                          </span>
                        </Link>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  ))}
                </SidebarMenu>
              )}
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>
        <SidebarFooter className="relative flex w-full h-fit pt-3 gap-3 items-center">
          <ProfileDialog user={user}  />
        </SidebarFooter>
        <SidebarRail className="cursor-pointer" />
      </Sidebar>
    </div>
  );
}