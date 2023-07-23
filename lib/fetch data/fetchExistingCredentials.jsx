import { fireApp } from "@/important/firebase";
import { collection, onSnapshot } from "firebase/firestore";

export default function fetchExistingCredentials() {
    const existingUsernames = [];
    const existingEmail = [];

    const collectionRef = collection(fireApp, "accounts");

    return new Promise((resolve, reject) => {
        onSnapshot(collectionRef, (querySnapshot) => {
            querySnapshot.forEach((credential) => {
                const data = credential.data();
                const { email, username } = data;
                existingEmail.push(email);
                existingUsernames.push(username);
            });
            resolve([existingEmail, existingUsernames]);
        }, (error) => {
            reject(error);
        });
    });
}