import React, { useState, useEffect } from "react";
import { BrowserView, MobileView } from "react-device-detect";
import axios from "axios";
import { Form, Image, Button } from "react-bootstrap";
import BlueSkyLogo from "../Images/loginLogo.png";
import MobileBlueSkyLogo from "../Images/mobileLoginHeader.png";
import { API_BASE_URL, fetchUser } from "../API/Api";
import { withRouter } from "react-router-dom";
import validator from "validator";
import { Message } from "../Message/Message";
import "./SignUp.css";

function SignUp(props) {
  const [users, setUsers] = useState([]);
  const [state, setState] = useState({
    email: "",
    firstName: "",
    lastName: "",
    accountType: "",
    newPassword: "",
    confirmPassword: "",
    display: false,
    type: "",
    message: "",
  });

  useEffect(() => {
    fetchUser().then(setUsers);
  }, [state.email]);

  const handleChange = (e) => {
    const { id, value } = e.target;
    setState((prevState) => ({
      ...prevState,
      [id]: value,
    }));
  };

  const redirectToSuccess = () => {
    props.history.push("/signUpSuccess");
  };

  const sendDetailsToServer = () => {
    if (
      state.email.length &&
      state.newPassword.length &&
      state.firstName.length &&
      state.lastName.length &&
      state.accountType.length
    ) {
      const payload = {
        firstName: state.firstName,
        lastName: state.lastName,
        email: state.email,
        accountType: state.accountType,
        password: state.newPassword,
        confirmPassword: state.confirmPassword,
        message: null,
      };
      axios
        .post(API_BASE_URL + "users/", payload)
        .then(function (response) {
          if (response.status === 200) {
            setState((prevState) => ({
              ...prevState,
              display: true,
              type: "success",
              message: "signupSuccess",
            }));
            redirectToSuccess();
            setState((prevState) => ({
              ...prevState,
              message: null,
            }));
          } else {
          }
        })
        .catch(function (error) {
          console.log(error);
        });
    } else {
      setState((prevState) => ({
        ...prevState,
        display: true,
        type: "fail",
        message: "required",
      }));
    }
  };

  const checkEmailDup = () => {
    var duplicate;
    for (let i in users) {
      if (validator.isEmail(state.email)) {
        if (state.email === users[i].email) {
          duplicate = true;
          setState((prevState) => ({
            ...prevState,
            display: true,
            type: "fail",
            message: "duplicate",
          }));
          return;
        } else {
          duplicate = false;
        }
      }
      else {
        setState((prevState) => ({
          ...prevState,
          display: true,
          type: "fail",
          message: "emailFormat",
        }));
        return;
      }
    }

    if (!duplicate) {
      sendDetailsToServer();
    }
  };

  const handleSubmitClick = (e) => {
    e.preventDefault();
    if (state.newPassword === state.confirmPassword) {
      checkEmailDup();
    } else {
      setState((prevState) => ({
        ...prevState,
        display: true,
        type: "fail",
        message: "password",
      }));
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
          </div>
          <br />
          <div className="w-50 mx-auto" id="form">
            <Form>
              <Form.Label className="mt-1" id="flabel">
                REGISTER NEW USER
              </Form.Label>
              <Form.Group size="lg" controlId="email" className="mb-1">
                <Form.Control
                  className="fcontrol"
                  type="email"
                  value={state.email}
                  placeholder="Email - required"
                  onChange={handleChange}
                />
              </Form.Group>
              <Form.Group size="lg" controlId="firstName" className="mb-1">
                <Form.Control
                  className="fcontrol"
                  type="text"
                  value={state.firstName}
                  placeholder="First Name - required"
                  onChange={handleChange}
                />
              </Form.Group>
              <Form.Group size="lg" controlId="lastName" className="mb-1">
                <Form.Control
                  className="fcontrol"
                  type="text"
                  value={state.lastName}
                  placeholder="Last Name - required"
                  onChange={handleChange}
                />
              </Form.Group>
              <Form.Group size="lg" controlId="accountType" className="mb-1">
                <Form.Control
                  as="select"
                  className="fcontrol"
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
                  className="fcontrol"
                  type="password"
                  value={state.newPassword}
                  placeholder="Password - required"
                  onChange={handleChange}
                />
              </Form.Group>
              <Form.Group size="lg" controlId="confirmPassword">
                <Form.Control
                  className="fcontrol"
                  type="password"
                  value={state.confirmPassword}
                  placeholder="Confirm Password - required"
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
          <div className="mt-2 mb-5 w-50 mx-auto" id="form">
            <Button href="/login" variant="secondary" block size="md">
              LOGIN
            </Button>
          </div>
        </div>
      </BrowserView>

      <MobileView>
        <div className="d-flex flex-column mx-auto" id="bckgrnd">
          <div className="wrapper">
            <Image src={MobileBlueSkyLogo} className="image-fluid" />
            <p className="mt-3 w-80 mx-auto text-center" id="text">
              SERVING CENTRAL FLORIDA
            </p>
          </div>
          <br />
          <div className="w-75 mx-auto" id="form">
            <Form>
              <Form.Label className="mt-1" id="flabel">
                REGISTER NEW USER
              </Form.Label>
              <Form.Group size="lg" controlId="email" className="mb-1">
                <Form.Control
                  className="fcontrol"
                  type="email"
                  value={state.email}
                  placeholder="Email - required"
                  onChange={handleChange}
                />
              </Form.Group>
              <Form.Group size="lg" controlId="firstName" className="mb-1">
                <Form.Control
                  className="fcontrol"
                  type="text"
                  value={state.firstName}
                  placeholder="First Name - required"
                  onChange={handleChange}
                />
              </Form.Group>
              <Form.Group size="lg" controlId="lastName" className="mb-1">
                <Form.Control
                  className="fcontrol"
                  type="text"
                  value={state.lastName}
                  placeholder="Last Name - required"
                  onChange={handleChange}
                />
              </Form.Group>
              <Form.Group size="lg" controlId="accountType" className="mb-1">
                <Form.Control
                  as="select"
                  className="fcontrol"
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
                  className="fcontrol"
                  type="password"
                  value={state.newPassword}
                  placeholder="Password - required"
                  onChange={handleChange}
                />
              </Form.Group>
              <Form.Group size="lg" controlId="confirmPassword">
                <Form.Control
                  className="fcontrol"
                  type="password"
                  value={state.confirmPassword}
                  placeholder="Confirm Password - required"
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
          <div className="mt-2 mb-5 w-75 mx-auto" id="form">
            <Button href="/login" variant="secondary" block size="md">
              LOGIN
            </Button>
          </div>
        </div>
      </MobileView>
    </>
  );
}

export default withRouter(SignUp);
