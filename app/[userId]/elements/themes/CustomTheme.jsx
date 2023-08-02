import { useContext } from "react";
import { BgContext } from "../../components/BgDiv";
import FlatColor from "./Custom Backgrounds/FlatColor";
import Gradient from "./Custom Backgrounds/Gradient";
import Stripe from "./Custom Backgrounds/Stripe";
import Waves from "./Custom Backgrounds/Waves";
import ZigZag from "./Custom Backgrounds/ZigZag";
import Polkadots from "./Custom Backgrounds/polkadots";
import ImageBg from "./Custom Backgrounds/Image";
import VideoBg from "./Custom Backgrounds/VideoBg";

export default function CustomTheme() {
    const { bgColor, gradientDirection, bgTheme, bgImage, bgVideo } = useContext(BgContext);

    return (
        <div className="fixed h-screen w-screen top-0 left-0 overflow-hidden">
            
            {bgTheme === "Video" && <VideoBg video={bgVideo} />}
            {bgTheme === "Image" && <ImageBg image={bgImage} />}
            {bgTheme === "Polka" && <Polkadots color={bgColor} />}
            {bgTheme === "Zig Zag" && <ZigZag color={bgColor} />}
            {bgTheme === "Stripe" && <Stripe color={bgColor} />}
            {bgTheme === "Waves" && <Waves color={bgColor} />}
            {bgTheme === "Flat Colour" && <FlatColor color={bgColor} />}
            {bgTheme === "Gradient" && <Gradient bgColor={bgColor} gradientDirection={gradientDirection} />}
        </div>
    );
}