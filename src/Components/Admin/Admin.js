import React from "react";
import { MobileNavBar } from "../NavBar/MobileNavBar";
import { BrowserView, MobileView } from "react-device-detect";
import { AdminSearchUsers } from "./AdminSearchUsers";
import { AdminEstimates } from "./AdminEstimates";
import { AdminNews } from "./AdminNews";
import { AdminCategories } from "./AdminCategories";
import { AdminDashboard } from "./AdminDashboard";
import { Card, Image, Tabs, Tab } from "react-bootstrap";
import HeaderLogo from "../Images/topLogoBar.png";
import "./Admin.css";

export function Admin() {
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
          <Card.Body className="mx-auto w-75">
            <Tabs
              defaultActiveKey="profile"
              id="uncontrolled-tab-example"
              className="mb-3"
            >
              <Tab eventKey="dashboard" title="Dashboard">
                <AdminDashboard />
              </Tab>
              <Tab eventKey="estimates" title="Estimates">
                <AdminEstimates />
              </Tab>
              <Tab eventKey="searchUsers" title="Search Users">
                <AdminSearchUsers />
              </Tab>
              <Tab eventKey="categories" title="Categories">
                <AdminCategories />
              </Tab>
              <Tab eventKey="news" title="News">
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
