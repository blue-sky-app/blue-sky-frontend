import React from "react";
import Axios from 'axios'
import { NavBar } from "../NavBar/NavBar.js";
import Card from "react-bootstrap/Card";
import Image from "react-bootstrap/Image";
import Button from "react-bootstrap/Button";
import Table from "react-bootstrap/Table";
import HeaderLogo from "../Images/topLogoBar.png";

export function Services() {
  return (
    <div>
    <Image src={HeaderLogo} className="d-flex w-100 mx-auto justify-content-center" />
    <Card className="border-0">
    <Card.Header 
      className="d-flex justify-content-center align-items-center text-white" 
      style={{backgroundColor:"#0a7ebd", height: "40px", fontWeight: "bold"}}
    >
        Blue Sky Services
    </Card.Header>               
      <Card.Body className="d-flex flex-column justify-content-center align-items-center">
        <Card.Text className="text-center" style={{fontSize: "12px"}}>   
          <strong style={{fontSize: "14px"}}>COVID-19 CLEANING</strong>
          <br/>
          <br/>
          <strong style={{fontSize: "14px"}}>COMMERCIAL</strong>
          <br/>Window Cleaning
          <br/>Building Washing
          <br/>Concrete Cleaning
          <br/>Gum Removal
          <br/>Roof Cleaning
          <br/>Awning Cleaning
          <br/>Floor & Carpet Cleaning
          <br/>
          <br/>
          <strong style={{fontSize: "14px"}}>RESIDENTIAL</strong>
          <br/>Power Washing
          <br/>Window Cleaning
          <br/>Roof Washing
          <br/>Gutter & Leader Washing
          <br/>Solar Panel Cleaning
        </Card.Text>
        <Button className="mt-1 p-2" variant="dark" style={{fontSize: "12px", fontWeight:"bold"}} href="/services">REQUEST SERVICE</Button>

      </Card.Body>

    </Card>

    <NavBar />
  </div>
  )
}