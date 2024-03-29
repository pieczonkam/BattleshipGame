import React                    from 'react';
import { Nav, Navbar, NavLink } from 'react-bootstrap';
import { Link }                 from 'react-router-dom';
import { FontAwesomeIcon }      from '@fortawesome/react-fontawesome';
import { faUserPlus, 
        faArrowRightToBracket, 
        faShip, 
        faUser }                from '@fortawesome/free-solid-svg-icons';
import { logOut }               from '../utils/utilsAPI';

// Komponent panelu nawigacji
function NavigationBar(props) {
    return (
        <Navbar collapseOnSelect expand='md' bg='dark' variant='dark' className='px-2'>
            <Navbar.Brand href='#' onClick={() => window.location.reload(false)}>Statki Online</Navbar.Brand>
            <Navbar.Toggle aria-controls='navbarScroll' data-bs-toggle='collapse' data-bs-target='#navbarScroll' />
            <Navbar.Collapse id='navbarScroll'>
                <Nav>
                    {
                        props.logged_in ? 
                        <>
                            <NavLink id='navlink-1' eventKey='1' as={Link} to='/game' className='mx-1'>
                                <FontAwesomeIcon icon={faShip} fixedWidth/>                
                                <span>&nbsp;&nbsp;Graj</span>
                            </NavLink>
                            <NavLink id='navlink-2' eventKey='2' as={Link} to='/profile' className='mx-1'>
                                <FontAwesomeIcon icon={faUser} fixedWidth/>
                                <span>&nbsp;&nbsp;Profil</span>
                            </NavLink>
                            <NavLink id='navlink-3' eventKey='3' onClick={() => logOut()} className='mx-1'>
                                <FontAwesomeIcon icon={faArrowRightToBracket} flip='horizontal' fixedWidth/>
                                <span>&nbsp;&nbsp;Wyloguj się</span>
                            </NavLink>
                        </> :
                        <>
                            <NavLink id='navlink-4' eventKey='4' as={Link} to='/login' className='mx-1'>
                                <FontAwesomeIcon icon={faArrowRightToBracket} fixedWidth/>
                                <span>&nbsp;&nbsp;Zaloguj się</span>
                            </NavLink>
                            <NavLink id='navlink-5' eventKey='5' as={Link} to='/register' className='mx-1'>
                                <FontAwesomeIcon icon={faUserPlus} fixedWidth/>
                                <span>&nbsp;&nbsp;Zarejestruj się</span>
                            </NavLink>
                        </>
                    }
                </Nav>
            </Navbar.Collapse>     
        </Navbar>
    );
}
 
export default NavigationBar;