// import React from "react";
// import { BrowserRouter, Route, Switch } from "react-router-dom";
// import { Login } from "./Components/Login/Login";
// import { BlueBucks } from "./Components/BlueBucks/BlueBucks";

import './App.css';
import { NavBar } from "./Components/NavBar/NavBar";
import { BlueBucks } from "./Components/BlueBucks/BlueBucks"
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <div className="App">
      <NavBar />
      <BlueBucks />
    </div>
  );
}

export default App;


// function App() {
//   return (
//     <BrowserRouter>
//       <Switch>
//         <Route path="/blueBucks" component={BlueBucks} />
//         <Route path="/" component={Login} />     
//       </Switch>
//     </BrowserRouter>

//   );
// }

// export default App;