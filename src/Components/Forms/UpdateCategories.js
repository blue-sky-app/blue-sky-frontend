// Author(s): Sam
import React, { useState, useEffect } from "react";
import { Form, Button } from "react-bootstrap";
import { Message } from "../Message/Message.js";
import "../Profile/Profile.css";
import Modal from "../Modal/Modal.js";
import { updateCategories } from "../API/Api.js";

// Provides edit form for admin categories tab
export function UpdateCategories(props) {

  const [token] = useState(sessionStorage.getItem('token') || '');
  const [formCategories, setFormCategories] = useState([]);
  const [serviceCheck, setServiceCheck] = useState();
  const [checkServStat, setCheckServStat] = useState(false);
  const [formServices, setFormServices] = useState();
  const [selectServices, setSelectServices] = useState([]);
  const [formButtons, setFormButtons] = useState('');
  const [modalContent, setModalContent] = useState('');
  const [sendArray, setSendArray] = useState(false);
  const [deleteServices, setDeleteServices] = useState([]);
  const [catState, setCatState] = useState({
    catId: "",
    catType: "",
    refresh: props.refreshData
  });
  const [state, setState] = useState({
    action: "",
    deleteProcess: false,
    updated: false,
    display: false,
    type: "",
    message: "",
  });
  const [isOpen, setIsOpen] = useState(false);

  // Sets category options for user to select
  useEffect(() => {
    let formCategories = [];
    for(let i in props.categories) {
      formCategories.push(
      <option value={props.categories[i].customerType}>{props.categories[i].customerType}</option>)
    }
    setFormCategories(formCategories);
  }, [props.categories]);

  // Provides "Add" form in second modal when "Add Service" button is pressed.
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
                placeholder="Enter new service name"
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

  // Sets value of new service entered and runs Service Check function
  const handleChange = (e) => {
    const { value } = e.target;
    newService = value;
    // Capitalize first letter in each word
    const finalValue = newService.replace(/(^\w{1})|(\s+\w{1})/g, letter => letter.toUpperCase());
    newService = finalValue;
    setServiceCheck(finalValue);
    setCheckServStat(true);
  };

  // Service Check function - Checks if new service entered is a duplicate of one already on the service list
  useEffect(() => {
    if (checkServStat === true) {
      if (selectServices.includes(serviceCheck)) {
        setState((prevState) => ({
          ...prevState,
          display: true,
          type: "fail",
          message: "serviceDup"
        }));
      }
      else {
        setState((prevState) => ({
          ...prevState,
          action: "none",
          display: false,
          type: "",
          message: ""
        }));
      }
      setCheckServStat(false);
    }
  }, [selectServices, serviceCheck, checkServStat])

  // Handles "Submit" button for adding new services. 
  // Checks if input field is still blank before submitting new service
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

  // Reorders selectedServices array if "Others" is present, removes duplicate values and sends it to the db
  useEffect (() => {
    if (sendArray === true) {
      let newArray = selectServices;
      if (selectServices.includes("Other")) {
        newArray.push(newArray.splice(newArray.indexOf("Other"), 1)[0]);
      }
      let uniqueArr = [...new Set(newArray)];
      setSelectServices(uniqueArr);
      var servArray = {};

      if (state.action === "add") {
        servArray = {
          services: uniqueArr
        };
        setState((prevState) => ({
          ...prevState,
          action: "none",
          display: true,
          type: "success",
          message: "serviceAdded",
        }));
      }
      else if (state.action === "delete") {
        servArray = {
          services: deleteServices
        };
        setState((prevState) => ({
          ...prevState,
          action: "none",
          display: true,
          type: "success",
          message: "delete",
        }));
        setSelectServices(deleteServices);
      }
      else if (state.action === "none") {
        setState((prevState) => ({
          ...prevState,
          display: false
        }));
      }
      // Sends array to Db
      updateCategories(catState.catId, servArray, token)
      setSendArray(false);
    }
  }, [selectServices, sendArray, catState.catId, token, state.action, deleteServices, serviceCheck, catState.refresh])

  // fetches new data from db to update parent component services list 
  useEffect(() => {
      return catState.refresh;
  }, [catState.refresh, sendArray])

  // Opens modal to confirm delete when "Delete" button is pressed.
  const handleDelete = (e) => {
    e.preventDefault();
    setState((prevState) => ({
      ...prevState,
      deleteProcess: true,
      display: false
    }));
  }
  
  // Creates new service array based on user select for delete
  useEffect (() => {
    if (state.deleteProcess === true) {
      setState(() => ({
        display: false,
        deleteProcess: false
      }));
      let newArray = [];
      for (let i = 0; i < formServices.length; i++) {
        let ele = document.getElementById(selectServices[i]);
        if (!ele.checked) {
          newArray.push(ele.name);
        }
      }
      if (newArray.length === formServices.length) {
        setState(() => ({
          display: true,
          deleteProcess: false,
          type: "fail",
          message: "noService",
        }));
        return;
      }
      else {
        setDeleteServices(newArray);
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
                    className="btn"
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

  // Handles "Confirm Delete" button press by closing modal and calling fetch function
  const confirmDelete = (e) => {
    e.preventDefault();
    setIsOpen(false);
    setSendArray(true);
    setState((prevState) => ({
      ...prevState,
     action: "delete"
    }));
  }

  // Double-checks to make sure "selectServices" array always matches "deleteServices" array...
  // ... when a delete action is occurring so form list is always up to date after delete. 
  useEffect(() => {
    if (state.action === "delete") {
      setSelectServices(deleteServices);
    }
  }, [state.action, deleteServices])

  let categoryType;

  // Sets the service list based on admin selection from category type
  const handleSelect = (e) => {
    setState(() => ({
      action: "none"
    }));
    categoryType = e.target.value
    buildServiceList();
  };

  // Changes formServices list based on user edits to update form
  useEffect(() => {
    let keyNum = 0;
    let services = [];
    for (let i in selectServices) {
      if (catState.catType === "Residential") {
        services.push(
          <Form.Group controlId={selectServices[i]} key={selectServices[i] + (keyNum++) + " res"}>
          <Form.Check
            className="mb-2 ml-2"
            style={{ fontSize: "14px" }}
            type="checkbox"
            label={selectServices[i]}
            name={selectServices[i]}
          />
          </Form.Group>
        );
      }
      else if (catState.catType ==="Commercial") {
        services.push(
          <Form.Group controlId={selectServices[i]} key={selectServices[i] + (keyNum++) + " com"}>
          <Form.Check
            className="mb-2 ml-2"
            style={{ fontSize: "14px" }}
            type="checkbox"
            label={selectServices[i]}
            name={selectServices[i]}
          />
          </Form.Group>
        )
      }
    } 
    setFormServices(services);
  }, [selectServices, catState.catType])

  // Takes the category selection and matches it to category objects to pull down
  //    the correct services.
  const buildServiceList = () => {
    let selectServices = [];
      setCatState((prevState) => ({
        ...prevState,
        catType: categoryType
      }));

    for(let i in props.categories) {
      if(props.categories[i].customerType === categoryType) {
        setCatState((prevState) => ({
          ...prevState,
          catId: props.categories[i]._id
        }));
        for(let j in props.categories[i].services){
            selectServices.push(props.categories[i].services[j]);
        }  
      }
    }
    if (categoryType === "Residential" || categoryType === "Commercial") {
      showButtons(true);
    }
    else {
      showButtons(false);
    }
    setSelectServices(selectServices);
  };

  // Displays the buttons when a valid category is selected
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

  // Clears message component when a modal is closed
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