"use client"
import React, { useEffect, useState } from "react";
import "../../styles/sideThing.css";
import Card from "../elements/Card";

export default function SideThing() {
    const [showCards, setShowCards] = useState([]);
    const [imgId, setImgId] = useState(6);
    const [latestObj, setLatestObj] = useState(null);

    useEffect(() => {
        const interval = setInterval(() => {
            setLatestObj({
                img: ``,
                id: Math.random().toString(25),
                zIndex: 1,
            });

            setImgId((prevImgId) => (prevImgId > 1 ? prevImgId - 1 : 6));
        }, 1250);

        return () => {
            clearInterval(interval); // Cleanup the interval when the component unmounts
        };
    }, []);

    useEffect(() => {
        if (latestObj !== null) {
            setShowCards((prevShowCards) => [
                { ...latestObj, img: `https://linktree.sirv.com/Images/cards/card-${imgId}.svg` },
                ...prevShowCards,
            ]);
        }
    }, [latestObj, imgId]);

    const onRemove = (id) => {
        setShowCards((prevShowCards) => prevShowCards.filter((card) => card.id !== id));
    };      

    return (
        <div className="w-[20vw] hidden md:grid border md:place-items-center relative">
            {showCards.map((card, index) => (
                <Card id={card.id} index={index} img={card.img} zIndex={card.zIndex} key={card.id} onRemove={onRemove} />                
            ))}
        </div>
    );
}
