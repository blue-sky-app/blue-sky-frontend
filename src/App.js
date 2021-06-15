import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { Login } from "./Components/Login/Login";
import { SignUp } from "./Components/SignUp/SignUp";
import { BlueBucks } from "./Components/BlueBucks/BlueBucks";
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/blueBucks" component={BlueBucks} />
        <Route path="/signUp" component={SignUp}/>
        <Route path="/" component={Login} />     
      </Switch>
    </BrowserRouter>

  );
}

export default App;