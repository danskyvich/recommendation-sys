// profile-dialog.tsx
"use client";

import { Button } from "react-aria-components";
import { ChevronsUpDown, LogOut, UserIcon } from "lucide-react";
import type { User } from "@auth0/nextjs-auth0/types";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Link from "next/link";
import { useSidebar } from "@/components/ui/sidebar";

export default function ProfileDialog({ user }: { user: User }) {
  const name = user.nickname ?? user.name ?? user.email ?? "User";
  const { state } = useSidebar();

  const DROPDOWN_CONTENT = [
    {
      name: "Log out",
      id: "log-out",
      link: "/auth/logout",
      icon: <LogOut size={18} className="min-w-3 h-auto text-white" />,
    },
    {
      name: "View profile",
      id: "view-profile",
      link: "/settings#profile",
      icon: <UserIcon size={18} className="min-w-3 h-auto text-white" />,
    },
  ];

  return (
    <DropdownMenuTrigger>
      <Button className="flex w-full items-center gap-3 py-4 rounded-lg text-left outline-none cursor-pointer hover:bg-(--color-brand-black)/70">
        <Avatar size={state !== "expanded" ? "sm" : "lg"} className="">
          <AvatarImage src={user.picture} alt="" />
          <AvatarFallback>{name[0].toUpperCase()}</AvatarFallback>
        </Avatar>
        {state === "expanded" && (
          <>
            <div className="flex flex-col">
              <span className="text-sm font-semibold">{name}</span>
              <span className="font-light text-[0.75rem]">{user.email}</span>
            </div>
            <ChevronsUpDown size={18} className="ml-auto min-w-3 h-auto" />
          </>
        )}
      </Button>

      <DropdownMenu
        placement="right"
        className="flex bg-slate-950 border-white/10 border w-fit ml-3 rounded-lg"
      >
        <DropdownMenuGroup>
          <DropdownMenuItem>
            <Avatar size="lg">
              <AvatarImage src={user.picture} alt="" />
              <AvatarFallback>{name[0].toUpperCase()}</AvatarFallback>
            </Avatar>
            <div className="flex flex-col">
              <span className="text-sm font-semibold">{name}</span>
              <span className="font-light text-[0.75rem]">{user.email}</span>
            </div>
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator className="border-0 bg-white/15" />
        <DropdownMenuGroup className="cursor-pointer">
          {DROPDOWN_CONTENT.map((item) => (
            <DropdownMenuItem
              className="flex w-full cursor-pointer"
              key={item.id}
              href={item.link}
            >
              {item.icon}
              <span className="text-sm">{item.name}</span>
            </DropdownMenuItem>
          ))}
        </DropdownMenuGroup>
      </DropdownMenu>
    </DropdownMenuTrigger>
  );
}
