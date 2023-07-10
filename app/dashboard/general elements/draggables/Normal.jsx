"use client"

import { realEscapeString } from '@/lib/utilities';
import Image from 'next/image';
import { useRef, useState } from 'react';
import { Draggable } from 'react-beautiful-dnd';
import { FaPencil } from 'react-icons/fa6';

export default function Normal({ item, index }) {
    const [editing, setEditing] = useState(false);
    const [textContent, setTextContent] = useState('');
    const radioRef = useRef();


    const handleTriggerEditText = () => {
        if (!editing) {
            setEditing(true);
        }
    }

    const handleUpdateContent = (e) => {
        const inputType = e.nativeEvent.inputType
        console.log(inputType)
        if (String(textContent).length < 35 || inputType === "deleteContentBackward") {
            const value = e.target.value;
            setTextContent(realEscapeString(value));
        }
    }
    return (
        <Draggable draggableId={item.id} index={index}>
            {(provided) => (
                <div
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    className='rounded-3xl border p-2 flex flex-col bg-white'
                >
                    <div className='h-[8rem] items-center flex'>
                        <div
                            className='active:cursor-grabbing h-full px-1 grid place-items-center'
                            {...provided.dragHandleProps}
                        >
                            <Image
                                src={"https://linktree.sirv.com/Images/icons/drag.svg"}
                                alt='"icon'
                                height={15}
                                width={15}
                            />
                        </div>
                        <div className='flex-1 flex flex-col px-3'>
                            <div className='flex gap-3 items-center mx-auto opacity-70 cursor-pointer' onClick={handleTriggerEditText}>
                                {editing && <input
                                    type="text"
                                    className='w-[15rem] text-center border-none outline-none'
                                    placeholder='Enter text'
                                    onChange={handleUpdateContent}
                                    onBlur={() => setEditing(false)}
                                    value={textContent}
                                />}
                                {!editing && <span>{textContent === "" ? "Headline title" : textContent}</span>}
                                {!editing && <FaPencil className='text-sm' />}
                            </div>
                            {editing && <div className='text-sm mt-2 opacity-70'>
                                <span className={`${String(textContent).length < 35 ? "text-black" : "text-red-400"}`}>{String(textContent).length}</span><span>/</span><span>35</span>
                            </div>}
                        </div>
                        <div className='grid pr-4 gap-3 place-items-center'>
                            <div className='cursor-pointer'>
                                <label class="relative flex justify-between items-center group p-2 text-xl">
                                    <input type="checkbox" class="absolute left-1/2 -translate-x-1/2 w-full h-full peer appearance-none rounded-md" />
                                    <span class="w-9 h-6 flex items-center flex-shrink-0 ml-4 p-1 bg-gray-300 rounded-full duration-300 ease-in-out peer-checked:bg-green-400 after:w-4 after:h-4 after:bg-white after:rounded-full after:shadow-md after:duration-300 peer-checked:after:translate-x-3 group-hover:after:translate-x-[2px]"></span>
                                </label>
                            </div>
                            <div className='hover:bg-black hover:bg-opacity-[0.05] p-2 ml-3 active:scale-90 opacity-60 hover:opacity-100 cursor-pointer rounded-lg'>
                                <Image src={"https://linktree.sirv.com/Images/icons/trash.svg"} alt="delete" height={17} width={17} />
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </Draggable>
    )
}