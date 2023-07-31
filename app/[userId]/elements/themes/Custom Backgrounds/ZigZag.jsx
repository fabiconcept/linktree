import { darkenColor } from "@/lib/utilities";
import "../style/zigzag.css";

export default function ZigZag({color}) {
    return (
        <div 
            className="zigzag h-full w-full"
            style={{
                "--color-1": `${color}`,
                "--color-2": `${darkenColor(color, 50)}`,
            }}
        ></div>
    );
}