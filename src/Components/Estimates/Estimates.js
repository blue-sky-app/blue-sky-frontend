// Author(s): Dan, Sam
import React, { useState, useEffect } from "react";
import MetaTags from "react-meta-tags";
import { restrictPage, fetchCategories, postEstimate } from "../API/Api.js";
import { MobileNavBar } from "../NavBar/MobileNavBar";
import { BrowserNavBar } from "../NavBar/BrowserNavBar";
import { BrowserView, MobileView } from "react-device-detect";
import { Card, Form, Image, Button } from "react-bootstrap";
import BlueSkyLogo from "../Images/topLogoBar.png";
import { DeskFooter } from "../DeskFooter/DeskFooter";
import { fName, lName, email, accountType } from "../LocalUser/LocalUser";
import { Message } from "../Message/Message.js";
import "./Estimates.css";

// Provides estimates page
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

  // Builds the table for Estimates from fetched data
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

  // Checks form elements for any named "Other" then detects if it is checked...
  //  ... If element is checked, it creates a text area for user entry.
  // This also removes any notifications when "Other" field is unchecked by user.
  const inspectElement = (e) => {
    let ele = e.target;
    if (ele.name === "Other") {
      if (ele.checked) {
        setTextField(
          <Form.Group size="lg" controlId="otherText">
            <Form.Control
              className="mb-2"
              style={{ fontSize: "14px"}}
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

  // Handles actions when user presses "Submit" button. These include checking...
  //  ... to ensure a text value exists if "Other" is checked, displaying correct...
  //  ... notifications, and sending date to Db if there are no errors.
  const onSubmit = (e) => {
    e.preventDefault();
    for (let i = 0; i < categories.length; i++) {
      let ele = document.getElementById(i + 1);
      if (ele.checked) {
        if (ele.name === "Other") {
          if (otherValue !== "") {
          estimateServiceArray.push("Other: " + otherValue)
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
    postEstimate(estimateInput, token);
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
            <Card.Title className="mb-3 text-center" id="bctitle">
              <strong>{accountType}</strong> Services
            </Card.Title>
            <Form className="align-content-center">
              <div className="d-block text-center">
                <div className="d-inline-block text-left w-100">
                {categoryTable}
                </div>
              </div>
              <div style={{width:"200px"}}>
                {textField}
              </div>
              <div className="mx-auto" style={{maxWidth:"200px"}}>
                <Message
                  device="browser"
                  display={state.display}
                  type={state.type}
                  message={state.message}
                />
              </div>
              <div className="d-block text-center w-100">
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
            </Form>
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

          <Card.Body className="pl-5 pr-5" id="mcbody">
            <Card.Title className="mb-3 ml-3" id="mctitle">
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
