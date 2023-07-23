import { fireApp } from '@/important/firebase';
import { collection, onSnapshot } from 'firebase/firestore';

export const fetchUserData = (userId) => {
    const collectionRef = collection(fireApp, "accounts");

    return new Promise((resolve, reject) => {
        onSnapshot(collectionRef, (querySnapshot) => {
            let userInfo;
            querySnapshot.forEach((user) => {
                const id = user.id;
                const data = user.data();

                if (id === userId) {
                    userInfo = data;
                } else if (data.username === userId) {
                    userInfo = id;
                }
            });

            resolve(userInfo);
        }, (error) => {
            reject(error);
        });
    });
};
