import { fetchUserData } from "@/lib/fetch data/fetchUserData";
import { fireApp } from "@/important/firebase";
import { collection, doc, getDoc } from "firebase/firestore";
import House from "./House";

export async function generateMetadata ({ params: { userId } }) {
    const currentUser = await fetchUserData(userId);;
    const collectionRef = collection(fireApp, "AccountData");
    const docSnap = await getDoc(doc(collectionRef, `${currentUser}`));

    if (docSnap.exists()) {
        const { metaData } = docSnap.data();
        
        return ({
            title: metaData.title ? metaData.title :`@${userId} Landing Page`,
            description: metaData.description ? metaData.description :``,
        });
    }
};

export default function UserLinksPage({ params: { userId } }) {
    return (
        <div className="w-screen h-screen flex flex-col">
            <House userId={userId}/>
        </div>
    );
}