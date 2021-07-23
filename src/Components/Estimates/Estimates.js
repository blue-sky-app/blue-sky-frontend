import React, { useState, useEffect } from "react";
import axios from "axios";
import { API_BASE_URL } from "../API/Api.js";
import { UserId } from "../API/Api.js";
import { MobileNavBar } from "../NavBar/MobileNavBar";
import { BrowserNavBar } from "../NavBar/BrowserNavBar";
import { BrowserView, MobileView } from "react-device-detect";
import Card from "react-bootstrap/Card";
import Form from "react-bootstrap/Form";
import Image from "react-bootstrap/Image";
import Button from "react-bootstrap/Button";
import HeaderLogo from "../Images/topLogoBar.png";
import { DeskFooter } from "../DeskFooter/DeskFooter";
import './Estimates.css';

export function Estimates() {
  const [users, setUsers] = useState([]);
  const [categories, setCategories] = useState([]);

  // This fetch is for the FirstName
  useEffect(() => {
    fetchUser();
  }, []);
  useEffect(() => {
    console.log(users);
  }, [users]);

  const fetchUser = async () => {
    const response = await axios(`${API_BASE_URL}user/${UserId}`);
    setUsers(response.data);
  };


  // This fetch is for the Categories
  useEffect(() => {
    fetchCategory();
  }, []);
  useEffect(() => {
    console.log(categories);
  }, [categories]);

  const fetchCategory = async () => {
    const response = await axios(`${API_BASE_URL}serviceCategories`);
    setCategories(response.data);
  };

  // Creating the table for Invoices
  let serviceCategories = [];
  for (const [i, category] of categories.entries()) {
    if (category.serviceType === users.accountType) {
      serviceCategories.push(
        <Form.Group controlId={category.serviceDescription}>
          <Form.Check 
            className="mb-2" 
            style={{fontSize: "14px"}}
            type="checkbox" label={category.serviceDescription} />
        </Form.Group>
      );
    }
  }

  return (
    <>
      <BrowserView>
        <BrowserNavBar active ="estimates"/>
        <Card className="border-0 w-100 mx-auto">
          <Card.Header
            className="d-flex justify-content-center align-items-center mb-4 border-0"
            id="bchead"
          >

            {users.firstName}'s Estimate
              </Card.Header>

          <Card.Body id="bcbody">
            <Card.Title className="mb-3" id="bctitle">
                <strong>{users.accountType}</strong> Services
            </Card.Title>
            <Form className="ml-3">
              {serviceCategories}

              <Button 
                className="p-2 mt-2"
                variant="dark"
                id="btn"
                href="/thankYou"
                type="submit"
              >
                SUBMIT
              </Button>
            </Form>

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
            {users.firstName}'s Estimate
              </Card.Header>

          <Card.Body id="mcbody">
          <Card.Title className="mb-3" id="mctitle">
              <strong>{users.accountType}</strong> Services
          </Card.Title>
          <Form className="ml-3">
            {serviceCategories}
            <Button 
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

        <MobileNavBar active ="estimates" />
      </MobileView>
    </>
  );
}
