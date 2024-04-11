import { addDoc, collection, doc, getDoc, setDoc } from "firebase/firestore";
import { testForActiveSession } from "../authentication/testForActiveSession";
import { fireApp } from "../../important/firebase";

export const updateProfilePhoto = async (url) => {
    const username = testForActiveSession();

    if (username) {
        try {
            const AccountDocRef = collection(fireApp, "AccountData");
            const docRef = doc(AccountDocRef, `${username}`);
            const docSnap = await getDoc(docRef);

            if (docSnap.exists()) {
                const previousData = docSnap.data();
                const objectToUpdate = {...previousData, profilePhoto: url};
                await setDoc(docRef, objectToUpdate);
                return;
            }

            await addDoc(docRef, {profilePhoto: url});
        } catch (error) {
            throw new Error(error);
        }
    }
}