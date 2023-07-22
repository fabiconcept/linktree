import { fireApp } from "@/important/firebase";
import { collection, doc, getDoc } from "firebase/firestore";
import { testForActiveSession } from "../authentication/testForActiveSession";

export async function fetchInfo(userId) {
    const currentUser = userId ? userId : testForActiveSession();
    const collectionRef = collection(fireApp, "AccountData");
    const docRef = doc(collectionRef, `${currentUser}`);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
        const { displayName, bio:bioText } = docSnap.data();
        const bio = bioText ? bioText : "";
        return [displayName, bio];
    }

    return false;
}