import { getUser } from "@/app/lib/auth/get-user";
import SettingsPage from "./settings-page";
import { retrieveGenres, filterMovies } from "@/app/(application)/settings/actions";

export default async function SettingsFetch() {

    const [user, genres, initialHideMovies] = await Promise.all([
        (await getUser()).user,
        retrieveGenres(),
        filterMovies(),
    ])

    return <SettingsPage user={user} genres={genres} initialHideMovies={initialHideMovies}/>
}