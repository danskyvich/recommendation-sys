"use client"

import { faker } from "@faker-js/faker"
import { useEffect } from "react";

export default function WatchListPage() {

    useEffect(() => {
        document.title = "Watchlist | Film.io"
    })

    const watchlist_items = Array.from({ length: 6}, (_, index) => ({
        name: faker.lorem.words(3),
        rating: faker.number.int({ min: 1, max: 5 }),
        id: index + 1,
    }));

    return(
        <main className="flex flex-col w-full h-full px-[10%] overflow-y-auto overflow-x-hidden">
            <p className="mt-[7%] text-3xl font-sans font-semibold">Watchlist</p>
            <hr className="border-white/35 mt-1"/>

            <section className="flex flex-col w-full h-full mt-4 justify-around">
            {
                watchlist_items.map((item) => (
                    <div key={item.id}></div>
                ))
            }
            </section>
        </main>
    )
};