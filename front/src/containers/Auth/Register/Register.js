import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { register } from '../../../store/actions/userActions';
import '../Login/Login.css';

const Register = () => {
    const dispatch = useDispatch();

    const [registerData, setRegisterData] = useState({
        username: '',
        password: '',
    });

    const dataOnChange = event => {
        const name = event.target.name;
        const value = event.target.value;

        const data = {
            ...registerData,
            [name]: value,
        };

        setRegisterData(data);
    }

    const registerSubmit = event => {
        event.preventDefault();
        dispatch(register(registerData));
    };

    return (
        <div className='register-box user-sign-boxes'>
            <h2>Create your account</h2>
            <div>
                <form onSubmit={registerSubmit}>
                    <input placeholder='Username' name='username' onChange={dataOnChange} value={registerData.username} required />
                    <input placeholder='Password' name='password' type='password' onChange={dataOnChange} value={registerData.password} required />
                    <button type='submit'>Sign Up</button>
                </form>
            </div>
        </div>
    );
};

export default Register;