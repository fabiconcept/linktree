import Image from 'next/image';

export default function Preview() {
    return (
        <div className="w-[32rem] md:grid hidden place-items-center border-l ml-4">
            <div className="h-[45rem] scale-[0.8] w-[23rem] bg-black rounded-[3rem] grid place-items-center">
                <div className="h-[98%] w-[95%] bg-white bg-opacity-[.1] grid place-items-center rounded-[2.5rem] overflow-hidden relative">
                    <div className='top-6 left-6 absolute'>
                        <Image src={"https://linktree.sirv.com/Images/gif/loading.gif"} width={25} height={25} alt="loading" className=" mix-blend-screen" />
                    </div>
                    <div className="h-full w-full">
                        <iframe src="http://localhost:3000/omah" frameborder="0" className='h-full bg-white w-full'></iframe>
                    </div>
                </div>
            </div>
        </div>
    )
}