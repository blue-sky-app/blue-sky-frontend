// Author(s): Sam
import React, { useState, useEffect } from "react";
import { Navbar, Nav, Image } from "react-bootstrap";
import BlueSkyLogo from "../Images/topLogoBar.png";
import "./NavBar.css";

// Provides the nav bar for browser view
export function BrowserNavBar(props) {
  const [navColor, setNavColor] = useState("");
  let navStyle = {
    color: "white",
  };

  // Gets state when component loads or refreshes to determine which page is active
  useEffect(() => {
    getState();
  });

  const getState = () => {
    setNavColor(props.active);
  };

  // Clears ssession storage when "logout" button is pressed
  const logOut = () => {
    sessionStorage.clear();
  };

  // Changes selected button style to display as active
  switch (navColor) {
    case "home":
      var home = navStyle;
      break;

    case "estimates":
      var estimates = navStyle;
      break;

    case "services":
      var services = navStyle;
      break;

    case "blueBucks":
      var blueBucks = navStyle;
      break;

    case "profile":
      var profile = navStyle;
      break;

    // no default
  }

  // Returns to "Home" page
  const returnHome = () => {
    window.location.href = "/home";
  };

  return (
    <>
      <div onClick={returnHome} className="bgheader">
        <div className="cloudyHeader">
          <Image src={BlueSkyLogo} id="wdth" />
        </div>
      </div>
      <Navbar id="bckgnd">
        <Nav className="mx-auto">
          <Nav.Link style={home} href="/home" id="wfnt" data-testid="homeNav">
            HOME
          </Nav.Link>
          <Nav.Link
            style={estimates}
            href="/estimates"
            id="wfnt"
            data-testid="estimateNav"
          >
            ESTIMATE
          </Nav.Link>
          <Nav.Link
            style={services}
            href="/services"
            id="wfnt"
            data-testid="servicesNav"
          >
            SERVICES
          </Nav.Link>
          <Nav.Link
            style={blueBucks}
            href="/blueBucks"
            id="wfnt"
            data-testid="blueBucksNav"
          >
            BLUE BUCKS
          </Nav.Link>
          <Nav.Link
            style={profile}
            href="/profile"
            id="wfnt"
            data-testid="profileNav"
          >
            PROFILE
          </Nav.Link>
          <Nav.Link
            href="/login"
            id="wfnt"
            data-testid="logoutNav"
            onClick={logOut}
          >
            LOG OUT
          </Nav.Link>
        </Nav>
      </Navbar>
    </>
  );
}
