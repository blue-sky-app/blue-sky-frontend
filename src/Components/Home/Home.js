import React from "react";
import Axios from 'axios'
import { NavBar } from "../NavBar/NavBar.js";
import Card from "react-bootstrap/Card";
import Image from "react-bootstrap/Image";
import Button from "react-bootstrap/Button";
import HeaderLogo from "../Images/topLogoBar.png";
import HeroImage from "../Images/hero.jpg"

export function Home() {
  return (
    <>
      <div>
        <Image src={HeaderLogo} className="d-flex w-100 mx-auto justify-content-center" />
        <Card className="border-0">
            <Card.Header 
              className="d-flex justify-content-center align-items-center text-white" 
              style={{backgroundColor:"#F1f2f2", height: "60px"}}
            >
              <Card.Text className="text-center w-75 mr-1 ml-1" style={{fontSize: "10px", color:"#434444"}}>
                <strong>LASTEST NEWS or DEALS HERE</strong>
                <br/>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor. 
              </Card.Text>
            </Card.Header>
            
            <Image src={HeroImage} className="d-flex w-100 mx-auto justify-content-center border border-dark border-3" style={{maxHeight: "175px"}}></Image>

            <Card.Body className="d-flex flex-column justify-content-center align-items-center" style={{backgroundColor: "#014388"}}>
              <Card.Text className="text-center mr-3 ml-3 mb-1" style={{fontSize: "15px", color: "#FFF", fontWeight: "bold"}}>
                  WHAT CAN BLUE DO FOR YOU?              
              </Card.Text>
              <Card.Text className="mr-3 ml-3 mb-1 mt-2" style={{fontSize: "11px", color: "#FFF", fontWeight: "bold"}}>
                  All estimates and proposals are guaranteed for six months and are completed free of charge
              </Card.Text>
              <Button className="mt-3 p-2" variant="dark" style={{fontSize: "12px", fontWeight:"bold"}} href="/estimates">REQUEST A QUOTE</Button>
            </Card.Body>

        </Card>

        <NavBar />
      </div>
    </>
  )
}