import React from "react";
import Button from "react-bootstrap/Button";
import MetaTags from "react-meta-tags";
import { BrowserView, MobileView } from "react-device-detect";
import { Card, Image } from "react-bootstrap";
import BlueSkyLogo from "../Images/topLogoBar.png";
import { DeskFooter } from "../DeskFooter/DeskFooter";
import { email } from "../LocalUser/LocalUser";
import "./ForgotPassword.css";

export default function ForgotPassword() {
  return (
    <>
      <MetaTags>
        <title>Blue Sky | Password Request</title>
        <meta
          name="Blue Sky Password Request"
          content="Welcome to Blue Sky, we are your go to for Commercial and Residential cleaning!"
        />
        <meta property="og:title" content="Blue Sky Thanks" />
        <meta property="og:image" content="../Images/Header.png" />
      </MetaTags>

      <BrowserView>
        <Card className="border-0 w-100 mx-auto">
          <Card.Header
            className="d-flex justify-content-center align-items-center mb-4 border-0"
            id="bchead"
          >
            Password Reset
          </Card.Header>

          <Card.Body id="tybbody">
            <Card.Title className="mb-3 text-center" id="bctitle">
              OH NO!  Our admins have received your password reset request. Please direct further questions to <strong>{email}</strong>
            </Card.Title>
            <div className="tcontact" id="thanksText">We will contact you with a temporary password and reset instructions.</div>
          </Card.Body>
          <br />
          <div className="mt-2 mb-5 w-50 mx-auto" id="form">
              <Button href="/login" variant="secondary" block size="md">
                RETURN TO LOGIN
              </Button>
            </div>
                <br />
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
            Password Reset
          </Card.Header>
          <Card.Body id="mcbody">
            <Card.Title className="mb-3 text-center" id="mctitle">
            OH NO!  Our admins have received your password reset request. Please direct further questions to <strong>{email}</strong>
            </Card.Title>
            <div className="tcontact" id="thanksText">We will contact you with a temporary password and reset instructions.</div>
          </Card.Body>
        </Card>
      </MobileView>
    </>
  );
}
