import { darkenColor } from "@/lib/utilities";
import "../style/wave.css";

export default function Waves({color}) {
    return (
        <div 
            className="header fixed top-0 left-0 w-full h-full flex flex-col justify-end"
            style={{
                "--color-2": `${color}`,
                "--color-1": `${darkenColor(color, 100)}`,
            }}
        >
            <div>
                <svg className="waves" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" viewBox="0 24 150 28" preserveAspectRatio="none" shapeRendering="auto">
                    <defs>
                        <path id="gentle-wave" d="M-160 44c30 0 58-18 88-18s 58 18 88 18 58-18 88-18 58 18 88 18 v44h-352z" />
                    </defs>
                    <g className="parallax">
                        <use xlinkHref="#gentle-wave" x="48" y="0" fill="rgba(255,255,255,0.7" />
                        <use xlinkHref="#gentle-wave" x="48" y="3" fill="rgba(255,255,255,0.5)" />
                        <use xlinkHref="#gentle-wave" x="48" y="5" fill="rgba(255,255,255,0.3)" />
                        <use xlinkHref="#gentle-wave" x="48" y="7" fill="#fff" />
                    </g>
                </svg>
            </div>
            <div className="h-[70vh] w-full bg-white"></div>
        </div>
    );
}