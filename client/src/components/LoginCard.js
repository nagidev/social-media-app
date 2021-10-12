import React, { useEffect, useState } from 'react';
import axios from 'axios';
import crypto from 'crypto';

import useWipe from '../hooks/useWipe';
import LoginPage from './LoginPage';
import SignUp from './SignUp';

import {ReactComponent as LoginLogo} from '../login.svg';

const LoginCard = ({baseUrl, setToken}) => {
    const [wipeStyle, setWipe] = useWipe({duration: 500, amount: 20});
    const [state, setState] = useState({peek: false, show: false, signUp: false});
    const title = 'Hay there.';
    const [caption, setCaption] = useState('')
    const [loginData, setLoginData] = useState({
        username: '',
        password: '',
        validUser: true,
        validPassword: true,
        remember: false
    })
    const [signUpData, setSignUpData] = useState({
        username: "",
        email: "",
        password: "",
        validUser: true,
        validMail: true,
        validPassword: true
    })

    useEffect(() => {
        axios.get(baseUrl+"getRandomCaption", { params: { data: crypto.createHash('md5').update('wubba').digest('hex') } })
            .then((res) => {
            setCaption(res.data)
            })
        }, [baseUrl])

    const loginUser = () => {
        var data = {}
        data.username = loginData.username
        data.password = crypto.createHash('md5').update(loginData.password).digest('hex')
        axios.get(baseUrl+"loginUser", { params: { data: data } })
            .then((res) => {
                if (res.status === 200) {
                    setToken(res.data)
                    sessionStorage.setItem('sheepLoginToken', res.data)
                    if (loginData.remember) localStorage.setItem('sheepLoginToken', res.data)
                }
            })
            .catch((error) => {
                console.log('Login failed')
                console.log(error)
                setLoginData( {...loginData, ...error.response.data} )
            })
    }
    
    const signUpUser = () => {
        console.log(signUpData)
    }

    const showLogin = () => {
        setState({...state, show: true})
    };

    const showSignUp = () => {
        setState({...state, signUp: true});
    };

    const hideSignUp = () => {
        setState({...state, signUp: false});
    };
    
    useEffect(() => {
        if (state.signUp) {
            setWipe({isWiped: true, amount: 100});
        } else if (state.show) {
            setWipe({isWiped: true, amount: 50});
        } else if (state.peek) {
            setWipe({isWiped: true, amount: 10});
        } else {
            setWipe({isWiped: false});
        }
    }, [state]); // eslint-disable-line

    return (
        <div className="app flex-grow flex-center">
            <div
                    className="card shadow-big"
                    id="login-container"
                    onMouseOver={() => {if( !state.peek ) setState({...state, peek: true})}}
                    onMouseLeave={() => {if( state.peek ) setState({...state, peek: false})}}
                    
                    >
                <div className="card bg-light panel">
                    <h1 className="h1" id="title">{title}</h1>
                    <div className="flex-row">
                        <SignUp
                            show={state.signUp}
                            setLogin={hideSignUp}
                            signUpData={signUpData}
                            setSignUpData={setSignUpData}
                            signUpCallback={signUpUser}
                            />
                        <LoginPage
                            show={(state.show && !state.signUp)}
                            setSignUp={showSignUp}
                            loginData={loginData}
                            setLoginData={setLoginData}
                            loginCallback={loginUser}
                            />
                    </div>
                    <div className={`h-100 w-100 flex-right ${(state.peek && !state.show)?'visible':'hidden'}`} id="login-btn-container">
                        <LoginLogo
                                alt="Login"
                                id="btn-login"
                                fill="#a3c0e6"
                                onClick={showLogin}
                            />
                    </div>
                </div>
                <div style={wipeStyle} className="card bg-dark panel" id="bg-img" onClick={() => {setState({...state, show: false})}}>
                    <h1 className="h1" id="title">{title}</h1>
                    <p className="h1">{caption}</p>
                </div>
            </div>
        </div>
    )
}

export default LoginCard;