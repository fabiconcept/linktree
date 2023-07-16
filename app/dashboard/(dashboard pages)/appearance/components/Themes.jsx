import ThemeCard from "../elements/ThemeCard";

export default function Themes() {
    return (
        <div className="w-full bg-white rounded-3xl my-3 flex flex-col p-6">
            <div className="flex flex-wrap gap-4 w-full">
                <ThemeCard />
                <ThemeCard type={1} pic={"https://linktree.sirv.com/Images/profile/selector-lake-black.fe2b50e40e996d766e0b.gif"} />
                <ThemeCard type={1} pic={"https://linktree.sirv.com/Images/profile/selector-lake-black.fe2b50e40e996d766e0b.gif"} />
                <ThemeCard type={1} pic={"https://linktree.sirv.com/Images/profile/selector-lake-black.fe2b50e40e996d766e0b.gif"} />
            </div>
        </div>
    );
}