import React, { useState, useEffect } from "react";
//import PropTypes from 'prop-types';
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
    const [users, setUsers] = useState([]);
    const emailValue = document.getElementById('email');
    const passwordValue = document.getElementById('password');
    
    // Constant for storing user data in session
    const userArray = [];

    useEffect(() => {
        fetchUser();
    }, []);
    useEffect(() => {
        console.log(users);
    }, [users]);

    useEffect(() => {
        //console.log(email);
        //console.log(accountType);
    })

    const fetchUser = async () => {
        const response = await axios(`${API_BASE_URL}users/`);
        setUsers(response.data);
    };

    const redirect = () => {
        let tID = setTimeout(function () {
            window.location.href = '/home';
            window.clearTimeout(tID);		// clear time out.
        }, 2000);
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        sessionStorage.clear();
        for (const [i, user] of users.entries()) {
            console.log(i, user);
            if (emailValue.value === user.email) {
                if (passwordValue.value === user.password) {
                    userArray.push({"localId": user.id});
                    userArray.push({"localFname": user.firstName});
                    userArray.push({"localLname": user.lastName});
                    userArray.push({"localEmail": user.email});
                    userArray.push({"localAccountType": user.accountType});
                    sessionStorage.setItem('localUser', JSON.stringify(userArray));
                    console.log(sessionStorage.getItem('localUser'));
                    redirect();
                }
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
                        <Form>
                            <Form.Group size="lg" controlId="email">
                                <Form.Control
                                    type="email"
                                    placeholder="Email"
                                    id="email"
                                    // onChange={(e) => setEmail(e.target.value)}
                                />
                            </Form.Group>
                            <Form.Group size="lg" controlId="password">
                                <Form.Control
                                    type="password"
                                    placeholder="Password"
                                    id="password"
                                    // onChange={(e) => setPassword(e.target.value)}
                                />
                            </Form.Group>
                            <p id="invalid"></p>
                            <br />
                            <Button onClick={handleSubmit}
                                id="loginButton"
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
                                    placeholder="Email"
                                    // onChange={(e) => setEmail(e.target.value)}
                                />
                            </Form.Group>
                            <Form.Group size="lg" controlId="password">
                                <Form.Control
                                    type="password"
                                    placeholder="Password"
                                />
                            </Form.Group>
                            <p id="invalid"></p>
                            <br />
                            <Button onClick={handleSubmit}
                                id="loginButton"
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

/*Login.propTypes = {
    setToken: PropTypes.func.isRequired
  }*/