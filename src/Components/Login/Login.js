import React, { useState, useEffect } from "react";
import axios from "axios";
import { Home } from "../Home/Home";
import Form from "react-bootstrap/Form";
import Image from "react-bootstrap/Image";
import Button from "react-bootstrap/Button";
import BlueSkyLogo from "../Images/loginHeader.png";
import user from "../hooks/user.json";
import { Redirect } from "react-router-dom";

export function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [user, setUser] = useState("");
    const [logins, setLogins] = useState("");

    useEffect(() => {
        const loggedInUser = localStorage.getItem("user");
        if (loggedInUser) {
          const foundUser = JSON.parse(loggedInUser);
          setUser(foundUser);
        }
      }, []);

    const handleSubmit = async e => {
        e.preventDefault();
        const user = { email, password };
        const response = await axios.post(
            "http:/localhost:8080/user/",
            user
            );

        setUser(response.data);
        localStorage.setItem('user', response.data);
        console.log(response.data);
    }

    return (
        <div className="d-flex flex-column" style={{backgroundImage:"linear-gradient(to bottom, #b1ddf2, #e6f2ff", height: "100vh",
        minWidth: "100%"}}>
            <Image src={BlueSkyLogo} className="mx-auto" style={{minWidth: "100%", maxWidth: "100%"}} />
            <p className="mt-3 w-80 mx-auto text-center" style={{fontSize:"11px", fontWeight:"bold", color:"#0a7ebd"}}>SERVING CENTRAL FLORIDA</p>
            <div className="mt-5 w-75 mx-auto" style={{maxHeight:"100%"}}>
                <Form onSubmit={handleSubmit}>
                    <Form.Group size="lg" controlId="email">
                        <Form.Control
                            style={{fontSize:"14px"}}
                            type="email"
                            value={email}
                            placeholder="Email"
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </Form.Group>
                    <Form.Group size="lg" controlId="password">
                        <Form.Control
                            style={{fontSize:"14px"}}
                            type="password"
                            value={password}
                            placeholder="Password"
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </Form.Group>
                    <p id="invalid"></p>
                    <br />
                    <Button 
                        id="home"
                        style={{fontWeight:"bold"}}
                        href="/home" 
                        block size="md" 
                        type="submit" 
                    >
                            LOGIN
                    </Button>
                </Form>
            </div>
            <div className="mt-3 mb-5 w-75 mx-auto">
                <Button 
                    style={{fontWeight:"bold"}}
                    href="/signUp" 
                    variant="secondary" 
                    block size="md"
                >
                        SIGN UP                
                </Button> 
            </div>
        </div>
    );
}

// https://serverless-stack.com/chapters/create-a-login-page.html
// https://www.digitalocean.com/community/tutorials/how-to-add-login-authentication-to-react-applications