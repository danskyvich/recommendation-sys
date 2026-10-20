"use client";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupAction,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
  useSidebar,
} from "@/components/ui/sidebar";
import {
  ArrowUpRight,
  ChevronDown,
  ChevronRight,
  ChevronsUpDown,
  Eye,
  Home,
  LogOut,
  Star,
  Toolbox,
  UserIcon,
} from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import {
  DropdownMenu,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import ProfileCard from "./profile-card";
import type { User } from "@auth0/nextjs-auth0/types";
import { redirect } from "next/navigation";

export default function AppSidebar({ user }: { user: User | undefined }) {
  const [expanded, setExpanded] = useState<boolean>(true);
  const { state } = useSidebar();

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
      link: "/settings#general",
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

  const DROPDOWN_MENU = [
    {
      name: "Log out",
      id: "log-out",
      icon: <LogOut size={18} className="min-w-3 h-auto" />,
      link: "/auth/logout",
    },
    {
      name: "Profile",
      id: "profile",
      icon: <UserIcon size={18} className="min-w-3 h-auto" />,
      link: "/settings#profile",
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
        <SidebarHeader className="flex w-full items-center justify-center pt-15 pb-0 px-3"></SidebarHeader>

        {/* Content */}
        <SidebarContent>
          <SidebarGroup>
            <SidebarGroupAction />
            <SidebarGroupContent>
              {/* Menu */}
              <SidebarMenu>
                {SIDEBAR_CONTENT.filter(
                  (item) => user || item.name === "Home",
                ).map((item, id) => (
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
              {user && expanded && state === "expanded" && (
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

        <SidebarFooter className="relative flex flex-row w-full h-fit items-center justify-between">
          {user ? (
            <DropdownMenuTrigger>
              <Button className="flex w-full my-3 items-center justify-between rounded-lg px-2 py-7 outline-none cursor-pointer hover:bg-(--color-brand-black)/70">
                {state === "expanded" && <ProfileCard user={user} />}
                <ChevronsUpDown size={18} className="min-w-3 h-auto" />
              </Button>

              <DropdownMenu
                placement="right"
                className="w-56 bg-slate-950 border border-white/25 rounded-lg"
              >
                <DropdownMenuGroup>
                  <DropdownMenuItem>
                    <ProfileCard user={user} />
                  </DropdownMenuItem>
                </DropdownMenuGroup>
                <DropdownMenuSeparator className="border-0 bg-white/15" />
                <DropdownMenuGroup>
                  {DROPDOWN_MENU.map((item) => (
                    <DropdownMenuItem
                      key={item.id}
                      href={item.link}
                      className="flex w-full cursor-pointer"
                    >
                      {item.icon}
                      <span className="text-sm">{item.name}</span>
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuGroup>
              </DropdownMenu>
            </DropdownMenuTrigger>
          ) : (
            <>
              {
                state === "expanded" ? (
                  <Button
                  type="submit"
                  onClick={() => redirect("/login")}
                  className="border border-white/75 rounded-lg hover:bg-white/15 w-full active:bg-white active:text-black cursor-pointer font-sans items-center my-3"
                  >
                    <ArrowUpRight size={18} className="min-w-3 h-auto text-white"/>
                    <p>Sign in</p>
                  </Button>
                ) : (
                  <div className="flex w-full h-fit my-3 items-center justify-center">
                    <ChevronsUpDown size={18} className="min-w-3 h-auto"/>
                  </div>
                )
              }
            </>
          )}
        </SidebarFooter>
        <SidebarRail className="cursor-pointer" />
      </Sidebar>
    </div>
  );
}
