import "./style/rainbow.css";

export default function Rainbow() {
    return (
        <>
            <div className="wrapper fixed top-0 left-0 h-screen w-screen"></div>
            <div className="fixed h-screen w-screen backdrop-blur-[5px] bg-white bg-opacity-25 z-10"></div>
        </>
    );
}