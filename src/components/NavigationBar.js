import { Nav, Navbar, NavLink } from 'react-bootstrap';
import { Link } from 'react-router-dom';

function NavigationBar() {
    return (
        <Navbar collapseOnSelect expand='sm' bg='dark' variant='dark' className='navigationbar'>
            <Navbar.Brand href='/'>Statki Online</Navbar.Brand>
            <Navbar.Toggle aria-controls='navbarScroll' data-bs-toggle='collapse' data-bs-target='#navbarScroll' />
            <Navbar.Collapse id='navbarScroll'>
                <Nav>
                    <NavLink  eventKey='1' as={Link} to='/game'>Graj</NavLink>
                    <NavLink  eventKey='2' as={Link} to='/login'>Zaloguj się</NavLink>
                    <NavLink  eventKey='3' as={Link} to='/register'>Zarejestruj się</NavLink>
                    <NavLink  eventKey='4' as={Link} to='/change_password'>Zmień hasło</NavLink>
                </Nav>
            </Navbar.Collapse>     
        </Navbar>
    );
}
 
export default NavigationBar;