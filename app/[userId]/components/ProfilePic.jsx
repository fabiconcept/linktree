"use client"
import { fetchProfilePicture } from "@/lib/fetch data/fetchProfilePicture";
import { useState } from "react";
import { useEffect } from "react";

export default function ProfilePic() {
    const [profilePicture, setProfilePicture] = useState(null);

    async function getProfilePicture() {
        const url = await fetchProfilePicture();
        setProfilePicture(url);
    }

    useEffect(() => {
        getProfilePicture()
    }, []);
    return (
        <div className="h-[6rem] w-[6rem] mb-2 rounded-full border overflow-hidden bg-white grid place-items-center">
            {profilePicture}
        </div>
    )
}
