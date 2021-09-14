import React, { useState, useEffect } from "react";

export function Message(props) {
  const [message, setMessage] = useState("");
  const [display, setDisplay] = useState("");
  const [type, setType] = useState("");
  const [device, setDevice] = useState("");

  useEffect(() => {
    setAttributes();
  });

  //grab props from parent components and pass to 'Message' states
  const setAttributes = () => {
    setDevice(props.device);
    setType(props.type);
    setDisplay(props.display);
    setMessage(props.message);
  };

  //set className based on device viewport
  if (device === "browser") {
    var className = "mb-3 p-2";
  } else if (device === "mobile") {
    className = "mb-2 mx-auto p-1";
  }

  //set div background and text color for success or failure mesages
  if (type === "success") {
    var backgroundColor = "#d4edda";
    var textColor = "#454545";
  } else if (type === "fail") {
    backgroundColor = "#f93d5c";
    textColor = "#ffffff";
  }

  //set div to display and set style
  if (display === true) {
    var messageStyle = {
      display: "block",
      textAlign: "center",
      backgroundColor: backgroundColor,
      color: textColor,
      borderRadius: "0px",
    };
    console.log(messageStyle);
  } else {
    messageStyle = { display: "none" };
  }

  //set div text based on type of message from parent componenet
  switch (message) {
    case "loginFail":
        var notice = "The Email or Passcode you entered does not match our records.";
        break;

    case "update":
        notice = "Update successful.";
        break;
    
    case "required":
        notice = "Please make sure no required fields are left blank."
        break;

    case "password":
        notice = "Passwords do not match."
        break;

    case "signupSuccess":
        notice = "Registration successful. Redirecting to Log In."
        break; 
        
    case "loginSuccess":
        notice = "Login successful."
        break; 

    case "duplicate":
        notice = "This email is already in use with another account."
        break;

    case "noService":
        notice = "Please make at least one selection."
    // no default
}

  return (
    <div className={className} style={messageStyle} role="alert">
      {notice}
    </div>
  );
}
