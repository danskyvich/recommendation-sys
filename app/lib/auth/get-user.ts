import { cache } from "react";
import { auth0 } from "./auth0";

export const getUser = cache(async () => {
    const session = await auth0.getSession();
    if (!session) return { user: null, session }
    return {user: session.user, session };
});