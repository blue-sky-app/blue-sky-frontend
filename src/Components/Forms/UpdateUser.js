import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  API_BASE_URL,
  fetchUser
} from "../API/Api.js";
import { Form, Button } from "react-bootstrap";
import { Message } from "../Message/Message.js";
import "../Profile/Profile.css";
import validator from "validator";
import SuperModal from "../Modal/SuperModal.js";

export function UpdateUser(props) {
  const [accountOption, setAccountOption] = useState();
  const [users, setUsers] = useState([]);
  const [state, setState] = useState({
    userId: props.userId,
    email: props.email,
    firstName: props.fName,
    lastName: props.lName,
    accountType: props.accountType,
    newPassword: "",
    confirmPassword: "",
    display: false,
    type: "",
    message: "",
  });
  const [isOpen, setIsOpen] = useState(false);

  // If email is changed, this fetches all user's emails for duplication check
  useEffect(() => {
    if (state.email !== props.email) {
      fetchUser().then(setUsers);
    }
  }, [props.email, state.email]);

  // Sets state of profile items by grabbing form field control id and matching it with const
  const handleChange = (e) => {
    const { id, value } = e.target;
    setState((prevState) => ({
      ...prevState,
      [id]: value,
    }));
  };

  // Sets account type based on selection
  const handleSelect = (e) => {
    setState((prevState) => ({
      ...prevState,
      accountType: e.target.value
    }));
  };

  // Sends updated user info array to server to update db
  const sendDetailsToServer = (info) => {
    axios
      .put(API_BASE_URL + "/User/" + state.userId, info)
      .then(function (response) {
        if (response.status === 200) {
          setState((prevState) => ({
            ...prevState,
            display: true,
            type: "success",
            message: "update",
          }));
          props.refreshData();
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const sendDeleteRequest = (e) => {
    e.preventDefault();
    setIsOpen(false);
    axios
      .delete(API_BASE_URL + "/User/" + state.userId)
      .then(function (response) {
        if (response.status === 200) {
          setState((prevState) => ({
            ...prevState,
            display: true,
            type: "success",
            message: "delete",
          }));
          props.refreshData();
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  // Check if updated email already exists in db, then calls updateUser function
  const checkEmailDup = () => {
    var duplicate;
    if (state.email !== props.email) {
      for (let i in users) {
        if (validator.isEmail(state.email)) {
          if (state.email === users[i].email) {
            duplicate = true;
            setState((prevState) => ({
              ...prevState,
              display: true,
              type: "fail",
              message: "duplicate",
            }));
            return;
          } else {
            duplicate = false;
          }
        }
        else {
          setState((prevState) => ({
            ...prevState,
            display: true,
            type: "fail",
            message: "emailFormat",
          }));
          return;
        }
      }
    }
    if (!duplicate) {
      updateUser();
    }
  };

  // Checks if all required fields have values before calling server update function
  const updateUser = () => {
    if (
      state.newPassword.length &&
      state.firstName.length &&
      state.lastName.length &&
      state.email.length
    ) {
      var payload = {
        firstName: state.firstName,
        lastName: state.lastName,
        email: state.email,
        accountType: state.accountType,
        password: state.newPassword,
        confirmPassword: state.confirmPassword,
      };
      sendDetailsToServer(payload);
      console.log(state.newPassword);
    } else if (
      !state.newPassword.length &&
      state.firstName.length &&
      state.lastName.length &&
      state.email.length
    ) {
      payload = {
        firstName: state.firstName,
        lastName: state.lastName,
        email: state.email,
        accountType: state.accountType,
      };
      sendDetailsToServer(payload);
    } else {
      setState((prevState) => ({
        ...prevState,
        display: true,
        type: "fail",
        message: "required",
      }));
    }
  };

  // Checks password values to ensure they match, then calls email check 
  const handleUpdate = (e) => {
    e.preventDefault();
    setState((prevState) => ({
      ...prevState,
      message: "",
    }));
    if (state.newPassword === state.confirmPassword) {
      checkEmailDup();
    } else {
      setState((prevState) => ({
        ...prevState,
        display: true,
        type: "fail",
        message: "password",
      }));
    }
  };

  // Sets default value of account type for form dropdown
  useEffect(() => {
    if (props.accountType === "Commercial") {
      setAccountOption("Residential");
    } else {
      setAccountOption("Commercial");
    }
  }, [props.accountType]);

  const openSuperModal = (e) => {
    e.preventDefault();
    setIsOpen(true);
  }

  return (
    <>
      <SuperModal open={isOpen} onClose={() => setIsOpen(false)}><p>Are you sure?</p>
        <Button
          onClick={sendDeleteRequest}
          id="btn"
          variant="dark"
          block
          size="md"
          type="submit"
        >
          DELETE PROFILE
        </Button>
      </SuperModal>
      <h5>Update User</h5>
        <div className="w-100 mx-auto" id="form">
          <Form>
            <Form.Group size="lg" controlId="firstName">
              <Form.Control
                type="text"
                defaultValue={state.firstName}
                placeholder={props.fName + " - required"}
                onChange={handleChange}
                required
              />
            </Form.Group>
            <Form.Group size="lg" controlId="lastName">
              <Form.Control
                type="text"
                defaultValue={state.lastName}
                placeholder={props.lName + " - required"}
                onChange={handleChange}
                required
              />
            </Form.Group>
            <Form.Group>
              <Form.Control
                as="select"
                defaultValue={state.accountType}
                onChange={handleSelect}
              >
                <option value={props.accountType}>{props.accountType}</option>
                <option value={accountOption}>{accountOption}</option>
              </Form.Control>
            </Form.Group>
            <Form.Group size="lg" controlId="email">
              <Form.Control
                type="email"
                defaultValue={state.email}
                placeholder={props.email + " - required"}
                onChange={handleChange}
                required
              />
            </Form.Group>
            <Form.Group size="lg" controlId="newPassword">
              <Form.Text id="passwordHelpBlock" muted>
                Leave blank to keep your current password.
              </Form.Text>
              <Form.Control
                type="password"
                defaultValue={state.newPassword}
                placeholder="new password"
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group size="lg" controlId="confirmPassword">
              <Form.Control
                type="password"
                defaultValue={state.confirmPassword}
                placeholder="confirm password"
                onChange={handleChange}
              />
            </Form.Group>
            <Message
              device="browser"
              display={state.display}
              type={state.type}
              message={state.message}
            />
            <Button
              onClick={handleUpdate}
              id="btn"
              variant="dark"
              block
              size="md"
              type="submit"
            >
              UPDATE
            </Button>
            <Button
              onClick={openSuperModal}
              id="btn"
              variant="dark"
              block
              size="md"
              type="submit"
            >
              DELETE PROFILE
            </Button>
          </Form>
        </div>
    </>
  );
}
