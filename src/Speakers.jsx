/* eslint-disable no-console */
import React, { useState, useEffect, useContext } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

import '../public/site.css';
import Header from './Header';
import Menu from './Menu';
import SpeakerData from './SpeakerData';
import SpeakerDetail from './SpeakerDetail';
import { ConfigContext } from './App';

const Speakers = ({ }) => {
    const [speakingSaturday, setSpeakingSaturday] = useState(true);
    const [speakingSunday, setSpeakingSunday] = useState(true);
    const [speakerList, setSpeakerList] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    const { showSpeakerSpeakingDays } = useContext(ConfigContext);

    useEffect(() => {
        setIsLoading(true);
        new Promise((resolve) => setTimeout(() => resolve(), 1000))
            .then(() => {
                setIsLoading(false);
                const speakerListServerFilter = SpeakerData.filter(({ sat, sun }) => {
                    return (speakingSaturday && sat) || (speakingSunday && sun);
                });
                return setSpeakerList(speakerListServerFilter);
            })
            .catch((error) => console.log(error));

        return () => console.log('cleanup');
    }, []); // [speakingSunday, speakingSaturday]);

    const handleChangeSaturday = () => {
        setSpeakingSaturday(!speakingSaturday);
    };

    const speakerListFiltered = isLoading
        ? []
        : speakerList
            .filter(
                ({ sat, sun }) => (speakingSaturday && sat) || (speakingSunday && sun),
            )
            .sort((a, b) => {
                if (a.firstName < b.firstName) {
                    return -1;
                }
                if (a.firstName > b.firstName) {
                    return 1;
                }
                return 0;
            });

    const handleChangeSunday = () => {
        setSpeakingSunday(!speakingSunday);
    };

    const heartFavoriteHandler = (e, favoriteValue) => {
        e.preventDefault();
        const sessionId = parseInt(e.target.attributes['data-sessionid'].value, 10);
        setSpeakerList(speakerList.map(item => {
            if (item.id === sessionId) {
                item.favorite = favoriteValue;
                return item;
            }
            return item;
        }));
        // console.log("changing session favorte to " + favoriteValue);
    };

    if (isLoading) return <div>Loading...</div>;

    return (
        <>
            <Header />
            <Menu />
            <div className="container">
                <div className="btn-toolbar  margintopbottom5 checkbox-bigger">
                    {showSpeakerSpeakingDays === false ? null : (
                        <div className="hide">
                            <div className="form-check-inline">
                                <label className="form-check-label">
                                    <input
                                        type="checkbox"
                                        className="form-check-input"
                                        onChange={handleChangeSaturday}
                                        checked={speakingSaturday}
                                    />
                                    Saturday Speakers
                                </label>
                            </div>
                            <div className="form-check-inline">
                                <label className="form-check-label">
                                    <input
                                        type="checkbox"
                                        className="form-check-input"
                                        onChange={handleChangeSunday}
                                        checked={speakingSunday}
                                    />
                                    Sunday Speakers
                                </label>
                            </div>
                        </div>
                    )}
                </div>
                <div className="row">
                    <div className="card-deck">
                        {speakerListFiltered.map(
                            ({ id, firstName, lastName, bio, favorite }) => (
                                <SpeakerDetail
                                    key={id}
                                    id={id}
                                    favorite={favorite}
                                    onHeartFavoriteHandler={heartFavoriteHandler}
                                    firstName={firstName}
                                    lastName={lastName}
                                    bio={bio}
                                />
                            ),
                        )}
                    </div>
                </div>
            </div>
        </>
    );
};

export default Speakers;