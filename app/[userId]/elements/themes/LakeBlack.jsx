export default function LakeBlack({backgroundPicture}) {
    return (
        <>
            <div className="fixed h-screen w-screen z-0 top-0 left-0 opacity-70 overflow-hidden">
                {backgroundPicture}
            </div>
            <div className="fixed h-screen w-screen bg-black z-10 top-0 left-0 bg-opacity-[0.65] backdrop-blur-[50px]"></div>
        </>
    );
}