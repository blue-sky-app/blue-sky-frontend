import React from "react";
import Nav from "react-bootstrap/Nav";
import { NavBar } from "../NavBar/NavBar";
import { BrowserView, MobileView, isBrowser, isMobile } from "react-device-detect";
import Image from "react-bootstrap/Image";
import BlueSkyLogo from "../Images/BlueSkyCleaning-final.jpg";

export function Estimates() {
  return (
    <>
      <NavBar />
      <div className="d-flex flex-column justify-content-center mt-2">
        <Image src={BlueSkyLogo} className="w-75 mx-auto" />
      </div>
      <BrowserView>
          <h1> This is rendered only in browser </h1>
      </BrowserView>
      <MobileView>
          <h1> This is rendered only on mobile </h1>
      </MobileView>
    </>
  )
}