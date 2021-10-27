import React, { useState, useEffect } from "react";
import MetaTags from "react-meta-tags";
import axios from "axios";
import {
  API_BASE_URL,
  userExistsByEmail,
  fetchNews,
  restrictPage,
  headers
} from "../API/Api.js";
import { MobileNavBar } from "../NavBar/MobileNavBar";
import { BrowserNavBar } from "../NavBar/BrowserNavBar";
import { BrowserView, MobileView } from "react-device-detect";
import { Card, Form, Image, Button } from "react-bootstrap";
import BlueSkyLogo from "../Images/topLogoBar.png";
import { DeskFooter } from "../DeskFooter/DeskFooter";
import {
  fName,
  lName,
  email,
  accountType,
  userId,
  invoices,
  blueBucks,
} from "../LocalUser/LocalUser";
import { Message } from "../Message/Message.js";
import "./Profile.css";
import validator from "validator";

export function Profile() {
  const [token] = useState(sessionStorage.getItem('token') || '');
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
    display: false,
    type: "",
    message: "",
  });

  const userArray = [];

  useEffect(() => {
    restrictPage();
  }, []);

  // Fetch news from Db
  useEffect(() => {
    fetchNews(token).then(setNews);
  }, [token]);

  // Capitalize first letter of Names
  useEffect(() => {
    const capitalFirstLetter = (str) => {
      let newString = str.charAt(0).toUpperCase() + str.slice(1);
      return newString;
    }
    setState((prevState) => ({
      ...prevState,
      firstName: capitalFirstLetter(state.firstName),
      lastName: capitalFirstLetter(state.lastName),
    }))
    console.log(state.firstName)
  }, [state.firstName, state.lastName]);

  // Sets state of profile items by grabbing form field control id and matching it with const
  const handleChange = (e) => {
    const { id, value } = e.target;
    setState((prevState) => ({
      ...prevState,
      [id]: value,
    }));
  };

  // Sets account type based on selection
  const handleSelect = (e) => {
    setState((prevState) => ({
      ...prevState,
      accountType: e.target.value,
    }));
  };

  // Sends updated user info array to server to update db
  // Also updates local session storage to match updated details
  const sendDetailsToServer = (info) => {
    axios
      .put(API_BASE_URL + "/User/" + userId, info, headers(token))
      .then(function (response) {
        if (response.status === 200) {
          setState((prevState) => ({
            ...prevState,
            display: true,
            type: "success",
            message: "update",
          }));
        }
      })
      .catch(function (error) {
        console.log(error);
      });
    userArray.push({
      localId: state.userId,
      localFname: state.firstName,
      localLname: state.lastName,
      localEmail: state.email,
      localAccountType: state.accountType,
      localInvoices: state.invoices,
      localBlueBucks: state.blueBucks,
    });

    for (let i in news) {
      if (state.accountType === news[i].customerType) {
        userArray.push({
          localNewsHeadline: news[i].headline,
          localNewsText: news[i].text,
        });
      }
    }
    sessionStorage.setItem("localUser", JSON.stringify(userArray));
    console.log(sessionStorage.getItem("localUser"));
  };

  // Checks if all required fields have values before calling server update function
  const updateUser = () => {
    if (
      state.newPassword.length &&
      state.firstName.length &&
      state.lastName.length &&
      state.email.length
    ) {
      var payload = {
        firstName: state.firstName,
        lastName: state.lastName,
        email: state.email,
        accountType: state.accountType,
        password: state.newPassword,
        confirmPassword: state.confirmPassword,
      };
      sendDetailsToServer(payload);
    } else if (
      !state.newPassword.length &&
      state.firstName.length &&
      state.lastName.length &&
      state.email.length
    ) {
      payload = {
        firstName: state.firstName,
        lastName: state.lastName,
        email: state.email,
        accountType: state.accountType,
      };
      sendDetailsToServer(payload);
    } else {
      setState((prevState) => ({
        ...prevState,
        display: true,
        type: "fail",
        message: "required",
      }));
    }
  };

  // Checks password values to ensure they match, then calls email check 
  const handleUpdate = async (e) => {
    e.preventDefault();
    setState((prevState) => ({
      ...prevState,
      message: "",
    }));
    if (state.newPassword !== state.confirmPassword) {
      setState((prevState) => ({
        ...prevState,
        display: true,
        type: "fail",
        message: "password",
      }));
      return;
    }
    if (state.email !== email) {
      if (! validator.isEmail(state.email)) {
        setState((prevState) => ({
          ...prevState,
          display: true,
          type: "fail",
          message: "emailFormat",
        }));
        return;
      }
      if (await userExistsByEmail(state.email)) {
        setState((prevState) => ({
          ...prevState,
          display: true,
          type: "fail",
          message: "duplicate",
        }));
        return;
      }
    }
    updateUser();
  };

  // Sets default value of account type for form dropdown
  useEffect(() => {
    if (accountType === "Commercial") {
      setAccountOption("Residential");
    } else {
      setAccountOption("Commercial");
    }
  }, []);

  return (
    <>
      <MetaTags>
        <title>Blue Sky | Profile</title>
        <meta
          name="Blue Sky Profile"
          content="Welcome to Blue Sky, we are your go to for Commercial and Residential cleaning!"
        />
        <meta property="og:title" content="Blue Sky Profile" />
        <meta property="og:image" content="../Images/Header.png" />
      </MetaTags>

      <BrowserView>
        <BrowserNavBar active="profile" />
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
                    value={state.firstName}
                    placeholder={"First Name (required)"}
                    onChange={handleChange}
                    required
                  />
                </Form.Group>
                <Form.Group size="lg" controlId="lastName">
                  <Form.Control
                    type="text"
                    value={state.lastName}
                    placeholder={"Last Name (required)"}
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
                    placeholder={"Email (required)"}
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
                <Message
                  device="browser"
                  display={state.display}
                  type={state.type}
                  message={state.message}
                />
                <Button
                  onClick={handleUpdate}
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
        <div className="bgheader">
          <div className="cloudyHeader">
            <Image src={BlueSkyLogo} id="wdth" />
          </div>
        </div>

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
                    value={state.firstName}
                    placeholder={"First Name (required)"}
                    onChange={handleChange}
                    required
                  />
                </Form.Group>
                <Form.Group size="lg" controlId="lastName">
                  <Form.Control
                    type="text"
                    value={state.lastName}
                    placeholder={"Last Name (required)"}
                    onChange={handleChange}
                    required
                  />
                </Form.Group>
                <Form.Group>
                  <Form.Control as="select" onChange={handleSelect}>
                    <option defaultValue={accountType}>{accountType}</option>
                    <option defaultValue={accountOption}>
                      {accountOption}
                    </option>
                  </Form.Control>
                </Form.Group>
                <Form.Group size="lg" controlId="email">
                  <Form.Control
                    type="email"
                    defaultValue={email}
                    placeholder={"Email (required)"}
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
                <Message
                  device="mobile"
                  display={state.display}
                  type={state.type}
                  message={state.message}
                />
                <Button
                  onClick={handleUpdate}
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

        <MobileNavBar active="moreMenu" />
      </MobileView>
    </>
  );
}
