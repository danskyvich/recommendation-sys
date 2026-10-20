"use client"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { User } from "@auth0/nextjs-auth0/types";

export default function ProfileCard({
  user,
}: {
  user: User;
}) {
  const name = user.nickname ?? user.name ?? user.email ?? "User";

  return (
    <div className="flex w-full gap-3 justify-between">
      <div className="flex w-fit gap-3">
        <Avatar size="lg">
          <AvatarImage src={user.picture} alt="" />
          <AvatarFallback>{name[0].toUpperCase()}</AvatarFallback>
        </Avatar>
        <div>
          <div className="flex flex-col items-start">
            <span className="text-sm font-semibold">{name}</span>
            <span className="font-light text-[0.75rem]">{user.email}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
