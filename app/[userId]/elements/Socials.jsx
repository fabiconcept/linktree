import { SocialsList } from "@/lib/SocialsList";
import { isSuitableForWhiteText } from "@/lib/utilities";
import Image from "next/image";
import Link from "next/link";

export default function Socials({ socialArray, themeFontColor }) {
    return (
        <div className="flex gap-2 justify-center flex-wrap max-w-full sArray">
            {socialArray.map((social, index) => {
                if (social.active) {
                    return (
                        <Link
                            key={index}
                            href={SocialsList[social.type].valueType !== "url" ? `${SocialsList[social.type].baseUrl}${social.value}` : social.value}
                            target="_blank"
                            className={`hover:scale-[1.25] active:scale-95 min-w-fit sIcon ${isSuitableForWhiteText(themeFontColor) ? "filter invert" : ""}`}
                        >
                            <Image 
                                src={SocialsList[social.type].icon} 
                                alt={SocialsList[social.type].title} 
                                width={40} 
                                height={40} 
                                style={{ filter: "drop-shadow(inset 0 0 10px #fff)" }} 
                            />
                        </Link>
                    )
                }
            })}
        </div>
    );
}