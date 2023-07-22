import { fireApp } from "@/important/firebase";
import { collection, doc, getDoc } from "firebase/firestore";
import { testForActiveSession } from "../authentication/testForActiveSession";

export async function fetchTheme() {
    const currentUser = testForActiveSession();
    const collectionRef = collection(fireApp, "AccountData");
    const docRef = doc(collectionRef, `${currentUser}`);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
        const { selectedTheme } = docSnap.data();
        return selectedTheme;
    }

    return false;
}

export async function fetchThemeBtn() {
    const currentUser = testForActiveSession();
    const collectionRef = collection(fireApp, "AccountData");
    const docRef = doc(collectionRef, `${currentUser}`);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
        const { btnDesign } = docSnap.data();
        return btnDesign;
    }

    return false;
}

export async function fetchThemeFont() {
    const currentUser = testForActiveSession();
    const collectionRef = collection(fireApp, "AccountData");
    const docRef = doc(collectionRef, `${currentUser}`);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
        const { fontType } = docSnap.data();
        return fontType;
    }

    return false;
}