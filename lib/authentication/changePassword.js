import { collection, getDoc, setDoc } from "firebase/firestore";
import { fireApp } from "../../important/firebase";
import { realEscapeString } from "../utilities";
import { generateSalt, hashPassword } from "./encryption";

export async function changePassword(uid, p1, p2, userId) {
    const cleanData = {
        cleanP1: realEscapeString(p1),
        cleanP2: realEscapeString(p2),
    }

    if(cleanData.cleanP1 !== cleanData.cleanP2) throw ({custome: "Password does not match!"});
    const resetKeyCollection = collection(fireApp, "accountsReset");
    const resetKeyRef = doc(resetKeyCollection, uid);
    const resetKeyDoc = await getDoc(resetKeyRef);

    if (!resetKeyDoc.exists()) throw ({custome: "Invalid reset key!"});
    const prevResetKeyObject = resetKeyDoc.data();
    const updateResetKeyObject = {...prevResetKeyObject, expiresIn: 0};

    await setDoc(doc(resetKeyRef, updateResetKeyObject));

    const accountRef = collection(fireApp, "accounts");
    const newSalt = generateSalt();
    const hashedPasword = hashPassword(cleanP1, newSalt);
    const userRef = doc(accountRef, `${userId}`);
    const userDoc = await getDoc(userRef);

    if (!userDoc.exists()) throw ({custome: "This user no longer exists in our records!"});
    const prevUserObj = userDoc.data();
    const newUserObj = { ...prevUserObj, mySalt: newSalt, password: hashedPasword };

    await setDoc(doc(userRef, newUserObj));
}