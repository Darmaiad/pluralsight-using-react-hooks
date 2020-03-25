import React, { useState } from 'react';

const InputElement = () => {
    const [inputText, setInputText] = useState('');
    const [historyList, setHistoryList] = useState([]);

    const handleTextChange = (e) => {
        setInputText(e.target.value);
        setHistoryList([...historyList, e.target.value]);
    };

    return (
        <div>
            <input
                onChange={handleTextChange}
                placeholder="Enter Text"
            />
            <br />
            {inputText}
            <br />
            <hr />
            <ul>
                {historyList.map((h) => <li key={h}>{h}</li>)}
            </ul>
        </div>
    );
};

export default InputElement;
