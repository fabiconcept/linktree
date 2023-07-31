import { darkenColor } from "@/lib/utilities";
import "../style/polka.css";

export default function Polkadots({color}) {
    return (
        <div 
            className="polka h-full w-full"
            style={{
                "--color-1": `${color}`,
                "--color-2": `${darkenColor(color, 50)}`,
            }}
        ></div>
    );
}