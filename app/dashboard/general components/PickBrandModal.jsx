import { AddContents } from "@/lib/BrandLinks";
import BrandAdd from "../general elements/brandAdd";
import { FaX } from "react-icons/fa6";

export default function PickBrandModal({closeFunction}) {
    const handlerClose = () =>{
        closeFunction(false);
    }

    return (
        <div className="h-screen w-screen fixed top-0 left-0 grid place-items-center">
            <div className="absolute top-0 left-0 h-full w-full bg-black backdrop-blur-[1px] bg-opacity-[0.25]" onClick={handlerClose}></div>
            <main className="bg-white relative z-10 shadow-xl w-[80vw] min-w-[20rem] flex flex-col rounded-3xl enter">
                <div className="px-8 py-5 flex  w-full border-b font-semibold justify-between items-center">
                    <span></span>
                    <span className="text-base">Add to Linktree</span>
                    <div className="p-3 hover:bg-black hover:bg-opacity-[0.05] cursor-pointer rounded-lg active:scale-90" onClick={handlerClose}><FaX className="text-sm font-thin" /></div>
                </div>
                <div className="md:px-12 px-6 py-5 max-h-[73vh] overflow-y-auto">
                    <section>
                        <div className="grid mb-5 px-1">
                            <span className="font-semibold">Share your content</span>
                            <span className="opacity-60 text-sm">Share content directly on your Linktree</span>
                        </div>
                        <div className="flex flex-wrap px-4 pb-4 gap-6">
                            {AddContents.map((content) => (
                                <BrandAdd
                                    imgAlt={content.alt}
                                    imgSrc={content.src}
                                    title={content.title}
                                    p={content.p}
                                />
                            ))}
                        </div>
                    </section>

                </div>
            </main>
        </div>
    )
}
