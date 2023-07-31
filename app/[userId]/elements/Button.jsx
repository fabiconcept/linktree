"use client"
import { fireApp } from "@/important/firebase";
import { fetchUserData } from "@/lib/fetch data/fetchUserData";
import { hexToRgba, makeValidUrl } from "@/lib/utilities";
import { collection, doc, onSnapshot } from "firebase/firestore";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import IconDiv from "./IconDiv";
import "./style/3d.css";
import { baseUrlIcons, getCompanyFromUrl } from "@/lib/BrandLinks";

export default function Button({ url, content, userId }) {
    const [modifierClass, setModifierClass] = useState("");
    const [specialElements, setSpecialElements] = useState(null);
    const [selectedTheme, setSelectedTheme]= useState('');
    const [btnType, setBtnType] = useState(0);
    const [btnShadowColor, setBtnShadowColor] = useState('');
    const [btnFontColor, setBtnFontColor] = useState('');
    const [btnColor, setBtnColor] = useState('');
    const [accentColor, setAccentColor] = useState([]);
    const [btnFontStyle, setBtnFontStyle] = useState(null);
    const router = useRouter();

    function getRootNameFromUrl(url) {
        try {
            const urlObj = new URL(makeValidUrl(url));
            const rootName = urlObj.hostname;
            return rootName;
        } catch (error) {
            console.log(error.message, url);
            throw new Error(error);
        }
    }

    const [modifierStyles, setModifierStyles] = useState({
        backgroundColor: "",
        color: "",
        boxShadow: "",
    });

    useEffect(() => {
        async function fetchInfo() {
            const currentUser = await fetchUserData(userId);

            if (!currentUser) {
                router.push("/");
                return;
            }

            const collectionRef = collection(fireApp, "AccountData");
            const docRef = doc(collectionRef, `${currentUser}`);

            onSnapshot(docRef, (docSnapshot) => {
                if (!docSnapshot.exists()) {
                    return;
                }
                const { btnType, btnShadowColor, btnFontColor, btnColor, selectedTheme } = docSnapshot.data();
                setBtnColor(btnColor ? btnColor : "#fff");
                setSelectedTheme(selectedTheme);
                setBtnFontColor(btnFontColor ? btnFontColor: "#000");
                setBtnShadowColor(btnShadowColor ? btnShadowColor : "#000");
                setBtnType(btnType);
            });
        }

        fetchInfo();
    }, []);

    useEffect(() => {
        if (selectedTheme === "3D Blocks") {
            const rootName = getRootNameFromUrl(url);
            setModifierClass(`
                relative after:absolute after:h-2 after:w-[100.5%] after:bg-black bg-white
                after:-bottom-2 after:left-[1px] after:skew-x-[57deg] after:ml-[2px]
                before:absolute before:h-[107%] before:w-3 before:bg-[currentColor]
                before:top-[1px] before:border-2 before:border-black before:-right-3 before:skew-y-[30deg]
                before:grid before:grid-rows-2
                border-2 border-black inset-2
                ml-[-20px]
                btn
            `);
            setSpecialElements(null);
            setBtnFontStyle({
                color: "#fff"
            });

            console.log(String(getCompanyFromUrl(rootName)).toLocaleLowerCase());
            switch (String(getCompanyFromUrl(rootName)).toLocaleLowerCase()) {
                case 'tiktok':
                    setAccentColor(["#ff0050", "#00f2ea"]);
                    break;
                case 'audiomack':
                    setAccentColor(["#ffa200", "#2a2a2a"]);
                    break;
                case 'twitter':
                    setAccentColor(["#1DA1F2", "#657786"]);
                    break;
                case 'linkedin':
                    setAccentColor(["#0077b5", "#0077b5"]);
                    break;
                case 'spotify':
                    setAccentColor(["#1DB954", "#1DB954"]);
                    break;
                case 'youtube':
                    setAccentColor(["#FF0000", "#FF0000"]);
                    break;
                case 'reddit':
                    setAccentColor(["#ff4500", "#5f99cf"]);
                    break;
                case 'paypal':
                    setAccentColor(["#003087", "#009cde"]);
                    break;
                case 'instagram':
                    setAccentColor(["#E1306C", "#833AB4"]);
                    break;
                case 'facebook':
                    setAccentColor(["#4267B2", "#898F9C"]);
                    break;
            
                default:
                    setAccentColor(["#191414", "#14171A"]);
                    break;
            }
            return;
        }

        switch (btnType) {
            case 0:
                setModifierClass("");
                setSpecialElements(null);
                break;
            case 1:
                setModifierClass("rounded-lg");
                setSpecialElements(null);
                break;
            case 2:
                setModifierClass("rounded-3xl");
                setSpecialElements(null);
                break;
            case 3:
                setModifierClass("border border-black bg-opacity-0");
                setSpecialElements(null);
                break;
            case 4:
                setModifierClass("border border-black rounded-lg bg-opacity-0");
                setSpecialElements(null);
                break;
            case 5:
                setModifierClass("border border-black rounded-3xl bg-opacity-0");
                setSpecialElements(null);
                break;
            case 6:
                setModifierClass(`bg-white border border-black`);
                setSpecialElements(null);
                break;
            case 7:
                setModifierClass(`bg-white border border-black rounded-lg`);
                setSpecialElements(null);
                break;
            case 8:
                setModifierClass(`bg-white border border-black rounded-3xl`);
                setSpecialElements(null);
                break;
            case 9:
                setModifierClass(`bg-white`);
                setSpecialElements(null);
                break;
            case 10:
                setModifierClass(`bg-white rounded-lg`);
                setSpecialElements(null);
                break;
            case 11:
                setModifierClass(`bg-white rounded-3xl`);
                setSpecialElements(null);
                break;
            case 12:
                setModifierClass("relative border border-black bg-black");
                setSpecialElements(
                    <>
                        <span className="w-full absolute left-0 bottom-0 translate-y-[6px]">
                            <Image src={"https://linktree.sirv.com/Images/svg%20element/torn.svg"} alt="ele" width={1000} height={100} priority className="w-full scale-[-1]" />
                        </span>
                        <span className="w-full absolute left-0 top-0 -translate-y-[6px]">
                            <Image src={"https://linktree.sirv.com/Images/svg%20element/torn.svg"} alt="ele" width={1000} height={1000} priority className="w-full" />
                        </span>
                    </>
                );
                break;
            case 13:
                setModifierClass("relative border border-black bg-black");
                setSpecialElements(
                    <>
                        <span className="w-full absolute left-0 bottom-0 translate-y-[4px]">
                            <Image src={"https://linktree.sirv.com/Images/svg%20element/jiggy.svg"} style={{fill: modifierStyles.backgroundColor}} alt="ele" width={1000} height={8} priority className="w-full" />
                        </span>
                        <span className="w-full absolute left-0 top-0 -translate-y-[3px]">
                            <Image src={"https://linktree.sirv.com/Images/svg%20element/jiggy.svg"} style={{fill: modifierStyles.backgroundColor}} alt="ele" width={1000} height={8} priority className="w-full scale-[-1]" />
                        </span>
                    </>
                );
                break;
            case 14:
                setModifierClass("border border-black relative after:-translate-y-1/2 after:-translate-x-1/2 after:top-1/2 after:left-1/2 after:h-[88%] after:w-[104%] after:absolute after:border after:border-black after:mix-blend-difference");
                setSpecialElements(null);
                break;
            case 15:
                setModifierClass("border border-black bg-black rounded-3xl");
                setSpecialElements(null);
                break;
            case 16:
                setModifierClass("relative border border-black bg-black");
                setSpecialElements(
                    <>
                        <div className={"h-2 w-2 border border-black bg-white absolute -top-1 -left-1"}></div>
                        <div className={"h-2 w-2 border border-black bg-white absolute -top-1 -right-1"}></div>
                        <div className={"h-2 w-2 border border-black bg-white absolute -bottom-1 -left-1"}></div>
                        <div className={"h-2 w-2 border border-black bg-white absolute -bottom-1 -right-1"}></div>
                    </>
                );
                break;  
            default:
                setModifierClass("");
                setSpecialElements(null);
                break;
        }
    }, [btnType, selectedTheme]);

    useEffect(() => {
        if (selectedTheme === "3D Blocks") {
            return;
        }

        function getShadow () {
            switch (btnType) {
                case 6:
                    return `4px 4px 0 0 ${hexToRgba(btnShadowColor)}`;
                case 7:
                    return `4px 4px 0 0 ${hexToRgba(btnShadowColor)}`;
                case 8:
                    return `4px 4px 0 0 ${hexToRgba(btnShadowColor)}`;
                case 9:
                    return `0 4px 4px 0 ${hexToRgba(btnShadowColor, 0.16)}`;
                case 10:
                    return `0 4px 4px 0 ${hexToRgba(btnShadowColor, 0.16)}`;
                case 11:
                    return `0 4px 4px 0 ${hexToRgba(btnShadowColor, 0.16)}`;

                default:
                    return '';
            }
        }

        const shadowStyle = getShadow();

        setModifierStyles((previewsStyles) => ({
            ...previewsStyles,
            boxShadow: shadowStyle,
        }));
    }, [btnShadowColor, btnType, selectedTheme]);

    useEffect(() => {
        if (selectedTheme === "3D Blocks") {
            return;
        }

        function getBtnColor () {
            switch (btnType) {
                case 12:
                    return ``;
                case 13:
                    return ``;

                default:
                    return `${btnColor}`;
            }
        }

        const backgroundStyle = getBtnColor();

        setModifierStyles((previewsStyles) => ({
            ...previewsStyles,
            backgroundColor: `${backgroundStyle}`,
        }));
    }, [btnColor, btnType, selectedTheme]);

    useEffect(() => {
        if (selectedTheme === "3D Blocks") {
            return;
        }

        function getBtnFontColor () {
            switch (btnType) {
                case 12:
                    return `#fff`;
                case 13:
                    return `#fff`;

                default:
                    return `${btnFontColor}`;
            }
        }

        const fontColorStyle = getBtnFontColor();

        setBtnFontStyle((previewsStyles) => ({
            ...previewsStyles,
            color: `${fontColorStyle}`,
        }));
    }, [btnFontColor, btnType, selectedTheme]);

    useEffect(()=>{
        if (accentColor.length > 0) {
            setModifierStyles({
                backgroundColor: `${accentColor[0]}`,
                color: `${accentColor[1]}`
            });
        }
    }, [accentColor]);

    return (
        <Link
            href={makeValidUrl(url)}
            className={`${modifierClass} cursor-pointer flex gap-3 items-center hover:scale-[1.025] active:scale-95 md:w-[35rem] sm:w-[30] w-[20rem] min-h-10 py-3 px-3`}
            style={modifierStyles}
        >
            {specialElements}
            <IconDiv url={url} />
            <span className="font-semibold truncate max-w-[90%] flex-1" style={btnFontStyle}>{content}</span>
        </Link>
    );
}