import ManageLinks from "./general components/ManageLinks";
import MyLinkDiv from "./general elements/MyLinkDiv";

export default function page() {
    return (
        <div className="flex-1 py-2 flex flex-col max-h-full overflow-y-auto">
            <MyLinkDiv />
            <ManageLinks />
        </div>
    );
}