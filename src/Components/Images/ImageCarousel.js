import React, { useState } from "react";
import Carousel from "react-bootstrap/Carousel";
import Image from "react-bootstrap/Image";
import FirstSlide from "./Driveway_before_after.jpg";
import SecondSlide from "./Courtyard_before_after.jpg";
import ThirdSlide from "./Patio_before_after.jpg";


export function ImageCarousel() {
    const [index, setIndex] = useState(0);
  
    const handleSelect = (selectedIndex, e) => {
      setIndex(selectedIndex);
    };
  
    return (
      <Carousel activeIndex={index} onSelect={handleSelect} className="mx-auto mt-2 mb-2">
        <Carousel.Item>
          <Image src={FirstSlide} className="d-block" style={{maxHeight: "75vh"}} alt="First slide"></Image>

          <Carousel.Caption>
            <h3>First slide label</h3>
            <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <Image src={SecondSlide} className="d-block" style={{maxHeight: "75vh"}} alt="Second slide"></Image>

  
          <Carousel.Caption>
            <h3>Second slide label</h3>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <Image src={ThirdSlide} className="d-block" style={{maxHeight: "75vh"}} alt="Third slide"></Image>

  
          <Carousel.Caption>
            <h3>Third slide label</h3>
            <p>
              Praesent commodo cursus magna, vel scelerisque nisl consectetur.
            </p>
          </Carousel.Caption>
        </Carousel.Item>
      </Carousel>
    );
  }