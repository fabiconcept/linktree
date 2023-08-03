export default function ButtonText({fontClass, btnFontStyle, content}) {
    return (
        <span className={`${fontClass} font-semibold truncate max-w-[90%] flex-1`} style={btnFontStyle}>{content}</span>
    );
}