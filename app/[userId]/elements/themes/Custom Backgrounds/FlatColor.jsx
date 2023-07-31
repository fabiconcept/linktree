export default function FlatColor({color}) {
    return (
        <div className="fixed top-0 left-0 h-screen w-screen" style={{backgroundColor: `${color}`}}></div>
    );
}