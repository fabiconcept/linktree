import { fetchUserData } from "@/lib/fetch data/fetchUserData";
import { fireApp } from "@/important/firebase";
import { collection, doc, getDoc } from "firebase/firestore";
import House from "./House";
import Filter from "bad-words"
import { Toaster } from "react-hot-toast";
export async function generateMetadata ({ params: { userId } }) {
    const filter = new Filter();
    const currentUser = await fetchUserData(userId);;
    const collectionRef = collection(fireApp, "AccountData");
    const docSnap = await getDoc(doc(collectionRef, `${currentUser}`));

    if (docSnap.exists()) {
        const { metaData } = docSnap.data();
        
        return ({
            title: metaData && metaData.title ? filter.clean(metaData.title) :`@${userId} Landing Page`,
            description: metaData && metaData.description ? filter.clean(metaData.description) :``,
        });
    }
};

export default function UserLinksPage({ params: { userId } }) {
    return (
        <div className="w-screen h-screen flex flex-col">
            <Toaster />
            <House userId={userId}/>
        </div>
    );
}