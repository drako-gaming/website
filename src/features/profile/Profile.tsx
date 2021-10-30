import { Nav } from 'react-bootstrap';

function Profile() {
    return (
        <Nav as="ul">
            <Nav.Item as="li">
                <Nav.Link href="/api/login" target="_blank">Login</Nav.Link>
            </Nav.Item>
        </Nav>
    );
}

export default Profile;
