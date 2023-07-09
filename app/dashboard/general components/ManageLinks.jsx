import { FaPlus } from "react-icons/fa6";
import MyBtn from "../general elements/btn";
import Image from "next/image";
import AddBtn from "../general elements/addBtn";

export default function ManageLinks() {
    return (
        <div className="flex-1 flex-col gap-4 flex">
            <AddBtn />
            <MyBtn
                extraClass={"border hover:bg-black hover:bg-opacity-[0.05] w-fit text-sm p-3 mt-6"}
                content={
                    <>
                        <Image src={"https://linktree.sirv.com/Images/icons/add.svg"} alt="links" height={15} width={15} />
                        <span>Add Header</span>
                    </>
                }
            />
            <div>

            </div>
        </div>
    );
}