"use client"

import { Button } from "@/components/ui/button";
import { FilmIcon } from "lucide-react";
import { redirect } from "next/navigation";

export default function Navbar() {
    return(
        <section className="flex w-full h-[5%] bg-slate-950 border-b border-white/25 px-10 py-2 justify-between items-center backdrop-blur-2xl">
            <a className="flex w-fit gap-2 items-center" href="/">
                <FilmIcon size={25} className="min-w-3 h-auto"/>
                <p className="font-bold text-xl">Film.io</p>
            </a>

            <div className="">
                <Button className="flex border border-white hover:bg-white/15 cursor-pointer active:bg-white active:text-black"
                    type="button"
                    onClick={() => redirect("/login")}
                >
                    <p>Sign in</p>
                </Button>
            </div>
        </section>
    )
}