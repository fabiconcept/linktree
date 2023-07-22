import { getSessionCookie } from "./session";

export const testForActiveSession = () => {
    const sessionUsername = getSessionCookie("adminLinker");
    if (sessionUsername === undefined) {
        window.location.href = "/login";
        return;
    }
    return sessionUsername;
}