import Link from "next/link";

export default function LiElement({children, url}) {
    return (
        <Link href={url} className="flex gap-3 items-center w-full p-4 cursor-pointer hover:bg-black hover:bg-opacity-[0.05] rounded-xl active:scale-95 active:opacity-70 select-none">
            {children}
        </Link>
    );
}