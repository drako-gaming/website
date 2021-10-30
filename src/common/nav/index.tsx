import { Navbar, Container, Nav } from 'react-bootstrap'
import Profile from '../../features/profile/Profile';

function Header() {
    return (
        <Navbar bg="dark" variant="dark" expand="lg">
            <Container fluid>
                <Navbar.Brand href="/">Drako LIVE</Navbar.Brand>
                <Navbar.Toggle aria-controls="navbar-collapse" />
                <Navbar.Collapse id="navbar-collapse">
                    <Nav className="me-auto">
                        <Nav.Link href="#">Subscribe</Nav.Link>
                    </Nav>
                    <Profile />
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}

export default Header;
