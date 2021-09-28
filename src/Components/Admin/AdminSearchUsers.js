import React, { useState, useEffect } from "react";
import { Table, Form, InputGroup, FormControl, Button } from "react-bootstrap";
import { fetchUser } from "../API/Api.js";
import Modal from "../Modal/Modal.js";
import "./Admin.css";

export function AdminSearchUsers() {
  const [users, setUsers] = useState([]);
  const [inputValue, setInputValue] = useState(null);
  const [userSearch, setUserSearch] = useState([]);
  const [isOpen, setIsOpen] = useState(false);

  // This fetch is for the Users
  useEffect(() => {
    fetchUser().then(setUsers);
  }, []);
  useEffect(() => {
    console.log(users);
  }, [users]);

  let searchResults = [];

  const handleChange = (e) => {
    setInputValue(e.target.value);
    onSubmit();
  };

  // Allows partial strings in search
  const filterItems = (el, query) => {
    if (el.toLowerCase().indexOf(query.toLowerCase()) !== -1) {
      return true;
    }
  }
  
  const onSubmit = (e) => {
    //e.preventDefault();
    for (let i in users) {
      if (
        inputValue === null ||
        inputValue === "" ||
        filterItems(users[i].email.toLowerCase(), inputValue) ||
        filterItems(users[i].lastName.toLowerCase(), inputValue) ||
        filterItems(users[i].firstName.toLowerCase(), inputValue) ||
        inputValue.toLowerCase() ===
          users[i].firstName.toLowerCase() +
            " " +
            users[i].lastName.toLowerCase()
      ) {
        // Services/Invoices Info
        let updatedServices = [];
        for (let j in users[i].invoices) {
          let invoicesDate = JSON.stringify(users[i].invoices[j].date);
          let invoicesNewDate = `${invoicesDate.slice(
            6,
            8
          )}/${invoicesDate.slice(9, 11)}/${invoicesDate.slice(1, 5)}`;
          let serviceCategories = [];
          for (let is in users[i].invoices[j].services) {
            serviceCategories.push(
              <td>{users[i].invoices[j].services[is]}</td>
            );
          }
          updatedServices.push(
            <tr
              className="mx-auto"
              style={{ background: "rgba(0, 0, 0, 0", borderStyle: "hidden" }}
            >
              <td>{invoicesNewDate}</td>
              <tr
                className="mx-auto"
                style={{ background: "rgba(0, 0, 0, 0", borderStyle: "hidden" }}
              >
                {serviceCategories}
              </tr>
              <td>${users[i].invoices[j].invoiceAmount}</td>
            </tr>
          );
        }

        // BlueBucks Info
        let updatedBlueBucks = [];
        for (let k in users[i].blueBucks) {
          let bBDate = JSON.stringify(users[i].blueBucks[k].date);
          let bBNewDate = `${bBDate.slice(6, 8)}/${bBDate.slice(
            9,
            11
          )}/${bBDate.slice(1, 5)}`;
          updatedBlueBucks.push(
            <tr
              className="mx-auto"
              style={{ background: "rgba(0, 0, 0, 0", borderStyle: "hidden" }}
            >
              <td>{bBNewDate}</td>
              <td>{users[i].blueBucks[k].amount}</td>
              <td>{users[i].blueBucks[k].transactionType}</td>
            </tr>
          );
        }
        searchResults.push(
          <tr style={{ fontSize: "11px" }}>
            <td>{users[i].firstName}</td>
            <td>{users[i].lastName}</td>
            <td>{users[i].email}</td>
            <td>{updatedServices}</td>
            <td>{updatedBlueBucks}</td>
            <td>
              <Button
                onClick={() => setIsOpen(true)}
                variant="secondary"
                size="sm"
              >
                Edit
              </Button>
            </td>
          </tr>
        );
      }
    }

    if (searchResults.length === 0) {
      searchResults.push(
        <tr style={{ fontSize: "12px", textAlign: "center" }}>
          <td colspan="6">
            Search Again...ensure you are searching for Full Name, First, Last,
            or Email.
          </td>
        </tr>
      );
    }
    setUserSearch(searchResults);
  };

  return (
    <>
      <Modal open={isOpen} onClose={() => setIsOpen(false)}>
        <h5>Update User</h5>
        <Form>
          <Form.Group size="lg" controlId="firstName">
            <Form.Control type="text" required />
          </Form.Group>
          <Form.Group size="lg" controlId="lastName">
            <Form.Control type="text" required />
          </Form.Group>
          <Form.Group>
            <Form.Control as="select">
              <option value="accountType">accountType</option>
              <option value="accountType">accountType</option>
            </Form.Control>
          </Form.Group>
          <Form.Group size="lg" controlId="email">
            <Form.Control type="email" required />
          </Form.Group>
          <Form.Group size="lg" controlId="newPassword">
            <Form.Text id="passwordHelpBlock" muted>
              Leave blank to keep your current password.
            </Form.Text>
            <Form.Control type="password" placeholder="new password" />
          </Form.Group>
          <Form.Group size="lg" controlId="confirmPassword">
            <Form.Control type="password" placeholder="confirm password" />
          </Form.Group>
          <Button id="btn" variant="dark" block size="md" type="submit">
            UPDATE
          </Button>
        </Form>
      </Modal>
      <Form className="ml-3" id="form">
        <InputGroup>
          <FormControl
            placeholder="Email or Name"
            aria-label="User Search"
            type="search"
            onChange={handleChange}
          />
          
        </InputGroup>
      </Form>
      <Table striped bordered hover size="sm" className="mt-2">
        <thead>
          <tr>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Email</th>
            <th>Service History</th>
            <th>Blue Bucks</th>
            <th>Edit</th>
          </tr>
        </thead>
        <tbody id="tbdy">{userSearch}</tbody>
      </Table>
    </>
  );
}
