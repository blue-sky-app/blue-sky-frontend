import React, { useState } from "react";
import { NavBar } from "../NavBar/NavBar.js"
import Form from "react-bootstrap/Form";
import Image from "react-bootstrap/Image";
import Button from "react-bootstrap/Button";
import BlueSkyLogo from "../Images/logo_bluesky.jpg";
import style from "./Login.css";

export function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    function validateForm() {
        return email.length > 0 && password.length > 0;
    }

    function handleSubmit(event) {
        event.preventDefault();
    }

    return (
        <div className="d-flex flex-column justify-content-center" style={{backgroundImage:"linear-gradient(to bottom, #66b3ff, #e6f2ff"}}>
            <Image src={BlueSkyLogo} className="mt-5 w-75 mx-auto" />
            <p className="mt-3 w-80 mx-auto text-center" style={{fontSize:"11px", fontWeight:"bold", color:"#0a7ebd"}}>SERVING NEW YORK, NEW JERSEY & FLORIDA</p>
            <div className="mt-5 w-75 mx-auto">
                <Form onSubmit={handleSubmit}>
                    <Form.Group size="lg" controlId="email">
                        <Form.Control
                            style={{fontSize:"14px"}}
                            type="email"
                            value={email}
                            placeHolder="Email"
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </Form.Group>
                    <Form.Group size="lg" controlId="password">
                        <Form.Control
                            style={{fontSize:"14px"}}
                            type="password"
                            value={password}
                            placeHolder="Password"
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </Form.Group>
                    <br />
                    <Button 
                        style={{fontWeight:"bold"}}
                        href="/dashboard" 
                        block size="md" 
                        type="submit" 
                        disabled={!validateForm()}>
                            LOGIN
                    </Button>
                </Form>
            </div>
            <div className="mt-3 mb-5 w-75 mx-auto">
                <Button 
                    style={{fontWeight:"bold"}}
                    href="/signUp" 
                    variant="secondary" 
                    block size="md" >
                        SIGN UP                
                </Button> 
            </div>
        </div>
    );
}

// https://serverless-stack.com/chapters/create-a-login-page.html