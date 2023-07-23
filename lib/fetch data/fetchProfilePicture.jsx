import { fireApp } from "@/important/firebase";
import { collection, doc, onSnapshot } from "firebase/firestore";
import Image from "next/image";
import { testForActiveSession } from "../authentication/testForActiveSession";

export function fetchProfilePicture() {
    const currentUser = testForActiveSession();
    const collectionRef = collection(fireApp, "AccountData");
    const docRef = doc(collectionRef, `${currentUser}`);

    return new Promise((resolve, reject) => {
        onSnapshot(docRef, async (docSnap) => {
            if (docSnap.exists()) {
                const { profilePhoto, displayName } = docSnap.data();

                if (profilePhoto !== '') {
                    resolve(
                        <Image
                            src={`${profilePhoto}`}
                            alt="profile"
                            height={1000}
                            width={1000}
                            className="min-w-full h-full object-contain"
                            priority
                        />
                    );
                } else {
                    resolve(
                        <div className="h-[95%] aspect-square w-[95%] rounded-full bg-gray-300 border grid place-items-center">
                            <span className="text-3xl font-semibold uppercase">
                                {displayName.split('')[0]}
                            </span>
                        </div>
                    );
                }
            }
        }, (error) => {
            reject(error);
        });
    });
}