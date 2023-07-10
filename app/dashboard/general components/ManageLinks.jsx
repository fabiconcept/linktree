import MyBtn from "../general elements/btn";
import Image from "next/image";
import AddBtn from "../general elements/addBtn";
import DraggableList from "./Drag";

export default function ManageLinks() {
    const data = [
        { id: '1', content: 'Item 1' },
        { id: '2', content: 'Item 2' },
        { id: '3', content: 'Item 3' },
        { id: '4', content: 'Item 4' },
    ]

    return (
        <div className="flex-1 flex-col gap-4 py-3 flex overflow-y-auto px-2">
            <AddBtn />
            <MyBtn
                extraClass={"border hover:bg-black hover:bg-opacity-[0.05] w-fit text-sm p-3 mt-3"}
                content={
                    <>
                        <Image src={"https://linktree.sirv.com/Images/icons/add.svg"} alt="links" height={15} width={15} />
                        <span>Add Header</span>
                    </>
                }
            />


            {data.length === 0 && <div className="p-6 flex-col gap-4 flex items-center justify-center opacity-30">
                <Image
                    src={"https://linktree.sirv.com/Images/logo-icon.svg"}
                    alt="logo"
                    height={100}
                    width={100}
                    className="opacity-50"
                />
                <span className="text-center max-w-[15rem] font-semibold">
                    Show the world who you are.
                    Add a link to get started.
                </span>
            </div>}

            {data.length > 0 && <DraggableList array={data}/>}
        </div>
    );
}