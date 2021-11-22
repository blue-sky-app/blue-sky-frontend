// Author(s): Dan, Sam
import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import MetaTags from "react-meta-tags";
import { MobileNavBar } from "../NavBar/MobileNavBar";
import { BrowserNavBar } from "../NavBar/BrowserNavBar";
import { BrowserView, MobileView } from "react-device-detect";
import { Card, Image, Table, Button } from "react-bootstrap";
import BlueSkyLogo from "../Images/topLogoBar.png";
import { DeskFooter } from "../DeskFooter/DeskFooter";
import { fName, invoices } from "../LocalUser/LocalUser";
import { restrictPage } from "../API/Api";
import "./Services.css";

// Provides the services page
export function Services() {
  useEffect(() => {
    restrictPage();
  }, []);

  // Creating the table for Invoices
  let invoiceInputs = [];

  for (let i in invoices) {
    let date = JSON.stringify(invoices[i].date);
    let newDate = `${date.slice(6, 8)}/${date.slice(9, 11)}/${date.slice(
      1,
      5
    )}`;
    let updatedServices = [];

    for (let j in invoices[i].services) {
      updatedServices.push(<div>{invoices[i].services[j]}</div>);
    }

    // Button Logic to determine if service is within 6 month period or not to...
    //  ... display correct button on each row.
    let buttonInput = [];
    const year = parseInt(
      newDate.charAt(6) +
        newDate.charAt(7) +
        newDate.charAt(8) +
        newDate.charAt(9)
    );
    const month = parseInt(newDate.charAt(0) + newDate.charAt(1));
    const day = parseInt(newDate.charAt(3) + newDate.charAt(4));

    let monthCount = 0;

    switch (month) {
      case 1:
        monthCount = 0;
        break;
      case 2:
        monthCount = 31;
        break;
      case 3:
        monthCount = 59;
        break;
      case 4:
        monthCount = 90;
        break;
      case 5:
        monthCount = 120;
        break;
      case 6:
        monthCount = 151;
        break;
      case 7:
        monthCount = 181;
        break;
      case 8:
        monthCount = 212;
        break;
      case 9:
        monthCount = 243;
        break;
      case 10:
        monthCount = 273;
        break;
      case 11:
        monthCount = 304;
        break;
      case 12:
        monthCount = 334;
        break;
      default:
      // nothing
    }
    const inputDate = year * 365 + monthCount + day;
    const currentDate = new Date();

    let newMonth = 0;
    switch (currentDate.getMonth() + 1) {
      case 1:
        newMonth = 0;
        break;
      case 2:
        newMonth = 31;
        break;
      case 3:
        newMonth = 59;
        break;
      case 4:
        newMonth = 90;
        break;
      case 5:
        newMonth = 120;
        break;
      case 6:
        newMonth = 151;
        break;
      case 7:
        newMonth = 181;
        break;
      case 8:
        newMonth = 212;
        break;
      case 9:
        newMonth = 243;
        break;
      case 10:
        newMonth = 273;
        break;
      case 11:
        newMonth = 304;
        break;
      case 12:
        newMonth = 334;
        break;
      default:
      // nothing
    }

    const today =
      currentDate.getFullYear() * 365 + newMonth + currentDate.getDate();

    if (today - inputDate > 180) {
      buttonInput.push(<Link to="/estimates">New Estimate</Link>);
    } 
    else {
      buttonInput.push(
        <Button variant="secondary" size="sm">
          Repeat
        </Button>
      );
    }

    invoiceInputs.push(
      <tr style={{ fontSize: "12px", alignItems: "center" }}>
        <td className="align-self-center">{newDate}</td>
        <td>${invoices[i].invoiceAmount}</td>
        <td>{updatedServices}</td>
        <td>{buttonInput}</td>
      </tr>
    );
  }

  // posting "No Service Info" for users with no services
  if (invoiceInputs.length === 0) {
    invoiceInputs.push(
      <tr style={{ fontSize: "12px", textAlign: "center" }}>
        <td colspan="4">No Service History</td>
      </tr>
    );
  }

  return (
    <>
      <MetaTags>
        <title>Blue Sky | Services</title>
        <meta
          name="Blue Sky Services"
          content="Welcome to Blue Sky, we are your go to for Commercial and Residential cleaning!"
        />
        <meta property="og:title" content="Blue Sky Home" />
        <meta property="og:image" content="../Images/Header.png" />
      </MetaTags>

      <BrowserView>
        <BrowserNavBar active="services" />
        <Card className="border-0 w-100 mx-auto">
          <Card.Header
            className="d-flex justify-content-center align-items-center mb-4 border-0"
            id="cardh"
          >
            {fName}'s Service History
          </Card.Header>

          <Card.Body className="mx-auto w-50">
            <div className="tableFixHead">
              <Table
                striped
                bordered
                hover
                size="sm"
                data-testid="servicesTable"
              >
                <thead>
                  <tr>
                    <th>Date</th>
                    <th>Amount</th>
                    <th>Services</th>
                    <th>Repeat</th>
                  </tr>
                </thead>
                <tbody id="tbdy">{invoiceInputs}</tbody>
              </Table>
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
            {fName}'s Service History
          </Card.Header>

          <Card.Body id="crdbody">
            <div className="tableFixHd">
              <Table striped bordered hover size="sm">
                <thead>
                  <tr>
                    <th>Date</th>
                    <th>Amount</th>
                    <th>Services</th>
                    <th>Repeat</th>
                  </tr>
                </thead>
                <tbody id="tbdy">{invoiceInputs}</tbody>
              </Table>
            </div>
          </Card.Body>
        </Card>

        <MobileNavBar active="services" />
      </MobileView>
    </>
  );
}
