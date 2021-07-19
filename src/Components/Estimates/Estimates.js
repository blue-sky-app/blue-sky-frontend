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
        <BrowserNavBar />
        <Card className="border-0 w-75 mx-auto">
          <Card.Header
            className="d-flex justify-content-center align-items-center mt-3 mb-4 border-0"
            style={{
              backgroundColor: "#FFF",
              height: "40px",
              fontWeight: "bold",
              color: "#0a7ebd",
              fontSize: "20px",
            }}
          >

            {users.firstName}'s Estimate
              </Card.Header>

          <Card.Body style={{ overflowY: "scroll", maxHeight: "53vh" }}>
            <Card.Title className="mb-3" style={{ fontSize: "18px" }}>
                <strong>{users.accountType}</strong> Services
            </Card.Title>
            <Form className="ml-3">
              {serviceCategories}
              <Button 
                className="p-2 mt-2"
                variant="dark"
                style={{ fontSize: "14px", fontWeight: "bold" }}
                href="/thankYou"
                type="submit"
              >
                SUBMIT
              </Button>
            </Form>

          </Card.Body>
        </Card>
      </BrowserView>

      <MobileView>
        <Image
          src={HeaderLogo}
          className="d-flex w-100 mx-auto justify-content-center"
        />

        <Card className="border-0">
          <Card.Header
            className="d-flex justify-content-center align-items-center text-white"
            style={{
              backgroundColor: "#0a7ebd",
              height: "40px",
              fontWeight: "bold",
            }}
          >
            {users.firstName}'s Estimate
              </Card.Header>

          <Card.Body style={{ overflowY: "scroll", maxHeight: "53vh" }}>
          <Card.Title className="mb-3" style={{ fontSize: "16px" }}>
              <strong>{users.accountType}</strong> Services
          </Card.Title>
          <Form className="ml-3">
            {serviceCategories}
            <Button 
              className="p-2 mt-2"
              variant="dark"
              style={{ fontSize: "12px", fontWeight: "bold" }}
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
