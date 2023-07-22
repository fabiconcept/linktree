import ThemeCard from "../elements/ThemeCard";

export default function Themes() {
    
    return (
        <div className="w-full bg-white rounded-3xl my-3 flex flex-col p-6">
            <div className="flex flex-wrap gap-4 w-full">
                <ThemeCard />
                <ThemeCard type={1} text={"Pebble Blue"} pic={"https://linktree.sirv.com/Images/bg/selector-pebble-blue.png"} />
                <ThemeCard type={1} text={"Pebble Yellow"} pic={"https://linktree.sirv.com/Images/bg/selector-pebble-yellow.adffcf319fe3cb16a9b7.png"} />
                <ThemeCard type={1} text={"Pebble Pink"} pic={"https://linktree.sirv.com/Images/bg/selector-pebble-pink.71c34887a9c4ca41828c.png"} />
                <ThemeCard type={1} text={"Cloud Red"} pic={"https://linktree.sirv.com/Images/bg/selector-cloud-red.png"} />
                <ThemeCard type={1} text={"Cloud Green"} pic={"https://linktree.sirv.com/Images/bg/selector-cloud-green.png"} />
                <ThemeCard type={1} text={"Cloud Blue"} pic={"https://linktree.sirv.com/Images/bg/selector-cloud-blue.png"} />
                <ThemeCard type={1} text={"Breeze Pink"} pic={"https://linktree.sirv.com/Images/bg/selector-breeze-pink.webp"} />
                <ThemeCard type={1} text={"Breeze Orange"} pic={"https://linktree.sirv.com/Images/bg/selector-breeze-orange.webp"} />
                <ThemeCard type={1} text={"Breeze Green"} pic={"https://linktree.sirv.com/Images/bg/selector-breeze-green.webp"} />
                <ThemeCard type={1} text={"Rainbow"} pic={"https://linktree.sirv.com/Images/bg/selector-rainbow.85e9302f9aac535367aa.webp"} />
                <ThemeCard type={1} text={"Confetti"} pic={"https://linktree.sirv.com/Images/bg/selector-confetti.3da60ad2f58e6d1f40da.webp"} />
                <ThemeCard type={1} text={"3D Blocks"} pic={"https://linktree.sirv.com/Images/bg/selector-block-colors.3adc34edf1ddccfd1122.png"} />
                <ThemeCard type={1} text={"Starry Night"} pic={"https://linktree.sirv.com/Images/bg/selector-starry-night.4c4e7cd22f0ce2c39fa7.png"} />
                <ThemeCard type={1} text={"Lake White"} pic={"https://linktree.sirv.com/Images/bg/selector-lake-white.2f951fa5f392d68bd733.gif"} />
                <ThemeCard type={1} text={"Lake Black"} pic={"https://linktree.sirv.com/Images/gif/selector-lake-black.fe2b50e40e996d766e0b.gif"} />
            </div>
        </div>
    );
}