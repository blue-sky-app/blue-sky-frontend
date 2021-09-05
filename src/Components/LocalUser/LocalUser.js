const userArray = sessionStorage.getItem('localUser') ? JSON.parse(sessionStorage.getItem('localUser')) : [];
if (sessionStorage.getItem('localUser')) {
    var userId = userArray[0].localId;
    var fName = userArray[1].localFname;
    var lName = userArray[2].localLname;
    var email = userArray[3].localEmail
    var accountType = userArray[4].localAccountType;
    var invoices = userArray[5].localInvoices;
    var blueBucks = userArray[6].localBlueBucks;
};
export {userId, fName, lName, email, accountType, invoices, blueBucks}