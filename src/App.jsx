import React, { createContext } from 'react';
import PropTypes from 'prop-types';

import Home from './Home';
import Speakers from './Speakers';
import Login from "./Login";

export const ConfigContext = createContext();

const configValue = {
    showSignMeUp: true,
    showSpeakerSpeakingDays: true,
};

const pageToShow = pageName => {
    if (pageName === 'Home') return <Home />;
    if (pageName === 'Speakers') return <Speakers />;
    if (pageName === 'Login') return <Login />;
    return <>Not Found</>;
};

const App = ({ pageName, userInfo }) => {
    configValue.loggedInUserEmail = userInfo ? userInfo.email : '';
    return (
        <ConfigContext.Provider value={configValue}>
            <>{pageToShow(pageName)}</>
        </ConfigContext.Provider>
    );
};

App.propTypes = {
    pageName: PropTypes.string.isRequired,
    userInfo: PropTypes.shape({ email: PropTypes.string }),
};

export default App;
