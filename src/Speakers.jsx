/* eslint-disable no-console */
import React, { useState, useEffect, useContext, useReducer, useCallback, useMemo } from 'react';
import Axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';

import '../public/site.css';
import Header from './Header';
import Menu from './Menu';
// import SpeakerData from './SpeakerData';
import SpeakerDetail from './SpeakerDetail';
import { ConfigContext } from './App';
// import speakersReducer from './speakersReducer';
import useAxiosFetch from './useAxiosFetch';

const Speakers = () => {
    const { data, isLoading, hasErrored, errorMessage, updateDataRecord } = useAxiosFetch("http://localhost:4000/speakers", []);

    const [speakingSaturday, setSpeakingSaturday] = useState(true);
    const [speakingSunday, setSpeakingSunday] = useState(true);

    // const [speakerList, dispatch] = useReducer(speakersReducer, []);
    // Reducer is defined as (state, action) => newState
    // useState uses useReducer under the hood
    // The following two statements are equivalent
    // const [speakerList, setSpeakerList] = useReducer((state, action) => action, []);
    // const [speakerList, setSpeakerList] = useState([]);
    // We can think useState as a useReducer call, with a default action

    // const [isLoading, setIsLoading] = useState(true); // Handled by the custom useAxiosFetch Hook

    const { showSpeakerSpeakingDays } = useContext(ConfigContext);

    // useEffect(() => {
    //     setIsLoading(true);
    //     new Promise((resolve) => setTimeout(() => resolve(), 1000))
    //         .then(() => {
    //             setIsLoading(false);
    //             const speakerListServerFilter = SpeakerData.filter(({ sat, sun }) => (speakingSaturday && sat) || (speakingSunday && sun));
    //             return dispatch({ type: 'setSpeakerList', data: speakerListServerFilter });
    //         })
    //         .catch((error) => console.log(error));

    //     return () => console.log('cleanup');
    // }, []); // [speakingSunday, speakingSaturday]);

    const handleChangeSaturday = () => {
        setSpeakingSaturday(!speakingSaturday);
    };

    const heartFavoriteHandler = useCallback((e, speakerRec) => {
        e.preventDefault();
        const toggledRec = { ...speakerRec, favorite: !speakerRec.favorite };
        Axios.put(`http://localhost:4000/speakers/${speakerRec.id}`, toggledRec)
            .then((response) => updateDataRecord(toggledRec))
            .catch((error) => console.log(error));

        // dispatch({
        //     type: favoriteValue === true ? 'favorite' : 'unfavorite',
        //     data: { sessionId: parseInt(e.target.attributes['data-sessionid'].value, 10) },
        // });
    }, []); // updateDataRecord

    // useMemo(creatorFunc, dependenciesArray)
    // Memoize the result of creatorFunc, if the dependenciesArray hasn't change
    const speakers = useMemo(() => data
        .filter(({ sat, sun }) => (speakingSaturday && sat) || (speakingSunday && sun))
        .sort((a, b) => {
            if (a.firstName < b.firstName) {
                return -1;
            }
            if (a.firstName > b.firstName) {
                return 1;
            }
            return 0;
        }), [data, speakingSaturday, speakingSunday]);

    const speakerListFiltered = isLoading ? [] : speakers;

    const handleChangeSunday = () => setSpeakingSunday(!speakingSunday);

    if (hasErrored) {
        return <>{errorMessage}&nbsp;"Make sure you have launched "npm run json-server"</>;
    }

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
                        {speakerListFiltered.map(({ id, firstName, lastName, bio, favorite, sat, sun }) => (
                            <SpeakerDetail
                                key={id}
                                id={id}
                                favorite={favorite}
                                onHeartFavoriteHandler={heartFavoriteHandler}
                                firstName={firstName}
                                lastName={lastName}
                                bio={bio}
                                sat={sat}
                                sun={sun}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </>
    );
};

export default Speakers;
