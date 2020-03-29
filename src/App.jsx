import React, { createContext } from 'react';
import PropTypes from 'prop-types';
import Home from './Home';
import Speakers from './Speakers';

export const ConfigContext = createContext();

const configValue = {
    showSignMeUp: true,
    showSpeakerSpeakingDays: true,
};

const pageToShow = pageName => {
    if (pageName === 'Home') return <Home />;
    if (pageName === 'Speakers') return <Speakers />;
    return <>Not Found</>;
};

const App = ({ pageName }) => (
    <ConfigContext.Provider value={configValue}>
        <>{pageToShow(pageName)}</>
    </ConfigContext.Provider>
);

App.propTypes = {
    pageName: PropTypes.string.isRequired,
};

export default App;
