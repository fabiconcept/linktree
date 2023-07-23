import { fireApp } from "@/important/firebase";
import { collection, doc, onSnapshot } from "firebase/firestore";
import { testForActiveSession } from "../authentication/testForActiveSession";

export function fetchTheme() {
    const currentUser = testForActiveSession();
    const collectionRef = collection(fireApp, "AccountData");
    const docRef = doc(collectionRef, `${currentUser}`);

    return new Promise((resolve, reject) => {
        onSnapshot(docRef, (docSnap) => {
            if (docSnap.exists()) {
                const { selectedTheme } = docSnap.data();
                resolve(selectedTheme);
            } else {
                resolve(false);
            }
        }, (error) => {
            reject(error);
        });
    });
}

export function fetchThemeBtn() {
    const currentUser = testForActiveSession();
    const collectionRef = collection(fireApp, "AccountData");
    const docRef = doc(collectionRef, `${currentUser}`);

    return new Promise((resolve, reject) => {
        onSnapshot(docRef, (docSnap) => {
            if (docSnap.exists()) {
                const { btnDesign } = docSnap.data();
                resolve(btnDesign);
            } else {
                resolve(false);
            }
        }, (error) => {
            reject(error);
        });
    });
}

export function fetchThemeFont() {
    const currentUser = testForActiveSession();
    const collectionRef = collection(fireApp, "AccountData");
    const docRef = doc(collectionRef, `${currentUser}`);

    return new Promise((resolve, reject) => {
        onSnapshot(docRef, (docSnap) => {
            if (docSnap.exists()) {
                const { fontType } = docSnap.data();
                resolve(fontType);
            } else {
                resolve(false);
            }
        }, (error) => {
            reject(error);
        });
    });
}
