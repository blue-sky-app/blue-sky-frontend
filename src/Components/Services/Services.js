import React, { useState, useEffect } from "react";
import axios from "axios";
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
  const [histories, setHistories] = useState([]);


  let userId = 11; //3, 4, 9, 11 for Seth


  // This fetch is for the FirstName
  useEffect(() => {
    fetchUser();
  }, []);
  useEffect(() => {
      console.log(users);
  }, [users]);

  const fetchUser = async () => {
      const response = await axios(`http://localhost:8080/user/${userId}`); 
      setUsers(response.data);
  };

  // This fetch is for the table of transactions

  useEffect(() => {
    fetchInvoice();
  }, [])
  useEffect(() => {
    console.log(invoices)
    }, [invoices])

  const fetchInvoice = async() => {
    const response= await axios('http://localhost:8080/invoices');
    setInvoices(response.data)
  }

  let invoicesForUser = [];
  for (const [i, invoice] of invoices.entries()) {
    if (invoice.userId === userId) {
      invoicesForUser.push(invoice.invoiceId);
      }
  }

  console.log(invoicesForUser);

  // This fetch is for the service history
  useEffect(() => {
    fetchHistory();
  }, [])
  useEffect(() => {
    console.log(histories)
    }, [histories])

  const fetchHistory = async() => {
    const response= await axios('http://localhost:8080/serviceHistory');
    setHistories(response.data)
  }

  let serviceHistoryCategories = [];
  for (const [i, history] of histories.entries()) {
    for (const j in invoicesForUser) {
      if (history.invoiceId === invoicesForUser[j]) {
        serviceHistoryCategories.push(history.serviceId);
        }
    }

  }

  let invoiceInputs = [];
  const user = users.id;
  for (const [i, invoice] of invoices.entries()) {
    if (invoice.userId === user) {
      let date = JSON.stringify(invoice.date);
      let newDate = `${date.slice(6, 8)}/${date.slice(9,11)}/${date.slice(1,5)}`;
      invoiceInputs.push(
        <tr style={{fontSize: "11px", textAlign: "center"}}>
          <td>{newDate}</td>
          <td>${invoice.amount}</td>
        </tr>
        );
    } else {
      invoiceInputs.push(
        <tr style={{fontSize: "11px",  textAlign: "center"}}>
          <td colspan="3">No Service History</td>
        </tr>
      );
    }
  }

  if (invoices.userID) {
    invoiceInputs.push(
      <tr style={{fontSize: "11px",  textAlign: "center"}}>
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

                    <Card.Body
                        className="mx-auto w-50"
                        style={{ overflowY: "scroll", maxHeight: "100vh" }}
                    >
                        <Card.Title style={{ fontSize: "18px" }}>
                            {/* Current Balance: <strong>{currentBalance}</strong> */}
                            
                        </Card.Title>
                        <Table striped bordered hover size="sm">
                            <thead
                                style={{
                                    backgroundColor: "#434444",
                                    color: "white",
                                    fontSize: "16px",
                                    textAlign: "center",
                                }}
                            >
                                <tr>
                                    <th>Transaction Type</th>
                                    <th>Amount</th>
                                    <th>Date</th>
                                </tr>
                            </thead>
                            {/* <tbody style={{ fontSize: "14px", textAlign: "center" }}>
                                {bb_table}
                            </tbody> */}
                        </Table>
                    </Card.Body>
                    <Card.Text
                        className="text-center mr-3 ml-3 mb-1 mt-3"
                        style={{ fontSize: "12px" }}
                    >
                        Blue Bucks are earned through special promotions and upon payment of
                        services and can be redeemed for future service discounts.
                    </Card.Text>
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

          <MobileNavBar />
      </MobileView>
    </>
  );
}
