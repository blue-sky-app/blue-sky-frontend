import React, { useState, useEffect } from "react";
import axios from "axios";
import { API_BASE_URL, fetchUser, fetchNews } from "../API/Api.js";
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
import { Message } from "../Message/Message.js";

export function Profile() { 
    const [accountOption, setAccountOption] = useState();
    const [users, setUsers] = useState([]);
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
        display: false,
        type: "",
        message: ""
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
    })

    useEffect(() => {
        fetchNews().then(setNews);
      }, []);
    useEffect(() => {
    console.log(news);
    }, [news]);

    useEffect(() => {
        console.log(state.email);
        }, [state.email]);

    useEffect(() => {
        if(state.email !== email){
            fetchUser().then(setUsers);
        }
    }, [state.email])

    /*const fetchNews = async () => {
        const response = await axios(`${API_BASE_URL}news/`);
        setNews(response.data);
        };*/

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
                            display: true,
                            type: "success",
                            message: "update"
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

    const checkEmailDup = () => {
        var duplicate;
        if (state.email !== email) {
            for (let i in users) {
                if (state.email === users[i].email) { 
                    duplicate = true;
                    setState((prevState) => ({
                        ...prevState,
                        display: true,
                        type: "fail",
                        message: "duplicate"
                    }));
                    return
                }
                else {
                    duplicate = false;
                }       
            }
        }
        if (!duplicate) {
            updateUser();
        }
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
        else if (!state.newPassword.length && state.firstName.length && state.lastName.length && state.email.length && !state.duplicate) {
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
                display: true,
                type: "fail",
                message: "required"
            }));
        }
    };

    const handleUpdate = (e) => {
        e.preventDefault();
        setState((prevState) => ({
            ...prevState,
            message: ""
        }));
        if (state.newPassword === state.confirmPassword) {
            checkEmailDup();
        } 
        else {
            setState((prevState) => ({
                ...prevState,
                display: true,
                type: "fail",
                message: "password"
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
                    <div className="w-50 mx-auto" id="form">
                        <Form>
                            <Form.Group size="lg" controlId="firstName">
                                <Form.Control
                                    type="text"
                                    defaultValue={fName}
                                    placeholder={fName}
                                    onChange={handleChange}
                                    required
                                />
                            </Form.Group>
                            <Form.Group size="lg" controlId="lastName">
                                <Form.Control
                                    type="text"
                                    defaultValue={lName}
                                    placeholder={lName}
                                    onChange={handleChange}
                                    required
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
                                    required
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
                            <Message device="browser" display={state.display} type={state.type} message={state.message}/>
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
                            <Message device="mobile" display={state.display} type={state.type} message={state.message}/>
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