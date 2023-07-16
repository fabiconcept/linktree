import { fireApp } from "@/important/firebase";
import { collection, getDocs } from "firebase/firestore";

export default async function fetchExistingCredentials() {
    const existingUsernames = [];
    const existingEmail = [];

    const collectionSnap = await getDocs(collection(fireApp, "accounts"));

    collectionSnap.forEach((credential)=>{
        const data = credential.data();
        const { email, username } = data;
        
        existingEmail.push(email);
        existingUsernames.push(username);
    });

    return [existingEmail, existingUsernames];
}
