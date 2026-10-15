import ProfileCard from "@/app/components/layout/profile-card";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { User } from "@auth0/nextjs-auth0/types";
import { LogOut } from "lucide-react";
import Link from "next/link";

export default function SettingsPage({user}: {user: User}) {
  return (
    <main className="flex flex-col w-full h-full overflow-y-auto overflow-x-hidden px-[5dvw] sm:px-[10dvw] xl:px-[20dvw] pt-10 gap-3">
      {/* General settings */}
      <section className="flex flex-col w-full h-fit">
        <h1 className="text-2xl font-semibold" id="general">
          General settings
        </h1>
        <hr className="border-white/25" />

        {/* Profile card */}
        <Card size={"default"} className="w-full bg-slate-900 my-4 rounded-xl">
          <CardContent className="flex w-full justify-between">
            <ProfileCard user={user} hideIcon={true} />
            <Button
              type="button"
              className="border border-red-400 rounded-lg hover:bg-red-400/25 cursor-pointer active:bg-red-400/50"
            >
              <Link
                href="/auth/logout"
                className="flex gap-2 items-center justify-center"
              >
                <LogOut size={18} className="min-w-3 h-auto text-red-400" />
                <p className="text-red-400">Log out</p>
              </Link>
            </Button>
          </CardContent>
        </Card>

        {/* Preferences */}
        <div className="flex flex-col w-full">
          <h2 className="text-xl pb-3">Preferences</h2>

          {/* Liked */}
          <Label>Liked</Label>
          <ToggleGroup variant={"default"} orientation="horizontal">
            <ToggleGroupItem>A</ToggleGroupItem>
            <ToggleGroupItem>B</ToggleGroupItem>
            <ToggleGroupItem>C</ToggleGroupItem>
          </ToggleGroup>

          {/* Avoid */}
          <Label>Excluded</Label>
          <ToggleGroup variant={"default"} orientation="horizontal">
            <ToggleGroupItem>A</ToggleGroupItem>
            <ToggleGroupItem>B</ToggleGroupItem>
            <ToggleGroupItem>C</ToggleGroupItem>
          </ToggleGroup>
        </div>
      </section>

      <h1 className="text-2xl font-semibold" id="profile">
        Your profile
      </h1>
      <hr className="border-white/25" />
      <h1 className="text-2xl font-semibold" id="security">
        Account security
      </h1>
      <hr className="border-white/25" />
    </main>
  );
}
