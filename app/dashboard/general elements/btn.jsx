export default function MyBtn({content, extraClass}) {
    return (
        <div className={`flex items-center gap-3 justify-center p-3 rounded-3xl cursor-pointer active:scale-95 active:opacity-60 active:translate-y-1 hover:scale-[1.005]`}>
            {content}
        </div>
    )
}
