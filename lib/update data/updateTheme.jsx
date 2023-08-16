import { collection, doc, getDoc, setDoc } from "firebase/firestore";
import { testForActiveSession } from "../authentication/testForActiveSession";
import { fireApp } from "@/important/firebase";

export async function updateTheme(theme, themeColor) {
    const username = testForActiveSession();
    if (username) {
        try {
            const AccountDocRef = collection(fireApp, "AccountData");
            const docRef = doc(AccountDocRef, `${username}`);
            const docSnap = await getDoc(docRef);
            
            if (docSnap.exists()) {
                const previousData = docSnap.data();
                const objectToUpdate = {...previousData, selectedTheme: theme, themeFontColor: themeColor};
                await setDoc(docRef, objectToUpdate);
                return;
            }
        } catch (error) {
            throw new Error(error);
        }
    }

}

export async function updateThemeBackground(type) {
    const username = testForActiveSession();
    if (username) {
        try {
            const AccountDocRef = collection(fireApp, "AccountData");
            const docRef = doc(AccountDocRef, `${username}`);
            const docSnap = await getDoc(docRef);
            
            if (docSnap.exists()) {
                const previousData = docSnap.data();
                const objectToUpdate = {...previousData, backgroundType: type};
                await setDoc(docRef, objectToUpdate);
                return;
            }
        } catch (error) {
            throw new Error(error);
        }
    }

}

export async function updateThemeBackgroundColor(color) {
    const username = testForActiveSession();
    if (username) {
        try {
            const AccountDocRef = collection(fireApp, "AccountData");
            const docRef = doc(AccountDocRef, `${username}`);
            const docSnap = await getDoc(docRef);
            
            if (docSnap.exists()) {
                const previousData = docSnap.data();
                const objectToUpdate = {...previousData, backgroundColor: color};
                await setDoc(docRef, objectToUpdate);
                return;
            }
        } catch (error) {
            throw new Error(error);
        }
    }

}

export async function updateThemeBtnColor(color) {
    const username = testForActiveSession();
    if (username) {
        try {
            const AccountDocRef = collection(fireApp, "AccountData");
            const docRef = doc(AccountDocRef, `${username}`);
            const docSnap = await getDoc(docRef);
            
            if (docSnap.exists()) {
                const previousData = docSnap.data();
                const objectToUpdate = {...previousData, btnColor: color};
                await setDoc(docRef, objectToUpdate);
                return;
            }
        } catch (error) {
            throw new Error(error);
        }
    }

}

export async function updateThemeBtnFontColor(color) {
    const username = testForActiveSession();
    if (username) {
        try {
            const AccountDocRef = collection(fireApp, "AccountData");
            const docRef = doc(AccountDocRef, `${username}`);
            const docSnap = await getDoc(docRef);
            
            if (docSnap.exists()) {
                const previousData = docSnap.data();
                const objectToUpdate = {...previousData, btnFontColor: color};
                await setDoc(docRef, objectToUpdate);
                return;
            }
        } catch (error) {
            throw new Error(error);
        }
    }

}

export async function updateThemeBtnShadowColor(color) {
    const username = testForActiveSession();
    if (username) {
        try {
            const AccountDocRef = collection(fireApp, "AccountData");
            const docRef = doc(AccountDocRef, `${username}`);
            const docSnap = await getDoc(docRef);
            
            if (docSnap.exists()) {
                const previousData = docSnap.data();
                const objectToUpdate = {...previousData, btnShadowColor: color};
                await setDoc(docRef, objectToUpdate);
                return;
            }
        } catch (error) {
            throw new Error(error);
        }
    }

}

export async function updateThemeTextColour(color) {
    const username = testForActiveSession();
    if (username) {
        try {
            const AccountDocRef = collection(fireApp, "AccountData");
            const docRef = doc(AccountDocRef, `${username}`);
            const docSnap = await getDoc(docRef);
            
            if (docSnap.exists()) {
                const previousData = docSnap.data();
                const objectToUpdate = {...previousData, themeTextColour: color};
                await setDoc(docRef, objectToUpdate);
                return;
            }
        } catch (error) {
            throw new Error(error);
        }
    }

}

export async function updateThemeGradientDirection(direction) {
    const username = testForActiveSession();
    if (username) {
        try {
            const AccountDocRef = collection(fireApp, "AccountData");
            const docRef = doc(AccountDocRef, `${username}`);
            const docSnap = await getDoc(docRef);
            
            if (docSnap.exists()) {
                const previousData = docSnap.data();
                const objectToUpdate = {...previousData, gradientDirection: direction};
                await setDoc(docRef, objectToUpdate);
                return;
            }
        } catch (error) {
            throw new Error(error);
        }
    }
}

export async function updateThemeButton(btn) {
    const username = testForActiveSession();
    if (username) {
        try {
            const AccountDocRef = collection(fireApp, "AccountData");
            const docRef = doc(AccountDocRef, `${username}`);
            const docSnap = await getDoc(docRef);
            
            if (docSnap.exists()) {
                const previousData = docSnap.data();
                const objectToUpdate = {...previousData, btnType: btn};
                await setDoc(docRef, objectToUpdate);
                return;
            }
        } catch (error) {
            throw new Error(error);
        }
    }

}

export async function updateThemeFont(font) {
    const username = testForActiveSession();
    if (username) {
        try {
            const AccountDocRef = collection(fireApp, "AccountData");
            const docRef = doc(AccountDocRef, `${username}`);
            const docSnap = await getDoc(docRef);
            
            if (docSnap.exists()) {
                const previousData = docSnap.data();
                const objectToUpdate = {...previousData, fontType: font};
                await setDoc(docRef, objectToUpdate);
                return;
            }
        } catch (error) {
            throw new Error(error);
        }
    }

}