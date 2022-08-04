import React                               from 'react';
import { Link, useMatch, useResolvedPath } from 'react-router-dom';

function Navbar() {
    return (
        <nav className='nav'>
            <Link to='/' className='site-title'>Statki Online</Link>
            <ul>
                <CustomLink to='/game'>Gra</CustomLink>
                <CustomLink to='/login'>Zaloguj się</CustomLink>
                <CustomLink to='/register'>Zarejestruj się</CustomLink>
                <CustomLink to='/change_password'>Zmień hasło</CustomLink>
            </ul>
        </nav>
    );
}

function CustomLink({to, children, ...props}) {
    const resolved_path = useResolvedPath(to);
    const is_active = useMatch({ path: resolved_path.pathname, end: true });

    
    return (
        <li className={is_active ? 'active' : ''}>
            <Link to={to}>{children}</Link>
        </li>
    );
}

export default Navbar;