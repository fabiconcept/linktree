import { fireApp } from "@/important/firebase";
import { collection, doc, getDoc } from "firebase/firestore";
import Image from "next/image";
import { testForActiveSession } from "../authentication/testForActiveSession";

export async function fetchProfilePicture() {
    const currentUser = testForActiveSession();
    const collectionRef = collection(fireApp, "AccountData");
    const docRef = doc(collectionRef, `${currentUser}`);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
        const { profilePhoto, displayName } = docSnap.data();

        if (profilePhoto !== '') {
            return (<Image src={`${profilePhoto}`} alt="profile" height={1000} width={1000} className="min-w-full h-full object-contain" priority />);
        } else {
            return (
                <div className="h-[95%] aspect-square w-[95%] rounded-full bg-gray-300 border grid place-items-center">
                    <span className="text-3xl font-semibold uppercase">
                        {displayName.split('')[0]}
                    </span>
                </div>
            )
        }
    }
}