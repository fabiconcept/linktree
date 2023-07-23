import { fireApp } from "@/important/firebase";
import { collection, doc, onSnapshot } from "firebase/firestore";
import { testForActiveSession } from "../authentication/testForActiveSession";

export function fetchLinks() {
    const currentUser = testForActiveSession();
    const collectionRef = collection(fireApp, "AccountData");
    const docRef = doc(collectionRef, `${currentUser}`);

    return new Promise((resolve, reject) => {
        onSnapshot(docRef, (docSnap) => {
            if (docSnap.exists()) {
                const { links } = docSnap.data();
                resolve(links);
            } else {
                resolve(false);
            }
        }, (error) => {
            reject(error);
        });
    });
}
