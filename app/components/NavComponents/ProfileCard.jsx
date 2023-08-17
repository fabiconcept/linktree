import React, { useContext } from "react";
import Image from "next/image";
import LiElement from "./elements/LiElement";
import Profile from "./elements/Profile";
import { NavContext } from "../General Components/NavBar";

export default function ProfileCard() {
    const {
        showProfileCard,
        profilePicture,
        username,
        myLink,
    } = useContext(NavContext);

    return (
        <div className="absolute -right-4 w-fit -translate-y-[5px] px-4 pt-2 pb-5 overflow-hidden navCard">
            <div
                className={`sm:w-[365px] w-[310px] bg-white rounded-3xl border-b border-l border-r text-sm ${showProfileCard ? "enterCard": "leaveCard"}`}
                style={{ boxShadow: `0 5px 25px 1px rgba(0, 0, 0, .05)` }}
            >
                <Profile profilePicture={profilePicture} username={username} link={myLink} />
                <section className="px-2 pb-3">
                    <ul className="pt-3 grid gap-1">
                        <LiElement url={"/dashboard/account"}>
                            <Image
                                src={"https://linktree.sirv.com/Images/icons/profile.svg"}
                                alt="icon"
                                height={16}
                                width={16}
                            />
                            <span>My Account</span>
                        </LiElement>
                        <LiElement url={"/dashboard/logout"}>
                            <Image
                                src={"https://linktree.sirv.com/Images/icons/signout.svg"}
                                alt="icon"
                                height={16}
                                width={16}
                            />
                            <span>Sign Out</span>
                        </LiElement>
                    </ul>
                </section>
            </div> 
        </div>
    );
}
