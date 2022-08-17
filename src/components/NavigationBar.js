import React                                                 from 'react';
import { Nav, Navbar, NavLink }                              from 'react-bootstrap';
import { Link }                                              from 'react-router-dom';
import { FontAwesomeIcon }                                   from '@fortawesome/react-fontawesome';
import { faUserPlus, faArrowRightToBracket, faShip, faUser } from '@fortawesome/free-solid-svg-icons';

function NavigationBar() {
    return (
        <Navbar collapseOnSelect expand='md' bg='dark' variant='dark' className='px-2'>
            <Navbar.Brand href='/'>Statki Online</Navbar.Brand>
            <Navbar.Toggle aria-controls='navbarScroll' data-bs-toggle='collapse' data-bs-target='#navbarScroll' />
            <Navbar.Collapse id='navbarScroll'>
                <Nav>
                    <NavLink  eventKey='1' as={Link} to='/game' className='mx-1'>
                        <FontAwesomeIcon icon={faShip} fixedWidth/>                
                        <span>&nbsp;&nbsp;Graj</span>
                    </NavLink>
                    <NavLink  eventKey='2' as={Link} to='/login' className='mx-1'>
                        <FontAwesomeIcon icon={faArrowRightToBracket} fixedWidth/>
                        <span>&nbsp;&nbsp;Zaloguj się</span>
                    </NavLink>
                    <NavLink  eventKey='3' as={Link} to='/register' className='mx-1'>
                        <FontAwesomeIcon icon={faUserPlus} fixedWidth/>
                        <span>&nbsp;&nbsp;Zarejestruj się</span>
                    </NavLink>
                    <NavLink  eventKey='5' as={Link} to='/' className='mx-1'>
                        <FontAwesomeIcon icon={faArrowRightToBracket} flip='horizontal' fixedWidth/>
                        <span>&nbsp;&nbsp;Wyloguj się</span>
                    </NavLink>
                    <NavLink  eventKey='6' as={Link} to='/profile' className='mx-1'>
                        <FontAwesomeIcon icon={faUser} fixedWidth/>
                        <span>&nbsp;&nbsp;Profil</span>
                    </NavLink>
                </Nav>
            </Navbar.Collapse>     
        </Navbar>
    );
}
 
export default NavigationBar;