import React from "react";
import { NavBar } from "../NavBar/NavBar.js"
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import style from "./BlueBucks.css";
import blueBuck from "../Images/blueBucks.png";

export function BlueBucks() {
    // TODO add in an account balance to pull in the balance
    let balance = '450.00';
        
    return (
        <>
            <NavBar />
            <div className="pt-5">
                <Card className="mx-auto" style={{ width: '18rem' }}>
                    <Card.Img variant="top" src={blueBuck}/>
                    <Card.Body>
                        <Card.Title>Account Balance</Card.Title>
                        <Card.Text>
                        ${balance}
                        </Card.Text>
                        <Button variant="primary">Redeem</Button>
                    </Card.Body>
                </Card>
            </div>
        </>
    )
}