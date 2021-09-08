import React from "react";
import Nav from "react-bootstrap/Nav";
import { NavDropdown } from "react-bootstrap";
import Image from "react-bootstrap/Image";
import HeaderLogo from "../Images/topLogoBar.png";
import { MobileNavBar } from "../NavBar/MobileNavBar";
import '../NavBar/NavBar.css';

export function MoreMenu() {
    const logOut = () => {
        sessionStorage.clear();
      };

    return (
        
        <div id="navMore">
            <Image
                    src={HeaderLogo}
                    className="d-flex w-100 mx-auto justify-content-center"
                />
            <Nav defaultActiveKey="/home" className="flex-column">
            <Nav.Link href="/profile" id="navMoreText" className="mt-2">Profile</Nav.Link>
            <NavDropdown.Divider />
            <Nav.Link href="/" id="navMoreText" onClick={logOut}>Log Out</Nav.Link>
            <NavDropdown.Divider />
            </Nav>
            <MobileNavBar active ="moreMenu" />
        </div>
    )
}