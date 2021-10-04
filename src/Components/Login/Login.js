import React, { useState, useEffect } from "react";
import { fetchUser, fetchNews } from "../API/Api.js";
import { BrowserView, MobileView } from "react-device-detect";
import Form from "react-bootstrap/Form";
import Image from "react-bootstrap/Image";
import Button from "react-bootstrap/Button";
import BlueSkyLogo from "../Images/loginLogo.png";
import { Message } from "../Message/Message.js";
import "./Login.css";

export function Login() {
  const [users, setUsers] = useState([]);
  const emailValue = document.getElementById("email");
  const passwordValue = document.getElementById("password");
  const [news, setNews] = useState([]);
  const [state, setState] = useState({
    display: false,
    type: "",
    message: "",
  });

  // Constant for storing user data in session
  const userArray = [];

  // user Fetch
  useEffect(() => {
    fetchUser().then(setUsers);
  }, []);
  useEffect(() => {
    console.log(users);
  }, [users]);

  // news article Fetch
  useEffect(() => {
    fetchNews().then(setNews);
  }, []);
  useEffect(() => {
    console.log(news);
  }, [news]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    sessionStorage.clear();
    for (const [i, user] of users.entries()) {
      console.log(i, user);
      if (emailValue.value === user.email) {
        if (passwordValue.value === user.password) {
          userArray.push({
            localId: user._id,
            localFname: user.firstName,
            localLname: user.lastName,
            localEmail: user.email,
            localAccountType: user.accountType,
            localInvoices: user.invoices,
            localBlueBucks: user.blueBucks,
          });
          var login = true;
        } else if (passwordValue.value !== user.password) {
          setState(() => ({
            display: true,
            type: "fail",
            message: "loginFail",
          }));
        }
      } else if (emailValue.value !== user.email) {
        setState(() => ({
          display: true,
          type: "fail",
          message: "loginFail",
        }));
      }
    }

    if (login) {
      for (let i in news) {
        if (userArray[0].localAccountType === news[i].customerType) {
          userArray.push({
            localNewsHeadline: news[i].headline,
            localNewsText: news[i].text,
          });
          setState(() => ({
            display: true,
            type: "success",
            message: "loginSuccess",
          }));
        }
      }
      sessionStorage.setItem("localUser", JSON.stringify(userArray));
      console.log(sessionStorage.getItem("localUser"));

      //TEMPORARY --hard coding admin check on email--
      if (userArray[0].localEmail === "seth@blueforu.com") {
        window.location.href = "/admin"
      }
      else {
        window.location.href = "/home";
      }
    }
  };

  return (
    <>
      <BrowserView>
        <div className="d-flex flex-column mx-auto" id="bckgrnd">
          <div className="clouds">
            <div className="img-fluid mt-5">
              <Image id="img" src={BlueSkyLogo} />
            </div>
            <div>
              <p className="mt-1 w-80 mx-auto text-center" id="ltext">
                RESIDENTIAL & COMMERCIAL CLEANING
              </p>
              <p className="mt-1 w-80 mx-auto text-center" id="text">
                SERVING CENTRAL FLORIDA
              </p>
            </div>
            <br />
            <div className="w-50 mx-auto" id="form">
              <Form>
                <Form.Group size="lg" controlId="email">
                  <Form.Control type="email" placeholder="Email"/>
                </Form.Group>
                <Form.Group size="lg" controlId="password">
                  <Form.Control
                    type="password"
                    placeholder="Password"
                  />
                </Form.Group>
                <br />
                <Message
                  device="browser"
                  display={state.display}
                  type={state.type}
                  message={state.message}
                />
                <Button
                  onClick={handleSubmit}
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
              <Button href="/signUp" variant="secondary" block size="md">
                SIGN UP
              </Button>
            </div>
          </div>
        </div>
      </BrowserView>

      <MobileView>
        <div className="d-flex flex-column mx-auto" id="bckgrnd">
        <div className="clouds">
          <div className="wrapper">
          <div className="img-fluid">
              <Image className="d-flex flex-column mx-auto" id="mimg" src={BlueSkyLogo} />
            </div>
            <div className="logo-text">
            <p className="mt-1 w-80 mx-auto text-center" id="ltext">
                RESIDENTIAL & COMMERCIAL CLEANING
              </p><br/>
            <p className="mt-3 w-80 mx-auto text-center" id="text">
              SERVING CENTRAL FLORIDA
            </p>
            </div>
          </div>

          <div className="mt-5 w-75 mx-auto" id="form">
            <Message
              device="mobile"
              display={state.display}
              type={state.type}
              message={state.message}
            />
            <Form>
              <Form.Group size="lg" controlId="email">
                <Form.Control type="email" placeholder="Email" />
              </Form.Group>
              <Form.Group size="lg" controlId="password">
                <Form.Control type="password" placeholder="Password" />
              </Form.Group>
              <br />
              <Button
                onClick={handleSubmit}
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
            <Button href="/signUp" variant="secondary" block size="md">
              SIGN UP
            </Button>
          </div>
          </div>
        </div>
      </MobileView>
    </>
  );
}
