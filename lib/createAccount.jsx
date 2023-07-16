import { fireApp } from "@/important/firebase";
import { generateId, realEscapeString, testPromiseStatus } from "./utilities";
import { toast } from "react-hot-toast";
import { collection, doc, setDoc } from "firebase/firestore";
import { generateSalt, hashPassword } from "./encryption";

let generatedUserId = '';
const createAccount = async (data) => {
    const { email, username, password } = data;
    const userId = generateId();
    generatedUserId = userId;

    try {
        const accountRef = collection(fireApp, "accounts");
        const cleanEmail = realEscapeString(username);
        const cleanPassword = realEscapeString(password);
        
        const salt = generateSalt();
        const hashedPasword = hashPassword(cleanPassword, salt);

        await setDoc(doc(accountRef, `${userId}`), {
            userId: userId,
            email: realEscapeString(email),
            username: cleanEmail,
            password: hashedPasword,
            mySalt: salt,
        });
    } catch (error) {
        throw new Error(error);
    }
}

export const createAccountHandler = (data) => {
    const promise = createAccount(data);
    toast.promise(promise, {
        loading: "Setting up your account.",
        error: "Could't complete registration",
        success: "Setup complete",
    });

    return {code: testPromiseStatus(promise), userId:generatedUserId};
}