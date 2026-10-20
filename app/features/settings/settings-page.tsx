import ProfileCard from "@/app/features/settings/components/profile-card";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { User } from "@auth0/nextjs-auth0/types";
import { Eye, Lock, LogOut, Redo, Trash, X } from "lucide-react";
import Link from "next/link";
import { PreferenceChips } from "./components/preference-chips";
import { Genre } from "@/types";

export default function SettingsPage({user, genres}: {user: User, genres: Genre[]}) {

  const PROFILE_SETTINGS = [
    {
      name: "Hide watched or rated movies",
      description: "Hide movies that you had either watched or rated.",
      value: "Hide movies",
      icon: <Eye size={18} className="min-w-3 h-auto" />,
      link: "/",
    },
    {
      name: "Clear my ratings and watchlist",
      description: "Clear rated movies and movies added in your watchlist",
      value: "Clear ratings and watchlists",
      icon: <X size={18} className="min-w-3 h-auto" />,
      link: "/",
    },
    {
      name: "Redo onboarding",
      description:
        "Allows you to rerun the onboarding process on the next successful sign in.",
      value: "Redo onboarding",
      icon: <Redo size={18} className="min-w-3 h-auto" />,
      link: "/",
    },
  ];
  const SECURITY_SETTINGS = [
    {
      name: "Delete your account",
      description: "This action is irreversible",
      value: "Delete account",
      icon: <Trash size={18} className="min-w-3 h-auto" />,
      className:
        "border-red-400 text-red-400 hover:bg-red-400/25 active:bg-red-400 active:border-red-800 active:text-red-800",
      link: "/",
    },
  ];
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
            <ProfileCard user={user}/>
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

        <article className="flex flex-col w-full h-fit py-5 gap-5">
          {PROFILE_SETTINGS.map((item, id) => (
            <div className="flex w-full justify-between items-center" key={id}>
              <div className="flex flex-col">
                <p className="text-md font-semibold">{item.name}</p>
                <p className="text-[0.8rem] text-white/70">
                  {item.description}
                </p>
              </div>

              <Button
                type="button"
                className="border border-white cursor-pointer hover:bg-white/25 active:border-white active:bg-white active:text-black"
              >
                <Link href={item.link} className="flex w-fit gap-2 items-center">
                  {item.icon}
                  <p>{item.value}</p>
                </Link>
              </Button>
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

              <Button
                type="button"
                className={`border cursor-pointer ${item.className}`}
              >
                <Link href={item.link} className="flex w-fit gap-2 items-center">
                  {item.icon}
                  <p>{item.value}</p>
                </Link>
              </Button>
            </div>
          ))}
        </article>
      </section>
    </main>
  );
}
