/* eslint-disable no-console */
import React, { useState, useEffect, useContext } from 'react';
import PropTypes from 'prop-types';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { ConfigContext } from './App';

const SignMeUp = ({ signupCallback }) => {
    useEffect(() => console.log('SignMeUp:useEffect called'));

    const [email, setEmail] = useState();
    const [emailValid, setEmailValid] = useState(false);
    const [sendProcessing, setSendProcessing] = useState(false);

    const { showSignMeUp, loggedInUserEmail } = useContext(ConfigContext);

    const validateEmail = (email) => {
        const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(email);
    };

    const notify = () => toast.info(`You will be notified of upcoming events ${email}`);

    const sendEmailToBackend = () => {
        setSendProcessing(true);
        new Promise((resolve) => 
            setTimeout(() => {
                setSendProcessing(false);
                setEmail('');
                resolve();
            }, 1000)
        ).then(() => {
            notify();
            signupCallback(email);
            setEmail('');
        }).catch((e) => console.log(e));
    };

    const buttonText = sendProcessing ? 'processing...' : 'Get Updates';

    if (loggedInUserEmail) {
        return (
            <div className="container">
                <div className="content">
                    <span>Logged in User Email: {loggedInUserEmail}</span>
                    &nbsp;&nbsp;
                    <a href='/logout' >Logout</a>
                </div>
            </div>
        );
    }

    return showSignMeUp === false ? null : (
        <div className="container">
            <div>
                <ToastContainer />
                <div className="content">
                    <input
                        value={email}
                        onChange={e => {
                            setEmailValid(validateEmail(e.target.value));
                            return setEmail(e.target.value);
                        }}
                        placeholder="Enter Email"
                        type="email"
                        name="email"
                        required
                    />
                    &nbsp;
                    <button
                        disabled={!emailValid || sendProcessing}
                        className="btn"
                        onClick={sendEmailToBackend}
                        type="submit"
                    >
                        {buttonText}
                    </button>
                    &nbsp;&nbsp;<a href='/login' >Login</a>
                </div>
            </div>
        </div>
    );
};

SignMeUp.propTypes = {
    signupCallback: PropTypes.func.isRequired,
};

export default SignMeUp;
