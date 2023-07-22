import { collection, doc, getDoc, setDoc } from "firebase/firestore";
import { testForActiveSession } from "../authentication/testForActiveSession";
import { fireApp } from "@/important/firebase";

export default async function updateBio(bioText) {
    const username = testForActiveSession();
    if (username) {
        try {
            const AccountDocRef = collection(fireApp, "AccountData");
            const docRef = doc(AccountDocRef, `${username}`);
            const docSnap = await getDoc(docRef);
            
            if (docSnap.exists()) {
                const previousData = docSnap.data();
                const objectToUpdate = {...previousData, bio: bioText};
                await setDoc(docRef, objectToUpdate);
                return;
            }
        } catch (error) {
            throw new Error(error);
        }
    }

}