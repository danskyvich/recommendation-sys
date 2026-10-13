import Link from "next/link";

const LINKS = [
  {
    id: "github",
    name: "Github",
    link: "https://github.com/danskyvich",
  },
  {
    id: "portfolio",
    name: "Portfolio",
    link: "https://danppelin.vercel.app",
  },
  {
    id: "linkedin",
    name: "Linkedin",
    link: "https://www.linkedin.com/in/danilo-pelin-220313322/",
  },
];

export default function Footer() {
  return (
    <footer className="flex flex-row h-[5%] w-full bg-slate-800 justify-around gap-5">
        <div className="flex flex-1 items-center justify-end text-sm">
            <p className="font-light text-white/70">Made by <span className="font-semibold">Danilo Pelin</span></p>
        </div>
      <nav className="flex flex-1 w-full items-center justify-start gap-5">
        {
            LINKS.map((link) => (
                <Link href={link.link} id={link.id} key={link.id} className="text-sm font-sans cursor-pointer hover:underline">{link.name}</Link>
            ))
        }
      </nav>
    </footer>
  );
}
