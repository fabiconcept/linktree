import { fireApp } from "@/important/firebase";
import { collection, doc, onSnapshot } from "firebase/firestore";
import { testForActiveSession } from "../authentication/testForActiveSession";

export function fetchInfo(userId) {
    const currentUser = userId ? userId : testForActiveSession();
    const collectionRef = collection(fireApp, "AccountData");
    const docRef = doc(collectionRef, `${currentUser}`);

    return new Promise((resolve, reject) => {
        onSnapshot(docRef, async (docSnap) => {
            if (docSnap.exists()) {
                const { displayName, bio: bioText } = docSnap.data();
                const bio = bioText ? bioText : "";
                resolve([displayName, bio]);
            } else {
                resolve(false);
            }
        }, (error) => {
            reject(error);
        });
    });
}