// Author(s): Dan, Sam
import React, { useState, useEffect } from "react";
import { fetchUsers, fetchEstimates } from "../API/Api.js";
import { MobileNavBar } from "../NavBar/MobileNavBar";
import { BrowserView, MobileView } from "react-device-detect";
import { AdminSearchUsers } from "./AdminSearchUsers";
import { AdminEstimates } from "./AdminEstimates";
import { AdminNews } from "./AdminNews";
import { AdminCategories } from "./AdminCategories";
import { Card, Button, Image, Tabs, Tab } from "react-bootstrap";
import { email } from "../LocalUser/LocalUser.js";
import HeaderLogo from "../Images/mTopLogoBar.png";
import { BrowserNavBar } from "../NavBar/BrowserNavBar.js";
import { DeskFooter } from "../DeskFooter/DeskFooter.js";
import { accountType } from "../LocalUser/LocalUser.js";

// import "./Admin.css";

// Provides admin console page
export function Admin() {
  const [token] = useState(sessionStorage.getItem('token') || '');
  const [key, setKey] = useState(1);
  const [estimates, setEstimates] = useState([]);
  const [users, setUsers] = useState([]);


  // Secure Admin page by checking window name set at login and account type if admin
  if (window.name !== "kjhdRg8*&6!sDf$lKgfh%" || accountType !== "Administrator") {

    window.location.href = "/login";
  }

  // This fetch is for the Estimates
  useEffect(() => {
    fetchEstimates(token).then(setEstimates);
  }, [token]);

  // Fetch USer data from Db
  useEffect(() => {
    fetchUsers(token).then(setUsers);
  }, [token]);

  const totalEstimates = estimates.length;
  const totalUsers = users.length;

  // Stores tab key to set active tab on Admin screen
  const handleSelect = (e, key) => {
    e.preventDefault();
    setKey(key);
  };

  return (
    <>
      <BrowserView>
        <BrowserNavBar/>
        <Card className="border-0">
          <Card.Header
            className="d-flex justify-content-center align-items-center mb-1 border-0"
            id="bchead"
          >
            Admin Console
          </Card.Header>
          <Card.Body className="mx-auto w-75 min-vh-100">
            <Tabs
              activeKey={key}
              id="tabs"
              className="mb-3 justify-content-center"
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
