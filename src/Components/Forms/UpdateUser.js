// Author(s): Sam
import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  API_BASE_URL,
  userExistsByEmail,
  headers
} from "../API/Api.js";
import { Form, Button } from "react-bootstrap";
import { Message } from "../Message/Message.js";
import "../Profile/Profile.css";
import validator from "validator";
import Modal from "../Modal/Modal.js";

// Provides edit form for search users tab
export function UpdateUser(props) {
  const [token] = useState(sessionStorage.getItem('token') || '');
  const [accountOption, setAccountOption] = useState();
  const [accountOptionTwo, setAccountOptionTwo] = useState();
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
      .put(API_BASE_URL + "/User/" + state.userId, info, headers(token))
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

  // Performs .delete operation through API to Db to remove user profile
  const sendDeleteRequest = (e) => {
    e.preventDefault();
    setIsOpen(false);
    axios
      .delete(API_BASE_URL + "/User/" + state.userId, headers(token))
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
  const handleUpdate = async (e) => {
    e.preventDefault();
    setState((prevState) => ({
      ...prevState,
      message: "",
    }));
    if (state.newPassword !== state.confirmPassword) {
      setState((prevState) => ({
        ...prevState,
        display: true,
        type: "fail",
        message: "password",
      }));
      return;
    }
    if (state.email !== props.email) {
      if (! validator.isEmail(state.email)) {
        setState((prevState) => ({
          ...prevState,
          display: true,
          type: "fail",
          message: "emailFormat",
        }));
        return;
      }
      if (await userExistsByEmail(state.email)) {
        setState((prevState) => ({
          ...prevState,
          display: true,
          type: "fail",
          message: "duplicate",
        }));
        return;
      }
    }
    updateUser();
  };

  // Sets default value of account type for form dropdown
  useEffect(() => {
    if (props.accountType === "Commercial") {
      setAccountOption("Residential");
      setAccountOptionTwo("Administrator");
    } else if (props.accountType === "Residential") {
      setAccountOption("Commercial");
      setAccountOptionTwo("Administrator");
    } else {
      setAccountOption("Commercial");
      setAccountOptionTwo("Residential");
    }
  }, [props.accountType]);

  const openSuperModal = (e) => {
    e.preventDefault();
    setIsOpen(true);
  }

  return (
    <>
      <Modal open={isOpen} onClose={() => setIsOpen(false)}><p>Are you sure you want <br></br> to delete this profile?</p>
        <Button
          onClick={sendDeleteRequest}
          id="btn"
          variant="warning"
          block
          size="md"
          type="submit"
        >
          CONFIRM DELETE
        </Button>
      </Modal>
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
                <option value={accountOptionTwo}>{accountOptionTwo}</option>
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
              variant="danger"
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
