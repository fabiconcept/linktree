import { fireApp } from "@/important/firebase";
import { collection, doc, getDocs, setDoc } from "firebase/firestore";
import { realEscapeString } from "../utilities";
import { resetPasswordEmail } from "../emailTemplate";
import { EmailJs } from "../EmailJs";

export async function sendResetUrl(payload) {
    const { email, uid, expiresIn } = payload;
    
    try {
        const dbRef = collection(fireApp, "accountsReset");
        const collectionSnap = await getDocs(collection(fireApp, "accounts"));

        const cleanEmail = realEscapeString(email);
        const cleanUID = realEscapeString(uid);
        let userId 

        const resetUrl = `https://mylinks.fabiconcept.online/reset-password/${cleanUID}`;

        let status = false;

        collectionSnap.forEach((credential) => {
            const data = credential.data();
            const { email: dbEmail, userId: userKey } = data;

            if (cleanEmail === dbEmail) {
                status = true;
                userId = userKey;
            }
        });

        if (!status) throw new Error("Email does not exist!");

        await setDoc(doc(dbRef, `${cleanUID}`), {
            uid: cleanUID,
            expiresIn: expiresIn,
            userId
        });

        const emailPayload = {
            htmlContent: resetPasswordEmail(resetUrl),
            email: cleanEmail,
            name: "Client",
        }

        await EmailJs(
            emailPayload.name,
            emailPayload.email,
            "Password Reset Email",
            emailPayload.htmlContent
        ).then((response) => {
            if (!response.ok) throw new Error(`Failed to send Email because: ${response.statusText}`);
        }).catch((error) => {
            throw new Error(`${error}`);
        })
    } catch (error) {
        throw new Error(error);
    }

}
