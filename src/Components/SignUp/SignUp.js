import React, { useState } from "react";
import Image from "react-bootstrap/Image";
import Button from "react-bootstrap/Button";
import BlueSkyLogo from "../Images/logo_bluesky.jpg";

export function SignUp() {

    return (
        <div className="d-flex flex-column justify-content-center mt-5">
            <Image src={BlueSkyLogo} className="w-75 mx-auto" />
            <div className="mt-5 w-75 mx-auto">
                Put something here
            </div>
            <div className="mt-5 w-75 mx-auto">
                <Button href="/login" variant="secondary" size="sm">Login</Button> 
            </div>
        </div>
    );
}
