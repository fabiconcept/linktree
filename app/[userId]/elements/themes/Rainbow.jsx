import "./style/rainbow.css";

export default function Rainbow() {
    return (
        <>
            <div className="wrapper fixed top-0 left-0 h-screen w-screen scale-[2] rotate-[45deg]"></div>
            <div className="fixed h-screen w-screen backdrop-blur-[50px] bg-white bg-opacity-25 z-10"></div>
        </>
    );
}