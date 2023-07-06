import Image from "next/image";
import Form from "./LandingPage Elements/Form";
import Topings from "./LandingPage Elements/Topings";
// import NavBar from "./General Components/NavBar";

export default function Home() {
  return (
    <main className="bg-dark h-screen w-screen flex items-center justify-center flex-col">
      {/* <NavBar /> */}
      <Form />
      <div className="fixed z-[5] h-screen w-screen grid place-items-center mix-blend-screen opacity-20">
        <Image src={"https://linktree.sirv.com/Images/wp2887798-doodles-wallpaper.jpg"} className="w-full h-full object-cover filter saturate-100 brightness-50 contrast-200 try" alt="pattern" width={1000} height={600} />
      </div>
      <Topings />
    </main>
  )
}