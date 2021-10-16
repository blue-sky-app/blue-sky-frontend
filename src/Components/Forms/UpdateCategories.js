import React, { useState, useEffect } from "react";
import { Form, Button } from "react-bootstrap";
import { Message } from "../Message/Message.js";
import "../Profile/Profile.css";
import Modal from "../Modal/Modal.js";
import { updateCategories } from "../API/Api.js";

export function UpdateCategories(props) {

  const [token] = useState(sessionStorage.getItem('token') || '');
  const [formCategories, setFormCategories] = useState([]);
  const [formServices, setFormServices] = useState();
  const [selectServices, setSelectServices] = useState([]);
  const [formButtons, setFormButtons] = useState('');
  const [modalContent, setModalContent] = useState('');
  const [sendArray, setSendArray] = useState(false);
  const [state, setState] = useState({
    catId: "",
    action: "",
    deleteProcess: false,
    updated: false,
    display: false,
    type: "",
    message: "",
  });
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    let formCategories = [];
    for(let i in props.categories) {
      formCategories.push(
      <option value={props.categories[i].customerType}>{props.categories[i].customerType}</option>)
    }
    setFormCategories(formCategories);
  }, [props.categories]);

  const handleAdd = (e) => {
    e.preventDefault();
    setState((prevState) => ({
      ...prevState,
      display: false
    }));
    setIsOpen(true);
    setModalContent(
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

  let newService = "";

  const handleChange = (e) => {
    const { value } = e.target;
    newService = value;
  };

  useEffect(() => {
    console.log(newService)
  }, [newService]);

  //test
  useEffect(() => {
    console.log(newService)
  }, [newService]);

  const updateServices = (e) => {
    e.preventDefault();
    var input = document.getElementById("newService").value
    const regex = /[a-zA-Z]/;
    if (regex.test(input)) {
      setSelectServices(serv => serv.concat(newService));
      setState((prevState) => ({
        ...prevState,
        action: "add"
      }));
      setSendArray(true);
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

  useEffect (() => {
    if (sendArray === true) {
      console.log(selectServices);
      var servArray = {
        services: selectServices
      };
      //sending array
      console.log(servArray);
      updateCategories(state.catId, servArray, token)
      setSendArray(false);
    }
    if (state.action === "add") {
      setState((prevState) => ({
        ...prevState,
        display: true,
        type: "success",
        message: "serviceAdded",
      }));
    }

    else if (state.action === "delete") {
      setState((prevState) => ({
        ...prevState,
        display: true,
        type: "success",
        message: "delete",
      }));
    }

    else if (state.action === "none") {
      setState((prevState) => ({
        ...prevState,
        display: false
      }));
    }
  }, [selectServices, sendArray, state.catId, token, state.action])

  useEffect (() => {
    console.log(`selectServices = ${selectServices}`);
  }, [selectServices]);

  const handleDelete = (e) => {
    e.preventDefault();
    setState((prevState) => ({
      ...prevState,
      deleteProcess: true,
      display: false
    }));
    console.log(state.display);
  }
  
  useEffect (() => {
    if (state.deleteProcess === true) {
      setState(() => ({
        display: false
      }));
      let newArray = [];
      for (let i = 0; i < formServices.length; i++) {
        let ele = document.getElementById(i + 1);
        if (!ele.checked) {
          newArray.push(ele.name);
        }
      }

      if (newArray.length === formServices.length) {
        setState(() => ({
          display: true,
          type: "fail",
          message: "noService",
        }));
        return;
      }

      else {
        setSelectServices(newArray);
        setState((prevState) => ({
          ...prevState,
        deleteProcess: false,
        }));
        setIsOpen(true);
        setModalContent(
          <>
            <p>Are you sure you want to delete <br></br> selected service(s)?</p>
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
    }
  }, [selectServices, state.deleteProcess, formServices, state.display])

  const confirmDelete = (e) => {
    e.preventDefault();
    setIsOpen(false);
    setSendArray(true);
    setState((prevState) => ({
      ...prevState,
     action: "delete"
    }));
  }

  let categoryType;

  // Sets the service category based on admin selection from list
  const handleSelect = (e) => {
    setState((prevState) => ({
      ...prevState,
      action: "none"
    }));
    categoryType = e.target.value
    buildServiceList();
  };

  // Takes the category selection and matches it to category objects to pull down
  // the correct services and build the form fields.
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
    }
    setFormButtons(buttons);
  }

  const clearMessage = () => {
    setState((prevState) => ({
      ...prevState,
      display: false,
      message: ""
    }));
  }


  return(
    <>
      <Modal 
        open={isOpen} 
        onClose={() => setIsOpen(false)} 
        tab={"categories"} 
        submit={props.refreshData} 
        clear={clearMessage}
      >
        <Message
              device="browser"
              display={state.display}
              type={state.type}
              message={state.message}
        />
        {modalContent}
      </Modal>
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