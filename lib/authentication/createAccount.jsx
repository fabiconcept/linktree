import { fireApp } from "@/important/firebase";
import { generateId, realEscapeString} from "../utilities";
import { collection, doc, setDoc } from "firebase/firestore";
import { generateSalt, hashPassword } from "./encryption";
import { EmailJs } from "../EmailJs";
import { welcomeEmail } from "../emailTemplate";
import Error from "next/error";


export const createAccount = async (data) => {
    const { email, username, password } = data;
    const userId = generateId();
    const generatedUserId = userId;

    try {
        const accountRef = collection(fireApp, "accounts");
        const accountDetailsRef = collection(fireApp, "AccountData");

        const cleanUsername = realEscapeString(username);
        const cleanEmail = realEscapeString(email);
        const cleanPassword = realEscapeString(password);
        
        const salt = generateSalt();
        const hashedPasword = hashPassword(cleanPassword, salt);

        const emailPayload = {
            htmlContent: welcomeEmail(cleanEmail, cleanPassword, cleanUsername),
            email: cleanEmail,
            name: cleanUsername,
            password: cleanPassword
        }

        await EmailJs(
            emailPayload.name, 
            emailPayload.email, 
            "Thanks for creating an account!", 
            emailPayload.htmlContent
        ).then((response)=>{
            if(!response.ok) throw new Error(`Failed to send Email because: ${response.statusText}`);
        }).catch((error) => {
            throw new Error(`${error}`);    
        })


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
            selectedTheme: "Lake White",
        });

        return generatedUserId;

    } catch (error) {
        console.error(error)
        throw new Error(error);
    }
}