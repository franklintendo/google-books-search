import React from "react";
import "./App.css";
import Search from "./pages/Search";
import Saved from "./pages/Saved";
import { BrowserRouter, Switch, Route } from "react-router-dom";

function App() {
  return (
      <BrowserRouter>
        <Route exact path="/">
          <Search />
        </Route>
        <Route path="/saved">
          <Saved />
        </Route>
      </BrowserRouter>
  );
}


export default App;
