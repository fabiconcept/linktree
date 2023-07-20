import { fireApp } from "@/important/firebase";
import { collection, getDoc } from "firebase/firestore";
import { testForActiveSession } from "./testForActiveSession";

export async function fetchLinks() {
    try {
        const currentUser = testForActiveSession();
        if (currentUser !== "") {
            const collectionRef = collection(fireApp, "AccountData");
            const docSnap = await getDoc(collectionRef, `${currentUser}`);

            if (docSnap.exists()) {
                const { links } = docSnap.data();
                console.log(docSnap.data());
                return links;
            }
        }

        return false;
    } catch (error) {
        throw new Error(error);
    }
}