import Navbar from "../features/marketing/components/navbar";

export default function LandingLayout({children}: {children: React.ReactNode}) {
    return( 
    <main className="flex flex-col w-full h-full bg-slate-900">
        <Navbar/>
        {children}
    </main>
    )
}