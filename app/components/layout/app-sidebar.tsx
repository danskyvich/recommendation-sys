"use client"

import { Sidebar, SidebarContent, SidebarFooter, SidebarGroup, SidebarGroupAction, SidebarGroupContent, SidebarGroupLabel, SidebarHeader, SidebarMenu, SidebarMenuBadge, SidebarMenuButton, SidebarMenuItem, SidebarTrigger } from "@/components/ui/sidebar";
import { ChevronRight, ChevronsUpDown, Eye, Home, Star, Toolbox } from "lucide-react";
import Link from "next/link";
import { Avatar, AvatarBadge, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { User } from "@auth0/nextjs-auth0/types";
import { DropdownMenu, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import ProfileDialog from "./profile-dialog";

export default function AppSidebar({ user }: { user: User }) {

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
            <DropdownMenu>
                <DropdownMenuTrigger 
                    render={
                        <div
                            className="flex gap-3 p-2 rounded-lg hover:bg-(--color-brand-black)/70 cursor-pointer"
                            role="button"
                        >
                            <>
                                <Avatar className="flex w-fit" size="lg">
                                    <AvatarImage src={user.picture} alt="user_profile_picture" />
                                    <AvatarFallback></AvatarFallback>
                                    <AvatarBadge className="bg-green-400" />
                                </Avatar>
                                <div className="flex flex-col">
                                    <p className="text-sm font-semibold">{user.nickname}</p>
                                    <p className="font-light text-[0.75rem] flex w-fit rounded-md">
                                        {user.email}
                                    </p>
                                </div>
                            </>
                            <>
                                <ChevronsUpDown size={18} className="min-w-3 h-auto " />
                            </>
                        </div>
                    }
                />
                <ProfileDialog user={user}/>
            </DropdownMenu>
          </SidebarFooter>
        </Sidebar>
        <SidebarTrigger className="cursor-pointer" />
      </div>
    );
}