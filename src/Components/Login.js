import React, { useState } from "react";
import { BrowserView, MobileView } from "react-device-detect";
import Form from "react-bootstrap/Form";
import Image from "react-bootstrap/Image";
import Button from "react-bootstrap/Button";
import BlueSkyLogo from "../Images/loginLogo.png";
import { Message } from "../Message/Message.js";
import { API_BASE_URL, fetchNews, headers } from "../API/Api.js";
import "./Login.css";
import axios from "axios";

export function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [state, setState] = useState({
    display: false,
    type: "",
    message: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    sessionStorage.clear();
    var login = false;
    var userId = '';
    var token = '';
    await axios
      .post(API_BASE_URL + "/login/", {email: email, password: password})
      .then((res) => {
        if (res.status === 200) {
          token = res.data.token;
          userId = res.data.user.id;
          login = true;
          setState(() => ({
            display: true,
            type: "success",
            message: "loginSuccess",
          }));
        } else {
          setState(() => ({
            display: true,
            type: "fail",
            message: "loginFail",
          }));
        }
      })
      .catch((error) => {
        console.log(error);
      });

    if (login) {
      var userArray = [];
      await axios.get(`${API_BASE_URL}/user/${userId}`, {headers: headers(token)}).then((res) => {
        let user = res.data
        userArray.push({
          localId: user._id,
          localFname: user.firstName,
          localLname: user.lastName,
          localEmail: user.email,
          localAccountType: user.accountType,
          localInvoices: user.invoices,
          localBlueBucks: user.blueBucks,
        });
        console.log(userArray);
      });
      let news = await fetchNews();
      console.log('news: '+ news);
      for (let i in news) {
        if (userArray[0].localAccountType === news[i].customerType) {
          userArray.push({
            localNewsHeadline: news[i].headline,
            localNewsText: news[i].text,
          });
        }
      }
      sessionStorage.setItem("token", token);
      sessionStorage.setItem("localUser", JSON.stringify(userArray));
      console.log(sessionStorage.getItem("localUser"));
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
              <Form onSubmit={handleSubmit}>
                <Form.Group size="lg" controlId="email">
                  <Form.Control
                    type="email"
                    placeholder="Email"
                    onChange={e => setEmail(e.target.value)}
                  />
                </Form.Group>
                <Form.Group size="lg" controlId="password">
                  <Form.Control
                    type="password"
                    placeholder="Password"
                    onChange={e => setPassword(e.target.value)}
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
              <Button href="/forgotPassword" variant="secondary" block size="md">
                FORGOT PASSWORD
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
            <Button href="/forgotPassword" variant="secondary" block size="md">
                FORGOT PASSWORD
              </Button>
          </div>
          </div>
        </div>
      </MobileView>
    </>
  );
}