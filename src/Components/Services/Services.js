import React, { useEffect } from "react";
import { MobileNavBar } from "../NavBar/MobileNavBar";
import { BrowserNavBar } from "../NavBar/BrowserNavBar";
import { BrowserView, MobileView } from "react-device-detect";
import Card from "react-bootstrap/Card";
import Image from "react-bootstrap/Image";
import Table from "react-bootstrap/Table";
import HeaderLogo from "../Images/topLogoBar.png";
import { DeskFooter } from "../DeskFooter/DeskFooter";
import { fName, invoices } from "../LocalUser/LocalUser";
import { restrictPage } from "../API/Api";
import './Services.css'; 

export function Services() {

  useEffect(() => {
    restrictPage();
  }, []);

  // Creating the table for Invoices
  let invoiceInputs = [];

  for (let i in invoices) {
      let date = JSON.stringify(invoices[i].date);
      let newDate = `${date.slice(6, 8)}/${date.slice(9, 11)}/${date.slice(1, 5)}`;
      let updatedServices = [];
      for (let j in invoices[i].services) {
        updatedServices.push(
          <div>{invoices[i].services[j]}</div>
          
        )
      }
      invoiceInputs.push(
        <tr style={{ fontSize: "12px", alignItems: "center"}}>
          <td className="align-self-center">{newDate}</td>
          <td>${invoices[i].invoiceAmount}</td>
          <td>{updatedServices}</td>
        </tr>
      );
  }

  // posting No Service Info for users with no services
  if (invoiceInputs.length === 0) {
    invoiceInputs.push(
      <tr style={{ fontSize: "12px", textAlign: "center" }}>
        <td colspan="3">No Service History</td>
      </tr>
    );
  }

  return (
    <>
      <BrowserView>
        <BrowserNavBar active ="services"/>
        <Card className="border-0 w-100 mx-auto">
          <Card.Header
            className="d-flex justify-content-center align-items-center mb-4 border-0"
            id="cardh"
          >
            {fName}'s Service History
          </Card.Header>

          <Card.Body className="mx-auto w-50">
            <div class="tableFixHead">
            <Table striped bordered hover size="sm">
              <thead>
                <tr>
                  <th>Date</th>
                  <th>Amount</th>
                  <th>Services</th>
                </tr>
              </thead>
              <tbody id="tbdy">
                {invoiceInputs}
              </tbody>
            </Table>
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
            {fName}'s Service History
              </Card.Header>

          <Card.Body id="crdbody">
          <div class="tableFixHead">
            <Table striped bordered hover size="sm">
              <thead>
                <tr>
                  <th>Date</th>
                  <th>Amount</th>
                  <th>Services</th>
                </tr>
              </thead>
              <tbody id="tbdy">
                {invoiceInputs}
              </tbody>
            </Table>
            </div>
          </Card.Body>
        </Card>

        <MobileNavBar active ="services" />
      </MobileView>
    </>
  );
}