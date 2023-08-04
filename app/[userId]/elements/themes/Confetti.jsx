import ReactConfetti from "react-confetti";

export default function Confetti() {
    return (
        <div className="fixed h-screen w-screen top-0 left-0 overflow-hidden bg-gray-200">
            <div className="confetti-container" style={{ width: "1000px", height: "1000px" }}>
                <ReactConfetti
                    confettiSource={{ w: 1000, h: 1000 }}
                    className="w-full h-full"
                    friction={0.985}
                    recycle={true}
                    numberOfPieces={100}
                />
            </div>
            <div className="confetti-container" style={{ width: "1000px", height: "1000px" }}>
                <ReactConfetti
                    confettiSource={{ w: 1000, h: 1000 }}
                    className="w-full h-full absolute top-0 left-0"
                    recycle={true}
                    numberOfPieces={50}
                />
            </div>
        </div>
    );
}