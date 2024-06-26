import { collection, doc, getDoc, setDoc } from "firebase/firestore";
import { fireApp } from "@/important/firebase";
import { realEscapeString } from "../utilities";
import { generateSalt, hashPassword } from "./encryption";

export async function changePassword(uid, p1, p2, userId) {
    const cleanData = {
        cleanP1: realEscapeString(p1),
        cleanP2: realEscapeString(p2),
    }

    if(cleanData.cleanP1 !== cleanData.cleanP2) throw ({custom: "Password does not match!"});
    const resetKeyCollection = collection(fireApp, "accountsReset");
    const resetKeyRef = doc(resetKeyCollection, uid);
    const resetKeyDoc = await getDoc(resetKeyRef);

    if (!resetKeyDoc.exists()) throw ({custom: "Invalid reset key!"});
    const updateResetKeyObject = {...resetKeyDoc.data(), expiresIn: 0};

    try {
        await setDoc(resetKeyRef, updateResetKeyObject);
    } catch (error) {
        console.error(error);
        throw ({custom: "Failed to update reset key"});
    }

    const accountRef = collection(fireApp, "accounts");
    const newSalt = generateSalt();
    const hashedPasword = hashPassword(cleanData.cleanP1, newSalt);
    const userRef = doc(accountRef, `${userId}`);
    const userDoc = await getDoc(userRef);

    if (!userDoc.exists()) throw ({custom: "This user no longer exists in our records!"});

    const prevUserObj = userDoc.data();

    const newUserObj = { ...prevUserObj, mySalt: newSalt, password: hashedPasword };

    try {
        await setDoc(userRef, newUserObj);
    } catch (error) {
        console.error(error);
        throw ({custom: "Failed to change password!"});
    }
}