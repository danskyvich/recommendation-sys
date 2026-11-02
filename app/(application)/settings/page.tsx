"use server"

import SettingsPage from "@/app/features/settings/settings-page";
import { getUser } from "@/app/lib/auth/get-user";
import { retrieveGenres } from "./actions";
import SettingsFetch from "@/app/features/settings/settings-fetch";

export default async function Settings() {

    return(
        <SettingsFetch/>
    )
}