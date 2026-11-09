import { Dispatch, SetStateAction, useEffect } from "react"

export default function Error({ message, setMessage }: {message: string, setMessage: Dispatch<SetStateAction<string | null>>}) {

    useEffect(() => {
        if (!message) return;

        const timeout = setTimeout(() => setMessage(null), 4000);
        return () => clearTimeout(timeout);
    })
    return(
        <section className="absolute inset-x-0 top-0 -translate-x-1/2 left-1/2 flex border border-red-700 font-light text-sm text-white py-1 w-full h-fit min-w-0 max-w-100 rounded-xl my-5 bg-red-700 items-center justify-center transition-all duration-100">
            <p>{message}</p>
        </section>
    )
}