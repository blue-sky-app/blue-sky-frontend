// Author(s): Dan, Sam
import React from "react";
import { BrowserView, MobileView } from "react-device-detect";
import { Image, Button } from "react-bootstrap";
import BlueSkyLogo from "../Images/loginLogo.png";
import "./SignUp.css";

// Provides sign up success page when sign up executes successfully
export function SignUpSuccess() {
  return (
    <>
      <BrowserView>
        <div className="d-flex flex-column mx-auto" id="bckgrnd">
          <div className="clouds">
            <div className="img-fluid mt-5">
              <Image id="img" src={BlueSkyLogo} />
            </div>
            <div>
              <p className="mt-1 w-80 mx-auto text-center" id="text">
                SERVING CENTRAL FLORIDA
              </p>
              <br />
              <p className="mt-1 w-80 mx-auto text-center" id="text">
                Success! Thank you for Signing up with Blue Sky!
              </p>
            </div>
            <div className="mt-2 mb-5 w-50 mx-auto" id="form">
              <Button href="/login" variant="secondary" block size="md">
                LOGIN
              </Button>
            </div>
          </div>
        </div>
      </BrowserView>

      <MobileView>
        <div className="d-flex flex-column mx-auto" id="bckgrnd">
        <div className="clouds">
          <div className="wrapper">
          <div className="img-fluid">
              <Image className="d-flex flex-column mx-auto" id="mimg" src={BlueSkyLogo} />
            </div>
            <div className="logo-text">
            <p className="mt-1 w-80 mx-auto text-center" id="ltext">
                RESIDENTIAL & COMMERCIAL CLEANING
              </p><br/>
            <p className="mt-3 w-80 mx-auto text-center" id="text">
              SERVING CENTRAL FLORIDA
            </p>
            </div>
            <br />
            <p className="mt-1 w-80 mx-auto text-center" id="success">
              Success! Thank you for Signing up with Blue Sky!
            </p>
          </div>

          <div className="mt-2 mb-5 w-75 mx-auto" id="form">
            <Button href="/login" variant="secondary" block size="md">
              LOGIN
            </Button>
          </div>
          </div>
        </div>
      </MobileView>
    </>
  );
}
