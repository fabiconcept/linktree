import Image from "next/image";
import "./style/clouds.css";

export default function CloudBlue() {
    return (
        <div className="clouds fixed h-screen w-screen z-0 top-0 left-0 opacity-70 overflow-hidden bg-blue-500 bg-opacity-10">
            <div className="absolute sm:-left-[10%] top-[-20vh] scale-y-[-1] -left-[25%] animate-bounce">
                <Image 
                    src={"https://linktree.sirv.com/Images/svg%20element/cloud.png"} 
                    alt="cloud" 
                    height={500} 
                    width={500} 
                    className="animate-pulse object-fit -rotate-12 sm:w-[25rem] w-[15rem] filter hue-rotate-[50deg]" 
                />
            </div>
            <div className="absolute sm:-right-[10%] -right-[25%] animate-bounce">
                <Image 
                    src={"https://linktree.sirv.com/Images/svg%20element/cloud.png"} 
                    alt="cloud" 
                    height={500} 
                    width={500} 
                    className="animate-pulse object-fit -rotate-12 sm:w-[25rem] w-[15rem] filter hue-rotate-[50deg]" 
                />
            </div>
            <div className="absolute sm:-left-[10%] top-[20vh] scale-y-[-1] -left-[25%] animate-bounce">
                <Image 
                    src={"https://linktree.sirv.com/Images/svg%20element/cloud.png"} 
                    alt="cloud" 
                    height={500} 
                    width={500} 
                    className="animate-pulse object-fit -rotate-12 sm:w-[25rem] w-[15rem] filter hue-rotate-[50deg]" 
                />
            </div>
            <div className="absolute sm:-right-[20%] top-[40vh] -right-[35%] animate-bounce">
                <Image 
                    src={"https://linktree.sirv.com/Images/svg%20element/cloud.png"} 
                    alt="cloud" 
                    height={500} 
                    width={500} 
                    className="animate-pulse object-fit -rotate-12 sm:w-[25rem] w-[15rem] filter hue-rotate-[50deg]" 
                />
            </div>
            <div className="absolute sm:-left-[10%] top-[60vh] scale-y-[-1] -left-[25%] animate-bounce">
                <Image 
                    src={"https://linktree.sirv.com/Images/svg%20element/cloud.png"} 
                    alt="cloud" 
                    height={500} 
                    width={500} 
                    className="animate-pulse object-fit -rotate-12 sm:w-[25rem] w-[15rem] filter hue-rotate-[50deg]" 
                />
            </div>
            <div className="absolute sm:-right-[20%] top-[80vh] -right-[35%] animate-bounce">
                <Image 
                    src={"https://linktree.sirv.com/Images/svg%20element/cloud.png"} 
                    alt="cloud" 
                    height={500} 
                    width={500} 
                    className="animate-pulse object-fit -rotate-12 sm:w-[25rem] w-[15rem] filter hue-rotate-[50deg]" 
                />
            </div>
            <div className="absolute top-0 left-0 h-screen w-screen backdrop-blur-[5px] z-10"></div>
        </div>
    );
}