import { fireApp } from "@/importnat/firebase";
import { collection, getDocs } from "firebase/firestore";

export const loginAccount = async(data)=>{
    const { log_username, log_password } = data;
    const collectionSnap = await getDocs(collection(fireApp, "accounts"));

    let foundAccount = false;

    collectionSnap.forEach((credential)=>{
        const data = credential.data();
        const { username, password } = data;

        if ( log_username === username ) {
            if (log_password === password) {
                foundAccount = true;
            }
        }
    });
    return foundAccount;
}