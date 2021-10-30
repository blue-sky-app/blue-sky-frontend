import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { Login } from "./Components/Login/Login";
import SignUp from "./Components/SignUp/SignUp";
import { Home } from "./Components/Home/Home";
import { BlueBucks } from "./Components/BlueBucks/BlueBucks";
import { Estimates } from "./Components/Estimates/Estimates";
import { Services } from "./Components/Services/Services";
import { ThankYou } from "./Components/Estimates/ThankYou";
import { SignUpSuccess } from "./Components/SignUp/SignUpSuccess";
import { Profile } from "./Components/Profile/Profile";
import { MoreMenu } from "./Components/MoreMenu/MoreMenu";
import { Admin } from "./Components/Admin/Admin";
import "bootstrap/dist/css/bootstrap.min.css";

// This app uses the BrowserRouter api to navigate between component pages/views
function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/admin" component={Admin} />
        <Route path="/moreMenu" component={MoreMenu} />
        <Route path="/profile" component={Profile} />
        <Route path="/signUpSuccess" component={SignUpSuccess} />
        <Route path="/thankYou" component={ThankYou} />
        <Route path="/services" component={Services} />
        <Route path="/estimates" component={Estimates} />
        <Route path="/blueBucks" component={BlueBucks} />
        <Route path="/home" component={Home} />
        <Route path="/signUp">
          <SignUp />
        </Route>
        <Route path="/" component={Login} />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
