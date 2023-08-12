"use client"
import { appStorage, fireApp } from "@/important/firebase";
import { testForActiveSession } from "@/lib/authentication/testForActiveSession";
import { updateThemeBackground } from "@/lib/update data/updateTheme";
import { collection, doc, onSnapshot } from "firebase/firestore";
import Image from "next/image";
import { useContext, useEffect, useRef, useState } from "react";
import { FaCheck, FaX, } from "react-icons/fa6";
import { backgroundContext } from "../components/Backgrounds";
import { toast } from "react-hot-toast";
import { generateUniqueId } from "@/lib/utilities";
import { updateProfilePhoto } from "@/lib/update data/imageUpload";
import { backgroundImageUpload } from "@/lib/update data/backgroundImageUpload";
import { backgroundVideoUpload } from "@/lib/update data/backgroundVideoUpload";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";

export default function BackgroundCard({ text, colorValue, backImg }) {
    const { setIsGradient } = useContext(backgroundContext);
    const [isSelected, setIsSelected] = useState(false);
    const [uploadedFilePreview, setUploadedFilePreview] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [uploadedFile, setUploadedFile] = useState('');
    const [previewing, setPreviewing] = useState(false);
    const formRef = useRef();

    const inputRef = useRef();

    const handleFileChange = (e) => {
        const selectedFile = e.target.files[0];
        if (!selectedFile) {
            return;
        }
    
        if (text === "Image" && selectedFile.size > 2 * 1024 * 1024) {
            toast.error('Please select an image smaller than 2MB.');
            return;
        }
    
        if (text === "Video" && selectedFile.size > 20 * 1024 * 1024) {
            toast.error('Please select a video smaller than 20MB.');
            return;
        }
    
        // Handle image preview
        const previewImageURL = URL.createObjectURL(selectedFile);
        setUploadedFilePreview(previewImageURL);
        setUploadedFile(selectedFile);
        setPreviewing(true);
    }
    
    const handleUploadFile = async () => {
        if (uploadedFile === "") {
            return;
        }
    
        const file = `${generateUniqueId()}.${(uploadedFile.name).substring((uploadedFile.name).lastIndexOf('.') + 1)}`;
        const filePath = text === "Image" ? "backgroundImage": "backgroundVideo";
        const storageRef01 = ref(appStorage, `${filePath}/${file}`);
        let fileUrl = '';
    
        await uploadBytes(storageRef01, uploadedFile).then(async (snapshot) => {
            await getDownloadURL(snapshot.ref).then((url) => {
                fileUrl = url;
            });
        });
    
        return fileUrl;
    }
    
    const handleUpdateTheme = async () => {
        await updateThemeBackground(text);
    }
    
    const handleImagePickingProcess = async () => {
        setIsLoading(true);
        try {
            const getImageUrl = await handleUploadFile();
            await backgroundImageUpload(getImageUrl);
            setIsLoading(false);
    
            handleUpdateTheme();
            handleReset();
        } catch (error) {
            setIsLoading(false);
            throw new Error(error);
        }
    }
    
    const handleVideoPickingProcess = async () => {
        setIsLoading(true);
        try {
            const getVideoUrl = await handleUploadFile();
            await backgroundVideoUpload(getVideoUrl);
            setIsLoading(false);
    
            handleUpdateTheme();
            handleReset();
        } catch (error) {
            setIsLoading(false);
            throw new Error(error);
        }
    }
    
    const handleReset = () => {
        if (isLoading) {
            return;
        }
        formRef.current.reset();
        setUploadedFile('');
        setPreviewing(false);
    }
    
    function functionType() {
        switch (text) {
            case "Image":
                inputRef.current.click();
                break;
            case "Video":
                inputRef.current.click();
                break;
    
            default:
                handleUpdateTheme();
                break;
        }
    }
    
    const toasthandler = () => {
        const promise = text === "Image" ? handleImagePickingProcess() : handleVideoPickingProcess();
        toast.promise(
            promise,
            {
                loading: "Uploading file",
                success: "File uploaded",
                error: "An error occurred!"
            },
            {
                style: {
                    border: '1px solid #8129D9',
                    padding: '16px',
                    color: '#8129D9',
                },
                iconTheme: {
                    primary: '#8129D9',
                    secondary: '#FFFAEE',
                },
            }
        );
    }
    
    useEffect(() => {
        function fetchTheme() {
            const currentUser = testForActiveSession();
            const collectionRef = collection(fireApp, "AccountData");
            const docRef = doc(collectionRef, `${currentUser}`);

            onSnapshot(docRef, (docSnap) => {
                if (docSnap.exists()) {
                    const { backgroundType } = docSnap.data();
                    setIsGradient(backgroundType === "Gradient");
                    setIsSelected(backgroundType === text);
                }
            });
        }

        fetchTheme();
    }, [text]);

    return (
        <div className="min-w-[8rem] flex-1 items-center flex flex-col">
            <div className={`w-full h-[13rem] relative ${!colorValue && !backImg ? "border-dashed border-black" : ""} border rounded-lg hover:scale-105 active:scale-90 grid place-items-center cursor-pointer overflow-hidden`} onClick={functionType}>
                {isSelected && <div className="h-full w-full absolute top-0 left-0 bg-black bg-opacity-[0.5] grid place-items-center z-10 text-white text-xl">
                    <FaCheck />
                </div>}
                {colorValue ?
                    <div className="h-full w-full" style={{ backgroundColor: `${colorValue}` }}></div>
                    :
                    backImg ?
                        <div className="h-full w-full bg-cover bg-no-repeat"
                            style={{ backgroundImage: `${backImg}` }}>
                        </div>
                        :
                        <div className="h-full w-full grid place-items-center">
                            {text === "Image" && <input type="file" className="absolute opacity-0 pointer-events-none" ref={inputRef} accept="image/*" onChange={handleFileChange} />}
                            {text === "Video" && <input type="file" className="absolute opacity-0 pointer-events-none" ref={inputRef} accept="video/*" onChange={handleFileChange} />}
                            <div className="bg-black bg-opacity-[0.1] rounded-lg p-1">
                                <Image src={"https://linktree.sirv.com/Images/icons/image.svg"} alt={text} height={27} width={27} />
                            </div>
                        </div>
                }
            </div>
            <span className="py-3 text-sm">{text}</span>
            {previewing && <div className="fixed top-0 left-0 h-screen w-screen grid place-items-center z-[999999999999999]">
                <div className="absolute h-full w-full bg-black bg-opacity-[0.25] backdrop-blur-[1px] top-0 left-0 p-2" onClick={handleReset}></div>
                <form ref={formRef} className="relative z-10 sm:max-w-[30rem] max-w-18 max-h-[80vh] overflow-hidden p-4">
                    <div className="w-full scale-[0.95] relative overflow-hidden place-items-center grid aspect-square bg-white">
                        {text ==="Image" && <Image src={uploadedFilePreview} alt="profile pic" height={1000} width={1000} priority className="min-w-[10rem] w-full object-contain min-h-full" />}
                        {text === "Video" && <video className="min-w-[10rem] w-full object-contain min-h-full" controls>
                            <source src={uploadedFilePreview} type="video/mp4" />
                            Your browser does not support the video tag.
                        </video>}
                        {isLoading && <div className="absolute z-10 h-full w-full scale-110 grid place-items-center bg-black bg-opacity-[0.25] mix-blend-screen">
                            <Image src={"https://linktree.sirv.com/Images/gif/loading.gif"} width={50} height={50} alt="loading" className="mix-blend-screen" />
                        </div>}
                    </div>
                    {!isLoading && <div className="absolute top-2 right-2 rounded-full p-2 hover:bg-red-500 active:scale-90 bg-black text-white text-sm cursor-pointer" onClick={handleReset}>
                        <FaX />
                    </div>}
                    {!isLoading && <div className="p-3 text-lg text-white bg-btnPrimary w-fit rounded-full mx-auto active:bg-btnPrimaryAlt active:scale-90 hover:scale-110 cursor-pointer my-3" onClick={toasthandler}>
                        <FaCheck />
                    </div>}
                </form>
            </div>}
        </div>
    );
}