// Author(s): Dan, Sam
import React, { useState, useEffect } from "react";
import { Table, Form, InputGroup, FormControl, Button } from "react-bootstrap";
import { fetchUsers } from "../API/Api.js";
import Modal from "../Modal/Modal.js";
import { UpdateUser } from "../Forms/UpdateUser.js";
import "./Admin.css";

// Provides search user tab content for admin console
export function AdminSearchUsers() {
  const [token] = useState(sessionStorage.getItem('token') || '');
  const [users, setUsers] = useState([]);
  const [userSearch, setUserSearch] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [userState, setUserState] = useState({
    userId: "",
    firstName: "",
    lastName: "",
    accountType: "",
    email: "",
    newPassword: "",
    confirmPassword: "",
  });

  // This fetch is for the Users
  useEffect(() => {
    fetchUsers(token).then(setUsers);
  }, [token]);

  let searchResults = [];
  var inputValue = "";

  const handleChange = (e) => {
    inputValue = e.target.value;
    onSearch();
  };

  // Allows partial strings in search
  const filterItems = (el, query) => {
    if (el.toLowerCase().indexOf(query.toLowerCase()) !== -1) {
      return true;
    }
  };

  const onSubmit = (e) => {
    e.preventDefault();
    inputValue = document.getElementById("userSearch").value;
    onSearch();
  };

  const refreshData = () => {
    fetchUsers(token).then(setUsers);
  }

  // Get values for user form from <td> elements in row
  const getUserValues = (ui, fn, ln, at, em) => {
    setIsOpen(true);
    setUserState((prevState) => ({
      ...prevState,
      userId: ui,
      firstName: fn,
      lastName: ln,
      accountType: at,
      email: em,
    }));
  };

  // get user db id on selecting from table
  const getUserId = (email) => {
    for (const [i, user] of users.entries()) {
      if (email === user.email) {
        return user._id;
      }
    }
  };

  //This provides the search function and table data population
  const onSearch = () => {
    inputValue = document.getElementById("userSearch").value;
    for (let i in users) {
      if (
        inputValue === null ||
        inputValue === "" ||
        filterItems(users[i].email.toLowerCase(), inputValue) ||
        filterItems(users[i].lastName.toLowerCase(), inputValue) ||
        filterItems(users[i].firstName.toLowerCase(), inputValue) ||
        filterItems(
          users[i].firstName.toLowerCase() +
            " " +
            users[i].lastName.toLowerCase(), inputValue
        )
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
            <tr className="mx-auto" id="adminRow">
              <td>{invoicesNewDate}</td>
              <tr className="mx-auto" id="adminRow">
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
            <tr className="mx-auto" id="adminRow">
              <td>{bBNewDate}</td>
              <td>{users[i].blueBucks[k].amount}</td>
              <td>{users[i].blueBucks[k].transactionType}</td>
            </tr>
          );
        }
        const getTD = (td) => {
          return document.getElementById(td).innerText;
        };

        searchResults.push(
          <tr id={[i]}>
            <td key={[i] + 0 + "d"} id={[i] + 0 + "d"}>{users[i].firstName}</td>
            <td key={[i] + 1 + "d"} id={[i] + 1 + "d"}>{users[i].lastName}</td>
            <td key={[i] + 2 + "d"} id={[i] + 2 + "d"}>{users[i].email}</td>
            <td key={[i] + 3 + "d"} id={[i] + 3 + "d"}>{users[i].accountType}</td>
            <td key={[i] + 4 + "d"} id={[i] + 4 + "d"}>{updatedServices}</td>
            <td key={[i] + 5 + "d"} id={[i] + 5 + "d"}>{updatedBlueBucks}</td>
            <td>
              <Button
                id={[i] + "b"}
                onClick={() => {
                  getUserValues(
                    getUserId(getTD([i] + 2 + "d")),
                    getTD([i] + 0 + "d"),
                    getTD([i] + 1 + "d"),
                    getTD([i] + 3 + "d"),
                    getTD([i] + 2 + "d")
                  );
                }}
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
        <tr id="tableFont">
          <td colspan="7">
            Search Again...ensure you are searching for Full Name, First Name,
            Last Name, or Email.
          </td>
        </tr>
      );
    }
    setUserSearch(searchResults);
  };


  return (
    <>
      <Modal tab="users" search={onSearch} open={isOpen} onClose={() => setIsOpen(false)}>
        <UpdateUser
          refreshData={refreshData}
          userId={userState.userId}
          fName={userState.firstName}
          lName={userState.lastName}
          accountType={userState.accountType}
          email={userState.email}
        />
      </Modal>
      <Form className="ml-3" id="bform">
        <InputGroup>
          <FormControl
            placeholder="Leave blank to search all"
            aria-label="User Search"
            type="search"
            id="userSearch"
            onChange={handleChange}
          />

          <Button
            onClick={onSubmit}
            className="ml-2 p-2"
            variant="dark"
            id="btn"
            type="submit"
          >
            SEARCH
          </Button>
        </InputGroup>
      </Form>
      <Table
        striped
        bordered
        hover
        size="sm"
        className="mt-2"
        id="searchResults"
      >
        <thead>
          <tr>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Email</th>
            <th>Account Type</th>
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
