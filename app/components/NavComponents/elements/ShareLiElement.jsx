"Use client"
import { useContext, useState } from "react";
import { ShareContext } from "../ShareCard";
import Link from "next/link";
import { useRef } from "react";
import { 
    FacebookShareButton, 
    LinkedinShareButton, 
    TwitterShareButton, 
    WhatsappShareButton, 
    FacebookMessengerShareButton, 
    EmailShareButton,
} from "react-share";
import { makeValidUrl } from "@/lib/utilities";
import { useEffect } from "react";

export default function ShareLiElement({children, nextPage }) {
    const { myLink, setCurrentPage } = useContext(ShareContext);
    const [linkToOpen, setLinkToOpen] = useState("");
    const FacebookRef = useRef();
    const LinkedinRef = useRef();
    const TwitterRef = useRef();
    const WhatsAppRef = useRef();
    const MessengerRef = useRef();
    const EmailRef = useRef();
    const linkToOpenRef = useRef();

    const openLinkInNewTab = (url) => {
        setLinkToOpen(url);
      };

    const handleNextPage = () => {
        if (String(nextPage).includes("shareNow-")) {
            const shareTo = String(nextPage).split("-")[1];
            switch (shareTo) {
                case "Snapchat":
                    openLinkInNewTab(`https://www.snapchat.com/scan?attachmentUrl=${myLink}`);
                    break;
                case "Facebook":
                    FacebookRef.current.click();
                    break;
                case "Linkedin":
                    LinkedinRef.current.click();
                    break;
                case "Twitter":
                    TwitterRef.current.click();
                    break;
                case "WhatsApp":
                    WhatsAppRef.current.click();
                    break;
                case "Messenger":
                    MessengerRef.current.click();
                    break;
                case "Email":
                    EmailRef.current.click();
                    break;
            
                default:
                    break;
            }
            return;
        }
        
        if (nextPage.type && String(nextPage.type).includes("goTo-")) {
            const shareTo = String(nextPage).split("-")[1];
            openLinkInNewTab(makeValidUrl(nextPage.goTo));
            return;
        }

        if (nextPage === "myLink") {
            openLinkInNewTab(myLink);
            return
        }

        setCurrentPage((previousPages) => [...previousPages, { page: nextPage }]);
    }

    useEffect(() => {
        if (linkToOpen) {
            linkToOpenRef.current.click();
            setLinkToOpen("");
        }
    }, [linkToOpen]);

    return (
        <div className="w-full flex justify-between items-center p-3 rounded-xl select-none hover:bg-black hover:bg-opacity-5 cursor-pointer active:scale-95" onClick={handleNextPage}>
            {children}
            <section className="hidden">
                <FacebookShareButton ref={FacebookRef} url={myLink}></FacebookShareButton>
                <LinkedinShareButton ref={LinkedinRef} url={myLink}></LinkedinShareButton>
                <TwitterShareButton ref={TwitterRef} url={myLink}></TwitterShareButton>
                <WhatsappShareButton ref={WhatsAppRef} url={myLink}></WhatsappShareButton>
                <FacebookMessengerShareButton ref={MessengerRef} url={myLink}></FacebookMessengerShareButton>
                <EmailShareButton ref={EmailRef} url={myLink}></EmailShareButton>
                <Link ref={linkToOpenRef} href={linkToOpen} target="_blank" className="pointer-events-none"></Link>
            </section>
        </div>
    );
}