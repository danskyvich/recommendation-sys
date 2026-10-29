import ProfileCard from "@/app/features/settings/components/profile-card";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuGroup, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { SidebarFooter } from "@/components/ui/sidebar";
import { User } from "@auth0/nextjs-auth0/types";
import { ArrowUpRight, ChevronsUpDown, LogOut, UserIcon } from "lucide-react";
import { redirect, useRouter } from "next/navigation";
import DialogComponent from "../dialog";
import { logout } from "@/app/features/dashboard/actions";
import { DialogTrigger } from "@/components/ui/dialog";
import { useState } from "react";

export default function SidebarDropdown({user, state}: {user: User | undefined, state: string}) {

    const [logoutOpen, setLogoutOpen] = useState<boolean>(false);

    return (
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
                <DropdownMenuItem
                  className="flex w-full cursor-pointer"
                  onAction={() => setLogoutOpen(true)}
                >
                  <LogOut size={18} className="min-w-3 h-auto" />
                  <span className="text-sm">Log out</span>
                </DropdownMenuItem>
                <DropdownMenuItem
                  href={"/settings#profile"}
                  className="flex w-full cursor-pointer"
                >
                  <UserIcon size={18} className="min-w-3 h-auto" />
                  <span className="text-sm">Profile</span>
                </DropdownMenuItem>
              </DropdownMenuGroup>
            </DropdownMenu>
          </DropdownMenuTrigger>
        ) : (
          <>
            {state === "expanded" ? (
              <Button
                type="submit"
                onClick={() => redirect("/login")}
                className="border border-white/75 rounded-lg hover:bg-white/15 w-full active:bg-white active:text-black cursor-pointer font-sans items-center my-3"
              >
                <ArrowUpRight size={18} className="min-w-3 h-auto text-white" />
                <p>Sign in</p>
              </Button>
            ) : (
              <div className="flex w-full h-fit my-3 items-center justify-center">
                <ChevronsUpDown size={18} className="min-w-3 h-auto" />
              </div>
            )}
          </>
        )}

        <DialogTrigger isOpen={logoutOpen} onOpenChange={setLogoutOpen}>
          <DialogComponent
            title="Log out of your account"
            content="Do you want to log out of your account"
            onConfirm={logout}
            yesButtonText="Log out"
            noButtonText="Go back"
            pendingText="Signing out..."
          />
        </DialogTrigger>
      </SidebarFooter>
    );
}