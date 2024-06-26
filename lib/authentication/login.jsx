import { fireApp } from "@/important/firebase";
import { collection, getDocs } from "firebase/firestore";
import { comparePassword } from "./encryption";

export const loginAccount = async (data) => {
    const { log_username, log_password } = data;
    const collectionSnap = await getDocs(collection(fireApp, "accounts"));

    let userId = "";

    collectionSnap.forEach((credential) => {
        const data = credential.data();
        const { username, password, mySalt } = data;

        
        if (String(log_username).toLowerCase() === String(username).toLowerCase()) {
            const passwordsMatch = comparePassword(log_password, password, mySalt);
            userId = credential.id;
            
            if (passwordsMatch) {
                return; // Exit the loop early since we found the user
            } else {
                userId = ""; // Clear userId if the password doesn't match
            }
        }
    });

    if (userId) {
        return userId;
    }

    throw new Error("Failed to login!");
};
  