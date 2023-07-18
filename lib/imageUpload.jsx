import { collection, doc, getDoc, setDoc } from "firebase/firestore";
import { testForActiveSession } from "./testForActiveSession";
import { fireApp } from "@/important/firebase";

export const updateProfilePhoto = async (url) => {
    const username = testForActiveSession();

    if (username) {
        try {
            const AccountDocRef = collection(fireApp, "AccountData");
            const docRef = doc(AccountDocRef, `${username}`);
            const docSnap = await getDoc(docRef);

            let previousData = {};

            if (docSnap.exists()) {
                previousData = docSnap.data();
            }

            await setDoc(docRef, {...previousData, profilePhoto: url });
        } catch (error) {
            throw new Error(error);
        }
    }
}