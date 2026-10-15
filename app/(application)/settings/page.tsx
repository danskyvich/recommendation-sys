"use server"

import SettingsPage from "@/app/features/settings/settings-page";
import { getUser } from "@/app/lib/auth/get-user";

export default async function Settings() {

    const { user } = await getUser();

    return(
        <SettingsPage user={user}/>
    )
}