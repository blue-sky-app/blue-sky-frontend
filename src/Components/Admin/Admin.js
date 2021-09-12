import React, { useState, useEffect } from "react";
import axios from "axios";
import { API_BASE_URL } from "../API/Api.js";
import { MobileNavBar } from "../NavBar/MobileNavBar";
import { BrowserNavBar } from "../NavBar/BrowserNavBar";
import { BrowserView, MobileView } from "react-device-detect";
import Card from "react-bootstrap/Card";
import Table from "react-bootstrap/Table";
import Form from "react-bootstrap/Form";
import Image from "react-bootstrap/Image";
import Tabs from "react-bootstrap/Tabs";
import Tab from "react-bootstrap/Tab";
import InputGroup from "react-bootstrap/InputGroup";
import FormControl from "react-bootstrap/FormControl";
import Button from "react-bootstrap/Button";
import HeaderLogo from "../Images/topLogoBar.png";
import { DeskFooter } from "../DeskFooter/DeskFooter";
import { fName, lName, email, accountType } from "../LocalUser/LocalUser";
import './Admin.css'; 

export function Admin() {
  const [estimates, setEstimates] = useState([]);
  const [users, setUsers] = useState([]);
  const [inputValue, setInputValue] = useState([]);
  const [userSearch, setUserSearch] = useState([]);

  // This fetch is for the Estimates
  useEffect(() => {
    fetchEstimates();
  }, []);
  useEffect(() => {
    console.log(estimates);
  }, [estimates]);

  const fetchEstimates = async () => {
    const response = await axios(`${API_BASE_URL}estimates/`);
    setEstimates(response.data);
  };
 
  // This fetch is for the Users
  useEffect(() => {
    fetchUsers();
  }, []);
  useEffect(() => {
    console.log(users);
  }, [users]);

  const fetchUsers = async () => {
    const response = await axios(`${API_BASE_URL}users/`);
    setUsers(response.data);
  };

  let estimateInputs = [];

  for (let i in estimates) {
      let date = JSON.stringify(estimates[i].created_date);
      let newDate = `${date.slice(6, 8)}/${date.slice(9, 11)}/${date.slice(1, 5)}`;
      let updatedServices = [];
      for (let j in estimates[i].services) {
        updatedServices.push(
          <tr className="mx-auto" style={{background: "rgba(0, 0, 0, 0", borderStyle: "hidden"}} >
            <td>{estimates[i].services[j]}</td>
          </tr>
        )
      }
      estimateInputs.push(
        <tr style={{ fontSize: "11px", alignItems: "center"}}>
            <td className="align-self-center">{newDate}</td>
            <td className="align-self-center">{estimates[i].email}</td>
            <td className="align-self-center">{estimates[i].firstName}</td>
            <td className="align-self-center">{estimates[i].lastName}</td>
            <td className="align-self-center">{estimates[i].accountType}</td>
            <td>{updatedServices}</td>
        </tr>
      );
  }

  // posting No Service Info for users with no services
  if (estimateInputs.length === 0) {
    estimateInputs.push(
      <tr style={{ fontSize: "11px", textAlign: "center" }}>
        <td colspan="3">No Estimates Available</td>
      </tr>
    );
  }

  
  let searchResults = [];

  const handleChange = (e)  => {
    setInputValue(e.target.value)
  }

//   const userSearchDisplay = () => {
//     for (let i in users) {
//       if (inputValue === users[i].email || inputValue === users[i].lastName) {
//         searchResults.push(
//           <tr>
//             <td>{users[i].firstName}</td>
//             <td>{users[i].lastName}</td>
//             <td>{users[i].email}</td>
//             <td>{users[i].services}</td>
//             <td>{users[i].blueBucks}</td>
//           </tr>    
//         )

//       } else {
//         searchResults.push(
//           <tr>
//             <td>No Results</td>
//           </tr>
//         )}
//     }

// }
// console.log(inputValue);

  const onSubmit = (e) => {
    e.preventDefault();
    for (let i in users) {
      if (inputValue === users[i].email) {

        // Services/Invoices Info
        let updatedServices = [];
        for (let j in users[i].invoices) {
          let invoicesDate = JSON.stringify(users[i].invoices[j].date);
          let invoicesNewDate = `${invoicesDate.slice(6, 8)}/${invoicesDate.slice(9, 11)}/${invoicesDate.slice(1, 5)}`;
          let serviceCategories = [];
          for (let is in users[i].invoices[j].services) {
            serviceCategories.push(
              <td>{users[i].invoices[j].services[is]}</td>
            )
          }      
          updatedServices.push(
            <tr className="mx-auto" style={{background: "rgba(0, 0, 0, 0", borderStyle: "hidden"}} >
              <td>{invoicesNewDate}</td>
              <tr className="mx-auto" style={{background: "rgba(0, 0, 0, 0", borderStyle: "hidden"}} >
                {serviceCategories}  
              </tr>
              <td>${users[i].invoices[j].invoiceAmount}</td>
            </tr>
          )
        }

        // BlueBucks Info
        let updatedBlueBucks = [];
        for (let k in users[i].blueBucks) {
          let bBDate = JSON.stringify(users[i].blueBucks[k].date);
          let bBNewDate = `${bBDate.slice(6, 8)}/${bBDate.slice(9, 11)}/${bBDate.slice(1, 5)}`;          
          updatedBlueBucks.push(
            <tr className="mx-auto" style={{background: "rgba(0, 0, 0, 0", borderStyle: "hidden"}} >
              <td>{bBNewDate}</td>
              <td>{users[i].blueBucks[k].amount}</td>
              <td>{users[i].blueBucks[k].transactionType}</td>
            </tr>
          )
        }
        searchResults.push(
          <tr>
            <td>{users[i].firstName}</td>
            <td>{users[i].lastName}</td>
            <td>{users[i].email}</td>
            <td>{updatedServices}</td>
            <td>{updatedBlueBucks}</td>
          </tr>    
        )
      }
    }
    setUserSearch(searchResults)
  }  


  return (
    <>
      <BrowserView>
        <BrowserNavBar active ="estimates"/>
        <Card className="border-0">
          <Card.Header
            className="d-flex justify-content-center align-items-center mb-1 border-0"
            id="bchead"
          >
            Admin Console
          </Card.Header>
          <Card.Body className="w-100">
            <Tabs defaultActiveKey="profile" id="uncontrolled-tab-example" className="mb-3">
                <Tab eventKey="dashboard" title="Dashboard">
                </Tab>
                <Tab eventKey="estimates" title="Estimates">
                  <Table striped bordered hover size="sm">
                    <thead>
                      <tr>
                        <th>Date Submitted</th>
                        <th>Email</th>
                        <th>First Name</th>
                        <th>Last Name</th>
                        <th>Account Type</th>
                        <th>Services</th>
                      </tr>
                    </thead>
                    <tbody id="tbdy">
                        {estimateInputs}
                    </tbody>
                  </Table>
                </Tab>
                <Tab eventKey="searchUsers" title="Search Users">
                  <Form className="ml-3" id="form">
                    <InputGroup>
                      <FormControl
                        placeholder="Email or Last Name"
                        aria-label="Recipient's Info"
                        type="search"
                        onChange={handleChange}
                      />
                      
                      <Button
                        onClick={onSubmit}
                        className="p-2"
                        variant="dark"
                        id="btn"
                        type="submit"
                      >
                        SEARCH
                      </Button>
                    </InputGroup>
                    <Table striped bordered hover size="sm">
                      <thead>
                        <tr>
                            <th>First Name</th>
                            <th>Last Name</th>
                            <th>Email</th>
                            <th>Service History</th>
                            <th>Blue Bucks</th>
                        </tr>
                      </thead>
                      <tbody id="tbdy">{userSearch}</tbody>
                    </Table>
                  </Form>
                </Tab>
                <Tab eventKey="categories" title="Categories" disabled>
                </Tab>
            </Tabs>
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
          </Card.Header>

          <Card.Body id="mcbody">
          <Card.Title className="mb-3" id="mctitle">
          </Card.Title>
          

          </Card.Body>
        </Card>
        <MobileNavBar active ="estimates" />
      </MobileView>
    </>
  );
}