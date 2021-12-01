// Author(s): Sam
import React from "react";
import { NavDropdown, Image, Nav } from "react-bootstrap";
import BlueSkyLogo from "../Images/topLogoBar.png";
import { MobileNavBar } from "../NavBar/MobileNavBar";
import "../NavBar/NavBar.css";

// Provides the menu for mobile when user selects the "More" button
export function MoreMenu() {
  
  // Clears ssession storage when "logout" button is pressed
  const logOut = () => {
    sessionStorage.clear();
  };

  return (
    <div id="navMore">
        <div className="bgheader">
          <div className="cloudyHeader">
            <Image src={BlueSkyLogo} id="wdth" />
          </div>
        </div>
      <Nav defaultActiveKey="/home" className="flex-column">
        <Nav.Link href="/profile" id="navMoreText" className="mt-2">
          Profile
        </Nav.Link>
        <NavDropdown.Divider />
        <Nav.Link href="/" id="navMoreText" onClick={logOut}>
          Log Out
        </Nav.Link>
        <NavDropdown.Divider />
      </Nav>
      <MobileNavBar active="moreMenu" />
    </div>
  );
}
