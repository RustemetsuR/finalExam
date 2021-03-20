import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../../../store/actions/userActions';
import './Login.css';

const Login = () => {
    const dispatch = useDispatch();

    const [loginData, setLoginData] = useState({
        username: '',
        password: '',
    });

    const error = useSelector(state => state.user.error);

    const userNameOnChange = event => {
        const value = event.target.value;
        const loginDataCopy = {...loginData, username: value};
        setLoginData(loginDataCopy);
    };

    const passwordOnChange = event => {
        const value = event.target.value;
        const loginDataCopy = {...loginData, password: value};
        setLoginData(loginDataCopy);
    };

    const loginSubmit = event => {
        event.preventDefault();
        const data = {
            username: loginData.username,
            password: loginData.password,
        };
        dispatch(login(data));
    };


    return (
        <div className='login-box user-sign-boxes'>
            <h2>Login</h2>
            {error ?
                <div>
                    {error.error}
                </div> : null}
            <form onSubmit={loginSubmit}>
                <input id='username' onChange={userNameOnChange} placeholder='Username' required value={loginData.username} />
                <input id='password' onChange={passwordOnChange} placeholder='Password' type='password' required value={loginData.password} />
                <button id='loginBtn' type='submit'>Login</button>
            </form>
        </div>
    );
};

export default Login;