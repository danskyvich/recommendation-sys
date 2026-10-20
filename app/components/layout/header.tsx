import { Button } from "@/components/ui/button";
import { Bell, Earth, Film, SearchIcon } from "lucide-react";

export default function Header() {
    return (
      <header className="fixed z-50 flex items-center px-5 py-1 justify-between bg-slate-950/55 w-full h-[5%] border-b border-gray-800 backdrop-blur-xl">
        <div className="flex gap-2">
          <Film size={18} className="min-w-3 h-auto"/>
            <p className="text-2xl font-semibold">Film.io</p>
        </div>
        <div className="flex">
          <Button
            type="button"
            className="border border-gray-700 rounded-xl hover:bg-(--color-brand-black)/75 cursor-pointer"
          >
            <SearchIcon size={20} className="min-w-3 h-auto" />
            <p>Search</p>
          </Button>

          <Button type="button" className="cursor-pointer">
            <Bell size={20} className="min-w-3 h-auto" />
          </Button>

          <Button type="button" className="cursor-pointer">
            <Earth size={20} className="min-w-3 h-auto" />
          </Button>
        </div>
      </header>
    );
}