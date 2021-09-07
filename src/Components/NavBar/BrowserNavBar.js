import React, { useState, useEffect } from "react";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import Image from "react-bootstrap/Image";
import BlueSkyLogo from "../Images/topLogoBar.png";
import './NavBar.css';

export function BrowserNavBar(props) {
  const [navColor, setNavColor] = useState('');
  let navStyle = {
    color: "white"
  };

  useEffect(() => {
    getState();
  });

  const getState = () => {
    setNavColor(props.active);
  }

  const logOut = () => {
    sessionStorage.clear();
  };

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

    // no default
  }

  return (
    <>
      <Image src={BlueSkyLogo} id="wdth" />

      <Navbar id="bckgnd">
        <Nav className="mx-auto">
          <Nav.Link
            style={home}
            href="/home"
            id="wfnt"
          >
            HOME
          </Nav.Link>
          <Nav.Link
            style={estimates}
            href="/estimates"
            id="wfnt"
          >
            ESTIMATE
          </Nav.Link>
          <Nav.Link
            style={services}
            href="/services"
            id="wfnt"
          >
            SERVICES
          </Nav.Link>
          <Nav.Link
            style={blueBucks}
            href="/blueBucks"
            id="wfnt"
          >
            BLUE BUCKS
          </Nav.Link>
          <Nav.Link
            href="/login"
            id="wfnt"
            onClick={logOut}
          >
            LOG OUT
          </Nav.Link>
        </Nav>
      </Navbar>
    </>
  );
}