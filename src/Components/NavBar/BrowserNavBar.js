import React from "react";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import Image from "react-bootstrap/Image";
import BlueSkyLogo from "../Images/topLogoBar.png";

// import Container from "react-bootstrap/Container"
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faHome, faCalculator, faBuilding, faMoneyBillWaveAlt, faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
import { ContactUs } from "../ContactUs/ContactUs";

export function BrowserNavBar() {
    return (
        <>
            <Image src={BlueSkyLogo} className="" style={{ width: "100%" }} />

            <Navbar style={{ backgroundColor: "#0a7ebd" }}>
                <Nav className="mx-auto">
                    <Nav.Link href="/home" style={{ fontWeight: "bold", color: "white" }}>
                        HOME
                    </Nav.Link>
                    <Nav.Link
                        href="/estimates"
                        style={{ fontWeight: "bold", color: "white" }}
                    >
                        ESTIMATE
                    </Nav.Link>
                    <Nav.Link
                        href="/services"
                        style={{ fontWeight: "bold", color: "white" }}
                    >
                        SERVICES
                    </Nav.Link>
                    <Nav.Link
                        href="/blueBucks"
                        style={{ fontWeight: "bold", color: "white" }}
                    >
                        BLUE BUCKS
                    </Nav.Link>
                    <Nav.Link
                        href="/login"
                        style={{ fontWeight: "bold", color: "white" }}
                    >
                        LOG OUT
                    </Nav.Link>
                </Nav>
            </Navbar>
        </>
    );
}
