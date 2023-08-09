export default function ShareLiElement({children}) {
    return (
        <div className="w-full flex justify-between items-center p-3 rounded-xl select-none hover:bg-black hover:bg-opacity-5 cursor-pointer active:scale-95">
            {children}
        </div>
    );
}