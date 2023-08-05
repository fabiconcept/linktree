import DropDown from "./mini components/DropDown";

export default function Controller() {
    return (
        <div className="w-full px-6 py-3 text-sm rounded-2xl border-b border-l border-r bg-white mb-4 grid grid-cols-2 items-center sticky top-0 z-10">
            <span className="font-semibold">Jump to:</span>
            <DropDown />
        </div>
    );
}
