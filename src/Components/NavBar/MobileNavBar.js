import React from "react";
import Navbar from "react-bootstrap/Navbar";
import Container from "react-bootstrap/Container";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHome,
  faCalculator,
  faBuilding,
  faMoneyBillWaveAlt,
  faSignOutAlt,
} from "@fortawesome/free-solid-svg-icons";
import { ContactUs } from "../ContactUs/ContactUs";
import './NavBar.css';

export function MobileNavBar() {
  return (
    <div id="nav">
      <ContactUs />
      <Navbar>
        <Container>
          <Navbar.Brand href="/home" className="d-flex flex-column">
            <FontAwesomeIcon
              className="mx-auto"
              id="icon"
              icon={faHome}
            />
            <Navbar.Text
              className="text-center h-25 pt-0"
              id="txt"
            >
              Home
            </Navbar.Text>
          </Navbar.Brand>
          <Navbar.Brand href="/estimates" className="d-flex flex-column">
            <FontAwesomeIcon
              className="mx-auto"
              id="icon"
              icon={faCalculator}
            />
            <Navbar.Text
              className="text-center h-25 pt-0"
              id="txt"
            >
              Estimate
            </Navbar.Text>
          </Navbar.Brand>
          <Navbar.Brand href="/services" className="d-flex flex-column">
            <FontAwesomeIcon
              className="mx-auto"
              id="icon"
              icon={faBuilding}
            />
            <Navbar.Text
              className="text-center h-25 pt-0"
              id="txt"
            >
              Services
            </Navbar.Text>
          </Navbar.Brand>
          <Navbar.Brand href="/blueBucks" className="d-flex flex-column">
            <FontAwesomeIcon
              className="mx-auto"
              id="icon"
              icon={faMoneyBillWaveAlt}
            />
            <Navbar.Text
              className="text-center h-25 pt-0"
              id="txt"
            >
              Blue Bucks
            </Navbar.Text>
          </Navbar.Brand>
          <Navbar.Brand href="/" className="d-flex flex-column">
            <FontAwesomeIcon
              className="mx-auto"
              id="icon"
              icon={faSignOutAlt}
            />
            <Navbar.Text
              className="text-center h-25 pt-0"
              id="txt"
            >
              Log Out
            </Navbar.Text>
          </Navbar.Brand>
        </Container>
      </Navbar>
    </div>
  );
}