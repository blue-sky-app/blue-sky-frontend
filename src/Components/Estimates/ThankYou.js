import React from "react";
import MetaTags from "react-meta-tags";
import { MobileNavBar } from "../NavBar/MobileNavBar";
import { BrowserNavBar } from "../NavBar/BrowserNavBar";
import { BrowserView, MobileView } from "react-device-detect";
import { Card, Image } from "react-bootstrap";
import BlueSkyLogo from "../Images/topLogoBar.png";
import { DeskFooter } from "../DeskFooter/DeskFooter";
import { fName, email } from "../LocalUser/LocalUser";
import "./Estimates.css";

// Provides thank you page after submitting an estimate
export function ThankYou() {
  return (
    <>
      <MetaTags>
        <title>Blue Sky | Thanks!</title>
        <meta
          name="Blue Sky Thanks"
          content="Welcome to Blue Sky, we are your go to for Commercial and Residential cleaning!"
        />
        <meta property="og:title" content="Blue Sky Thanks" />
        <meta property="og:image" content="../Images/Header.png" />
      </MetaTags>

      <BrowserView>
        <BrowserNavBar active="estimates" />
        <Card className="border-0 w-100 mx-auto">
          <Card.Header
            className="d-flex justify-content-center align-items-center mb-4 border-0"
            id="bchead"
          >
            We Appreciate Your Business, {fName}!
          </Card.Header>

          <Card.Body id="tybbody">
            <Card.Title className="mb-3 text-center" id="bctitle">
              Your estimate will be reviewed by one of our technicians and you
              will receive a quote via email to <strong>{email}</strong>
            </Card.Title>
            <div className="thanks" id="thanksText">Thank You!</div>
            <div className="tcontact" id="thanksText">We will contact you shortly...</div>
          </Card.Body>
          <DeskFooter />
        </Card>
      </BrowserView>

      <MobileView>
        <div className="bgheader">
          <div className="cloudyHeader">
            <Image src={BlueSkyLogo} id="wdth" />
          </div>
        </div>

        <Card className="border-0" id="mcrd">
          <Card.Header
            className="d-flex justify-content-center align-items-center text-white"
            id="mchead"
          >
            Thank You {fName}!
          </Card.Header>
          <Card.Body id="mcbody">
            <Card.Title className="mb-3 text-center" id="mctitle">
              Your estimate will be reviewed by one of our technicians and you
              will receive a quote via email to <strong>{email}</strong>
            </Card.Title>
            <div className="thanks" id="thanksText">Thank You!</div>
            <div className="tcontact" id="thanksText">We will contact you shortly...</div>
          </Card.Body>
        </Card>

        <MobileNavBar active="estimates" />
      </MobileView>
    </>
  );
}
