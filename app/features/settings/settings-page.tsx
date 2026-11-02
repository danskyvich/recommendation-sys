"use client"

import ProfileCard from "@/app/features/settings/components/profile-card";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { User } from "@auth0/nextjs-auth0/types";
import { LogOut, Redo, Trash, X } from "lucide-react";
import Link from "next/link";
import { clearRatingsAndWatchlist, deleteAccount, hideAndShowMovies, redoOnboarding } from "./actions";
import { PreferenceChips } from "./components/preference-chips";
import { Genre } from "@/types";
import { useEffect, useState, useTransition } from "react";
import { DialogTrigger } from "@/components/ui/dialog";
import DialogComponent from "@/app/components/layout/dialog";
import { Switch } from "@/components/ui/switch";

interface SettingsPageProps {
  user: User | null,
  genres: Genre[],
  initialHideMovies: boolean,
}

export default function SettingsPage({ user, genres, initialHideMovies }: SettingsPageProps) {
  useEffect(() => {
    document.title = "Settings | Film.io";
  }, []);

  const [switchToggle, setSwitchToggle] = useState<boolean>(initialHideMovies);
  const [isPending, startTransition] = useTransition();

  const PROFILE_SETTINGS = [
    {
      name: "Clear my ratings and watchlist",
      description: "Clear rated movies and movies added in your watchlist",
      value: "Clear ratings and watchlists",
      icon: <X size={18} className="min-w-3 h-auto" />,
      content:
        "Are you sure you want to clear your watchlist and all rated movies?",
      onConfirm: clearRatingsAndWatchlist,
      yesButtonText: "Clear data",
      noButtonText: "No",
      pendingText: "Clearing...",
    },
    {
      name: "Redo onboarding",
      description:
        "Allows you to rerun the onboarding process on the next successful sign in.",
      value: "Redo onboarding",
      icon: <Redo size={18} className="min-w-3 h-auto" />,
      content:
        "Do you want to clear your onboarding options and redo it? This will take effect on the next sign in.",
      onConfirm: redoOnboarding,
      yesButtonText: "Redo onboarding",
      noButtonText: "No",
      pendingText: "Saving...",
    },
  ];
  const SECURITY_SETTINGS = [
    {
      name: "Delete your account",
      description: "This action is irreversible",
      value: "Delete account",
      icon: <Trash size={18} className="min-w-3 h-auto" />,
      aria_label: "delete-account-button",
      className:
        "border-red-400 text-red-400 hover:bg-red-400/25 active:bg-red-400 active:border-red-800 active:text-red-800",
      title: "Are you sure?",
      content:
        "This action cannot be undone. This will permanently delete your account and remove your data from our servers.",
      onConfirm: deleteAccount,
      yesButtonText: "Delete my account",
      noButtonText: "Back",
      pendingText: "Deleting...",
    },
  ];

  const handleHideMovies = (value: boolean) => {
    setSwitchToggle(value);

    startTransition(async () => {
      const result = await hideAndShowMovies(value);
      if (!result.success) setSwitchToggle(!value); // unchanged
    });
  };

  return (
    <main className="flex flex-col w-full h-full overflow-y-auto overflow-x-hidden px-[5dvw] sm:px-[10dvw] xl:px-[20dvw] pt-10 pb-[5%] gap-3">
      {/* General settings */}
      <section className="flex flex-col w-full h-fit mt-15">
        <h1 className="text-2xl font-semibold" id="general">
          General settings
        </h1>
        <hr className="border-white/25" />

        {/* Profile card */}
        <Card size={"default"} className="w-full bg-slate-900 my-4 rounded-xl">
          <CardContent className="flex w-full justify-between">
            {user && <ProfileCard user={user} />}
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
          <article className="py-2">
            <h2 className="text-xl ">Preferences</h2>
            <h3 className="text-sm text-white/70 font-light pb-3">
              Choose preferred and excluded genres
            </h3>
          </article>

          <article className="flex flex-col w-full gap-5">
            <PreferenceChips data={genres} label="Liked" />
            <PreferenceChips data={genres} label="Excluded" />
          </article>
        </div>
      </section>

      {/* Profile */}
      <section className="flex flex-col w-full h-fit pt-10">
        <h1 className="text-2xl font-semibold" id="profile">
          Your profile
        </h1>
        <hr className="border-white/25" />

        {/* Hide rated movies and watchlist movies */}
        <article className="flex flex-col w-full h-fit py-5 gap-5">
          <div className="flex w-full justify-between items-center">
            <div className="flex flex-col">
              <p className="text-md font-semibold">
                Hide watchlist and rated movies
              </p>
              <p className="text-[0.8rem] text-white/70">
                Hide your watchlist movies and rated movies from the dashboard.
              </p>
            </div>
            <Switch
              size="default"
              id="switch-checked-hide"
              className="cursor-pointer"
              isSelected={switchToggle}
              onChange={handleHideMovies}
              isDisabled={isPending}
            ></Switch>
          </div>

          {/* Clear watchlist and rated + redo onboarding buttons */}
          {PROFILE_SETTINGS.map((item, id) => (
            <div className="flex w-full justify-between items-center" key={id}>
              <div className="flex flex-col">
                <p className="text-md font-semibold">{item.name}</p>
                <p className="text-[0.8rem] text-white/70">
                  {item.description}
                </p>
              </div>
              <DialogTrigger>
                <Button
                  type="button"
                  onPress={() => console.log("pressed")}
                  aria-label={`${item.value} button`}
                  className="border border-white cursor-pointer hover:bg-white/25 active:border-white active:bg-white active:text-black"
                >
                  {item.icon}
                  <p>{item.value}</p>
                </Button>
                <DialogComponent
                  title={item.name}
                  content={item.content}
                  yesButtonText={item.yesButtonText}
                  noButtonText={item.noButtonText}
                  pendingText={item.pendingText}
                  onConfirm={item.onConfirm}
                />
              </DialogTrigger>
            </div>
          ))}
        </article>
      </section>

      {/* Security */}
      <section className="flex flex-col w-full h-fit pt-10">
        <h1 className="text-2xl font-semibold" id="security">
          Account security
        </h1>
        <hr className="border-white/25" />

        <article className="flex flex-col w-full h-fit py-5 gap-5">
          {SECURITY_SETTINGS.map((item, id) => (
            <div className="flex w-full justify-between items-center" key={id}>
              <div className="flex flex-col">
                <p className="text-md font-semibold">{item.name}</p>
                <p className="text-[0.8rem] text-white/70">
                  {item.description}
                </p>
              </div>

              <DialogTrigger>
                <Button
                  type="button"
                  aria-label={item.aria_label}
                  className={`border cursor-pointer ${item.className}`}
                >
                  {item.icon}
                  <p>{item.value}</p>
                </Button>
                <DialogComponent
                  content={item.content}
                  title={item.title}
                  onConfirm={item.onConfirm}
                  yesButtonText={item.yesButtonText}
                  noButtonText={item.noButtonText}
                  pendingText={item.pendingText}
                />
              </DialogTrigger>
            </div>
          ))}
        </article>
      </section>
    </main>
  );
}
