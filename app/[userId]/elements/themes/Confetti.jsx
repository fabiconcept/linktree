import ReactConfetti from "react-confetti";

export default function Confetti() {
    return (
        <div className="fixed h-screen w-screen top-0 left-0 overflow-hidden bg-gray-200">
            <ReactConfetti width={1000} height={1000} className="w-full h-full" friction={0.97} recycle={true} numberOfPieces={100} />
            <ReactConfetti width={1000} height={1000} className="w-full h-full absolute top-0 left-0" recycle={true} numberOfPieces={50} />
        </div>
    );
}