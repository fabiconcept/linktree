import { fireApp } from '@/important/firebase';
import { collection, doc, getDoc } from 'firebase/firestore';
// Import necessary Firestore and Firebase App modules

export const fetchUserData = async (userId) => {
    
    try {
        const userAccountRef = await getDoc(doc(collection(fireApp, "AccountData"), userId));
        let userInfo = {};


        if (userAccountRef.exists()) {
            userInfo = userAccountRef.data();
        }
        
        return userInfo;

    } catch (error) {
        console.error('Error fetching user data:', error);
        return null; // Return an empty array or handle the error as needed
    }
};