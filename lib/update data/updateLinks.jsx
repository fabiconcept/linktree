import { fireApp } from "@/important/firebase";
import { collection, doc, getDoc, setDoc } from "firebase/firestore";
import { testForActiveSession } from "../authentication/testForActiveSession";

export async function updateLinks(arrayOfLinks) {
    const username = testForActiveSession();
    if (username) {
        try {
            const AccountDocRef = collection(fireApp, "AccountData");
            const docRef = doc(AccountDocRef, `${username}`);
            const docSnap = await getDoc(docRef);

            if (docSnap.exists()) {
                const previousData = docSnap.data();
                const objectToUpdate = {...previousData, links: arrayOfLinks};
                await setDoc(docRef, objectToUpdate);
                return;
            }

            await addDoc(docRef, {links: arrayOfLinks});
        } catch (error) {
            throw new Error(error);
        }
    }
}