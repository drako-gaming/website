import React, { FunctionComponent } from "react";
import { useSelector } from "react-redux";
import { Nav, Navbar } from "react-bootstrap";
import { RootState } from "../../app/store";

const Profile: FunctionComponent = () => {

  const profile = useSelector((state: RootState) => state.profile);

  if (profile.isAuthenticated) {
    return (
      <Navbar.Text>
            Scales: {profile.balance} {"|"} {profile.displayName} {"|"} <a href="/api/logout">Logout</a>
      </Navbar.Text>
    );
  } else {
    return (
      <Nav as="ul">
        <Nav.Item as="li">
          <Nav.Link href="/api/login">Login</Nav.Link>
        </Nav.Item>
      </Nav>
    );
  }
};
Profile.displayName = "Profile";
export default Profile;
