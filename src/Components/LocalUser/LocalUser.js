const userArray = sessionStorage.getItem('localUser') ? JSON.parse(sessionStorage.getItem('localUser')) : [];
if (sessionStorage.getItem('localUser')) {
    var userId = userArray[0].localId;
    var fName = userArray[1].localFname;
    var lName = userArray[2].localLname;
    var email = userArray[3].localEmail
    var accountType = userArray[4].localAccountType;
};
export {userId, fName, lName, email, accountType}