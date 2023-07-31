import { darkenColor } from "@/lib/utilities";
import "../style/stripe.css";

export default function Stripe({color}) {
    return (
        <div 
            className="stripe h-full w-full"
            style={{
                "--color-1": `${color}`,
                "--color-2": `${darkenColor(color, 50)}`,
            }}
        ></div>
    );
}