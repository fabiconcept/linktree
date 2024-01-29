"use client"
import Image from 'next/image';
import { useEffect, useState } from 'react';
import "../../styles/3d.css";
import { getSessionCookie } from '@/lib/authentication/session';
import { fetchUserData } from '@/lib/fetch data/fetchUserData';

export default function Preview() {
    const [username, setUsername] = useState("");

    useEffect(() => {
        const sessionUsername = getSessionCookie("adminLinker");
        if (sessionUsername === undefined) {
            return;
        }

        async function getUserData() {
            const data = await fetchUserData(sessionUsername);
            setUsername(data?.username);
        }
        getUserData();
    }, []);

    useEffect(() => {
        const container = document.getElementById("container");
        const inner = document.getElementById("inner");

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
            const style = `rotateX(${x}deg) rotateY(${y}deg) scale(0.8)`;
            inner.style.transform = style;
            inner.style.webkitTransform = style;
            inner.style.mozTransform = style;
            inner.style.msTransform = style;
            inner.style.oTransform = style;
        };

        container.onmouseenter = onMouseEnterHandler;
        container.onmouseleave = onMouseLeaveHandler;
        container.onmousemove = onMouseMoveHandler;

        // Cleanup
        return () => {
            container.onmouseenter = null;
            container.onmouseleave = null;
            container.onmousemove = null;
        };
    }, []);

    return (
        <div className="w-[35rem] md:grid hidden place-items-center border-l ml-4" >
            <div className='w-fit h-fit' id='container'>
                <div className="h-[45rem] scale-[0.8] w-[23rem] bg-black rounded-[3rem] grid place-items-center" id="inner">
                    <div className="h-[97.5%] w-[95%] bg-white bg-opacity-[.1] grid place-items-center rounded-[2.5rem] overflow-hidden relative border">
                        <div className='absolute h-[20px] w-[20px] rounded-full top-2 bg-black'></div>
                        <div className='top-6 left-6 absolute pointer-events-none'>
                            <Image src={"https://linktree.sirv.com/Images/gif/loading.gif"} width={25} height={25} alt="loading" className=" mix-blend-screen" />
                        </div>
                        <div className="h-full w-full">
                            <iframe src={`https://mylinks.fabiconcept.online/${username}`} frameBorder="0" className='h-full bg-white w-full'></iframe>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}