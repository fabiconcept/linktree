import Stripe from "./Custom Backgrounds/Stripe";
import Waves from "./Custom Backgrounds/Waves";
import ZigZag from "./Custom Backgrounds/ZigZag";
import Polkadots from "./Custom Backgrounds/polkadots";

export default function Custom() {
    return (
        <div className="fixed h-screen w-screen top-0 left-0 overflow-hidden">
            {/* <Polkadots /> */}
            {/* <ZigZag /> */}
            {/* <Stripe /> */}
            <Waves />
        </div>
    );
}