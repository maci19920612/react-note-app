import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Switch, Route, BrowserRouter as Router, Link } from "react-router-dom";
import { Container, Row, Col } from 'react-bootstrap';
import LoginComponent from './component/page/login/LoginComponent';
import LoadingComponent from "./component/dialog/loading/LoadingComponent";
import { DependencyInjectionContext, ComponentContainer } from "./di/ComponentContainer";

import './App.css';

const { useState } = React;

function App() {
  return (
    <div className="App">
      <DependencyInjectionContext.Provider value={ComponentContainer}>
        <LoadingComponent>
          <Router>
            <Switch>
              <Route path="/login" component={LoginComponent} />
              <Route path="/">
                This is the main page, you can navigate with these link to login page: <Link to="/login">Login</Link>
              </Route>
            </Switch>
          </Router>
        </LoadingComponent>
      </DependencyInjectionContext.Provider>
    </div>

  );
}

export default App;
