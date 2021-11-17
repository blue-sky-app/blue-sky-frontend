// Author(s): Sam
import React, { useState, useEffect } from "react";

// Provides notice functionality to display status messages on user operations throughout site
export function Message(props) {
  const [message, setMessage] = useState("");
  const [display, setDisplay] = useState("");
  const [type, setType] = useState("");
  const [device, setDevice] = useState("");

  useEffect(() => {
    setAttributes();
  });

  // Grab props from parent components and pass to 'Message' states
  const setAttributes = () => {
    setDevice(props.device);
    setType(props.type);
    setDisplay(props.display);
    setMessage(props.message);
  };

  // Set className based on device viewport
  if (device === "browser") {
    var className = "mb-3 p-2";
  } else if (device === "mobile") {
    className = "mb-2 mx-auto p-1";
  }

  // Set div background and text color for success or failure mesages
  if (type === "success") {
    var backgroundColor = "#d4edda";
    var textColor = "#454545";
  } else if (type === "fail") {
    backgroundColor = "#f93d5c";
    textColor = "#ffffff";
  }

  // Set div to display and set style
  if (display === true) {
    var messageStyle = {
      display: "block",
      textAlign: "center",
      backgroundColor: backgroundColor,
      color: textColor,
      borderRadius: "0px",
    };
  } else {
    messageStyle = { display: "none" };
  }

  // Set div text based on type of message from parent componenet
  switch (message) {
    case "loginFail":
      var notice =
        "The Email or Passcode you entered does not match our records.";
      break;

    case "update":
      notice = "Update successful.";
      break;

    case "delete":
      notice = "Delete successful.";
      break;

    case "required":
      notice = "Please make sure no required fields are left blank.";
      break;

    case "serviceAdded":
      notice = "Service successfully added.";
      break;

    case "blank":
      notice = "Please enter a service name.";
      break;

    case "serviceDup":
      notice = "This service already exists.";
      break;

    case "password":
      notice = "Passwords do not match.";
      break;

    case "signupSuccess":
      notice = "Registration successful. Redirecting to Log In.";
      break;

    case "loginSuccess":
      notice = "Login successful.";
      break;

    case "duplicate":
      notice = "This email is already in use with another account.";
      break;

    case "noService":
      notice = "Please make at least one selection.";
      break;

    case "emailFormat":
      notice =
        "The email you entered is not in the correct format. (Ex. 'example@example.com')";
      break;
    // no default
  }

  return (
    <div className={className} style={messageStyle} role="alert">
      {notice}
    </div>
  );
}
