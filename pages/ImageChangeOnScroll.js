import React from 'react';
import ImageToggleOnScroll from '../src/ImageToggleOnScroll';

// We display a list of speaker avatars. When the avatar is in full view, avatar is coloured up
const ImageChangeOnScroll = () => (
    <>
        {[1124, 187, 823, 1269, 1530].map((speakerId) => (
            <div key={speakerId}>
                <ImageToggleOnScroll
                    primaryImg={`/speakers/bw/Speaker-${speakerId}.jpg`}
                    secondaryImg={`/speakers/Speaker-${speakerId}.jpg`}
                />
            </div>
        ))}
    </>
);

export default ImageChangeOnScroll;
