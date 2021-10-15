import React, { useState, useEffect } from "react";
import { Form, Button } from "react-bootstrap";
import { Message } from "../Message/Message.js";
import "../Profile/Profile.css";
import Modal from "../Modal/Modal.js";
import { updateCategories } from "../API/Api.js";

export function UpdateCategories(props) {

  const [token] = useState(sessionStorage.getItem('token') || '');
  const [formServices, setFormServices] = useState();
  const [selectServices, setSelectServices] = useState([]);
  const [formButtons, setFormButtons] = useState('');
  const [superContent, setSuperContent] = useState('');
  const [state, setState] = useState({
    catId: "",
    updated: false,
    display: false,
    type: "",
    message: "",
  });
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    console.log(state.catId)
  }, [state.catId]);

  let formCategories = [];
  let categoryType;
  let newService = "";

  for(let i in props.categories) {
    formCategories.push(
    <option value={props.categories[i].customerType}>{props.categories[i].customerType}</option>)
  }

  const handleSelect = (e) => {
    setState((prevState) => ({
      ...prevState,
      display: false
    }));
    categoryType = e.target.value
    buildServiceList();
  };

  const handleAdd = (e) => {
    e.preventDefault();
    setState((prevState) => ({
      ...prevState,
      display: false
    }));
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
              onClick={updateServices}
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
    const { value } = e.target;
    newService = value;
  };

  useEffect(() => {
    console.log(newService)
  }, [newService]);

  const updateServices = (e) => {
    console.log(newService);
    console.log(selectServices);
    e.preventDefault();
    var input = document.getElementById("newService").value
    const regex = /[a-zA-Z]/;
    if (regex.test(input)) {
      setSelectServices(serv => serv.concat(newService));
      setState((prevState) => ({
        ...prevState,
        updated: true,
      }));
      setState((prevState) => ({
        ...prevState,
        display: true,
        type: "success",
        message: "serviceAdded",
      }));
      document.getElementById("newService").value = "";
    }
    
    else {
      setState((prevState) => ({
        ...prevState,
        display: true,
        type: "fail",
        message: "blank",
      }));
    }
  }

  const submitServiceArray = () => {
    if (state.updated === true) {
      console.log(selectServices);
      var servArray = {
        services: selectServices
      };
      sendDetailsToServer(servArray);
    }
    setState((prevState) => ({
      ...prevState,
      updated: false,
      display: false
    }));
  }
  
  const sendDetailsToServer = (serviceArray) => {
    console.log(serviceArray);
    updateCategories(state.catId, serviceArray, token, props.refreshData)
  };

  useEffect (() => {
    console.log(selectServices);
  }, [selectServices]);

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
    let selectServices = [];
    let servId=1;
    for(let i in props.categories) {
      if(props.categories[i].customerType === categoryType) {
        setState((prevState) => ({
          ...prevState,
          catId: props.categories[i]._id
        }));
        for(let j in props.categories[i].services){
          if (categoryType==="Residential") {
            selectServices.push(props.categories[i].services[j]);
            services.push(
              <Form.Group controlId={servId++} key={servId + "res"}>
              <Form.Check
                className="mb-2 ml-2"
                style={{ fontSize: "14px" }}
                type="checkbox"
                label={props.categories[i].services[j]}
                name={props.categories[i].services[j]}
              />
              </Form.Group>
            );
          }
          else if (categoryType ==="Commercial") {
            selectServices.push(props.categories[i].services[j]);
            services.push(
              <Form.Group controlId={servId++} key={servId + "com"}>
              <Form.Check
                className="mb-2 ml-2"
                style={{ fontSize: "14px" }}
                type="checkbox"
                label={props.categories[i].services[j]}
                name={props.categories[i].services[j]}
              />
              </Form.Group>
            )
          }
        } 
        showButtons(true) 
      }
      else if(categoryType === "accountType"){
        services = [];
        showButtons(false)
      }
    }
    setFormServices(services);
    setSelectServices(selectServices);
  };

  const showButtons = (state) => {
    let buttons;
    if(state) {
      buttons =
      <>
        <Button id="btn" variant="dark" block size="md" type="submit" onClick={handleAdd}>
          ADD NEW SERVICE(S)
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
      <Modal open={isOpen} onClose={() => setIsOpen(false)} submit={submitServiceArray} tab={"categories"} >
        <Message
              device="browser"
              display={state.display}
              type={state.type}
              message={state.message}
        />
        {superContent}</Modal>
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