import { Nav } from "react-bootstrap";
import { FunctionComponent } from "react";

const Profile: FunctionComponent = () => (
  <Nav as="ul">
    <Nav.Item as="li">
      <Nav.Link href="/api/login" target="_blank">
        Login
      </Nav.Link>
    </Nav.Item>
  </Nav>
);
Profile.displayName = "Profile";

export default Profile;
