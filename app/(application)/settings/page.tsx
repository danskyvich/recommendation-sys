"use server"

import SettingsPage from "@/app/features/settings/settings-page";
import { getUser } from "@/app/lib/auth/get-user";
import { retrieveGenres } from "./actions";

export default async function Settings() {

    const { user } = await getUser();
    const genresData = await retrieveGenres();

    return(
        <SettingsPage user={user} genres={genresData}/>
    )
}