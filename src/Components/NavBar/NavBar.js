import React from "react";
import Navbar from "react-bootstrap/Navbar";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import FormControl from "react-bootstrap/FormControl";
import Dropdown from "react-bootstrap/Dropdown";
import style from "./NavBar.css";
import {BrowserView, MobileView} from "react-device-detect";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faUserCircle } from '@fortawesome/free-solid-svg-icons';

export function NavBar() {
  return (
    <>
      <Navbar bg="primary" variant="dark">      
        <Dropdown >
          <Dropdown.Toggle id="dropdown-basic">
            <FontAwesomeIcon style={{color: "white"}} icon={faBars} />
          </Dropdown.Toggle>
          <Dropdown.Menu>
            <Dropdown.Item href="/estimate">Estimates</Dropdown.Item>
            <Dropdown.Item href="/schedule">Schedule Services</Dropdown.Item>
            <Dropdown.Item href="/blueBucks">Blue Bucks</Dropdown.Item>
            <Dropdown.Item href="/login">Log Out</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>

        <Form inline className="d-flex justify-content-around">
          <FormControl type="text" placeholder="Search" className="w-50" />
          <Button variant="outline-muted" className="btn-outline-light ml-1">Search</Button>
          <FontAwesomeIcon className="ml-1 fa-2x" style={{color: "white"}} icon={faUserCircle}/>
        </Form>
      </Navbar>
    </>
  )
}
