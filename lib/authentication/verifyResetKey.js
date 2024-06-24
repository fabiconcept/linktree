import { fireApp } from "@/important/firebase";
import { collection, doc, getDoc } from "firebase/firestore";
import { getTimePassed } from "../utilities";

export async function verifyResetKey(key) {
    if (!key) throw ({known: "Missing reset key!"});

    const resetKeyCollection = collection(fireApp, "accountsReset");
    const resetDoc = await getDoc(doc(resetKeyCollection, key));

    if (!resetDoc.exists()) throw ({known: "Invalid reset key!"});
    
    const resetData = resetDoc.data();
    const { expiresIn, userId } = resetData;
    
    if (expiresIn === 0) throw ({known: "Invalid reset key!"});
    const keyExpiresIn = new Date(expiresIn);
    const currentTime = new Date();

    const timeDifference = keyExpiresIn.getTime() - currentTime.getTime();

    const timePassed = (Math.abs(timeDifference) / (1000));

    if (timeDifference < 0) throw ({known: `Expired key: This reset key expired ${getTimePassed(timePassed, true)}`});
    
    return [userId, timePassed];
}