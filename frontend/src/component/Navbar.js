import React from 'react'
import { useNavigate } from 'react-router-dom';

const Navbar = () => {

    const navigate = useNavigate();

    return (
        <ul className='nav'>
            <li onClick={() => navigate('/')} >Home</li>
            <li onClick={() => navigate('/tour')} >Tour</li>
            <li onClick={() => navigate('/contact')} >Contact</li>
            <li onClick={() => navigate('/about')} >About</li>
        </ul>
    )
}

export default Navbar
