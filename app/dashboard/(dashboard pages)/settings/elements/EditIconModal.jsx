"use client"

import { useContext, useEffect, useState } from "react";
import { SocialContext } from "../components/SocialSetting";
import { useDebounce } from "@/Local Hooks/useDebounce";
import Image from "next/image";
import { SocialsList } from "@/lib/SocialsList";
import { isValidEmail, isValidURL, validateEmail } from "@/lib/utilities";

export default function EditIconModal() {
    const { setSettingIconModalOpen, settingIconModalOpen, setAddIconModalOpen, setSocialsArray } = useContext(SocialContext);
    const [defaultData, setDefaultData] = useState({});
    const [validInput, setValidInput] = useState(0);
    const [valueText, setValueText] = useState("");
    const [inputType, setInputType] = useState('');
    const debouceValueText = useDebounce(valueText, 500);

    function isValidWhatsAppNumber(inputNumber) {
        const pattern = /^\+\d{1,3}\s?\d{6,14}$/;
        return pattern.test(inputNumber);
    }

    useEffect(() => {
        setDefaultData(SocialsList[settingIconModalOpen.type]);
        setValueText(settingIconModalOpen.value);
    }, [settingIconModalOpen?.value, settingIconModalOpen?.type]);

    useEffect(() => {
        if (defaultData) {
            switch (defaultData.valueType) {
                case "url":
                    setInputType("url");
                    break;
                case "text":
                    setInputType("text");
                    break;
                case "number":
                    setInputType("number");
                    break;
                case "email":
                    setInputType("email");
                    break;
            
                default:
                    setInputType("url");
                    break;
            }
        }
    }, [defaultData]);

    useEffect(() => {
        if (valueText === "") {
            setValidInput(0);
            return;
        }

        switch (defaultData.valueType) {
            case "url":
                if (isValidURL(valueText)) {
                    setValidInput(1);
                    return;
                }
                setValidInput(2);
                break;
            case "text":
                setValidInput(1);
                break;
            case "number":
                if (isValidWhatsAppNumber(valueText)) {
                    setValidInput(1);
                    return;
                }
                setValidInput(2);
                break;
            case "email":
                if (isValidEmail(valueText)) {
                    setValidInput(1);
                    return;
                }
                setValidInput(2);
                break;

            default:
                if (isValidURL(valueText)) {
                    setValidInput(1);
                    return;
                }
                setValidInput(2);
                break;
        }
    }, [debouceValueText]);

    const handleBack = () =>{
        handleClose();
        setAddIconModalOpen(true);
    }

    const handleClose = () => {
        setSettingIconModalOpen({
            statue: false,
            type: 0,
            operation: 0
        });
    }

    const handleAdd = () =>{
        if (validInput !== 1) {
            return;
        }
        
        setSocialsArray((previousArray)=> 
            [...previousArray, {
                id: defaultData.id, 
                type: defaultData.type, 
                value: valueText, 
                active: true
            }]);

        handleClose();
    }

    const handleSave = () =>{
        if (validInput !== 1) {
            return;
        }

        setSocialsArray((previousItems) =>
            previousItems.map(
                item => item.id === defaultData.id ? { ...item, value: valueText } : item
            )
        );
        handleClose();
    }

    const handleBtnChoice = () =>{
        switch (settingIconModalOpen.operation) {
            case 0:
                handleAdd();
                break;
            case 1:
                console.log("case 1")
                handleSave();
                break;
        
            default:
                break;
        }
    }

    const handleRemove = () =>{
        setSocialsArray((previousItems) =>
            previousItems.filter(item => item.id !== defaultData.id)
        );
        handleClose();
    }

    return (
        <div className="fixed top-0 left-0 h-screen w-screen grid place-items-center z-[99999999999]">
            <div className="absolute h-full w-full bg-black bg-opacity-25 top-0 left-0" onClick={handleClose}></div>
            <div className="relative z-10 h-fit flex flex-col sm:w-[32rem] w-full enter pb-5 bg-white rounded-3xl">
                <div className="grid grid-cols-[32px_auto_32px] p-5 items-center">
                    <div>
                        {settingIconModalOpen.operation === 0 && <div className="grid place-items-center h-md aspect-square rounded-lg active:border-black border border-transparent active:scale-90 hover:bg-black hover:bg-opacity-5 cursor-pointer" onClick={handleBack}><Image src={"https://linktree.sirv.com/Images/icons/arrow.svg"} className="transform rotate-90" alt="x" width={15} height={15} /></div>}
                    </div>
                    {settingIconModalOpen.operation === 0 && <span className="text-center font-semibold">Add {defaultData.title} Icon</span>}
                    {settingIconModalOpen.operation === 1 && <span className="text-center font-semibold">Edit {defaultData.title}</span>}
                    <div className="cursor-pointer grid place-items-center h-md aspect-square rounded-lg active:border-black border border-transparent active:scale-90 hover:bg-black hover:bg-opacity-5" onClick={handleClose}><Image src={"https://linktree.sirv.com/Images/icons/svgexport-40.svg"} alt="x" width={15} height={15} /></div>
                </div>
                <div className="mx-5">
                    <div className="rounded-[10px] relative focus-within:ring-2 focus-within:ring-black transition duration-75 ease-out hover:shadow-[inset_0_0_0_2px_#e0e2d9] hover:focus-within:shadow-none bg-black bg-opacity-[0.025]">
                        <div className="flex rounded-[10px] leading-[48px] border-solid border-2 border-transparent">
                            <div className="flex w-full items-center bg-black bg-opacity-5 rounded-lg overflow-hidden">
                                <div className="relative grow">
                                    <input
                                        name="searchTerm"
                                        placeholder="Search"
                                        className="placeholder-transparent peer px-3 text-base leading-[48px] placeholder:leading-[48px] rounded-xl block py-1 w-full bg-chalk text-black transition duration-75 ease-out !outline-none bg-transparent"
                                        value={valueText}
                                        type={inputType}
                                        onChange={(e) => setValueText(e.target.value)}
                                    />
                                    <label
                                        className="absolute pointer-events-none text-sm text-concrete left-3 transition-all transform -translate-y-2.5 scale-[0.85] top-[13px] origin-[0] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-1 peer-placeholder-shown:tracking-normal peer-focus:scale-[0.85] peer-placeholder-shown:font-normal font-semibold peer-focus:font-semibold peer-focus:-translate-y-2.5 max-w-[calc(100%-16px)] truncate"
                                    >
                                        {defaultData.placeholder}
                                    </label>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {validInput == 2 && <p className="text-red-500 mx-7 my-2 text-sm">{defaultData.error}</p>}

                {settingIconModalOpen.operation === 0 && <p className="mx-8 mt-5 text-xs opacity-50">Example: {defaultData.example}</p>}

                {<div className={`mx-5 flex items-center gap-3 justify-center mt-5 p-3 rounded-3xl active:scale-95 active:opacity-60 active:translate-y-1 hover:scale-[1.005] border select-none ${validInput === 1 ? "bg-btnPrimary text-white cursor-pointer" : "bg-black bg-opacity-30 opacity-40"} font-semibold`} onClick={handleBtnChoice}>
                    {settingIconModalOpen.operation === 0 ?  "Add to Linktree": "Save"}
                </div>}
                {settingIconModalOpen.operation === 1 && <div className={`mx-5 mt-3 flex items-center gap-3 justify-center p-3 rounded-3xl active:scale-95 active:opacity-60 active:translate-y-1 hover:scale-[1.005] border font-semibold cursor-pointer select-none`} onClick={handleRemove}>
                    Remove icon
                </div>}
            </div>
        </div>
    );
}