import Image from "next/image";
import Button from "../elements/Button";
import ColorPicker from "../elements/ColorPicker";

export default function Buttons() {
    return (
        <div className="w-full bg-white rounded-3xl my-3 flex flex-col p-6">
            <section className="flex gap-5 text-sm flex-col mb-10">
                <span className="font-semibold">Fill</span>
                <div className="items-center flex gap-5">
                    <Button modifierClass={"bg-black"} />
                    <Button modifierClass={"bg-black rounded-lg"} />
                    <Button modifierClass={"bg-black rounded-3xl"} />
                </div>
            </section>
            <section className="flex gap-5 text-sm flex-col mb-10">
                <span className="font-semibold">Outline</span>
                <div className="items-center flex gap-5">
                    <Button modifierClass={"border border-black "} />
                    <Button modifierClass={"border border-black rounded-lg"} />
                    <Button modifierClass={"border border-black rounded-3xl"} />
                </div>
            </section>
            <section className="flex gap-5 text-sm flex-col mb-10">
                <span className="font-semibold">Hard Shadow</span>
                <div className="items-center flex gap-5">
                    <Button modifierClass={"bg-white border border-black "} modifierStyles={{filter: `drop-shadow(4px 4px 0px black)`}} />
                    <Button modifierClass={"bg-white border border-black rounded-lg"} modifierStyles={{filter: `drop-shadow(4px 4px 0px black)`}} />
                    <Button modifierClass={"bg-white border border-black rounded-3xl"} modifierStyles={{filter: `drop-shadow(4px 4px 0px black)`}} />
                </div>
            </section>
            <section className="flex gap-5 text-sm flex-col mb-10">
                <span className="font-semibold">Soft Shadow</span>
                <div className="items-center flex gap-5">
                    <Button modifierClass={"bg-white shadow-[0_4px_4px_0_rgb(0,0,0,0.16)]"} />
                    <Button modifierClass={"bg-white rounded-lg shadow-[0_4px_4px_0_rgb(0,0,0,0.16)]"} />
                    <Button modifierClass={"bg-white rounded-3xl shadow-[0_4px_4px_0_rgb(0,0,0,0.16)]"} />
                </div>
            </section>
            <section className="flex gap-5 text-sm flex-col mb-10">
                <span className="font-semibold">Special</span>
                <div className="items-center flex-wrap flex gap-5">
                    <div className={`min-w-[30%] h-10 flex-1 border relative border-black bg-black`}>
                        <span className="w-full absolute top-6 translate-y-[1px]">
                            <Image src={"https://linktree.sirv.com/Images/svg%20element/torn.svg"} alt="ele" width={1000} height={100} priority className="w-full scale-[-1]" />
                        </span>
                        <span className="w-full absolute top-0 -translate-y-[6px]">
                            <Image src={"https://linktree.sirv.com/Images/svg%20element/torn.svg"} alt="ele" width={1000} height={1000} priority className="w-full" />
                        </span>
                    </div>
                    <div className={`min-w-[30%] h-10 flex-1 border relative border-black bg-black`}>
                        <span className="w-full absolute top-8 translate-y-[6px]">
                            <Image src={"https://linktree.sirv.com/Images/svg%20element/jiggy.svg"} alt="ele" width={1000} height={1000} priority className="w-full" />
                        </span>
                        <span className="w-full absolute top-0 -translate-y-[19px]">
                            <Image src={"https://linktree.sirv.com/Images/svg%20element/jiggy.svg"} alt="ele" width={1000} height={100} priority className="w-full scale-[-1]" />
                        </span>
                    </div>
                    <Button modifierClass={"border border-black relative grid place-items-center after:h-7 after:w-[107%] after:absolute after:border after:border-black"} />
                    <Button modifierClass={"border border-black bg-black rounded-3xl"} />
                    <div className={`min-w-[30%] h-10 flex-1 border relative border-black`}>
                        <div className={"h-2 w-2 border border-black bg-white absolute -top-1 -left-1"}></div>
                        <div className={"h-2 w-2 border border-black bg-white absolute -top-1 -right-1"}></div>
                        <div className={"h-2 w-2 border border-black bg-white absolute -bottom-1 -left-1"}></div>
                        <div className={"h-2 w-2 border border-black bg-white absolute -bottom-1 -right-1"}></div>
                    </div>
                    <Button modifierClass={"border border-black bg-black rounded-l-3xl"} />
                </div>
            </section>
            <section className="flex text-sm flex-col mb-10">
                <span className="font-semibold mb-[-10px]">Button colour</span>
                <ColorPicker />
            </section>
            <section className="flex text-sm flex-col mb-10">
                <span className="font-semibold mb-[-10px]">Button font colour</span>
                <ColorPicker />
            </section>
            <section className="flex text-sm flex-col">
                <span className="font-semibold mb-[-10px]">Shadow colour</span>
                <ColorPicker />
            </section>
        </div>
    );
} 