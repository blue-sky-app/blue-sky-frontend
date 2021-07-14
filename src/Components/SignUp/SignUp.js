import React, { useState } from "react";
import { BrowserView, MobileView } from "react-device-detect";
import axios from "axios";
import Form from "react-bootstrap/Form";
import Image from "react-bootstrap/Image";
import Button from "react-bootstrap/Button";
import BlueSkyLogo from "../Images/loginHeader.png";
import { API_BASE_URL } from "../API/Api";
import { withRouter } from "react-router-dom";

function SignUp(props) {
    const [state, setState] = useState({
        email: "",
        firstName: "",
        lastName: "",
        accountType: "",
        newPassword: "",
        confirmPassword: "",
        successMessage: null,
    });

    const handleChange = (e) => {
        const { id, value } = e.target;
        setState((prevState) => ({
            ...prevState,
            [id]: value,
        }));
    };

    const redirectToHome = () => {
        props.updateTitle("Home");
        props.history.push("/home");
    };
    const redirectToLogin = () => {
        props.updateTitle("Login");
        props.history.push("/");
    };

    const sendDetailsToServer = () => {
        if (state.email.length && state.newPassword.length) {
            props.showError(null);
            const payload = {
                firstName: state.firstName,
                lastName: state.lastName,
                email: state.email,
                accountType: state.accountType,
                password: state.newPassword,
                confirmPassword: state.confirmPassword,
                successMessage: null,
            };
            axios
                .post(API_BASE_URL + "user/", payload)
                .then(function (response) {
                    if (response.status === 200) {
                        setState((prevState) => ({
                            ...prevState,
                            successMessage:
                                "Registration successful. Redirecting to home page..",
                        }));
                        redirectToHome();
                        props.showError(null);
                    } else {
                        props.showError("Some error ocurred");
                    }
                })
                .catch(function (error) {
                    console.log(error);
                });
        } else {
            props.showError("Please enter valid username and password");
        }
    };

    const handleSubmitClick = (e) => {
        e.preventDefault();
        if (state.newPassword === state.confirmPassword) {
            sendDetailsToServer();
        } else {
            props.showError("Passwords do not match");
        }
    };

    return (
        <>
            <BrowserView>
                <div
                    className="d-flex flex-column"
                    style={{
                        backgroundImage: "linear-gradient(to bottom, #b1ddf2, #e6f2ff",
                        height: "100vh",
                        minWidth: "100%",
                    }}
                >
                    <Image
                        src={BlueSkyLogo}
                        className="mx-auto"
                        style={{ minWidth: "100%", maxWidth: "100%" }}
                    />
                    <p
                        className="w-80 mx-auto text-center"
                        style={{ fontSize: "11px", fontWeight: "bold", color: "#0a7ebd" }}
                    >
                        SERVING CENTRAL FLORIDA
                    </p>
                    <div className="w-75 mx-auto">
                        <Form>
                            <Form.Label
                                className="mt-1"
                                style={{
                                    fontSize: "14px",
                                    fontWeight: "bold",
                                    color: "#434444",
                                }}
                            >
                                REGISTER NEW USER
                            </Form.Label>
                            <Form.Group size="lg" controlId="email" className="mb-1">
                                <Form.Control
                                    style={{ fontSize: "14px" }}
                                    type="email"
                                    value={state.email}
                                    placeHolder="Email"
                                    onChange={handleChange}
                                />
                            </Form.Group>
                            <Form.Group size="lg" controlId="firstName" className="mb-1">
                                <Form.Control
                                    style={{ fontSize: "14px" }}
                                    type="text"
                                    value={state.firstName}
                                    placeHolder="First Name"
                                    onChange={handleChange}
                                />
                            </Form.Group>
                            <Form.Group size="lg" controlId="lastName" className="mb-1">
                                <Form.Control
                                    style={{ fontSize: "14px" }}
                                    type="text"
                                    value={state.lastName}
                                    placeHolder="Last Name"
                                    onChange={handleChange}
                                />
                            </Form.Group>
                            <Form.Group size="lg" controlId="accountType" className="mb-1">
                                <Form.Control
                                    as="select"
                                    style={{ fontSize: "14px" }}
                                    type="text"
                                    value={state.accountType}
                                    onChange={handleChange}
                                >
                                    <option>Choose Service Type</option>
                                    <option>Commercial</option>
                                    <option>Residential</option>
                                </Form.Control>
                            </Form.Group>
                            <Form.Group size="lg" controlId="newPassword" className="mb-1">
                                <Form.Control
                                    style={{ fontSize: "14px" }}
                                    type="password"
                                    value={state.newPassword}
                                    placeHolder="New Password"
                                    onChange={handleChange}
                                />
                            </Form.Group>
                            <Form.Group size="lg" controlId="confirmPassword">
                                <Form.Control
                                    style={{ fontSize: "14px" }}
                                    type="password"
                                    value={state.confirmPassword}
                                    placeHolder="Confirm Password"
                                    onChange={handleChange}
                                />
                            </Form.Group>
                            <Button
                                style={{ fontWeight: "bold" }}
                                href="/home"
                                block
                                size="md"
                                type="submit"
                                onClick={handleSubmitClick}
                            >
                                SUBMIT
                            </Button>
                        </Form>
                    </div>
                    <div
                        className="alert alert-success mt-2"
                        style={{ display: state.successMessage ? "block" : "none" }}
                        role="alert"
                    >
                        {state.successMessage}
                    </div>
                    <div className="mt-2 mb-5 w-75 mx-auto">
                        <Button
                            style={{ fontWeight: "bold" }}
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
                <div
                    className="d-flex flex-column"
                    style={{
                        backgroundImage: "linear-gradient(to bottom, #b1ddf2, #e6f2ff",
                        height: "100vh",
                        minWidth: "100%",
                    }}
                >
                    <Image
                        src={BlueSkyLogo}
                        className="mx-auto"
                        style={{ minWidth: "100%", maxWidth: "100%" }}
                    />
                    <p
                        className="w-80 mx-auto text-center"
                        style={{ fontSize: "11px", fontWeight: "bold", color: "#0a7ebd" }}
                    >
                        SERVING CENTRAL FLORIDA
                    </p>
                    <div className="w-75 mx-auto">
                        <Form>
                            <Form.Label
                                className="mt-1"
                                style={{
                                    fontSize: "14px",
                                    fontWeight: "bold",
                                    color: "#434444",
                                }}
                            >
                                REGISTER NEW USER
                            </Form.Label>
                            <Form.Group size="lg" controlId="email" className="mb-1">
                                <Form.Control
                                    style={{ fontSize: "14px" }}
                                    type="email"
                                    value={state.email}
                                    placeHolder="Email"
                                    onChange={handleChange}
                                />
                            </Form.Group>
                            <Form.Group size="lg" controlId="firstName" className="mb-1">
                                <Form.Control
                                    style={{ fontSize: "14px" }}
                                    type="text"
                                    value={state.firstName}
                                    placeHolder="First Name"
                                    onChange={handleChange}
                                />
                            </Form.Group>
                            <Form.Group size="lg" controlId="lastName" className="mb-1">
                                <Form.Control
                                    style={{ fontSize: "14px" }}
                                    type="text"
                                    value={state.lastName}
                                    placeHolder="Last Name"
                                    onChange={handleChange}
                                />
                            </Form.Group>
                            <Form.Group size="lg" controlId="accountType" className="mb-1">
                                <Form.Control
                                    as="select"
                                    style={{ fontSize: "14px" }}
                                    type="text"
                                    value={state.accountType}
                                    onChange={handleChange}
                                >
                                    <option>Choose Service Type</option>
                                    <option>Commercial</option>
                                    <option>Residential</option>
                                </Form.Control>
                            </Form.Group>
                            <Form.Group size="lg" controlId="newPassword" className="mb-1">
                                <Form.Control
                                    style={{ fontSize: "14px" }}
                                    type="password"
                                    value={state.newPassword}
                                    placeHolder="New Password"
                                    onChange={handleChange}
                                />
                            </Form.Group>
                            <Form.Group size="lg" controlId="confirmPassword">
                                <Form.Control
                                    style={{ fontSize: "14px" }}
                                    type="password"
                                    value={state.confirmPassword}
                                    placeHolder="Confirm Password"
                                    onChange={handleChange}
                                />
                            </Form.Group>
                            <Button
                                style={{ fontWeight: "bold" }}
                                href="/home"
                                block
                                size="md"
                                type="submit"
                                onClick={handleSubmitClick}
                            >
                                SUBMIT
                            </Button>
                        </Form>
                    </div>
                    <div
                        className="alert alert-success mt-2"
                        style={{ display: state.successMessage ? "block" : "none" }}
                        role="alert"
                    >
                        {state.successMessage}
                    </div>
                    <div className="mt-2 mb-5 w-75 mx-auto">
                        <Button
                            style={{ fontWeight: "bold" }}
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

export default withRouter(SignUp);
