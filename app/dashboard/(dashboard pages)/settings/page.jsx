import Controller from "./components/Controller";
import SocialSetting from "./components/SocialSetting";

export default function SettingsPage() {
    return (
        <div className="flex-1 py-2 flex flex-col max-h-full overflow-y-auto scroll-smooth">
            <Controller />
            <SocialSetting />
        </div>
    );
}