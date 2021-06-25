import React from "react";
import { NavBar } from "../NavBar/NavBar.js";
import { ContactUs } from "../ContactUs/ContactUs";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Image from "react-bootstrap/Image";
import Table from "react-bootstrap/Table";
import BlueSkyLogo from "../Images/logo_bluesky.jpg";
import style from "./BlueBucks.css";
import blueBuck from "../Images/blueBucks.png";

export function BlueBucks() {
        let firstName = "Dan"
        let balance = "25"
    return (
        <>
            <Image src={BlueSkyLogo} className="d-flex w-75 mx-auto justify-content-center" />
            {/* <div className="d-flex justify-content-center align-items-center" style={{backgroundColor:"#0a7ebd", height: "40px"}}>
                <p 
                    className="mb-0" 
                    style={{fontSize:"14px", fontWeight:"bold", color:"#FFF"}}
                >
                    {firstName}'s Blue Bucks History
                </p>   
            </div> */}
            <Card>
                <Card.Header 
                    className="d-flex justify-content-center align-items-center text-white" 
                    style={{backgroundColor:"#0a7ebd", height: "40px", fontWeight: "bold"}}
                >
                        {firstName}'s Blue Bucks History
                </Card.Header>
                
                <Card.Body>
                    <Card.Title>Current Balance: <strong>{balance}</strong></Card.Title>
                    <Table striped bordered hover size="sm">
                        <thead>
                            <tr>
                                <th>Transaction Type</th>
                                <th>Amount</th>
                                <th>Date</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>Earned</td>
                                <td>10</td>
                                <td>6/15/2021</td>
                            </tr>
                            <tr>
                                <td>Redeemed</td>
                                <td>10</td>
                                <td>6/19/2021</td>
                            </tr>
                            <tr>
                                <td>Earned</td>
                                <td>10</td>
                                <td>6/22/2021</td>
                            </tr>
                        </tbody>
                    </Table>
                </Card.Body>
            </Card>

            <ContactUs />
            <NavBar />
        </>
    )
}