import { hexToRgba } from "@/lib/utilities";

export default function BreezeGreen() {
    return (
        <>
            <div className="fixed h-screen w-screen z-0 top-0 left-0 opacity-70 overflow-hidden">
                <div
                    className="absolute -top-[5%] left-1/2 -translate-x-1/2 scale-110"
                    style={{
                        backgroundImage: `radial-gradient(circle at 50% 50%,${hexToRgba("#ffa500")}, ${hexToRgba("#ff3b31", 0)})`,
                        filter: `50px`,
                        borderRadius: `50% 22% 40% 80%`,
                        height: `60vh`,
                        width: `60vh`,
                    }}
                >
                </div>
                <div
                    className="absolute -bottom-[5%] sm:left-[25%] left-[10%] -translate-x-1/2 scale-110"
                    style={{
                        backgroundImage: `radial-gradient(circle at 50% 50%,${hexToRgba("#0b6623")}, ${hexToRgba("#00a8b8", 0)})`,
                        filter: `50px`,
                        borderRadius: `50% 22% 40% 80%`,
                        height: `60vh`,
                        width: `60vh`,
                    }}
                >
                </div>
                <div
                    className="absolute bottom-[5%] sm:right-0 sm:scale-110 -right-[50%]"
                    style={{
                        backgroundImage: `radial-gradient(circle at 50% 50%,${hexToRgba("#1035ac")}, ${hexToRgba("#0d52bd", 0)})`,
                        filter: `50px`,
                        borderRadius: `50% 22% 40% 80%`,
                        height: `60vh`,
                        width: `60vh`,
                    }}
                >
                </div>
            </div>
            <div className="fixed h-screen w-screen bg-white z-10 top-0 left-0 bg-opacity-[0.1] backdrop-blur-[100px]"></div>
        </>
    );
}