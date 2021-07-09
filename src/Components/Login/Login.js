import React, { useState, useEffect } from "react";
import { BrowserView, MobileView } from "react-device-detect";
import axios from "axios";
import Form from "react-bootstrap/Form";
import Image from "react-bootstrap/Image";
import Button from "react-bootstrap/Button";
import BlueSkyLogo from "../Images/loginHeader.png";

export function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
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
                <div
                    className="d-flex flex-column mx-auto"
                    style={{
                        backgroundImage: "linear-gradient(to bottom, #b1ddf2, #e6f2ff",
                        height: "100vh",
                        maxWidth: "50%",
                    }}
                >
                    <Image
                        src={BlueSkyLogo}
                        className="mx-auto"
                        style={{ maxWidth: "100%" }}
                    />
                    <p
                        className="mt-1 w-80 mx-auto text-center"
                        style={{ fontSize: "11px", fontWeight: "bold", color: "#0a7ebd" }}
                    >
                        SERVING CENTRAL FLORIDA
          </p>
                    <div className="w-50 mx-auto" style={{ maxHeight: "100%" }}>
                        <Form onSubmit={handleSubmit}>
                            <Form.Group size="lg" controlId="email">
                                <Form.Control
                                    style={{ fontSize: "14px" }}
                                    type="email"
                                    value={email}
                                    placeholder="Email"
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                            </Form.Group>
                            <Form.Group size="lg" controlId="password">
                                <Form.Control
                                    style={{ fontSize: "14px" }}
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
                                style={{ fontWeight: "bold" }}
                                href="/home"
                                block
                                size="md"
                                type="submit"
                            >
                                LOGIN
              </Button>
                        </Form>
                    </div>
                    <div className="mt-3 mb-5 w-50 mx-auto">
                        <Button
                            style={{ fontWeight: "bold" }}
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
                        className="mt-3 w-80 mx-auto text-center"
                        style={{ fontSize: "11px", fontWeight: "bold", color: "#0a7ebd" }}
                    >
                        SERVING CENTRAL FLORIDA
          </p>
                    <div className="mt-5 w-75 mx-auto" style={{ maxHeight: "100%" }}>
                        <Form onSubmit={handleSubmit}>
                            <Form.Group size="lg" controlId="email">
                                <Form.Control
                                    style={{ fontSize: "14px" }}
                                    type="email"
                                    value={email}
                                    placeholder="Email"
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                            </Form.Group>
                            <Form.Group size="lg" controlId="password">
                                <Form.Control
                                    style={{ fontSize: "14px" }}
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
                                style={{ fontWeight: "bold" }}
                                href="/home"
                                block
                                size="md"
                                type="submit"
                            >
                                LOGIN
              </Button>
                        </Form>
                    </div>
                    <div className="mt-3 mb-5 w-75 mx-auto">
                        <Button
                            style={{ fontWeight: "bold" }}
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

// https://serverless-stack.com/chapters/create-a-login-page.html
// https://www.digitalocean.com/community/tutorials/how-to-add-login-authentication-to-react-applications
