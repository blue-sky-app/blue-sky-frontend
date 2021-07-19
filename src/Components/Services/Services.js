import React, { useState, useEffect } from "react";
import axios from "axios";
import { API_BASE_URL } from "../API/Api.js";
import { UserId } from "../API/Api.js";
import { MobileNavBar } from "../NavBar/MobileNavBar";
import { BrowserNavBar } from "../NavBar/BrowserNavBar";
import { BrowserView, MobileView } from "react-device-detect";
import Card from "react-bootstrap/Card";
import Image from "react-bootstrap/Image";
import Table from "react-bootstrap/Table";
import HeaderLogo from "../Images/topLogoBar.png";

export function Services() {
  const [users, setUsers] = useState([]);
  const [invoices, setInvoices] = useState([]);

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

  // This fetch is for the invoice data
  useEffect(() => {
    fetchInvoice();
  }, [])
  useEffect(() => {
    console.log(invoices)
  }, [invoices])

  const fetchInvoice = async () => {
    const response = await axios(`${API_BASE_URL}invoices`);
    setInvoices(response.data)
  }

  // Creating the table for Invoices
  let invoiceInputs = [];
  for (const [i, invoice] of invoices.entries()) {
    if (invoice.userId === users.id) {
      let date = JSON.stringify(invoice.date);
      let newDate = `${date.slice(6, 8)}/${date.slice(9, 11)}/${date.slice(1, 5)}`;
      invoiceInputs.push(
        <tr style={{ fontSize: "11px", textAlign: "center" }}>
          <td>{newDate}</td>
          <td>${invoice.amount}</td>
        </tr>
      );
    }
  }

  // posting No Service Info for users with no services
  if (invoiceInputs.length === 0) {
    invoiceInputs.push(
      <tr style={{ fontSize: "11px", textAlign: "center" }}>
        <td colspan="3">No Service History</td>
      </tr>
    );
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

            {users.firstName}'s Service History
              </Card.Header>

          <Card.Body style={{ overflowY: "scroll", maxHeight: "53vh" }}>
            <Table striped bordered hover size="sm">
              <thead
                style={{
                  backgroundColor: "#434444",
                  color: "white",
                  fontSize: "12px",
                  textAlign: "center",
                }}
              >
                <tr>
                  <th>Date</th>
                  <th>Amount</th>
                </tr>
              </thead>
              <tbody style={{ fontSize: "12px", textAlign: "center" }}>
                {invoiceInputs}
              </tbody>
            </Table>
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
            {users.firstName}'s Service History
              </Card.Header>

          <Card.Body style={{ overflowY: "scroll", maxHeight: "53vh" }}>
            <Table striped bordered hover size="sm">
              <thead
                style={{
                  backgroundColor: "#434444",
                  color: "white",
                  fontSize: "12px",
                  textAlign: "center",
                }}
              >
                <tr>
                  <th>Date</th>
                  <th>Amount</th>
                </tr>
              </thead>
              <tbody style={{ fontSize: "12px", textAlign: "center" }}>
                {invoiceInputs}
              </tbody>
            </Table>
          </Card.Body>
        </Card>

        <MobileNavBar active ="services" />
      </MobileView>
    </>
  );
}
