import React, { useEffect } from "react";
import { MobileNavBar } from "../NavBar/MobileNavBar";
import { BrowserNavBar } from "../NavBar/BrowserNavBar";
import { BrowserView, MobileView } from "react-device-detect";
import Card from "react-bootstrap/Card";
import Image from "react-bootstrap/Image";
import Button from "react-bootstrap/Button";
import HeaderLogo from "../Images/topLogoBar.png";
import ImageOne from "../Images/hero1.jpg";
import ImageTwo from "../Images/hero2.jpg";
import ImageThree from "../Images/heroes.jpeg";
import ImageFour from "../Images/pressurewash.jpeg";
import ImageFive from "../Images/sidewalk.jpg";
import mImageOne from "../Images/mHero1.jpg";
import mImageTwo from "../Images/mHero2.jpg";
import mImageThree from "../Images/mHero3.jpeg";
import mImageFour from "../Images/mHero4.jpeg";
import mImageFive from "../Images/hero.jpg";
import { newsHeadline, newsText } from "../LocalUser/LocalUser";
import { DeskFooter } from "../DeskFooter/DeskFooter";
import { restrictPage } from "../API/Api";
import './Home.css';

export function Home() {
  const picArray = [ImageOne, ImageTwo, ImageThree, ImageFour, ImageFive];
  const randIndex = Math.floor(Math.random() * picArray.length);
  const selPicture = picArray[randIndex];

  const mPicArray = [mImageOne, mImageTwo, mImageThree, mImageFour, mImageFive];
  const mSelPicture = mPicArray[randIndex];

  useEffect(() => {
    restrictPage();
}, []);

  return (
    <>
      <BrowserView>
        <BrowserNavBar active ="home"/>
        <Card className="border-0 mx-auto">
          <Card.Header
            className="flex-row mt-3 mb-3 ml-3 mr-3 border-0"
            id="background"
            style={{ backgroundImage: `url(${selPicture})`}}
          >
            <Card.Text
              className="text-center w-75 mx-auto"> 
              <div id="news">
                <div>
                  <strong>{newsHeadline}</strong>
                  <br /> {newsText}
                </div>
              </div>
            </Card.Text>
              <div className="d-flex justify-content-center" id="buttons">
                <div className="mx-auto">

                <Button 
                  className="p-2 mr-2"
                  id="btn"
                  variant="dark"
                  href="/estimates"
                >
                  REQUEST A QUOTE
                </Button>
                <Button
                  className="p-2 mr-2"
                  id="btn"
                  variant="dark"
                  href="/services"
                >
                  REPEAT A SERVICE
                </Button>
                </div>
              </div>
          </Card.Header>
          <DeskFooter />
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
            id="header"
          >
            <Card.Text
              className="text-center w-75 mr-1 ml-1"
              id="ctext"
            >
              <div>
                <strong>{newsHeadline}</strong>
                <br /> {newsText}
              </div>
            </Card.Text>
          </Card.Header>

          <div
            className="d-flex mx-auto justify-content-center border border-dark border-3"
            style={{backgroundImage: `url("${mSelPicture}")`}}
            id="image"
          ></div>

          <Card.Body
            className="d-flex flex-column justify-content-center align-items-center"
            id="cardbody"
          >
            <Card.Text
              className="text-center mr-3 ml-3 mb-1"
              id="blueyou"
            >
              WHAT CAN BLUE DO FOR YOU?
            </Card.Text>
            <Card.Text
              className="mr-3 ml-3 mt-2 text-center"
              id="estimates"
            >
              All estimates and proposals are guaranteed for six months and are
              completed free of charge
            </Card.Text>
          </Card.Body>
          <Card.Body
            className="d-flex justify-content-center align-items-center"
            id="cardbody"
          >
            <Button
              className="p-2 mr-2"
              variant="dark"
              id="btn"
              href="/estimates"
            >
              REQUEST A QUOTE
            </Button>
            <Button
              className="p-2"
              variant="dark"
              id="btn"
              href="/services"
            >
              REPEAT A SERVICE
            </Button>
          </Card.Body>
        </Card>
        <MobileNavBar active ="home" />
      </MobileView>
    </>
  );
}