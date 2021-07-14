import React, { useState, useEffect } from "react";
import axios from "axios";
import { API_BASE_URL } from "../API/Api.js";
import { MobileNavBar } from "../NavBar/MobileNavBar";
import { BrowserNavBar } from "../NavBar/BrowserNavBar";
import { BrowserView, MobileView } from "react-device-detect";
import Card from "react-bootstrap/Card";
import Image from "react-bootstrap/Image";
import Table from "react-bootstrap/Table";
import HeaderLogo from "../Images/topLogoBar.png";

export function BlueBucks(props) {
    const [users, setUsers] = useState([]);
    const [tables, setTables] = useState([]);

    // This fetch is for the FirstName
    useEffect(() => {
        fetchUser();
    }, []);
    useEffect(() => {
        console.log(users);
    }, [users]);

    const fetchUser = async () => {
        const response = await axios(`${API_BASE_URL}user/9`); //3, 4, 9
        setUsers(response.data);
    };

    // This fetch is for the table of transactions
    useEffect(() => {
        fetchTable();
    }, []);
    useEffect(() => {
        console.log(tables);
    }, [tables]);

    const fetchTable = async () => {
        const response = await axios(`${API_BASE_URL}bb_hist`);
        setTables(response.data);
    };

    let bb_table = [];
    const user = users.email;
    for (const [i, table] of tables.entries()) {
        if (table.email === user) {
            let date = JSON.stringify(table.date);
            let newDate = `${date.slice(6, 8)}/${date.slice(9, 11)}/${date.slice(
                1,
                5
            )}`;
            bb_table.push(
                <tr style={{ textAlign: "center" }}>
                    <td>{table.transaction_type}</td>
                    <td>{table.amount}</td>
                    <td>{newDate}</td>
                </tr>
            );
        }
    }

    // Calculate the Current Balance
    let earned = 0;
    for (const [i, table] of tables.entries()) {
        if (table.email === user && table.transaction_type === "Earned") {
            earned = earned + table.amount;
        }
    }

    let redeemed = 0;
    for (const [i, table] of tables.entries()) {
        if (table.email === user && table.transaction_type === "Redeemed") {
            redeemed = redeemed + table.amount;
        }
    }

    let currentBalance = earned - redeemed;

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
                        {users.firstName}'s Blue Bucks History
                    </Card.Header>

                    <Card.Body
                        className="mx-auto w-50"
                        style={{ overflowY: "scroll", maxHeight: "100vh" }}
                    >
                        <Card.Title style={{ fontSize: "18px" }}>
                            Current Balance: <strong>{currentBalance}</strong>
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
                            <tbody style={{ fontSize: "14px", textAlign: "center" }}>
                                {bb_table}
                            </tbody>
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
                        {users.firstName}'s Blue Bucks History
                    </Card.Header>

                    <Card.Body style={{ overflowY: "scroll", maxHeight: "53vh" }}>
                        <Card.Title style={{ fontSize: "16px" }}>
                            Current Balance: <strong>{currentBalance}</strong>
                        </Card.Title>
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
                                    <th>Transaction Type</th>
                                    <th>Amount</th>
                                    <th>Date</th>
                                </tr>
                            </thead>
                            <tbody style={{ fontSize: "12px", textAlign: "center" }}>
                                {bb_table}
                            </tbody>
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

                <MobileNavBar />
            </MobileView>
        </>
    );
}
