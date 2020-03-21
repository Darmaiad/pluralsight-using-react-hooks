import React, { useRef } from 'react';
import PropTypes from 'prop-types';

const ImageToggleOnMouseOver = ({ primaryImg, secondaryImg }) => {
    const imgRef = useRef(null);

    const handleMouseOver = () => { imgRef.current.src = secondaryImg };
    const handleMouseOut = () => { imgRef.current.src = primaryImg };

    return (
        <img
            onMouseOver={handleMouseOver}
            onMouseOut={handleMouseOut}
            src={primaryImg}
            ref={imgRef}
            width="400"
            height="400"
            alt=""
        />
    );
};

ImageToggleOnMouseOver.propTypes = {
    primaryImg: PropTypes.string.isRequired,
    secondaryImg: PropTypes.string.isRequired,
};

export default ImageToggleOnMouseOver;
