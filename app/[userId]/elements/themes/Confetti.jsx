import ReactConfetti from "react-confetti";

export default function Confetti() {
    return (
        <div className="fixed h-screen w-screen top-0 left-0 overflow-hidden">
            <ReactConfetti width={1000} height={1000} className="w-full h-full" friction={0.95} recycle={true} numberOfPieces={100} />
            <ReactConfetti width={1000} height={1000} className="w-full h-full z-[999999999999999999] absolute top-0 left-0" recycle={true} numberOfPieces={50} />
        </div>
    );
}