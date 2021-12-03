import { FunctionComponent } from "react";
import { Link } from "react-router-dom";
import { Navbar, Container, Nav } from "react-bootstrap";
import Profile from "../../features/profile/Profile";
import { useSelector } from "react-redux";
import { RootState } from "../../app/store";

const Header: FunctionComponent = () => {
  const profile = useSelector((state: RootState) => state.profile);
  const isModerator = profile.roles && profile.roles.includes("moderator");
  return (
    <Navbar bg="dark" variant="dark" expand="lg">
      <Container fluid>
        <Navbar.Brand as={Link} to="/">
          <img src="/logo.png" alt="Drako LIVE" />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="navbar-collapse" />
        <Navbar.Collapse id="navbar-collapse">
          <Nav className="me-auto">
            <Nav.Link href="https://www.twitch.tv/subs/drako" target="_blank">
              Subscribe
            </Nav.Link>
            <Nav.Link as={Link} to="/leaderboard">
              Leaderboard
            </Nav.Link>
            {isModerator ? (
              <Nav.Link as={Link} to="/betAdmin">
                Betting Admin
              </Nav.Link>
            ) : (
              ""
            )}
          </Nav>
          <Profile />
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};
Header.displayName = "Header";

export default Header;
