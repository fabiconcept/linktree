"use client"
import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import AgeRestriction from '../elements/AgeRestriction';
import { testForActiveSession } from '@/lib/authentication/testForActiveSession';
import { fireApp } from '@/important/firebase';
import { collection, doc, onSnapshot } from 'firebase/firestore';
import { updateSensitiveStatus } from '@/lib/update data/updateSocials';

export default function SensitiveMaterial() {
    const [containsSensitiveMaterial, setContainsSensitiveMaterial] = useState(null);

    const handleCheckboxChange = (event) => {
        const checkedStatus = event.target.checked;
        setContainsSensitiveMaterial(checkedStatus);
    };

    useEffect(() => {
        if (containsSensitiveMaterial === null) {
            return;
        }

        updateSensitiveStatus(containsSensitiveMaterial);
    }, [containsSensitiveMaterial]);

    useEffect(() => {
        function fetchTheme() {
            const currentUser = testForActiveSession();
            const collectionRef = collection(fireApp, "AccountData");
            const docRef = doc(collectionRef, `${currentUser}`);
        
            onSnapshot(docRef, (docSnap) => {
                if (docSnap.exists()) {
                    const { sensitiveStatus } = docSnap.data();
                    setContainsSensitiveMaterial(sensitiveStatus ? sensitiveStatus : false);
                }
            });
        }
        
        fetchTheme();
    }, []);

    return (
        <div className="w-full my-4 px-2" id="Settings--SensitiveMaterial">
            <div className="flex items-center gap-3 py-4">
                <Image
                    src={"https://linktree.sirv.com/Images/icons/sensitive.svg"}
                    alt="icon"
                    height={24}
                    width={24}
                />
                <span className="text-xl font-semibold">Sensitive material</span>
            </div>
            <div className="p-5 bg-white rounded-lg">
                <div className='flex gap-3 items-center justify-between w-full'>
                    <span className='opacity-70 sm:text-[.965rem] text-sm'>Display a sensitive content warning before visitors can view your profile.</span>
                    <div>
                        <label className="cursor-pointer relative flex justify-between items-center group p-2 text-xl">
                            <input type="checkbox" onChange={handleCheckboxChange} checked={containsSensitiveMaterial} className="absolute left-1/2 -translate-x-1/2 w-full h-full peer appearance-none rounded-md" />
                            <span className="cursor-pointer w-9 h-6 flex items-center flex-shrink-0 ml-4 p-1 bg-gray-400 rounded-full duration-300 ease-in-out peer-checked:bg-green-400 after:w-4 after:h-4 after:bg-white after:rounded-full after:shadow-md after:duration-300 peer-checked:after:translate-x-3 group-hover:after:translate-x-[2px]"></span>
                        </label>
                    </div>
                </div>
                {containsSensitiveMaterial && <AgeRestriction />}
            </div>
        </div>
    );
}