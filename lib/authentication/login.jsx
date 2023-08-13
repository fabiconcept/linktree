import { fireApp } from "@/important/firebase";
import { collection, getDocs } from "firebase/firestore";
import { comparePassword } from "./encryption";

export const loginAccount = async(data)=>{
    const { log_username, log_password } = data;
    const collectionSnap = await getDocs(collection(fireApp, "accounts"));

    let status = false;
    let userId = "";

    collectionSnap.forEach((credential)=>{
        const data = credential.data();
        const { username, password, mySalt } = data;

        if ( log_username === username ) {
            const passwordsMatch = comparePassword(log_password, password, mySalt);
            userId = credential.id;

            if (passwordsMatch) {
                status = true;
            }
        }
    });
    return {status, userId};
}