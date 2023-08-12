export default function Profile({profilePicture, username, link}) {
    return (
        <div className="p-6 flex gap-4 items-center">
            <div className="grid place-items-center rounded-full border h-[2.75rem] w-[2.75rem] overflow-hidden">
                {profilePicture}
            </div>
            <section>
                <div className="font-semibold">@{username}</div>
                <div className="text-xs opacity-80 w-[13rem] truncate">{link}</div>
            </section>
        </div>
    );
}