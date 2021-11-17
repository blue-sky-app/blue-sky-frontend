// Author(s): Dan, Sam
import React, { useState, useEffect } from "react";
import { Navbar, Container } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHome,
  faCalculator,
  faBuilding,
  faMoneyBillWaveAlt,
  faEllipsisH,
} from "@fortawesome/free-solid-svg-icons";
import { ContactUs } from "../ContactUs/ContactUs";
import "./NavBar.css";

// Provides the bottom nav bar for the mobile view
export function MobileNavBar(props) {
  const [iconColor, setIconColor] = useState("");
  let iconStyle = {
    color: "#014388",
  };

  // Gets state when component loads or refreshes to determine which page is active
  useEffect(() => {
    getState();
  });

  const getState = () => {
    setIconColor(props.active);
  };

  // Changes selected button style to display as active
  switch (iconColor) {
    case "home":
      var home = iconStyle;
      break;

    case "estimates":
      var estimates = iconStyle;
      break;

    case "services":
      var services = iconStyle;
      break;

    case "blueBucks":
      var blueBucks = iconStyle;
      break;

    case "moreMenu":
      var moreMenu = iconStyle;
      break;
    // no default
  }

  return (
    <div id="nav">
      <ContactUs />
      <Navbar>
        <Container id="mleft">
          <Navbar.Brand href="/home" className="d-flex flex-column">
            <FontAwesomeIcon
              className="mx-auto"
              style={home}
              id="icon"
              icon={faHome}
            />
            <Navbar.Text
              className="text-center h-25 pt-0"
              id="txt"
              style={home}
            >
              Home
            </Navbar.Text>
          </Navbar.Brand>
          <Navbar.Brand href="/estimates" className="d-flex flex-column">
            <FontAwesomeIcon
              className="mx-auto"
              style={estimates}
              id="icon"
              icon={faCalculator}
            />
            <Navbar.Text
              className="text-center h-25 pt-0"
              id="txt"
              style={estimates}
            >
              Estimate
            </Navbar.Text>
          </Navbar.Brand>
          <Navbar.Brand href="/services" className="d-flex flex-column">
            <FontAwesomeIcon
              className="mx-auto"
              style={services}
              id="icon"
              icon={faBuilding}
            />
            <Navbar.Text
              className="text-center h-25 pt-0"
              id="txt"
              style={services}
            >
              Services
            </Navbar.Text>
          </Navbar.Brand>
          <Navbar.Brand href="/blueBucks" className="d-flex flex-column">
            <FontAwesomeIcon
              className="mx-auto"
              style={blueBucks}
              id="icon"
              icon={faMoneyBillWaveAlt}
            />
            <Navbar.Text
              className="text-center h-25 pt-0"
              id="txt"
              style={blueBucks}
            >
              Blue Bucks
            </Navbar.Text>
          </Navbar.Brand>
          <Navbar.Brand href="/moreMenu" className="d-flex flex-column">
            <FontAwesomeIcon
              className="mx-auto"
              style={moreMenu}
              id="icon"
              icon={faEllipsisH}
            />
            <Navbar.Text
              className="text-center h-25 pt-0"
              id="txt"
              style={moreMenu}
            >
              More
            </Navbar.Text>
          </Navbar.Brand>
        </Container>
      </Navbar>
    </div>
  );
}
