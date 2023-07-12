import { fireApp } from "@/importnat/firebase";
import { collection, getDocs } from "firebase/firestore";
import { testForActiveSession } from "./testForActiveSession";

export async function fetchLinks() {
    const currentUser = testForActiveSession();
    const collectionSnap = await getDocs(collection(fireApp, "AccountData"));
    let tempArr = [];
    collectionSnap.forEach(snap => {
        const data = snap.data();
        const id = snap.id;

        if (id === currentUser ) {
            tempArr = data.links;
        }
    });

    return tempArr;
}