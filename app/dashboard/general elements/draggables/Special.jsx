"use client"

import { isValidURL, realEscapeString } from '@/lib/utilities';
import Image from 'next/image';
import { useContext, useEffect, useRef, useState } from 'react';
import { Draggable } from 'react-beautiful-dnd';
import { FaPencil, FaX } from 'react-icons/fa6';
import { useDebounce } from '@/Local Hooks/useDebounce';
import { ManageLinksContent } from '../../general components/ManageLinks';

export default function Special({ item, index }) {
    const [editingTitle, setEditingTitle] = useState(false);
    const { setData } = useContext(ManageLinksContent);
    const [editingUrl, setEditingUrl] = useState(false);
    const [titleText, setTitleText] = useState(item.title);
    const [urlText, setUrlText] = useState(item.url);
    const [wantsToDelete, setWantsToDelete] = useState(false);
    const [urlIsValid, setUrIslValid] = useState(0);
    const titleRef = useRef();
    const urlRef = useRef();
    const debounceUrl = useDebounce(urlText, 500);
    const [checkboxChecked, setCheckboxChecked] = useState(item.isActive);
    const debounceCheckbox = useDebounce(checkboxChecked, 500);
    const [contentFilled, setContentFilled] = useState(false);

    const editArrayActiveStatus = () =>{
        setData(prevData => {
            return prevData.map(i => {
              if (i.id === item.id) {
                return {
                  ...i,
                  isActive: checkboxChecked
                };
              }
              return i;
            });
          });
    }

    const editArrayTitle = () =>{
        setData(prevData => {
            return prevData.map(i => {
              if (i.id === item.id) {
                return {
                  ...i,
                  title: titleText
                };
              }
              return i;
            });
          });
    }

    const editArrayUrl = () =>{
        setData(prevData => {
            return prevData.map(i => {
              if (i.id === item.id) {
                return {
                  ...i,
                  url: urlText
                };
              }
              return i;
            });
          });
    }

    useEffect(() => {
        if (!editingUrl && urlText !== item.url) {
            editArrayUrl();
        }
    }, [editingUrl, editArrayUrl]);

    useEffect(() => {
        if (!editingTitle && titleText !== item.title) {
            editArrayTitle();
        }
    }, [editingTitle, editArrayTitle]);

    useEffect(() => {
        if (checkboxChecked !== item.isActive) {
            editArrayActiveStatus();
        }
    }, [debounceCheckbox, editArrayActiveStatus]);


    useEffect(() => {
        if (urlText !== "") {
            if (isValidURL(urlText)) {
                setUrIslValid(2);
            }else{
                setUrIslValid(1);
            }
            return;
        }
        setUrIslValid(0);
    }, [debounceUrl]);

    const handleTriggerEditTitle = () => {
        if (!editingTitle) {
            setEditingTitle(true);
        }
    }

    const handleTriggerEditUrl = () => {
        if (!editingUrl) {
            setEditingUrl(true);
        }
    }

    const handleUpdateTitle = (e) => {
        const inputType = e.nativeEvent.inputType
        if (String(titleText).length < 35 || inputType === "deleteContentBackward") {
            const value = e.target.value;
            setTitleText(realEscapeString(value));
        }
    }

    const handleDelete = () => {
        setData(prevData => {
          return prevData.filter(i => i.id !== item.id);
        });
    };

    const handleCheckboxChange = (event) => {
        contentFilled && setCheckboxChecked(event.target.checked);
    };

    const handleUpdateUrl = (e) => {
        const inputType = e.nativeEvent.inputType
        if (String(urlText).length < 60 || inputType === "deleteContentBackward") {
            const value = e.target.value;
            setUrlText(realEscapeString(value));
        }
    }

    const handleSetFocusTitle = () =>{
        titleRef.current.focus();
    }
    
    const handleSetFocusUrl = () =>{
        urlRef.current.focus();
    }

    useEffect(()=>{
        if (editingUrl) {
            handleSetFocusUrl();
        }
        if (editingTitle) {
            handleSetFocusTitle();
        }
    }, [editingTitle, editingUrl]);

    useEffect(() => {
        if (urlIsValid !== 2) {
            setContentFilled(false);
            return;
        }
        setContentFilled(true);
    }, [urlIsValid, debounceUrl]);

    return (
        <Draggable draggableId={item.id} index={index}>
            {(provided) => (
                <div
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    className={`rounded-3xl border flex flex-col bg-white ${urlText === '' ? 'border-themeYellow': ''}`}
                >
                    <div className={`h-[8rem] items-center flex`}>
                        <div
                            className='active:cursor-grabbing h-full min-w-fit px-4 grid place-items-center'
                            {...provided.dragHandleProps}
                        >
                            <Image
                                src={"https://linktree.sirv.com/Images/icons/drag.svg"}
                                alt='"icon'
                                height={15}
                                className='object-contain'
                                width={15}
                            />
                        </div>

                        <div className='flex-1 flex flex-col gap-1'>
                            <div className='flex gap-3 items-center text-base cursor-pointer w-[95%]' onClick={handleTriggerEditTitle}>
                                {editingTitle && <input
                                    type="text"
                                    className='sm:w-auto border-none outline-none'
                                    placeholder='Enter text'
                                    onChange={handleUpdateTitle}
                                    onBlur={() => setEditingTitle(false)}
                                    value={titleText}
                                    ref={titleRef}
                                />}
                                {!editingTitle && <span className='sm:font-semibold font-bold sm:text-base text-sm'>{titleText === "" ? "Headline title" : titleText}</span>}
                                {!editingTitle && <FaPencil className='text-xs' />}
                            </div>
                            <div className='flex gap-3 items-center relative text-sm opacity-100 cursor-pointer w-full' onClick={handleTriggerEditUrl}>
                                {editingUrl && <input
                                    type="text"
                                    className={`w-[10rem] sm:w-fit border-none outline-none sm:flex-1`}
                                    placeholder=''
                                    onChange={handleUpdateUrl}
                                    onBlur={() => setEditingUrl(false)}
                                    value={urlText}
                                    ref={urlRef}
                                />}
                                {!editingUrl && <span className={`w-[10rem] truncate sm:w-fit ${urlIsValid === 1 ? 'text-red-500': '' }`}>{urlText === "" ? "URL" : urlText}</span>}
                                {!editingUrl && <FaPencil className='text-xs' />}
                                {urlIsValid === 1 && <div
                                    className={`z-[999] nopointer absolute translate-y-7 font-semibold bg-red-500 text-white text-xs rounded px-2 py-1 after:absolute after:h-0 after:w-0 after:border-l-[6px] after:border-r-[6px] after:border-l-transparent after:border-r-transparent after:border-b-[8px] after:border-b-red-500 after:-top-2 after:left-3`}
                                >please enter a valid url</div>}
                            </div>
                        </div>
                        <div className='grid sm:pr-2 gap-2 place-items-center'>
                            <div className={`scale-[0.8] sm:scale-100 ${!contentFilled ? "opacity-60 pointer-events-none" : "" } min-w-fit`}>
                                <label className="cursor-pointer relative flex justify-between items-center group p-2 text-xl">
                                    <input type="checkbox" onChange={handleCheckboxChange} checked={checkboxChecked} className="absolute left-1/2 -translate-x-1/2 w-full h-full peer appearance-none rounded-md" />
                                    <span className="cursor-pointer w-9 h-6 flex items-center flex-shrink-0 ml-4 p-1 bg-gray-400 rounded-full duration-300 ease-in-out peer-checked:bg-green-600 after:w-4 after:h-4 after:bg-white after:rounded-full after:shadow-md after:duration-300 peer-checked:after:translate-x-3 group-hover:after:translate-x-[2px]"></span>
                                </label>
                            </div>
                            <div className={`${wantsToDelete ? "bg-btnPrimary" : "hover:bg-black hover:bg-opacity-[0.05]"} relative p-2 ml-3 active:scale-90 cursor-pointer group rounded-lg min-w-fit`} onClick={() => setWantsToDelete(!wantsToDelete)}>
                                <Image src={"https://linktree.sirv.com/Images/icons/trash.svg"} alt="delete" className={`${wantsToDelete ? "filter invert" : "opacity-60 group-hover:opacity-100"}`} height={17} width={17} />
                                {!wantsToDelete && <div
                                    className={`z-[999] nopointer group-hover:block hidden absolute -translate-x-1/2 left-1/2 translate-y-3 bg-black text-white text-sm rounded-lg px-2 py-1 after:absolute after:h-0 after:w-0 after:border-l-[6px] after:border-r-[6px] after:border-l-transparent after:border-r-transparent after:border-b-[8px] after:border-b-black after:-top-2 after:-translate-x-1/2 after:left-1/2`}
                                >delete</div>}
                            </div>
                        </div>
                    </div>

                    {<div className={`w-full flex flex-col ${wantsToDelete ? "h-[9.5rem]" : "h-0"} overflow-hidden`}>
                        <div className='relative z-[999999] w-full bg-gray-300 text-center sm:text-sm text-xs font-semibold py-1'>
                            Delete
                            <span className='absolute -translate-y-1/2 top-1/2 right-2 text-sm' onClick={() => setWantsToDelete(false)}>
                                <FaX />
                            </span>
                        </div>
                        <div className='relative w-full text-center sm:text-sm text-xs font-semibold py-3'>
                            Delete delete this forever?
                        </div>

                        <div className='p-4 flex gap-5'>
                            <div className={`flex items-center gap-3 justify-center p-3 rounded-3xl cursor-pointer active:scale-95 active:opacity-60 active:translate-y-1 hover:scale-[1.005] w-[10rem] flex-1 text-sm border`} onClick={() => setWantsToDelete(false)}>
                                Cancel
                            </div>
                            <div className={`flex items-center gap-3 justify-center p-3 rounded-3xl cursor-pointer active:scale-95 active:opacity-60 active:translate-y-1 hover:scale-[1.005] w-[10rem] flex-1 text-sm bg-btnPrimary text-white`} onClick={handleDelete}>
                                Delete
                            </div>
                        </div>
                    </div>}
                    {!wantsToDelete && <div className='overflow-hidden rounded-b-3xl border-t border-themeYellow'>
                        <div className='px-6 py-3 sm:text-sm text-xs bg-themeYellowLight'>Enter your {item.urlKind ? item.urlKind : "Custom"} URL, then setup your link</div>
                    </div>}
                </div>
            )}
        </Draggable>
    );
}