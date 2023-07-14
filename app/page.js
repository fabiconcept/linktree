import Image from "next/image";
import Form from "./elements/LandingPage Elements/Form";
import Topings from "./elements/LandingPage Elements/Topings";
import LandingNav from "./components/General Components/LandingNav";

export default async function Home() {
    return (
        <main className="bg-dark h-screen w-screen flex items-center justify-center flex-col">
            <LandingNav />
            <Form />
            <div className="fixed z-[5] h-screen w-screen grid place-items-center mix-blend-screen opacity-20">
                <Image src={"https://linktree.sirv.com/Images/wp2887798-doodles-wallpaper.jpg"} className="w-full h-full object-cover filter saturate-100 brightness-50 contrast-200 try" alt="pattern" width={1000} height={600} priority={true} />
            </div>
            <Topings />
        </main>
    )
}