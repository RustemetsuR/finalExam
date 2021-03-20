import React from 'react';
import './ToolBar.css';
import { NavLink } from 'react-router-dom';
import { withRouter } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../../store/actions/userActions';
import Container from '../Container/Container';


const Layout = props => {
    const user = useSelector(state => state.user.user);
    const dispatch = useDispatch();

    const logoutUser = () => {
        dispatch(logout());
    };

    return (
        <>
            <header className='main-header'>
                <Container>
                    <div className='header-content'>
                        <NavLink to='/'>
                            <div className='logo-box'>
                                <h2 className='logo-title'>Exam-13 App</h2>
                            </div>
                        </NavLink>
                        <div className='users-menu'>
                            {user.length === 0 ?
                                <>
                                    <NavLink to='/register'>Sign Up</NavLink>
                                    <NavLink to='/login'>Sign In</NavLink>
                                </> :
                                <>
                                    <div className='mini-info-profile-box'>
                                        <h4>Hello , {user.username}!</h4>
                                    </div>
                                    {user.length !== 0 && <>
                                        <NavLink to="/addNewPlace/">Create New Place</NavLink>
                                    </>}
                                    <NavLink to='/' onClick={logoutUser}>Log Out</NavLink>
                                </>}
                        </div>
                    </div>
                </Container>
            </header>
            {props.children}
        </>
    );
};

export default withRouter(Layout);