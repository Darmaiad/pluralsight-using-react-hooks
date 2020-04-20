import React, { memo, useContext } from 'react';

import ImageToggleOnScroll from './ImageToggleOnScroll';
import { ConfigContext } from './App';

const SpeakerDetail = ({
    id,
    firstName,
    lastName,
    favorite,
    bio,
    onHeartFavoriteHandler,
    sat,
    sun,
}) => {
    console.log(`SpeakerDetail:${id} ${firstName} ${lastName} ${favorite}`);
    const { loggedInUserEmail } = useContext(ConfigContext);

    return (
        <div className="card col-4 cardmin">
            <ImageToggleOnScroll
                className="card-img-top"
                primaryImg={`/speakers/bw/Speaker-${id}.jpg`}
                secondaryImg={`/speakers/Speaker-${id}.jpg`}
                alt="{firstName} {lastName}"
            />
            <div className="card-body">
                <h4 className="card-title">
                    {loggedInUserEmail ? (
                        <button
                            data-sessionid={id}
                            className={favorite ? 'heartredbutton' : 'heartdarkbutton'}
                            onClick={e => {
                                onHeartFavoriteHandler(e, {
                                    id,
                                    firstName,
                                    lastName,
                                    favorite,
                                    bio,
                                    sat,
                                    sun,
                                });
                            }}
                        />
                    ) : null}
                    <span>
                        {firstName} {lastName}
                    </span>
                </h4>

                <span>{bio}</span>
            </div>
        </div>
    );
};

// memo is a HOC that will perform a shallow comparison of the next and the previous props,
// in order to decide if the component should be updated, or a memoized version should be returned
// React cannot know whether a cb func props has changed, so wrap any cb props with useCallback
export default memo(SpeakerDetail);
