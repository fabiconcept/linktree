"use client"
export default function TextDetails() {
    return (
        <div className="flex px-6 pb-6 pt-2 flex-col gap-2">
            <div className="flex-1 relative pt-2 flex items-center rounded-lg bg-black bg-opacity-[0.05] focus-within:border-black focus-within:border-2 border border-transparent">
                <input
                    type="text"
                    className="flex-1 px-4 placeholder-shown:px-3 py-4 text-base font-semibold outline-none opacity-100 bg-transparent peer appearance-none"
                    placeholder=""
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
    );
}