export default async function MovieMain({params}: {params: Promise<{ id: string }>}) {
    const { id } = await params;
    return (
        <main className="flex flex-col w-full h-full">
            
        </main>
    )
}