import React from 'react';
import { Link, useMatch, useResolvedPath } from 'react-router-dom';

function Navbar() {
    return (
        <nav className='nav'>
            <Link to='/' className='site-title'>Site Name</Link>
            <ul>
                <CustomLink to='/game'>Game</CustomLink>
                <CustomLink to='/about'>About</CustomLink>
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