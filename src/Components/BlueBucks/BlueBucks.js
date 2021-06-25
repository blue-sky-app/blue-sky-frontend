import React from "react";
import { NavBar } from "../NavBar/NavBar.js";
import Card from "react-bootstrap/Card";
import Image from "react-bootstrap/Image";
import Table from "react-bootstrap/Table";
import HeaderLogo from "../Images/header.png";

export function BlueBucks() {
        let firstName = "Dan"
        let balance = "25"
    return (
        <div>
            <div>
                <Image src={HeaderLogo} className="d-flex w-100 mx-auto justify-content-center" />
                <Card className="border-0">
                    <Card.Header 
                        className="d-flex justify-content-center align-items-center text-white" 
                        style={{backgroundColor:"#0a7ebd", height: "40px", fontWeight: "bold"}}
                    >
                            {firstName}'s Blue Bucks History
                    </Card.Header>
                    
                    <Card.Body>
                        <Card.Title style={{fontSize: "16px"}}>Current Balance: <strong>{balance}</strong></Card.Title>
                        <Table striped bordered hover size="sm">
                            <thead style={{backgroundColor: "#434444", color: "white", fontSize: "12px",  textAlign: "center"}}>
                                <tr>
                                    <th>Transaction Type</th>
                                    <th>Amount</th>
                                    <th>Date</th>
                                </tr>
                            </thead>
                            <tbody style={{fontSize: "14px", textAlign: "center"}}>
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
                                <tr>
                                    <td>Earned</td>
                                    <td>10</td>
                                    <td>6/22/2021</td>
                                </tr>
                                <tr>
                                    <td>Earned</td>
                                    <td>10</td>
                                    <td>6/22/2021</td>
                                </tr>
                                <tr>
                                    <td>Earned</td>
                                    <td>10</td>
                                    <td>6/22/2021</td>
                                </tr>
                                <tr>
                                    <td>Earned</td>
                                    <td>10</td>
                                    <td>6/22/2021</td>
                                </tr>
                                <tr>
                                    <td>Earned</td>
                                    <td>10</td>
                                    <td>6/22/2021</td>
                                </tr>

                                <tr>
                                    <td>Earned</td>
                                    <td>10</td>
                                    <td>6/22/2021</td>
                                </tr>
                                <tr>
                                    <td>Earned</td>
                                    <td>10</td>
                                    <td>6/22/2021</td>
                                </tr>
                            </tbody>
                        </Table>
                    </Card.Body>
                    <Card.Text className="text-center mr-3 ml-3 mb-1" style={{fontSize: "12px"}}>
                        
                            Blue Bucks are earned through special promotions and upon payment of services and can be redeemed for future service discounts.
                        
                    </Card.Text>
                </Card>

                <NavBar />
            </div>
        </div>
    )
}