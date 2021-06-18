import React, { useState } from "react";
import { NavBar } from "../NavBar/NavBar.js"
import Form from "react-bootstrap/Form";
import Image from "react-bootstrap/Image";
import Button from "react-bootstrap/Button";
import BlueSkyLogo from "../Images/logo_bluesky.jpg";

export function SignUp() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    function validateForm() {
        return email.length > 0 && password.length > 0 && password === confirmPassword;
    }

    function handleSubmit(event) {
        event.preventDefault();
    }

    return (
        <div className="d-flex flex-column justify-content-center mt-5">
            <Image src={BlueSkyLogo} className="w-75 mx-auto" />
            <div className="mt-5 w-75 mx-auto">
                <Form onSubmit={handleSubmit}>
                    <Form.Group size="lg" controlId="email">
                        <Form.Label>Email</Form.Label>
                        <Form.Control
                            autoFocus
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </Form.Group>
                    <Form.Group size="lg" controlId="password">
                        <Form.Label>Password</Form.Label>
                        <Form.Control
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </Form.Group>
                    <Form.Group size="lg" controlId="confirmPassword">
                        <Form.Label>Confirm Password</Form.Label>
                        <Form.Control
                            type="password"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                        />
                    </Form.Group>
                    <Button href="/dashboard" block size="lg" type="submit" disabled={!validateForm()}>Sign Up</Button>
                </Form>
            </div>
            <div className="mt-5 w-75 mx-auto">
                <Button href="/login" variant="secondary" size="sm">Login</Button> 
            </div>
        </div>
    );
}

// https://serverless-stack.com/chapters/create-a-login-page.html