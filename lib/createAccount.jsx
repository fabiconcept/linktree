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
        const accountDetailsRef = collection(fireApp, "AccountData");

        const cleanUsername = realEscapeString(username);
        const cleanEmail = realEscapeString(email);
        const cleanPassword = realEscapeString(password);
        
        const salt = generateSalt();
        const hashedPasword = hashPassword(cleanPassword, salt);

        await setDoc(doc(accountRef, `${userId}`), {
            userId: userId,
            email: cleanEmail,
            username: cleanUsername,
            password: hashedPasword,
            mySalt: salt,
        });

        await setDoc(doc(accountDetailsRef, `${userId}`), {
            displayName: cleanUsername,
            links: [],
            profilePhoto: "",
        });
    } catch (error) {
        throw new Error(error);
    }
}

export const createAccountHandler = (data) => {
    const promise = createAccount(data);
    toast.promise(
        promise,
        {
            loading: "Setting up your account.",
            error: "Could't complete registration",
            success: "Setup complete",
        },
        {
            style: {
                border: '1px solid #8129D9',
                padding: '16px',
                color: '#8129D9',
            },
            iconTheme: {
                primary: '#8129D9',
                secondary: '#FFFAEE',
            },
        }
    );

    return {code: testPromiseStatus(promise), userId:generatedUserId};
}