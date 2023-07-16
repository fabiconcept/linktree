import SelectFonts from "../elements/SelectFonts";

export default function FontsOptions() {
    return (
        <div className="w-full bg-white rounded-3xl my-3 flex flex-col p-6">
            <span className="font-semibold text-sm">Font</span>
            <SelectFonts />
        </div>
    );
}