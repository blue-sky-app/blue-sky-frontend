// Author(s): Sam

// Creates global variables for user session data that can be used by other components
const userArray = sessionStorage.getItem("localUser")
  ? JSON.parse(sessionStorage.getItem("localUser"))
  : [];
if (sessionStorage.getItem("localUser")) {
  var userId = userArray[0].localId;
  var fName = userArray[0].localFname;
  var lName = userArray[0].localLname;
  var email = userArray[0].localEmail;
  var accountType = userArray[0].localAccountType;
  var invoices = userArray[0].localInvoices;
  var blueBucks = userArray[0].localBlueBucks;
  var newsHeadline = userArray[1].localNewsHeadline;
  var newsText = userArray[1].localNewsText;
}

export {
  userId,
  fName,
  lName,
  email,
  accountType,
  invoices,
  blueBucks,
  newsHeadline,
  newsText,
};
