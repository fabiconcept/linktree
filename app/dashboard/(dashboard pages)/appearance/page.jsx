import Preview from "../../general components/Preview";
import Backgrounds from "./components/Backgrounds";
import Buttons from "./components/Buttons";
import FontsOptions from "./components/FontsOptions";
import ProfileCard from "./components/ProfileCard";
import Themes from "./components/Themes";

export default function AppearancePage() {
    return (
        <div className="flex-1 py-2 flex flex-col max-h-full overflow-y-auto">
            <div className="py-4">
                <span className="text-lg font-semibold my-4">Profile</span>
                <ProfileCard />
            </div>
            <div className="py-4">
                <span className="text-lg font-semibold my-4">Themes</span>
                <Themes />
            </div>
            <div className="py-4">
                <span className="text-lg font-semibold my-4">Custom appearance</span>
                <p className="py-3 sm:text-base text-sm">
                    Completely customize your Linktree profile. Change your background with colors,
                    gradients and images. Choose a button style, change the typeface and more.
                </p>
            </div>
            <div className="py-4">
                <span className="text-lg font-semibold my-4">Backgrounds</span>
                <Backgrounds />
            </div>
            <div className="py-4">
                <span className="text-lg font-semibold my-4">Buttons</span>
                <Buttons />
            </div>
            <div className="py-4">
                <span className="text-lg font-semibold my-4">Fonts</span>
                <FontsOptions />
            </div>
        </div>
    );
}