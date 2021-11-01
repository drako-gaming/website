import { FunctionComponent } from "react";
import { Navbar, Container, Nav } from "react-bootstrap";
import Profile from "../../features/profile/Profile";

const Header: FunctionComponent = () => (
  <Navbar bg="dark" variant="dark" expand="lg">
    <Container fluid>
      <Navbar.Brand href="/">Drako LIVE</Navbar.Brand>
      <Navbar.Toggle aria-controls="navbar-collapse" />
      <Navbar.Collapse id="navbar-collapse">
        <Nav className="me-auto">
          <Nav.Link href="https://www.twitch.tv/subs/drako" target="_blank">Subscribe</Nav.Link>
        </Nav>
        <Profile />
      </Navbar.Collapse>
    </Container>
  </Navbar>
);
Header.displayName = "Header";

export default Header;
