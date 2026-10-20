import { cache } from "react";
import { auth0 } from "./auth0";
import { redirect } from "next/navigation";

export const getUser = cache(async () => {
    const session = await auth0.getSession();
    if (!session) redirect("/");
    return {user: session.user, session };
});