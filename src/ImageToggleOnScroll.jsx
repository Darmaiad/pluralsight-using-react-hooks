import React, { useRef, useEffect, useState } from 'react';
import PropTypes from 'prop-types';

const ImageToggleOnScroll = ({ primaryImg, secondaryImg }) => {
    const imgRef = useRef(null);
    // Because useEffect is triggered after the first render, there is a flicker, showing the
    // b&w speaker and then the coloured one (when useEffect is called). In order to prevent
    // this we need to not show the image until after the useEffect is called.
    const [isLoading, setIsLoading] = useState(true);

    const [inView, setInView] = useState(false);

    // Check if the speaker avatar image is in full view or not
    const isInView = () => {
        if (imgRef.current) {
            const rect = imgRef.current.getBoundingClientRect();
            return rect.top >= 0 && rect.bottom <= window.innerHeight;
        }
        return false;
    };

    // First arg is a func that will be executed when the component mounts
    // Second arg is an array of values the effect is dependent on.
    // That means that when a value of the array changes, the useEffect runs again
    useEffect(() => {
        // declare functions needed by an effect inside of it
        // https://reactjs.org/docs/hooks-faq.html#is-it-safe-to-omit-functions-from-the-list-of-dependencies
        const handleScroll = () => setInView(isInView());

        window.addEventListener('scroll', handleScroll);
        // Do not wait for a scroll event to decide if the speaker is in full view
        setInView(isInView());
        // Now that we know which image to show, set loading to false, and show the image
        setIsLoading(false);
        // Optionally, return a func to be invoked when the component unmounts
        return () => window.removeEventListener('scroll', handleScroll);
    },
    // The first time useEffect runs, loading is true, we do not render the photo, meaning
    // isInView() returns false. We need to re-run useEffect, so we make it dependent on isLoading
    [isLoading]);

    return isLoading ? null : (
        <img
            src={inView ? secondaryImg : primaryImg}
            ref={imgRef}
            width="200"
            height="200"
            alt=""
        />
    );
};

ImageToggleOnScroll.propTypes = {
    primaryImg: PropTypes.string.isRequired,
    secondaryImg: PropTypes.string.isRequired,
};

export default ImageToggleOnScroll;
