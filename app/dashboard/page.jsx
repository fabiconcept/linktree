import ManageLinks from "./general components/ManageLinks";
import Preview from "./general components/Preview";

export default function page() {
    return (
        <div className="flex py-2 px-3 flex-1">
            <ManageLinks />
            <Preview />
        </div>
    );
}