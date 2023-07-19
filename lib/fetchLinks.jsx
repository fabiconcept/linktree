import { fireApp } from "@/important/firebase";
import { collection, doc, getDoc } from "firebase/firestore";
import { testForActiveSession } from "./testForActiveSession";

export async function fetchLinks() {
    const currentUser = testForActiveSession();
    const collectionRef = collection(fireApp, "AccountData");
    const docRef = doc(collectionRef, `${currentUser}`);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
        const { links } = docSnap.data();
        return links;
    }

    return false;
}