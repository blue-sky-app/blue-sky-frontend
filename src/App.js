import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { Login } from "./Components/Login/Login";
import { SignUp } from "./Components/SignUp/SignUp";
import { Home } from "./Components/Home/Home";
import { BlueBucks } from "./Components/BlueBucks/BlueBucks";
import { Profile } from "./Components/Profile/Profile";
import { Estimates } from "./Components/Estimates/Estimates";
import { Services } from "./Components/Services/Services";
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/services" component={Services} />
        <Route path="/estimates" component={Estimates} />
        <Route path="/profile" component={Profile} />
        <Route path="/blueBucks" component={BlueBucks} />
        <Route path="/home" component={Home} />
        <Route path="/signUp" component={SignUp}/>
        <Route path="/" component={Login} />     
      </Switch>
    </BrowserRouter>

  );
}

export default App;