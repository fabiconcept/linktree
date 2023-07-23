import { fireApp } from '@/important/firebase';
import { collection, doc, onSnapshot } from 'firebase/firestore';

export const fetchUserData = (userId) => {
    const collectionRef = collection(fireApp, "AccountData");
    const docRef = doc(collectionRef, userId);

    return new Promise((resolve, reject) => {
        onSnapshot(docRef, (docSnap) => {
            let userInfo = {};

            if (docSnap.exists()) {
                userInfo = docSnap.data();
            }

            resolve(userInfo);
        }, (error) => {
            reject(error);
        });
    });
};