import Home from "./pages/Home";
import Summary from "./pages/Summary";
import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";

function App() {
  return (
    <Router>
      <Route path='/' exact component={Home} />
      <Route path='/summary' exact component={Summary} />
    </Router>
  );
}

export default App;
