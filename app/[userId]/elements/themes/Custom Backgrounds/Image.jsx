import Image from "next/image";

export default function ImageBg({image}) {
    return (
        <div className="w-full h-full grid place-items-center">
            <Image src={image} alt="profile pic" height={1000} width={1000} priority className="w-full object-cover min-h-full" />
        </div>
    );
}