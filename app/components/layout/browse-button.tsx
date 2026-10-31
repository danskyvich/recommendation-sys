import { Button } from "@/components/ui/button";
import { ArrowUpRight } from "lucide-react";
import { redirect } from "next/navigation";

export default function BrowseMoviesButton () {
    return (
      <Button
        className="border border-white rounded-2xl cursor-pointer hover:bg-white/25 active:bg-white active:text-black"
        onClick={() => redirect("/dashboard")}
      >
        <ArrowUpRight size={18} className="text-white" />
        <p className="text-sm font-sans text-white">Browse movies</p>
      </Button>
    );
}