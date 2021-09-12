import React from "react";
import { BrowserView, MobileView } from "react-device-detect";
import Image from "react-bootstrap/Image";
import Button from "react-bootstrap/Button";
import BlueSkyLogo from "../Images/loginLogo.png";
import MobileBlueSkyLogo from "../Images/mobileLoginHeader.png";
import './SignUp.css';

export function SignUpSuccess() {

    return (
        <>
        <BrowserView>
            <div className="d-flex flex-column mx-auto" id="bckgrnd">

                <div className="img-fluid mt-5">
                    <Image id="img" src={BlueSkyLogo} />
                </div>
                <div>
                    <p className="mt-1 w-80 mx-auto text-center" id="text">
                        SERVING CENTRAL FLORIDA
                    </p>
                    <br/>
                    <p className="mt-1 w-80 mx-auto text-center" id="text">
                        Success! Thank you for Signing up with Blue Sky!          
                    </p>
                </div>
                <div className="mt-2 mb-5 w-50 mx-auto" id="form">
                    <Button
                        href="/login"
                        variant="secondary"
                        block
                        size="md"
                    >
                        LOGIN
                    </Button>
                </div>
            </div>
        </BrowserView>

        <MobileView>
            <div className="d-flex flex-column mx-auto" id="bckgrnd">
                <div className="wrapper">
                    <Image
                        src={MobileBlueSkyLogo}
                        className="image-fluid"
                    />
                    <p className="mt-3 w-80 mx-auto text-center" id="text">
                        SERVING CENTRAL FLORIDA
                    </p>
                    <br/>
                    <p className="mt-1 w-80 mx-auto text-center" id="success">
                        Success! Thank you for Signing up with Blue Sky!          
                    </p>
                </div>

                <div className="mt-2 mb-5 w-75 mx-auto" id="form">
                    <Button
                        href="/login"
                        variant="secondary"
                        block
                        size="md"
                    >
                        LOGIN
                    </Button>
                </div>
            </div>
        </MobileView>
    </>
  );
}