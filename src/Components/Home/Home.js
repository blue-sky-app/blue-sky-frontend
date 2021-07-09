import React from "react";
import { MobileNavBar } from "../NavBar/MobileNavBar";
import { BrowserNavBar } from "../NavBar/BrowserNavBar";
import { ImageCarousel } from "../Images/ImageCarousel";
import { BrowserView, MobileView } from "react-device-detect";
import Card from "react-bootstrap/Card";
import Image from "react-bootstrap/Image";
import Button from "react-bootstrap/Button";
import HeaderLogo from "../Images/topLogoBar.png";
import HeroImage from "../Images/hero.jpg";

export function Home() {
  return (
    <>
      <BrowserView>
        <BrowserNavBar />
        <Card className="border-0 mx-auto">
          <Card.Header
            className="d-flex justify-content-center align-items-center mt-3 mb-3 border-0"
            style={{ backgroundColor: "#FFF", height: "60px" }}
          >
            <Card.Text
              className="text-center w-75"
              style={{ fontSize: "20px", color: "#434444" }}
            >
              <strong>LASTEST NEWS or DEALS HERE</strong>
              <br />
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor.
            </Card.Text>
          </Card.Header>

          <ImageCarousel />

          <Card.Body
            className="d-flex flex-column justify-content-center align-items-center"
            style={{ backgroundColor: "#014388" }}
          >
            <Card.Text
              className="text-center mr-3 ml-3 mb-1"
              style={{ fontSize: "14px", color: "#FFF", fontWeight: "bold" }}
            >
              WHAT CAN BLUE DO FOR YOU?
            </Card.Text>
            <Card.Text
              className="mr-3 ml-3 mt-2 text-center"
              style={{ fontSize: "11px", color: "#FFF", fontWeight: "bold" }}
            >
              All estimates and proposals are guaranteed for six months and are
              completed free of charge
            </Card.Text>
          </Card.Body>

          <Card.Body
            className="d-flex justify-content-center align-items-center"
            style={{ backgroundColor: "#014388" }}
          >
            <Button
              className="p-2 mr-2"
              variant="dark"
              style={{ fontSize: "12px", fontWeight: "bold" }}
              href="/estimates"
            >
              REQUEST A QUOTE
            </Button>
            <Button
              className="p-2"
              variant="dark"
              style={{ fontSize: "12px", fontWeight: "bold" }}
              href="/services"
            >
              REPEAT A SERVICE
            </Button>
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
            style={{ backgroundColor: "#F1f2f2", height: "60px" }}
          >
            <Card.Text
              className="text-center w-75 mr-1 ml-1"
              style={{ fontSize: "10px", color: "#434444" }}
            >
              <strong>LASTEST NEWS or DEALS HERE</strong>
              <br />
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor.
            </Card.Text>
          </Card.Header>

          <Image
            src={HeroImage}
            className="d-flex w-100 mx-auto justify-content-center border border-dark border-3"
            style={{ maxHeight: "30vh" }}
          ></Image>

          <Card.Body
            className="d-flex flex-column justify-content-center align-items-center"
            style={{ backgroundColor: "#014388" }}
          >
            <Card.Text
              className="text-center mr-3 ml-3 mb-1"
              style={{ fontSize: "14px", color: "#FFF", fontWeight: "bold" }}
            >
              WHAT CAN BLUE DO FOR YOU?
            </Card.Text>
            <Card.Text
              className="mr-3 ml-3 mt-2 text-center"
              style={{ fontSize: "11px", color: "#FFF", fontWeight: "bold" }}
            >
              All estimates and proposals are guaranteed for six months and are
              completed free of charge
            </Card.Text>
          </Card.Body>
          <Card.Body
            className="d-flex justify-content-center align-items-center"
            style={{ backgroundColor: "#014388" }}
          >
            <Button
              className="p-2 mr-2"
              variant="dark"
              style={{ fontSize: "12px", fontWeight: "bold" }}
              href="/estimates"
            >
              REQUEST A QUOTE
            </Button>
            <Button
              className="p-2"
              variant="dark"
              style={{ fontSize: "12px", fontWeight: "bold" }}
              href="/services"
            >
              REPEAT A SERVICE
            </Button>
          </Card.Body>
        </Card>
        <MobileNavBar />
      </MobileView>
    </>
  );
}
