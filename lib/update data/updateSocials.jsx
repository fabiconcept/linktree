import { fireApp } from "@/important/firebase";
import { collection, doc, getDoc, setDoc } from "firebase/firestore";
import { testForActiveSession } from "../authentication/testForActiveSession";

export async function updateSocials(arrayOfSocials) {
    const username = testForActiveSession();
    if (username) {
        try {
            const AccountDocRef = collection(fireApp, "AccountData");
            const docRef = doc(AccountDocRef, `${username}`);
            const docSnap = await getDoc(docRef);

            if (docSnap.exists()) {
                const previousData = docSnap.data();
                const objectToUpdate = {...previousData, socials: arrayOfSocials};
                await setDoc(docRef, objectToUpdate);
                return;
            }

            await addDoc(docRef, {links: arrayOfSocials});
        } catch (error) {
            throw new Error(error);
        }
    }
}

export async function updateSocialPosition(position) {
    const username = testForActiveSession();
    if (username) {
        try {
            const AccountDocRef = collection(fireApp, "AccountData");
            const docRef = doc(AccountDocRef, `${username}`);
            const docSnap = await getDoc(docRef);
            
            if (docSnap.exists()) {
                const previousData = docSnap.data();
                const objectToUpdate = {...previousData, socialPosition: position};
                await setDoc(docRef, objectToUpdate);
                return;
            }
        } catch (error) {
            throw new Error(error);
        }
    }
}