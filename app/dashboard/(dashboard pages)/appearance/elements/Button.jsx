export default function Button({modifierClass, modifierStyles}) {
    return (
        <div 
            className={`${modifierClass} min-w-[30%] h-10 flex-1`}
            style={modifierStyles}
        ></div>
    );
}