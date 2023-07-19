import { fireApp } from "@/important/firebase";
import { collection, doc, getDoc } from "firebase/firestore";
import { testForActiveSession } from "./testForActiveSession";
import Image from "next/image";

export async function fetchProfilePicture() {
    const currentUser = testForActiveSession();
    const collectionRef = collection(fireApp, "AccountData");
    const docRef = doc(collectionRef, `${currentUser}`);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
        const { profilePhoto, displayName } = docSnap.data();

        if (profilePhoto !== '') {
            return (<Image src={`${profilePhoto}`} alt="logo" height={1000} width={1000} className="min-w-full h-full object-contain" />);
        } else {
            return (
                <div className="h-[5.5rem] w-[5.5rem] rounded-full bg-gray-300 border grid place-items-center text-3xl font-semibold uppercase">
                    {displayName.split('')[0]}
                </div>
            )
        }
    }
}