import React from 'react';

const VideoBg = ({ video }) => {
    return (
        <div className="w-full h-full flex items-center justify-center">
            <video autoPlay muted loop className="w-full h-full object-cover">
                <source src={video} type="video/mp4" />
                Your browser does not support the video tag.
            </video>
        </div>
    );
};

export default VideoBg;