import React from "react";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import Image from "react-bootstrap/Image";
import BlueSkyLogo from "../Images/topLogoBar.png";
import './NavBar.css';

export function BrowserNavBar() {
    return (
        <>
            <Image src={BlueSkyLogo} id="wdth"/>

            <Navbar id="bckgnd">
                <Nav className="mx-auto">
                    <Nav.Link 
                        href="/home" 
                        id="wfnt"
                    >
                        HOME
                    </Nav.Link>
                    <Nav.Link
                        href="/estimates"
                        id="wfnt"
                    >
                        ESTIMATE
                    </Nav.Link>
                    <Nav.Link
                        href="/services"
                        id="wfnt"
                    >
                        SERVICES
                    </Nav.Link>
                    <Nav.Link
                        href="/blueBucks"
                        id="wfnt"
                    >
                        BLUE BUCKS
                    </Nav.Link>
                    <Nav.Link
                        href="/login"
                        id="wfnt"
                    >
                        LOG OUT
                    </Nav.Link>
                </Nav>
            </Navbar>
        </>
    );
}