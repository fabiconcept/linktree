"use client"
import { useEffect, useState } from "react";
import "../../styles/3d.css";

export default function Form() {
    const [hasError, setHasError] = useState(1);
    const [username, setUsername] = useState("");

    useEffect(()=>{

    }, [username]);

    const handleSumbit = () => { 
        if(hasError === 2){
            
        }
    }

    useEffect(() => {
        // Init
        const container = document.getElementById("container");
        const inner = document.getElementById("inner");
        const inputDiv = document.getElementById("input");

        // Mouse
        const mouse = {
            _x: 0,
            _y: 0,
            x: 0,
            y: 0,
            updatePosition: function (event) {
                const e = event || window.event;
                this.x = e.clientX - this._x;
                this.y = (e.clientY - this._y) * -1;
            },
            setOrigin: function (e) {
                this._x = e.offsetLeft + Math.floor(e.offsetWidth / 2);
                this._y = e.offsetTop + Math.floor(e.offsetHeight / 2);
            },
            show: function () {
                return "(" + this.x + ", " + this.y + ")";
            },
        };

        // Track the mouse position relative to the center of the container.
        mouse.setOrigin(container);

        let counter = 0;
        const updateRate = 10;
        const isTimeToUpdate = function () {
            return counter++ % updateRate === 0;
        };

        const onMouseEnterHandler = function (event) {
            update(event);
        };

        const onMouseLeaveHandler = function () {
            inner.style = "";
        };

        const onMouseMoveHandler = function (event) {
            if (isTimeToUpdate()) {
                update(event);
            }
        };

        const update = function (event) {
            mouse.updatePosition(event);
            updateTransformStyle(
                (mouse.y / inner.offsetHeight / 2).toFixed(2),
                (mouse.x / inner.offsetWidth / 2).toFixed(2)
            );
        };

        const updateTransformStyle = function (x, y) {
            const style = `rotateX(${x}deg) rotateY(${y}deg)`;
            inner.style.transform = style;
            inner.style.webkitTransform = style;
            inner.style.mozTransform = style;
            inner.style.msTransform = style;
            inner.style.oTransform = style;
            inputDiv.style.transform = `translateZ(10rem)`;
        };

        document.onmouseenter = onMouseEnterHandler;
        document.onmouseleave = onMouseLeaveHandler;
        document.onmousemove = onMouseMoveHandler;

        // Cleanup
        return () => {
            document.onmouseenter = null;
            document.onmouseleave = null;
            document.onmousemove = null;
        };
    }, []);

    return (
        <div className="w-fit h-fit z-10" id="container">
            <div className="flex items-center justify-center flex-col" id="inner">
                <div className="text-[2.15rem] sm:text-[3rem] md:text-[4rem] font-bold text-white z-10 mb-4 max-w-[70vw] text-center">The Only Link You'll Ever Need</div>
                <div className="max-w-[60vw] text-center font-semibold text-sm sm:text-lg opacity-80 z-10 text-white mb-8">connect your audience to all of your content with one link</div>
                <div className={`flex items-stretch gap-2 relative filter ${hasError === 1 ? "dropshadow-bad" : hasError === 2 ? "dropshadow-good" : "dropshadow"}`} id="input">
                    <div className={`flex items-center rounded-l-xl bg-white px-6 text-sm md:text-2xl sm:text-md ${hasError === 1 ? "border-red-500 border-[2px]" : hasError === 2 ? "border-green-500 border-[2px]" : ""}`}>
                        <label className="opacity-40 font-semibold">mylinktr.ee/:</label>
                        <input type="text" className="bg-transparent peer py-5 px-2 outline-none border-none md:w-auto w-[8rem]" placeholder="fabiconcept" onChange={(e)=>setUsername(e.target.value)} />
                    </div>
                    <div className="px-4 grid place-items-center text-white bg-themeGreen rounded-r-xl font-semibold cursor-pointer hover:scale-110 active:scale-95 active:opacity-80 uppercase text-sm md:text-lg sm:text-md" onClick={handleSumbit}>
                        claim
                    </div>
                </div>
                {hasError === 1 && <div className="p-4 max-w-[70vw] text-center text-red-500 filter drop-shadow-md shadow-white text-sm">username has already been taken</div>}
            </div>
        </div>
    );
}