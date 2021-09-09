import React, { useState, useEffect } from "react";
import axios from "axios";
import { API_BASE_URL } from "../API/Api.js";
import { MobileNavBar } from "../NavBar/MobileNavBar";
import { BrowserNavBar } from "../NavBar/BrowserNavBar";
import { BrowserView, MobileView } from "react-device-detect";
import Card from "react-bootstrap/Card";
import Form from "react-bootstrap/Form";
import Image from "react-bootstrap/Image";
import Button from "react-bootstrap/Button";
import HeaderLogo from "../Images/topLogoBar.png";
import { DeskFooter } from "../DeskFooter/DeskFooter";
import { fName, lName, email, accountType, userId, invoices, blueBucks } from "../LocalUser/LocalUser";
import './Profile.css'; 

export function Profile() { 
    const [accountOption, setAccountOption] = useState();
    const [news, setNews] = useState([]);
    const [state, setState] = useState({
        userId: userId,
        email: email,
        firstName: fName,
        lastName: lName,
        accountType: accountType,
        invoices: invoices,
        blueBucks: blueBucks,
        newPassword: "",
        confirmPassword: "",
        message: null,
    });

    const userArray = [];
    
    useEffect( () => {
        console.log(userId);
        console.log(state.email);
        console.log(state.firstName);
        console.log(state.lastName);
        console.log(state.accountType);
        console.log(state.newPassword);
        console.log(state.confirmPassword);
        console.log(state.message);
    })

    useEffect(() => {
        fetchNews();
      }, []);
    useEffect(() => {
    console.log(news);
    }, [news]);

    const fetchNews = async () => {
        const response = await axios(`${API_BASE_URL}news/`);
        setNews(response.data);
        };

    const handleChange = (e) => {
        const { id, value } = e.target;
        setState((prevState) => ({
            ...prevState,
            [id]: value,
        }));
    };

    const handleSelect = e => {
        setState((prevState) => ({
            ...prevState,
            accountType: e.target.value,
        }));
    }

    const sendDetailsToServer = (info) => {
        axios
            .put(API_BASE_URL + "User/" + userId, info)
            .then(function (response) {
                if (response.status === 200) {
                    setState((prevState) => ({
                        ...prevState,
                        message:
                            "Update successful",
                    }));
                } 
            })
            .catch(function (error) {
                console.log(error);
            });
            userArray.push({
                "localId": state.userId,
                "localFname": state.firstName,
                "localLname": state.lastName,
                "localEmail": state.email,
                "localAccountType": state.accountType,
                "localInvoices": state.invoices,
                "localBlueBucks": state.blueBucks
            });
            for (let i in news) {
                if (state.accountType === news[i].customerType) {
                    userArray.push({
                        "localNewsHeadline": news[i].headline,
                        "localNewsText": news[i].text
                    });
                }
            }
            sessionStorage.setItem('localUser', JSON.stringify(userArray));
            console.log(sessionStorage.getItem('localUser'))
    }
    
    const updateUser = () => {
        if (state.newPassword.length && state.firstName.length && state.lastName.length && state.email.length) {
            var payload = {
                firstName: state.firstName,
                lastName: state.firstName,
                email: state.email,
                accountType: state.accountType,
                password: state.newPassword,
                confirmPassword: state.confirmPassword,
            }
            sendDetailsToServer(payload);
            console.log(state.newPassword);
        } 
        else if (!state.newPassword.length && state.firstName.length && state.lastName.length && state.email.length) {
            payload = {
                firstName: state.firstName,
                lastName: state.lastName,
                email: state.email,
                accountType: state.accountType,
            }
            sendDetailsToServer(payload);
        }
        else {
            setState((prevState) => ({
                ...prevState,
                message:
                    "Please make sure no required fields are left blank",
            }));
        }
    };

    const handleUpdate = (e) => {
        e.preventDefault();
        if (state.newPassword === state.confirmPassword) {
            updateUser();
        } 
        else {
            setState((prevState) => ({
                ...prevState,
                message:
                "Passwords do not match",
                }));
        }
    };

    useEffect(() => {
        if (accountType === "Commercial") {
            setAccountOption("Residential") 
        } 
        else {
            setAccountOption("Commercial")
        }
    }, []);

    return (
        <>
          <BrowserView>
            <BrowserNavBar active ="profile"/>
            <Card className="border-0 w-100 mx-auto">
              <Card.Header
                className="d-flex justify-content-center align-items-center mb-4 border-0"
                id="cardh"
              >
                {fName}'s Profile
              </Card.Header>
    
              <Card.Body className="mx-auto w-50" id="bcbody">
                    <div
                        className="alert alert-success"
                        style={{ display: state.message ? "block" : "none", textAlign: state.message ? "center" : ""}}
                        role="alert"
                    >
                        {state.message}
                    </div>
                    <div className="w-50 mx-auto" id="form">
                        <Form>
                            <Form.Group size="lg" controlId="firstName">
                                <Form.Control
                                    type="text"
                                    defaultValue={fName}
                                    placeholder={fName}
                                    onChange={handleChange}
                                />
                            </Form.Group>
                            <Form.Group size="lg" controlId="lastName">
                                <Form.Control
                                    type="text"
                                    defaultValue={lName}
                                    placeholder={lName}
                                    onChange={handleChange}
                                />
                            </Form.Group>
                            <Form.Group>
                                <Form.Control
                                    as="select"
                                    defaultValue={accountType}
                                    onChange={handleSelect}
                                >
                                    <option value={accountType}>{accountType}</option>
                                    <option value={accountOption}>{accountOption}</option>
                                </Form.Control>
                            </Form.Group>
                            <Form.Group size="lg" controlId="email">
                                <Form.Control
                                    type="email"
                                    defaultValue={email}
                                    placeholder={email}
                                    onChange={handleChange}
                                />
                            </Form.Group>
                            <Form.Group size="lg" controlId="newPassword">
                                <Form.Text id="passwordHelpBlock" muted>
                                Leave blank to keep your current password.
                                </Form.Text>
                                <Form.Control
                                    type="password"
                                    defaultValue={state.newPassword}
                                    placeholder="new password"
                                    onChange={handleChange}
                                />
                            </Form.Group>
                            <Form.Group size="lg" controlId="confirmPassword">
                                <Form.Control
                                    type="password"
                                    defaultValue={state.confirmPassword}
                                    placeholder="confirm password"
                                    onChange={handleChange}
                                />
                            </Form.Group>
                            <br />
                            <div id="error"></div>
                            <Button onClick={handleUpdate}
                                id="btn"
                                variant="dark"
                                block
                                size="md"
                                type="submit"
                            >
                                UPDATE
                            </Button>
                        </Form>
                    </div>
              </Card.Body>
              <DeskFooter />
            </Card>
          </BrowserView>
    
          <MobileView>
            <Image
              src={HeaderLogo}
              className="d-flex w-100 mx-auto justify-content-center"
            />
    
            <Card className="border-0" id="pcrd">
              <Card.Header
                className="d-flex justify-content-center align-items-center text-white"
                id="mchead"
              >
                {fName}'s Profile
                  </Card.Header>
    
              <Card.Body id="crdbody">
                    <div className="w-75 mx-auto" id="form">
                        <Form>
                            <Form.Group size="lg" controlId="firstName">
                                <Form.Control
                                    type="text"
                                    defaultValue={fName}
                                    placeholder={fName}
                                    onChange={handleChange}
                                />
                            </Form.Group>
                            <Form.Group size="lg" controlId="lastName">
                                <Form.Control
                                    type="text"
                                    defaultValue={lName}
                                    placeholder={lName}
                                    onChange={handleChange}
                                />
                            </Form.Group>
                            <Form.Group>
                                <Form.Control
                                    as="select"
                                    onChange={handleSelect}
                                >
                                    <option defaultValue={accountType}>{accountType}</option>
                                    <option defaultValue={accountOption}>{accountOption}</option>
                                </Form.Control>
                            </Form.Group>
                            <Form.Group size="lg" controlId="email">
                                <Form.Control
                                    type="email"
                                    defaultValue={email}
                                    placeholder={email}
                                    onChange={handleChange}
                                />
                            </Form.Group>
                            <Form.Group size="lg" controlId="newPassword">
                                <Form.Text id="passwordHelpBlock" muted>
                                Leave blank to keep your current password.
                                </Form.Text>
                                <Form.Control
                                    type="password"
                                    defaultValue={state.newPassword}
                                    placeholder="new password"
                                    onChange={handleChange}
                                />
                            </Form.Group>
                            <Form.Group size="lg" controlId="confirmPassword">
                                <Form.Control
                                    type="password"
                                    defaultValue={state.confirmPassword}
                                    placeholder="confirm password"
                                    onChange={handleChange}
                                />
                            </Form.Group>
                            <div
                                className="mb-2" 
                                style={{ display: state.message ? "block" : "none", textAlign: state.message ? "center" : ""}}
                                role="alert"
                            >
                                <mark>{state.message}</mark>
                            </div>
                            <Button onClick={handleUpdate}
                                id="btn"
                                variant="dark"
                                block
                                size="md"
                                type="submit"
                            >
                                UPDATE
                            </Button>
                        </Form>
                    </div>
              </Card.Body>
            </Card>
    
            <MobileNavBar active ="moreMenu" />
          </MobileView>
        </>
    );
} 