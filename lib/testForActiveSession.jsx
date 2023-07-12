import { getSessionCookie } from "./session";

export const testForActiveSession = () => {
    const sessionUsername = getSessionCookie("adminLinker");
    if (sessionUsername === undefined) {
        router.push("/login");
        return;
    }
    return sessionUsername;
}