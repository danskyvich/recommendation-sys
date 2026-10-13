import Footer from "../components/footer";

export default function AuthLayout({ children }: { children: React.ReactNode }) {
    return (
      <main className="flex flex-col w-screen h-screen bg-linear-180 from-slate-950 bg-slate-900">
        <div className="flex w-full h-full">{children}</div>
        <Footer/>
      </main>
    );
}