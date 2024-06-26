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

        console.log(credential.id)
        
        if (log_username === username) {
            console.log("passed stage - 01")
            const passwordsMatch = comparePassword(log_password, password, mySalt);
            console.log("passed stage - 02", {passwordsMatch})
            userId = credential.id;
            console.log("passed stage - 03", {userId})
            
            if (passwordsMatch) {
                console.log("passed stage - 04 (shit)", {userId})
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
  