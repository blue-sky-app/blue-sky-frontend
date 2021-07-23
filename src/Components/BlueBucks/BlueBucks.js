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
import { DeskFooter } from "../DeskFooter/DeskFooter";
import './BlueBucks.css';

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
    
    // Creating the table for BlueBucks
    let bb_table = [];
    const user = users.email;
    for (const [i, table] of tables.entries()) {
        if (table.email === user) {
            let date = JSON.stringify(table.date);
            let newDate = `${date.slice(6, 8)}/${date.slice(9, 11)}/${date.slice(1, 5)}`;
            bb_table.push(
                <tr style={{ textAlign: "center" }}>
                    <td>{table.transaction_type}</td>
                    <td>{table.amount}</td>
                    <td>{newDate}</td>
                </tr>
       
            );
        }
    }

    // Calculation for the Current Balance
    let earned = 0;
    for (const [i, table] of tables.entries()) {
        if (table.email === user && table.transaction_type === "Earned") {
            earned += table.amount;
        }
    }

    let redeemed = 0;
    for (const [i, table] of tables.entries()) {
        if (table.email === user && table.transaction_type === "Redeemed") {
            redeemed += table.amount;
        }
    }

    let currentBalance = earned - redeemed;

    return (
        <>
            <BrowserView>
                <BrowserNavBar active="blueBucks" />

                <Card className="border-0 w-100 mx-auto">
                    <Card.Header
                        className="d-flex justify-content-center align-items-center mb-4 border-0"
                        id="cardh"
                    >
                        {users.firstName}'s Blue Bucks History
                    </Card.Header>

                    <Card.Body className="mx-auto w-50">
                        <Card.Title id="ctitle">
                            Current Balance: <strong>{currentBalance}</strong>
                        </Card.Title>
                        <div class="tableFixHead">
                        <Table striped bordered hover size="sm">
                            <thead>
                                <tr>
                                    <th>Transaction Type</th>
                                    <th>Amount</th>
                                    <th>Date</th>
                                </tr>
                            </thead>
                            <tbody id="tbdy">
                                {bb_table}
                            </tbody>
                        </Table>
                        </div>
                    </Card.Body>
                    <Card.Text
                        className="text-center mr-3 ml-3 mb-1 mt-3"
                        id="earned"
                    >
                        Blue Bucks are earned through special promotions and upon payment of
                        services and can be redeemed for future service discounts.
                    </Card.Text>
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
                        {users.firstName}'s Blue Bucks History
                    </Card.Header>

                    <Card.Body id="crdbody">
                        <Card.Title id="ctitle">
                            Current Balance: <strong>{currentBalance}</strong>
                        </Card.Title>
                        <div class="tableFixHead">
                        <Table striped bordered hover size="sm">
                            <thead>
                                <tr>
                                    <th>Transaction Type</th>
                                    <th>Amount</th>
                                    <th>Date</th>
                                </tr>
                            </thead>
                            <tbody id="tbdy">
                                {bb_table}
                            </tbody>
                        </Table>
                        </div>
                    </Card.Body>
                    <Card.Text
                        className="text-center mr-3 ml-3 mb-1"
                        id="earned"
                    >
                        Blue Bucks are earned through special promotions and upon payment of
                        services and can be redeemed for future service discounts.
                    </Card.Text>
                </Card>

                <MobileNavBar active ="blueBucks"  />
            </MobileView>
        </>
    );
}