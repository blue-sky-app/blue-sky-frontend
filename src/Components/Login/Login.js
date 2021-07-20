import React, { useState, useEffect } from "react";
import PropTypes from 'prop-types';
import { BrowserView, MobileView } from "react-device-detect";
import axios from "axios";
import Form from "react-bootstrap/Form";
import Image from "react-bootstrap/Image";
import Button from "react-bootstrap/Button";
import BlueSkyLogo from "../Images/loginLogo.png";
import MobileBlueSkyLogo from "../Images/mobileLoginHeader.png";
import './Login.css';

async function loginUser(credentials) {
    return fetch('http://localhost:8080/user', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(credentials)
    })
      .then(data => data.json())
   }


export function Login({setToken}) { 
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const [user, setUser] = useState("");

    useEffect(() => {
        const loggedInUser = localStorage.getItem("user");
        if (loggedInUser) {
            const foundUser = JSON.parse(loggedInUser);
            setUser(foundUser);
        }
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const user = { email, password };
        const response = await axios.post("http:/localhost:8080/user/", user);

        setUser(response.data);
        localStorage.setItem("user", response.data);
        console.log(response.data);
    };

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
                    </div><br/>
                    <div className="w-50 mx-auto" id="form">
                        <Form onSubmit={handleSubmit}>
                            <Form.Group size="lg" controlId="email">
                                <Form.Control
                                    type="email"
                                    value={email}
                                    placeholder="Email"
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                            </Form.Group>
                            <Form.Group size="lg" controlId="password">
                                <Form.Control
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
                                href="/home"
                                block
                                size="md"
                                type="submit"
                            >
                                LOGIN
                            </Button>
                        </Form>
                    </div>
                    <div className="mt-3 mb-5 w-50 mx-auto" id="form">
                        <Button
                            href="/signUp"
                            variant="secondary"
                            block
                            size="md"
                        >
                            SIGN UP
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
                    </div>
                    <div className="mt-5 w-75 mx-auto" id="form">
                        <Form onSubmit={handleSubmit}>
                            <Form.Group size="lg" controlId="email">
                                <Form.Control
                                    type="email"
                                    value={email}
                                    placeholder="Email"
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                            </Form.Group>
                            <Form.Group size="lg" controlId="password">
                                <Form.Control
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
                                href="/home"
                                block
                                size="md"
                                type="submit"
                            >
                                LOGIN
                            </Button>
                        </Form>
                    </div>
                    <div className="mt-3 mb-5 w-75 mx-auto" id="form">
                        <Button
                            href="/signUp"
                            variant="secondary"
                            block
                            size="md"
                        >
                            SIGN UP
                        </Button>
                    </div>
                </div>
            </MobileView>
        </>
    );
}

Login.propTypes = {
    setToken: PropTypes.func.isRequired
  }


// https://serverless-stack.com/chapters/create-a-login-page.html
// https://www.digitalocean.com/community/tutorials/how-to-add-login-authentication-to-react-applications