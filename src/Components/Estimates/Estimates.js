import React, { useState, useEffect } from "react";
import MetaTags from "react-meta-tags";
import axios from "axios";
import { API_BASE_URL, restrictPage } from "../API/Api.js";
import { MobileNavBar } from "../NavBar/MobileNavBar";
import { BrowserNavBar } from "../NavBar/BrowserNavBar";
import { BrowserView, MobileView } from "react-device-detect";
import { Card, Form, Image, Button } from "react-bootstrap";
import HeaderLogo from "../Images/topLogoBar.png";
import { DeskFooter } from "../DeskFooter/DeskFooter";
import { fName, lName, email, accountType } from "../LocalUser/LocalUser";
import { Message } from "../Message/Message.js";
import "./Estimates.css";

export function Estimates() {
  const [servicecategories, setServicecategories] = useState([]);
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
    fetchCategory();
  }, []);
  useEffect(() => {
    console.log(servicecategories);
  }, [servicecategories]);

  const fetchCategory = async () => {
    const response = await axios(`${API_BASE_URL}servicecategories/`);
    setServicecategories(response.data);
  };

  const estimateServiceArray = [];

  // Creating the table for Estimates
  let categoryTable = [];
  let categories = [];
  useEffect(() => {
    console.log(categories);
  });

  let servID = 1;
  for (let i in servicecategories) {
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

  const onSubmit = (e) => {
    e.preventDefault();
    for (let i = 0; i < categories.length; i++) {
      let ele = document.getElementById(i + 1);
      if (ele.checked) {
        estimateServiceArray.push(ele.name);
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
    console.log(estimateServiceArray);
    const estimateInput = {
      email: email,
      firstName: fName,
      lastName: lName,
      accountType: accountType,
      services: estimateServiceArray,
    };
    axios
      .post(API_BASE_URL + "estimates/", estimateInput)
      .then((res) => {
        if (res.status === 200) {
          window.location.href = "/thankYou";
        }
        console.log(res.data);
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
              >
                SUBMIT
              </Button>
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
