import React from "react";
import Navbar from "react-bootstrap/Navbar";
import Container from "react-bootstrap/Container"
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import FormControl from "react-bootstrap/FormControl";
import Dropdown from "react-bootstrap/Dropdown";
import style from "./NavBar.css";
import {BrowserView, MobileView} from "react-device-detect";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faCalculator, faBuilding, faMoneyBillWaveAlt, faSignOutAlt } from '@fortawesome/free-solid-svg-icons';

export function NavBar() {
  return (
    <>
      <Navbar>      
        <Container>
          <Navbar.Brand href="/login" className="d-flex flex-column">
            <FontAwesomeIcon className="mx-auto" style={{color: "#014388"}} icon={faHome}/>
            <Navbar.Text className="text-center h-25 pt-0" style={{fontSize: "12px"}}>Home</Navbar.Text>
          </Navbar.Brand>
          <Navbar.Brand href="/estimates" className="d-flex flex-column">
            <FontAwesomeIcon className="mx-auto" style={{color: "#014388"}} icon={faCalculator}/>
            <Navbar.Text className="text-center h-25 pt-0" style={{fontSize: "12px"}}>Estimate</Navbar.Text>
          </Navbar.Brand>
          <Navbar.Brand href="/schedule" className="d-flex flex-column">
            <FontAwesomeIcon className="mx-auto" style={{color: "#014388"}} icon={faBuilding}/>
            <Navbar.Text className="text-center h-25 pt-0" style={{fontSize: "12px"}}>Services</Navbar.Text>
          </Navbar.Brand>
          <Navbar.Brand href="/blueBucks" className="d-flex flex-column">
            <FontAwesomeIcon className="mx-auto" style={{color: "#014388"}} icon={faMoneyBillWaveAlt}/>
            <Navbar.Text className="text-center h-25 pt-0" style={{fontSize: "12px"}}>Blue Bucks</Navbar.Text>
          </Navbar.Brand>
          <Navbar.Brand href="/login" className="d-flex flex-column">
            <FontAwesomeIcon className="mx-auto" style={{color: "#014388"}} icon={faSignOutAlt}/>
            <Navbar.Text className="text-center h-25 pt-0" style={{fontSize: "12px"}}>Log Out</Navbar.Text>
          </Navbar.Brand>
        </Container>
      </Navbar>
    </>
  )
}