import ModalFetch from "./modal-fetch";
import { Suspense } from "react";

export default async function DashboardModal({params}: {params: Promise<{id: string}>}) {
    return <Suspense fallback={null}><ModalFetch params={params}/></Suspense>
}