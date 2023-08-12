import { getSessionCookie } from "./session";

export const testForActiveSession = () => {
    const sessionUsername = getSessionCookie("adminLinker");
    if (!sessionUsername) {
        window.location.href = "/login";
        return;
    }
    return sessionUsername;
}