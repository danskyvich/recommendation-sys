import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { User } from "@auth0/nextjs-auth0/types";
import { ChevronsUpDown } from "lucide-react";

export default function ProfileCard({
  user,
  hideIcon = false,
}: {
  user: User;
  hideIcon?: boolean;
}) {
  const name = user.nickname ?? user.name ?? user.email ?? "User";

  return (
    <div className="flex w-full gap-3 justify-between">
      <div className="flex w-fit gap-3">
        <Avatar size="lg" className="">
          <AvatarImage src={user.picture} alt="" />
          <AvatarFallback>{name[0].toUpperCase()}</AvatarFallback>
        </Avatar>
        <div>
          <div className="flex flex-col">
            <span className="text-sm font-semibold">{name}</span>
            <span className="font-light text-[0.75rem]">{user.email}</span>
          </div>
        </div>
      </div>
      {!hideIcon && (
        <ChevronsUpDown size={18} className="ml-auto min-w-3 h-auto" />
      )}
    </div>
  );
}
