import { fireApp } from "@/important/firebase";
import { generateId, realEscapeString} from "../utilities";
import { toast } from "react-hot-toast";
import { collection, doc, setDoc } from "firebase/firestore";
import { generateSalt, hashPassword } from "./encryption";
import { EmailJs } from "../EmailJs";
import { welcomeEmail } from "../emailTemplate";
import Error from "next/error";

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

    } catch (error) {
        console.error(error)
        throw new Error(error);
    }
}

export const createAccountHandler = (data) => {
    const promise = createAccount(data);
    let status
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
    ).then(()=>{
        status = 200
    }).catch(()=>{
        status = 400
    });


    return {code: status, userId:generatedUserId};
}