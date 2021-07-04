import React from "react";
import Navbar from "react-bootstrap/Navbar";
import Container from "react-bootstrap/Container"
import {BrowserView, MobileView} from "react-device-detect";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faCalculator, faBuilding, faMoneyBillWaveAlt, faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
import { ContactUs } from "../ContactUs/ContactUs";

export function NavBar() { 
  return (
    <div style={{position:"absolute", bottom:"0", width:"100%"}}>
      <ContactUs />
      <Navbar>      
        <Container>
          <Navbar.Brand href="/home" className="d-flex flex-column">
            <FontAwesomeIcon className="mx-auto" style={{color: "#014388"}} icon={faHome}/>
            <Navbar.Text className="text-center h-25 pt-0" style={{fontSize: "12px"}}>Home</Navbar.Text>
          </Navbar.Brand>
          <Navbar.Brand href="/estimates" className="d-flex flex-column">
            <FontAwesomeIcon className="mx-auto" style={{color: "#014388"}} icon={faCalculator}/>
            <Navbar.Text className="text-center h-25 pt-0" style={{fontSize: "12px"}}>Estimate</Navbar.Text>
          </Navbar.Brand>
          <Navbar.Brand href="/services" className="d-flex flex-column">
            <FontAwesomeIcon className="mx-auto" style={{color: "#014388"}} icon={faBuilding}/>
            <Navbar.Text className="text-center h-25 pt-0" style={{fontSize: "12px"}}>Services</Navbar.Text>
          </Navbar.Brand>
          <Navbar.Brand href="/blueBucks" className="d-flex flex-column">
            <FontAwesomeIcon className="mx-auto" style={{color: "#014388"}} icon={faMoneyBillWaveAlt}/>
            <Navbar.Text className="text-center h-25 pt-0" style={{fontSize: "12px"}}>Blue Bucks</Navbar.Text>
          </Navbar.Brand>
          <Navbar.Brand href="/" className="d-flex flex-column">
            <FontAwesomeIcon className="mx-auto" style={{color: "#014388"}} icon={faSignOutAlt}/>
            <Navbar.Text className="text-center h-25 pt-0" style={{fontSize: "12px"}}>Log Out</Navbar.Text>
          </Navbar.Brand>
        </Container>
      </Navbar>
    </div>
  )
}