import { fireApp } from '@/important/firebase';
import { collection, getDocs } from 'firebase/firestore';
// Import necessary Firestore and Firebase App modules

export const fetchUserData = async (userId) => {
    
    try {
        const userAccountsInfoRef = await getDocs(collection(fireApp, "accounts"));
        let userInfo;



        userAccountsInfoRef.forEach((user)=>{
            const id = user.id;
            const data = user.data();

            if (id === userId) {
                userInfo = data;
            }else if (data.username === userId) {
                userInfo = id;
            }

        });
        

        return userInfo;

    } catch (error) {
        console.error('Error fetching user data:', error);
        return []; // Return an empty array or handle the error as needed
    }
};