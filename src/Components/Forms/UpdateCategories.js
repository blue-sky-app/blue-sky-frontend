import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  API_BASE_URL,
  fetchUser,
  headers
} from "../API/Api.js";
import { Form, Button } from "react-bootstrap";
import { Message } from "../Message/Message.js";
import "../Profile/Profile.css";
import SuperModal from "../Modal/SuperModal.js";

export function UpdateCategories(props) {

  const [token, setToken] = useState(sessionStorage.getItem('token') || '');
  const [categories, setCategories] = useState([]);
  const [formServices, setFormServices] = useState();
  const [formButtons, setFormButtons] = useState('');
  const [superContent, setSuperContent] = useState('');
  const [state, setState] = useState({
    newService: "",
    display: false,
    type: "",
    message: "",
  });
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    setCategories(props.categories)
    console.log(categories)
  }, [props.categories, categories]);

  let formCategories = [];
  let categoryType;

  for(let i in categories) {
    formCategories.push(
    <option value={categories[i].customerType}>{categories[i].customerType}</option>)
  }

  const handleSelect = (e) => {
    setState((prevState) => ({
      ...prevState,
      display: false
    }));
    categoryType = e.target.value
    buildServiceList();
    console.log(categoryType)
  };

  const handleAdd = (e) => {
    e.preventDefault();
    setIsOpen(true);
    setSuperContent(
      <Form>
        <Form.Group size="lg" controlId="newService">
        <Form.Control
                type="text"
                placeholder="Enter new service name."
                onChange={handleChange}
                required
              />
        </Form.Group>
        <Button
              onClick={submitAdd}
              id="btn"
              variant="dark"
              block
              size="md"
              type="submit"
            >
              SUBMIT
        </Button>
      </Form>
    );
  }

  const handleChange = (e) => {
    const { id, value } = e.target;
    setState((prevState) => ({
      ...prevState,
      [id]: value,
    }));
  };

  const submitAdd = (e) => {
    e.preventDefault();
    setIsOpen(false);
    setState((prevState) => ({
      ...prevState,
      display: true,
      type: "success",
      message: "serviceAdded",
    }));
  }

  const handleDelete = (e) => {
    e.preventDefault();
    setIsOpen(true);
    setSuperContent(
      <>
        <p>Are you sure you want to delete <br></br> selected services?</p>
        <Button
                onClick={confirmDelete}
                class="btn"
                id="btn"
                variant="warning"
                block
                size="md"
                type="submit"
              >
                CONFIRM DELETE
        </Button>
      </>
    )
  }

  const confirmDelete = (e) => {
    e.preventDefault();
    setIsOpen(false);
    setState((prevState) => ({
      ...prevState,
      display: true,
      type: "success",
      message: "delete",
    }));
  }

  const buildServiceList = () => {
    let services = [];
    let servId=1;
    for(let i in categories) {
      if(categories[i].customerType === categoryType) {
        for(let j in categories[i].services){
          services.push(
            <Form.Group controlId={servId++}>
            <Form.Check
              className="mb-2 ml-2"
              style={{ fontSize: "14px" }}
              type="checkbox"
              label={categories[i].services[j]}
              name={categories[i].services[j]}
            />
            </Form.Group>
          )
        } 
        showButtons(true) 
      }
      else if(categoryType === "accountType"){
        services = [];
        showButtons(false)
      }
    }
    setFormServices(services);
    console.log(formServices)
  };

  const showButtons = (state) => {
    let buttons;
    if(state) {
      buttons =
      <>
        <Button id="btn" variant="dark" block size="md" type="submit" onClick={handleAdd}>
          ADD
        </Button>
        <Button id="btn" variant="danger" block size="md" type="submit" onClick={handleDelete}>
          DELETE SELECTED
        </Button>
      </>;
    }
    else if(!state){
      buttons = "";
      console.log("working")
    }
    setFormButtons(buttons);
  }


  return(
    <>
      <SuperModal open={isOpen} onClose={() => setIsOpen(false)}>{superContent}</SuperModal>
      <h5>Update Services</h5>
      <Form>
            <Form.Group>
              <Form.Control 
              as="select"
              className="fcontrol"
              type="text"
              onChange={handleSelect}
              >
                <option value="accountType">Choose a Service Category</option>
                {formCategories}
              </Form.Control>
            </Form.Group>
              {formServices}
            <Message
              device="browser"
              display={state.display}
              type={state.type}
              message={state.message}
            />
            {formButtons}
          </Form>
    </>
  )
}