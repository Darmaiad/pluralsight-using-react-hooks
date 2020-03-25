import React from 'react';
import ImageToggleOnMouseOver from '../src/ImageToggleOnMouseOver';

const ImageChangeOnMouseOver = () => (
    <>
        <ImageToggleOnMouseOver
            primaryImg="/speakers/bw/Speaker-187.jpg"
            secondaryImg="/speakers/Speaker-187.jpg"
        />
        &nbsp;&nbsp;&nbsp;
        <ImageToggleOnMouseOver
            primaryImg="/speakers/bw/Speaker-1124.jpg"
            secondaryImg="/speakers/Speaker-1124.jpg"
        />
    </>

);

export default ImageChangeOnMouseOver;
