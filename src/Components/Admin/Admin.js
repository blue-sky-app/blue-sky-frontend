import React, { useState, useEffect } from "react";
import axios from "axios";
import { API_BASE_URL, fetchUser, headers } from "../API/Api.js";
import { MobileNavBar } from "../NavBar/MobileNavBar";
import { BrowserView, MobileView } from "react-device-detect";
import { AdminSearchUsers } from "./AdminSearchUsers";
import { AdminEstimates } from "./AdminEstimates";
import { AdminNews } from "./AdminNews";
import { AdminCategories } from "./AdminCategories";
import { Card, Button, Image, Tabs, Tab } from "react-bootstrap";
import HeaderLogo from "../Images/mTopLogoBar.png";
// import "./Admin.css";

export function Admin() {
  const [token, setToken] = useState(sessionStorage.getItem('token') || '');
  const [key, setKey] = useState(1);
  const [estimates, setEstimates] = useState([]);
  const [users, setUsers] = useState([]);

  // This fetch is for the Estimates
  useEffect(() => {
    fetchEstimates(token);
  }, []);
  useEffect(() => {
    console.log(estimates);
  }, [estimates]);

  const fetchEstimates = async (token) => {
    const response = await axios(`${API_BASE_URL}/estimates/`, headers(token));
    setEstimates(response.data);
  };

  // user Fetch
  useEffect(() => {
    fetchUser(token).then(setUsers);
  }, []);
  useEffect(() => {
    console.log(users);
  }, [users]);

  const totalEstimates = estimates.length;
  const totalUsers = users.length;

  const handleSelect = (e, key) => {
    e.preventDefault();
    setKey(key);
  };

  return (
    <>
      <BrowserView>
        <Image
          src={HeaderLogo}
          className="d-flex w-100 mx-auto justify-content-center"
        />
        <Card className="border-0">
          <Card.Header
            className="d-flex justify-content-center align-items-center mb-1 border-0"
            id="bchead"
          >
            Admin Console
          </Card.Header>
          <Card.Body className="mx-auto w-75 ">
            <Tabs
              activeKey={key}
              id="tabs"
              className="mb-3"
              onSelect={(k) => setKey(k)}
            >
              <Tab eventKey={1} title="Dashboard">
                <Card.Body className="border w-25 mx-auto mb-2">
                  <Card.Title className="text-center">
                    <Button
                      variant="success"
                      onClick={(e) => handleSelect(e, 3)}
                    >
                      <strong>{totalUsers}</strong>
                    </Button>
                  </Card.Title>
                  <Card.Text className="text-center">Total Customers</Card.Text>
                </Card.Body>
                <Card.Body className="border w-25 mx-auto">
                  <Card.Title className="text-center">
                    <Button onClick={(e) => handleSelect(e, 2)}>
                      <strong>{totalEstimates}</strong>
                    </Button>
                  </Card.Title>
                  <Card.Text className="text-center">
                    Estimates Needing Review
                  </Card.Text>
                </Card.Body>
              </Tab>
              <Tab eventKey={2} title="Estimates">
                <AdminEstimates />
              </Tab>
              <Tab eventKey={3} title="Search Users">
                <AdminSearchUsers />
              </Tab>
              <Tab eventKey={4} title="Categories">
                <AdminCategories />
              </Tab>
              <Tab eventKey={5} title="News">
                <AdminNews />
              </Tab>
            </Tabs>
          </Card.Body>
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
          ></Card.Header>

          <Card.Body id="mcbody">
            <Card.Title className="mb-3" id="mctitle"></Card.Title>
          </Card.Body>
        </Card>
        <MobileNavBar active="estimates" />
      </MobileView>
    </>
  );
}
