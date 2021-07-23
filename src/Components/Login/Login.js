import React, { useState, useEffect } from "react";
import PropTypes from 'prop-types';
import axios from "axios";
import { API_BASE_URL } from "../API/Api.js";
import { BrowserView, MobileView } from "react-device-detect";
import Form from "react-bootstrap/Form";
import Image from "react-bootstrap/Image";
import Button from "react-bootstrap/Button";
import BlueSkyLogo from "../Images/loginLogo.png";
import MobileBlueSkyLogo from "../Images/mobileLoginHeader.png";
import './Login.css'; 

export function Login() { 
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const [users, setUsers] = useState([]);
    const emailValue = document.getElementById('email');
    
    // Create fake authentication
    const userArray = sessionStorage.getItem('localUser') ? JSON.parse(sessionStorage.getItem('localUser')) : [];
    
    useEffect(() => {
        fetchUser();
    }, []);
    useEffect(() => {
        console.log(users);
    }, [users]);

    const fetchUser = async () => {
        const response = await axios(`${API_BASE_URL}user/`);
        setUsers(response.data);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        for (const [i, user] of users.entries()) {
            if (emailValue.value === user.email) {
                userArray.push({"localUser": user.id});
                sessionStorage.setItem('localUser', JSON.stringify(userArray));
                window.location.href = '/home';
            }
        }
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
                        <Form onClick={handleSubmit}>
                            <Form.Group size="lg" controlId="email">
                                <Form.Control
                                    type="email"
                                    value={email}
                                    placeholder="Email"
                                    id="email"
                                    // onChange={(e) => setEmail(e.target.value)}
                                />
                            </Form.Group>
                            <Form.Group size="lg" controlId="password">
                                <Form.Control
                                    type="password"
                                    value={password}
                                    placeholder="Password"
                                    id="password"
                                    // onChange={(e) => setPassword(e.target.value)}
                                />
                            </Form.Group>
                            <p id="invalid"></p>
                            <br />
                            <Button
                                id="loginButton"
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
                        <Form>
                            <Form.Group size="lg" controlId="email">
                                <Form.Control
                                    type="email"
                                    value={email}
                                    placeholder="Email"
                                    // onChange={(e) => setEmail(e.target.value)}
                                />
                            </Form.Group>
                            <Form.Group size="lg" controlId="password">
                                <Form.Control
                                    type="password"
                                    value={password}
                                    placeholder="Password"
                                    // onChange={(e) => setPassword(e.target.value)}
                                />
                            </Form.Group>
                            <p id="invalid"></p>
                            <br />
                            <Button onClick={handleSubmit}
                                id="loginButton"
                                href="/home"
                                block
                                size="md"
                                type="button"
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