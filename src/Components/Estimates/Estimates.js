import React, { useState, useEffect } from "react";
import MetaTags from "react-meta-tags";
import axios from "axios";
import {
  API_BASE_URL,
  restrictPage,
  headers,
  fetchCategories,
} from "../API/Api.js";
import { MobileNavBar } from "../NavBar/MobileNavBar";
import { BrowserNavBar } from "../NavBar/BrowserNavBar";
import { BrowserView, MobileView } from "react-device-detect";
import { Card, Form, Image, Button } from "react-bootstrap";
import BlueSkyLogo from "../Images/topLogoBar.png";
import { DeskFooter } from "../DeskFooter/DeskFooter";
import { fName, lName, email, accountType } from "../LocalUser/LocalUser";
import { Message } from "../Message/Message.js";
import "./Estimates.css";

export function Estimates() {
  const [token] = useState(sessionStorage.getItem("token") || "");
  const [servicecategories, setServicecategories] = useState([]);
  const [textField, setTextField] = useState("");
  const [otherValue, setOtherValue] = useState("");
  const [state, setState] = useState({
    display: false,
    type: "",
    message: "",
  });

  useEffect(() => {
    restrictPage();
  }, []);

  // This fetch is for the Categories
  useEffect(() => {
    fetchCategories(token).then(setServicecategories);
  }, [token]);

  const estimateServiceArray = [];

  // Creating the table for Estimates
  let categoryTable = [];
  let categories = [];
  
  for (let i in servicecategories) {
    let servID = 1;
    if (accountType === servicecategories[i].customerType) {
      for (let j in servicecategories[i].services) {
        categories.push(
          <Form.Group controlId={servID++}>
            <Form.Check
              className="mb-2"
              style={{ fontSize: "14px" }}
              type="checkbox"
              label={servicecategories[i].services[j]}
              name={servicecategories[i].services[j]}
              onClick = {(e) => {
                inspectElement(e);
              }}
            />
          </Form.Group>
        );
      }
      categoryTable.push(
        <Form className="ml-3" id="form">
          {categories}
        </Form>
      );
    }
  }

  const inspectElement = (e) => {
    let ele = e.target;
    if (ele.name === "Other") {
      if (ele.checked) {
        setTextField(
          <Form.Group size="lg" controlId="otherText">
            <Form.Control
              className="mb-2 ml-2"
              style={{ fontSize: "14px", width:"75%"}}
              as="textarea"
              rows={3}
              defaultValue = {otherValue}
              maxLength="100"
              placeholder="(Required) Please describe needed service."
              name={otherValue}
              onChange={(e) => setOtherValue(e.target.value)}
            />
          </Form.Group>
        )
      }
      else {
        setTextField("");
        setState(() => ({
          display: false
        }));
      }
    }
  }

  const onSubmit = (e) => {
    e.preventDefault();
    for (let i = 0; i < categories.length; i++) {
      let ele = document.getElementById(i + 1);
      if (ele.checked) {
        if (ele.name === "Other") {
          if (otherValue !== "") {
          estimateServiceArray.push(otherValue)
          }
          else {
            setState(() => ({
              display: true,
              type: "fail",
              message: "required",
            }));
            return;
          }
        }
        else {
          estimateServiceArray.push(ele.name);
        }
      }
    }
    if (estimateServiceArray.length === 0) {
      setState(() => ({
        display: true,
        type: "fail",
        message: "noService",
      }));
      return;
    }
    const estimateInput = {
      email: email,
      firstName: fName,
      lastName: lName,
      accountType: accountType,
      services: estimateServiceArray,
    };
    axios
      .post(API_BASE_URL + "/estimates/", estimateInput, headers(token))
      .then((res) => {
        if (res.status === 200) {
          window.location.href = "/thankYou";
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <>
      <MetaTags>
        <title>Blue Sky | Estimates</title>
        <meta
          name="Blue Sky Estimates"
          content="Welcome to Blue Sky, we are your go to for Commercial and Residential cleaning!"
        />
        <meta property="og:title" content="Blue Sky Estimates" />
        <meta property="og:image" content="../Images/Header.png" />
      </MetaTags>

      <BrowserView>
        <BrowserNavBar active="estimates" />
        <Card className="border-0 w-100 mx-auto">
          <Card.Header
            className="d-flex justify-content-center align-items-center mb-4 border-0"
            id="bchead"
          >
            {fName}'s Estimate
          </Card.Header>

          <Card.Body className="mx-auto" id="bcbody">
            <Card.Title className="mb-3" id="bctitle">
              <strong>{accountType}</strong> Services
            </Card.Title>

            <div>
              {categoryTable}
              {textField}
              <Message
                device="browser"
                display={state.display}
                type={state.type}
                message={state.message}
              />
              <Button
                onClick={onSubmit}
                className="p-2 mt-2"
                variant="dark"
                id="btn"
                type="submit"
                data-testid="estimateSubmit"
              >
                SUBMIT
              </Button>
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
        <Card className="border-0" id="mcrd">
          <Card.Header
            className="d-flex justify-content-center align-items-center text-white"
            id="mchead"
          >
            {fName}'s Estimate
          </Card.Header>

          <Card.Body id="mcbody">
            <Card.Title className="mb-3" id="mctitle">
              <strong>{accountType}</strong> Services
            </Card.Title>

            <Form className="ml-3">
              {categoryTable}
              {textField}
              <Message
                device="mobile"
                display={state.display}
                type={state.type}
                message={state.message}
              />
              <Button
                onClick={onSubmit}
                className="p-2 mt-2"
                variant="dark"
                id="mbtn"
                href="/thankYou"
                type="submit"
              >
                SUBMIT
              </Button>
            </Form>
          </Card.Body>
        </Card>
        <MobileNavBar active="estimates" />
      </MobileView>
    </>
  );
}
