import { fireApp } from "@/important/firebase";
import { collection, doc, setDoc } from "firebase/firestore";
import { getSessionCookie } from "./session";
import { testForActiveSession } from "./testForActiveSession";

export async function updateLinks(array) {
    const username = testForActiveSession();
    if (username) {
        try {
            const AccountDocRef = collection(fireApp, "AccountData");
            await setDoc(doc(AccountDocRef, `${username}`), {links: array});
        } catch (error) {
            throw new Error(error);
        }
    }
}