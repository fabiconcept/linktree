import Image from "next/image";
import { FaPlus } from "react-icons/fa6";

export default function ProfileCard() {
    return (
        <div className="w-full bg-white rounded-3xl my-3 flex flex-col">
            <div className="flex w-full p-6 items-center gap-4">
                <div className="h-[6rem] w-[6rem] cursor-pointer rounded-full grid place-items-center border overflow-hidden">
                    <Image src={"https://linktree.sirv.com/Images/profile/1658454113690.jpg"} alt="logo" height={1000} width={1000} className="min-w-full h-full object-contain" />
                </div>
                <div className="flex-1 grid gap-2">
                    <div className={`flex items-center gap-3 justify-center p-3 rounded-3xl cursor-pointer active:scale-95 active:opacity-60 active:translate-y-1 hover:scale-[1.005] bg-btnPrimary text-white w-full`}>
                        Pick an image
                    </div>
                    <div className={`flex items-center gap-3 justify-center p-3 rounded-3xl cursor-pointer active:scale-95 active:opacity-60 active:translate-y-1 hover:scale-[1.005] border w-full`}>
                        Remove
                    </div>
                </div>
            </div>

            <div className="flex px-6 pb-6 pt-2 flex-col gap-2">
                <div className="flex-1 relative pt-2 flex items-center rounded-lg bg-black bg-opacity-[0.05] focus-within:border-black focus-within:border-2 border border-transparent">
                    <input
                        type="text"
                        className="flex-1 px-4 placeholder-shown:px-3 py-4 text-base font-semibold outline-none opacity-100 bg-transparent peer appearance-none"
                        placeholder=" "
                    />
                    <label className="absolute px-3 pointer-events-none top-[.25rem] left-1 text-sm text-main-green peer-placeholder-shown:top-2/4 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:text-base peer-placeholder-shown:bg-transparent peer-placeholder-shown:text-slate-500 peer-placeholder-shown:left-0 opacity-70 transition duration-[250] ease-linear">
                        Profile title
                    </label>
                </div>
                <div className="flex-1 relative pt-2 flex items-center rounded-lg bg-black bg-opacity-[0.05] focus-within:border-black focus-within:border-[2px] border border-transparent">
                    <textarea className="flex-1 px-4 placeholder-shown:px-3 py-4 text-md outline-none opacity-100 bg-transparent peer appearance-none" cols="30" rows="2"></textarea>
                    <label className="absolute px-3 pointer-events-none top-[.25rem] left-1 text-sm text-main-green peer-placeholder-shown:top-2/4 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:text-base peer-placeholder-shown:bg-transparent peer-placeholder-shown:text-slate-500 peer-placeholder-shown:left-0 opacity-70 transition duration-[250] ease-linear">
                        Bio
                    </label>
                </div>
            </div>

            <div className="w-full border-t px-6 py-4">
                <div className={`flex w-fit items-center gap-3 justify-center p-3 rounded-3xl cursor-pointer active:scale-95 active:opacity-60 active:translate-y-1 hover:scale-[1.005] text-btnPrimary font-semibold`}>
                    <FaPlus/>
                    <span>Add social icons</span>
                </div>
            </div>
        </div>
    );
}