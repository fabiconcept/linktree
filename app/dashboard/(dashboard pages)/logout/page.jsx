import Redirect from "./component/Redirect";

export default function LogoutPage() {
    return (
        <div className="flex-1 py-2 flex flex-col max-h-full overflow-y-auto">
            <p className="mx-auto">
                ...Logging Out...
            </p>
            <Redirect />
        </div>
    )    
}