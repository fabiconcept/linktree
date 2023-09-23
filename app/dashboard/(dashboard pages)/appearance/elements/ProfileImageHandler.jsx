"use client"
import { generateUniqueId } from "@/lib/utilities";
import Image from "next/image";
import { useRef, useState } from "react";
import { uploadBytes, getDownloadURL, ref } from "firebase/storage";
import { updateProfilePhoto } from "@/lib/update data/imageUpload";
import { FaCheck, FaX } from "react-icons/fa6";
import { appStorage, fireApp } from "@/important/firebase";
import { toast } from "react-hot-toast";
import { useEffect } from "react";
import { testForActiveSession } from "@/lib/authentication/testForActiveSession";
import { collection, doc, onSnapshot } from "firebase/firestore";

export default function ProfileImageManager() {
    const [uploadedPhoto, setUploadedPhoto] = useState('');
    const [uploadedPhotoPreview, setUploadedPhotoPreview] = useState('');
    const [profilePicture, setProfilePicture] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [isRemoving, setIsRemoving] = useState(false);
    const [previewing, setPreviewing] = useState(false);
    const inputRef = useRef();
    const formRef = useRef();

    const handleFileChange = (e) => {
        const selectedFile = e.target.files[0];
        if (!selectedFile) {
            return;
        }

        // Handle image preview
        const previewImageURL = URL.createObjectURL(selectedFile);
        setUploadedPhotoPreview(previewImageURL);
        setUploadedPhoto(selectedFile);
        setPreviewing(true);
    };

    const handleUploadPhoto = async () => {
        if (uploadedPhoto === "") {
            return;
        }

        const photo = `${generateUniqueId()}.${(uploadedPhoto.name).substring((uploadedPhoto.name).lastIndexOf('.') + 1)}`;
        const storageRef01 = ref(appStorage, `profilePhoto/${photo}`);
        let photoUrl = '';

        await uploadBytes(storageRef01, uploadedPhoto).then(async (snapshot) => {
            await getDownloadURL(snapshot.ref).then((url) => {
                photoUrl = url;
            });
        });

        return photoUrl;
    }

    const handleUpdateUserInfo = async () => {
        setIsLoading(true);
        try {
            const getImageUrl = await handleUploadPhoto();
            await updateProfilePhoto(getImageUrl);
            setIsLoading(false);

            handleReset();
        } catch (error) {
            setIsLoading(false);
            throw new Error(error);
        }
    }

    const handleRemoveProfilePicture = async () => {
        setIsRemoving(true);
        try {
            await updateProfilePhoto("");
            setIsRemoving(false);
        } catch (error) {
            setIsRemoving(false);
            throw new Error(error);
        }
    }

    const toasthandler = () => {
        const promise = handleUpdateUserInfo();
        toast.promise(
            promise,
            {
                loading: "Setting new profile picture",
                success: "Profile Picture set",
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

    const handleReset = () => {
        if (isLoading) {
            return;
        }
        formRef.current.reset();
        setUploadedPhoto('');
        setPreviewing(false);
    }

    useEffect(() => {
        function fetchProfilePicture() {
            const currentUser = testForActiveSession();
            const collectionRef = collection(fireApp, "AccountData");
            const docRef = doc(collectionRef, `${currentUser}`);

            onSnapshot(docRef, (docSnap) => {
                if (docSnap.exists()) {
                    const { profilePhoto, displayName } = docSnap.data();

                    if (profilePhoto !== '') {
                        setProfilePicture(
                            <Image
                                src={`${profilePhoto}`}
                                alt="profile"
                                height={1000}
                                width={1000}
                                className="min-w-full h-full object-contain"
                                priority
                            />
                        );
                    } else {
                        setProfilePicture(
                            <div className="h-[95%] aspect-square w-[95%] rounded-full bg-gray-300 border grid place-items-center">
                                <span className="text-3xl font-semibold uppercase">
                                    {displayName.split('')[0]}
                                </span>
                            </div>
                        );
                    }
                }
            });
        }
        fetchProfilePicture();
    }, []);

    return (
        <div className="flex w-full p-6 items-center gap-4">
            <div className="h-[6rem] w-[6rem] cursor-pointer rounded-full grid place-items-center border overflow-hidden" onClick={() => inputRef.current.click()}>
                {profilePicture}
            </div>
            <div className="flex-1 grid gap-2 relative">
                <input type="file" className="absolute opacity-0 pointer-events-none" ref={inputRef} accept="image/*" onChange={handleFileChange} />
                <div className={`flex items-center gap-3 justify-center p-3 rounded-3xl cursor-pointer active:scale-95 active:opacity-60 active:translate-y-1 hover:scale-[1.005] bg-btnPrimary text-white w-full`} onClick={() => inputRef.current.click()}>
                    Pick an image
                </div>
                <div className={`flex items-center gap-3 justify-center p-3 rounded-3xl mix-blend-multiply cursor-pointer active:scale-95 active:opacity-60 active:translate-y-1 hover:scale-[1.005] border w-full`} onClick={handleRemoveProfilePicture}>
                    {!isRemoving ?
                        "Remove" :
                        <Image src={"https://linktree.sirv.com/Images/gif/loading.gif"} width={25} height={25} alt="loading" className="filter invert" />
                    }
                </div>
            </div>
            {previewing && <div className="fixed top-0 left-0 h-screen w-screen grid place-items-center z-[999999999999999]">
                <div className="absolute h-full w-full bg-black bg-opacity-[0.25] backdrop-blur-[1px] top-0 left-0 p-2" onClick={handleReset}></div>
                <form ref={formRef} className="relative z-10 sm:max-w-[30rem] max-w-18 max-h-[80vh] overflow-hidden p-4">
                    <div className="w-full scale-[0.95] relative rounded-full overflow-hidden place-items-center grid aspect-square bg-white">
                        <Image src={uploadedPhotoPreview} alt="profile pic" height={1000} width={1000} priority className="min-w-[10rem] w-full object-contain min-h-full" />
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