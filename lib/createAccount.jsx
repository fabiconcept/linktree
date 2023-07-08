import { fireApp } from "@/importnat/firebase";
import { generateId, realEscapeString } from "./utilities";
import { toast } from "react-hot-toast";
import { collection, doc, setDoc } from "firebase/firestore";
const createAccount = async (data) => {
    const { email, username, password } = data;
    const userId = generateId();

    try {
        const accountRef = collection(fireApp, "accounts");

        await setDoc(doc(accountRef, `${userId}`), {
            userId: userId,
            email: realEscapeString(email),
            username: realEscapeString(username),
            password: realEscapeString(password),
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
    })
}