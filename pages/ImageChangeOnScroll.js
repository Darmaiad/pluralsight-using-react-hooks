import React from 'react';
import ImageToggleOnScroll from './../src/ImageToggleOnScroll';

const characters = [
    "gon.png",
    "hisoka.png",
    "kurapika.jpg",
    "leorio.jpg",
    "meruem.jpg",
    "netero.jpg"
];

// We display a list of character avatars. When the avatar is in full view, Killua jumps in
const ImageChangeOnScroll = () => (
    <>
        {characters.map((character) => (
            <div key={character} >
                <ImageToggleOnScroll
                    primaryImg={`/${character}`}
                    secondaryImg="/killua.png"
                />
            </div>
        ))}
    </>
);

export default ImageChangeOnScroll;
