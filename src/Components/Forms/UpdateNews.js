// Author(s): Sam
import React, { useState, useEffect, useCallback } from "react";
import { Form, Button } from "react-bootstrap";
import { Message } from "../Message/Message.js";
import { updateNewsData } from "../API/Api.js";
import "../Profile/Profile.css";
import Modal from "../Modal/Modal.js";

// Provides edit form for admin news tab
export function UpdateNews(props) {

  const [token] = useState(sessionStorage.getItem('token') || '');
  const [formCategories, setFormCategories] = useState([]);
  const [formNewsFields, setFormNewsFields] = useState([]);
  const [formButtons, setFormButtons] = useState('');
  const [accountType, setAccountType] = useState([]);
  const [refreshData, setRefreshData] = useState(false);
  const [updatedNews, setUpdatedNews] = useState({
    newsId: "",
    headline: "",
    text: "",
    refresh: props.refreshData
  });
  const [state, setState] = useState({
    display: false,
    type: "",
    message: "",
  });
  const [isOpen, setIsOpen] = useState(false);

  // Populates dropdown from parent for user to select news category
  useEffect(() => {
    let newsCategories = [];
    for(let i in props.news) {
      newsCategories.push(
      <option key={[i]} value={props.news[i].customerType}>{props.news[i].customerType}</option>)
    }
    setFormCategories(newsCategories);
  }, [props.news]);

  // Fetches new data from db to update parent component news after each operation
  useEffect(() => {
    if (!refreshData) {
      return updatedNews.refresh;
    }
  }, [updatedNews.refresh, refreshData])

  // Handles "Update" button click to open confirm modal and makes sure required fields...
  //  ... are completed.
  useEffect(() => {
    const handleUpdate = (e) => {
      setRefreshData(false);
      e.preventDefault();
      var headline = document.getElementById("newsHeadline").value
      var text = document.getElementById("newsText").value
      if (headline === "" || text === "") {
        setState((prevState)=> ({
          ...prevState,
          display: true,
          type: "fail",
          message: "required"
          }))
      }
      else {
        setState((prevState)=> ({
          ...prevState,
          display: false
          }))
        setUpdatedNews((prevState)=> ({
          ...prevState,
          headline: headline,
          text: text
          }))
        setIsOpen(true);
      }
    }

    // Displays the buttons when a valid category is selected
    const showButtons = (state) => {
      let buttons;
      if(state) {
        buttons =
        <>
          <Button 
            key="update" 
            id="btn" 
            variant="dark" 
            block size="md" 
            type="submit" 
            onClick={(e) => {handleUpdate(e)}}
          >
            UPDATE
          </Button>
        </>;
      }
      else if(!state){
        buttons = "";
      }
      setFormButtons(buttons);
    }

    // Sets form field content based on user account type selection
    let selectNews;
    for(let i in props.news) {
      if(props.news[i].customerType === accountType) {
        selectNews = 
          <>  
            <Form.Group size="lg" controlId="newsHeadline">
              <Form.Control
                type="text"
                className="fcontrol"
                key={props.news[i].customerType + "headline"}
                placeholder="(required) Please enter headline."
                defaultValue={props.news[i].headline}
                required 
              />
            </Form.Group>
            <Form.Group size="lg" controlId="newsText">
              <Form.Control
                as="textarea"
                rows={6}
                className="fcontrol"
                key={props.news[i].customerType + "text"}
                placeholder="(required) Please enter news text."
                defaultValue={props.news[i].text}
                required
              />
            </Form.Group>
        </>;

        // Grabs selected news object _id in case user updates fields
        setUpdatedNews((prevState) => ({
          ...prevState,
          newsId: props.news[i]._id
        }));
      }
    }

    // Shows or hides buttons by checking for valid category selection
    if (accountType === "Residential" || accountType === "Commercial") {
      showButtons(true);
    }
    else {
      showButtons(false);
    }
    setFormNewsFields(selectNews);
  }, [accountType, props.news, updatedNews.headline, updatedNews.text]);

  // Removes message on accountType selection
  useEffect(() => {
    setState((prevState)=> ({
      ...prevState,
      display: false
      }))
  }, [accountType])

  // Sends data to db and closes modal on "CONFIRM UPDATE"
  const handleSubmit = useCallback((e) => {
    e.preventDefault();
    var payload = {
      headline: updatedNews.headline,
      text: updatedNews.text
    }
    updateNewsData(updatedNews.newsId, payload, token);
    setState((prevState) => ({
      ...prevState,
      display: true,
      type: "success",
      message: "update"
    }));
    setIsOpen(false);
    setRefreshData(true);
  }, [updatedNews.headline, updatedNews.text, updatedNews.newsId, token])

  return (
    <>
      <Modal 
        open={isOpen} 
        onClose={() => setIsOpen(false)} 
        tab={"News"} 
      >
        <Message
              device="browser"
              display={state.display}
              type={state.type}
              message={state.message}
        />
        <p>Are you sure you want to update?</p>
        <Button 
            key="update" 
            id="btn" 
            variant="warning" 
            block size="md" 
            type="submit" 
            onClick= {handleSubmit}
          >
            CONFRIM UPDATE
          </Button>
      </Modal>
      <h5>Update News</h5>
      <Form style = {{width:"35vw", maxWidth:"450px", minWidth:"250px"}}>
        <Form.Group>
          <Form.Control 
            as="select"
            className="fcontrol"
            type="text"
            onChange={(e) => {setAccountType(e.target.value)}}
          >
            <option key="3" value="accountType">Choose an Account Type</option>
            {formCategories}
          </Form.Control>
        </Form.Group>
        {formNewsFields}
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