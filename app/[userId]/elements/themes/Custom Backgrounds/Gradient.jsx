import { darkenColor } from "@/lib/utilities";

export default function Gradient({gradientDirection, bgColor}) {
    return (
        <div 
            className="h-full w-full" 
            style={{ backgroundImage: `linear-gradient(${gradientDirection === 0 ? "to top" : "to bottom"}, ${darkenColor(bgColor, 100)}, ${bgColor})` }}
        ></div>
    );
}