import React, { useState } from "react";
import { NavBar } from "../NavBar/NavBar.js"
import Form from "react-bootstrap/Form";
import Image from "react-bootstrap/Image";
import Button from "react-bootstrap/Button";
import BlueSkyLogo from "../Images/BlueSkyCleaning-final.jpg";

export function SignUp() {
    const [email, setEmail] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [accountNumber, setAccountNumber] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    // TODO add in all the values

    function validateForm() {
        return email.length > 0 && newPassword.length > 0 && newPassword === confirmPassword;
    }

    function handleSubmit(event) {
        event.preventDefault();
    }

    return (
        <div className="d-flex flex-column justify-content-center" style={{backgroundImage:"linear-gradient(to bottom, #66b3ff, #e6f2ff"}}>
            <Image src={BlueSkyLogo} className="mt-5 w-75 mx-auto" />
            <p className="mt-3 w-80 mx-auto text-center" style={{fontSize:"11px", fontWeight:"bold", color:"#0a7ebd"}}>SERVING NEW YORK, NEW JERSEY & FLORIDA</p>
            <div className="w-75 mx-auto">
                <Form onSubmit={handleSubmit}>
                    <Form.Label className="mt-1" style={{fontSize:"14px", fontWeight:"bold", color:"#434444"}}>REGISTER NEW USER</Form.Label>
                    <Form.Group size="lg" controlId="email">
                        <Form.Control
                            style={{fontSize:"14px"}}
                            type="email"
                            value={email}
                            placeHolder="Email"
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </Form.Group>
                    <Form.Group size="lg" controlId="firstName">
                        <Form.Control
                            style={{fontSize:"14px"}}
                            type="text"
                            value={firstName}
                            placeHolder="First Name"
                            onChange={(e) => setFirstName(e.target.value)}
                        />
                    </Form.Group>
                    <Form.Group size="lg" controlId="lastName">
                        <Form.Control
                            style={{fontSize:"14px"}}
                            type="text"
                            value={lastName}
                            placeHolder="Last Name"
                            onChange={(e) => setLastName(e.target.value)}
                        />
                    </Form.Group>
                    <Form.Group size="lg" controlId="accountNumber">
                        <Form.Control
                            style={{fontSize:"14px"}}
                            type="text"
                            value={accountNumber}
                            placeHolder="Blue Sky Account # (if known)"
                            onChange={(e) => setAccountNumber(e.target.value)}
                        />
                    </Form.Group>
                    <Form.Group size="lg" controlId="newPassword">
                        <Form.Control
                            style={{fontSize:"14px"}}
                            type="password"
                            value={newPassword}
                            placeHolder="New Password"
                            onChange={(e) => setNewPassword(e.target.value)}
                        />
                    </Form.Group>
                    <Form.Group size="lg" controlId="confirmPassword">
                        <Form.Control
                            style={{fontSize:"14px"}}
                            type="password"
                            value={confirmPassword}
                            placeHolder="Confirm Password"
                            onChange={(e) => setConfirmPassword(e.target.value)}
                        />
                    </Form.Group>
                    <Button 
                        style={{fontWeight:"bold"}}
                        href="/home" 
                        block size="md" 
                        type="submit" 
                        disabled={!validateForm()}>
                            SUBMIT
                    </Button>
                </Form>
            </div>
            <div className="mt-3 mb-5 w-75 mx-auto">
                <Button 
                    style={{fontWeight:"bold"}}
                    href="/login" 
                    variant="secondary" 
                    block size="md">
                        LOGIN
                </Button> 
            </div>
        </div>
    );
}

