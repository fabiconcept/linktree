"use client"
import { useDebounce } from "@/Local Hooks/useDebounce";
import { isValidURL } from "@/lib/utilities";
import { useEffect, useState } from "react";
import { FaAngleRight, FaPlus, FaX } from "react-icons/fa6";
import BrandItem from "./BrandItem";
import PickBrandModal from "../general components/PickBrandModal";

export default function AddBtn() {
    const [btnState, setBtnState] = useState(0);
    const [btnStyle, setBtnStyle] = useState(`p-3 cursor-pointer active:scale-95 active:opacity-60 active:translate-y-1 hover:scale-[1.005] text-white bg-btnPrimary hover:bg-btnPrimaryAlt`)
    const [url, setUrl] = useState('');
    const debounceUrl = useDebounce(url, 500);
    const [urlValid, setUrlValid] = useState(false);
    const [modalShowing, setModalShowing] = useState(false);

    useEffect(() => {
        switch (btnState) {
            case 0:
                setBtnStyle(`p-3 cursor-pointer active:scale-95 active:opacity-60 active:translate-y-1 hover:scale-[1.005] text-white bg-btnPrimary hover:bg-btnPrimaryAlt`);
                break;
            case 1:
                setBtnStyle(`bg-white`);
                break;

            default:
                break;
        }
    }, [btnState]);

    const handleInitialClick = () => {
        if (btnState === 0) {
            setBtnState(1);
        }
    }

    const handleClose = () => {
        if (btnState === 1) {
            setBtnState(0);
        }
    }

    useEffect(()=>{
        if (url !== '') {
            setUrlValid(isValidURL(url));
        }
    }, [debounceUrl]);

    const content = (
        btnState === 0 ?
            <div className="flex items-center gap-3 justify-center ">
                <FaPlus />
                <span>Add Link</span>
            </div>
        :
            <div className="w-full py-4 overflow-hidden linear">
                <div className="flex justify-between items-center text-sm duration-0 px-6">
                    <span className={'font-semibold'}>Enter Url</span>
                    <div className={'p-2 hover:bg-black hover:bg-opacity-[0.05] active:scale-90 font-light rounded-full cursor-pointer'} onClick={handleClose}><FaX /></div>
                </div>
                <form className={'flex items-center gap-4 py-4 px-6 border-b'}>
                    <div className="flex-1 relative flex items-center rounded-lg bg-black bg-opacity-[0.05] focus-within:border-black focus-within:border border border-transparent">
                        <input 
                            type="text" 
                            className="flex-1 px-4 placeholder-shown:px-3 py-4 text-md outline-none opacity-100 bg-transparent peer appearance-none" 
                            placeholder=" " 
                            value={url}
                            onChange={(e)=>setUrl(e.target.value)}
                        />
                        <label className="absolute px-3 pointer-events-none top-[.25rem] left-1 text-xs text-main-green peer-placeholder-shown:top-2/4 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:text-base peer-placeholder-shown:bg-transparent peer-placeholder-shown:text-slate-500 peer-placeholder-shown:left-0 opacity-40 transition duration-[250] ease-linear">
                            URL
                        </label>
                    </div>
                    <div className={`rounded-3xl py-3 px-6 ${urlValid ? "bg-btnPrimary text-white cursor-pointer": "bg-black bg-opacity-[0.1] text-black cursor-not-allowed opacity-70"}`}>
                        Add
                    </div>
                </form>
                <section className="pt-4">
                    <div className="flex justify-between items-center text-sm duration-0 px-6">
                        <span className={'font-semibold opacity-40'}>Inspired by your interest</span>
                        <div className={'flex gap-1 p-2 active:scale-90 font-light group cursor-pointer text-btnPrimary cursor-pointer items-center'}>
                            <span className="group-hover:underline" onClick={()=>setModalShowing(true)}>View all</span>
                            <FaAngleRight />
                        </div>
                    </div>
                    <div className="flex flex-wrap justify-center gap-3 px-6 py-3">
                        <div className="flex flex-wrap justify-center gap-4">
                            <BrandItem imgAlt={'twitter icon'} imgSrc={"https://linktree.sirv.com/Images/brands/twitter.svg"} />
                            <BrandItem imgAlt={'twitter icon'} imgSrc={"https://linktree.sirv.com/Images/brands/tiktok.svg"} />
                            <BrandItem imgAlt={'twitter icon'} imgSrc={"https://linktree.sirv.com/Images/brands/header.svg"} />
                            <BrandItem imgAlt={'twitter icon'} imgSrc={"https://linktree.sirv.com/Images/brands/video.svg"} />
                            <BrandItem imgAlt={'twitter icon'} imgSrc={"https://linktree.sirv.com/Images/brands/music.svg"} />
                        </div>
                    </div>
                </section>
            </div>
    );

    return (
        <div className={`${btnStyle} rounded-3xl`} onClick={handleInitialClick}>
            {content}
            {modalShowing && <PickBrandModal closeFunction={setModalShowing}/>}
        </div>
    )
}
