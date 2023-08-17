"use client"
import { useRef } from 'react';
import QRCode from 'qrcode.react';
import MLink from './MLink';
import Image from 'next/image';

export default function MyQrCode({ url }) {
    const qrCodeRef = useRef(null);

    const downloadAsJPEG = () => {
        const qrCodeCanvas = qrCodeRef.current.querySelector('canvas');
        const downloadLink = document.createElement('a');
        downloadLink.href = qrCodeCanvas.toDataURL('image/jpeg');
        downloadLink.download = 'qrcode.jpg';
        downloadLink.click();
    };
    return (
        <div className="my-2">
            <div className='mx-auto overflow-hidden relative grid place-items-center mb-2 select-none pointer-events-none' ref={qrCodeRef}>
                <QRCode value={url} size={180} />
                <div className='absolute rounded-lg bg-white w-12 p-2 border grid place-items-center scale-90 select-none'>
                    <Image
                        src={"https://linktree.sirv.com/Images/icons/Linktree%20Logo-2.svg"}
                        className='w-full object-contain'
                        alt="download icon"
                        width={15}
                        height={15}
                    />
                </div>
            </div>
            <div className="w-full flex justify-between border items-center p-3 rounded-xl select-none hover:bg-black hover:bg-opacity-5 cursor-pointer active:scale-95" onClick={downloadAsJPEG}>
                <div className='grid gap-2'>
                    <span className='font-semibold'>Download JPG</span>
                    <span className='text-sm opacity-60'>High quality image</span>
                </div>

                <div className='flex gap-3 items-center'>
                    <span>.JPG</span>
                    <span>
                        <Image
                            src={"https://linktree.sirv.com/Images/icons/download.svg"}
                            alt="download icon"
                            width={18}
                            height={18}
                        />
                    </span>
                </div>
            </div>
        </div>
    )
}