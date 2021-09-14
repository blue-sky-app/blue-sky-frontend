import React, { useState, useEffect } from "react";
import axios from "axios";
import { API_BASE_URL, restrictPage } from "../API/Api.js";
import { MobileNavBar } from "../NavBar/MobileNavBar";
import { BrowserNavBar } from "../NavBar/BrowserNavBar";
import { BrowserView, MobileView } from "react-device-detect";
import Card from "react-bootstrap/Card";
import Form from "react-bootstrap/Form";
import Image from "react-bootstrap/Image";
import Button from "react-bootstrap/Button";
import HeaderLogo from "../Images/topLogoBar.png";
import { DeskFooter } from "../DeskFooter/DeskFooter";
import { fName, lName, email, accountType } from "../LocalUser/LocalUser";
import './Estimates.css'; 

export function Estimates() {
  const [servicecategories, setServicecategories] = useState([]); 
  
  useEffect(() => {
    restrictPage();
  }, []);

  // This fetch is for the Categories
  useEffect(() => {
    fetchCategory();
  }, []);
  useEffect(() => {
    console.log(servicecategories);
  }, [servicecategories]);

  const fetchCategory = async () => {
    const response = await axios(`${API_BASE_URL}servicecategories/`);
    setServicecategories(response.data);
  };

  const estimateServiceArray = [];

  /*const handleChange = (e)  => {
    let isChecked = e.target.checked;
    let checkedName = e.target.name;

    if (isChecked === true){
      estimateServiceArray.push(checkedName)
    }

    console.log(estimateServiceArray)
  }*/
  
  // Creating the table for Estimates
  let categoryTable = [];
  let categories = [];
  useEffect(() => {
    console.log(categories);
  });

  let servID = 1;
  for (let i in servicecategories) {
    if (accountType === servicecategories[i].customerType) {
      for (let j in servicecategories[i].services) {
        categories.push(
          <Form.Group controlId= {servID++}>
          <Form.Check 
            className="mb-2" 
            style={{fontSize: "14px"}}
            type="checkbox" label={servicecategories[i].services[j]}
            name={servicecategories[i].services[j]}

          /></Form.Group>
        )
      }
      categoryTable.push(
        <Form className="ml-3" id="form">
          {categories}
        </Form>
      );
    }
  }

  const onSubmit = (e) => {
    e.preventDefault();
    let checkID = 1;
    for(let i=0; i < categories.length; i++) {
      if(document.getElementById(checkID+i).checked) {
        estimateServiceArray.push(document.getElementById(checkID+i).name)
      }
    }
    console.log(estimateServiceArray)
    const estimateInput = {
      email: email,
      firstName: fName,
      lastName: lName,
      accountType: accountType,
      services: estimateServiceArray,
    };
    axios.post(API_BASE_URL + "estimates/", estimateInput)
        .then((res) => {
            if (res.status === 200) {
              window.location.href = '/thankYou';
            } 
          console.log(res.data)
        })
        .catch((error) => {
            console.log(error);
        });
  }

  return (
    <>
      <BrowserView>
        <BrowserNavBar active ="estimates"/>
        <Card className="border-0 w-100 mx-auto">
          <Card.Header
            className="d-flex justify-content-center align-items-center mb-4 border-0"
            id="bchead"
          >
            {fName}'s Estimate
          </Card.Header>

          <Card.Body className="mx-auto" id="bcbody">
            <Card.Title className="mb-3" id="bctitle">
                <strong>{accountType}</strong> Services
            </Card.Title>
          
            <div>
              {categoryTable}
              <Button
                onClick={onSubmit}
                className="p-2 mt-2"
                variant="dark"
                id="btn"
                type="submit"
              >
                SUBMIT
              </Button>
            </div>
          </Card.Body>
          
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
            {fName}'s Estimate
          </Card.Header>

          <Card.Body id="mcbody">
          <Card.Title className="mb-3" id="mctitle">
              <strong>{accountType}</strong> Services
          </Card.Title>
          
          <Form className="ml-3">
            {categoryTable}
            <Button 
              onClick={onSubmit}
              className="p-2 mt-2"
              variant="dark"
              id="mbtn" 
              href="/thankYou"
              type="submit"
            >
              SUBMIT
            </Button>
          </Form>
          </Card.Body>
        </Card>
        <MobileNavBar active ="estimates" />
      </MobileView>
    </>
  );
}