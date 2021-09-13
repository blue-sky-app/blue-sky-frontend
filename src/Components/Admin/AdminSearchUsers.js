import React, { useState, useEffect } from "react";
import axios from "axios";
import { API_BASE_URL } from "../API/Api.js";
import Table from "react-bootstrap/Table";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import FormControl from "react-bootstrap/FormControl";
import Button from "react-bootstrap/Button";
import './Admin.css'; 

export function AdminSearchUsers() {
  const [users, setUsers] = useState([]);
  const [inputValue, setInputValue] = useState([]);
  const [userSearch, setUserSearch] = useState([]);
 
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

  let searchResults = [];

  const handleChange = (e)  => {
    setInputValue(e.target.value)
  }

  const onSubmit = (e) => {
    e.preventDefault();
    for (let i in users) {
      if (inputValue === users[i].email || inputValue === users[i].lastName || inputValue === users[i].firstName) {

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
        
        <Table striped bordered hover size="sm" className="mt-2">
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

  );
}