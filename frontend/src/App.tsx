import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Switch, Route, BrowserRouter as Router, Link } from "react-router-dom";
import { Container, Row, Col } from 'react-bootstrap';
import LoginComponent from './component/page/login/LoginComponent';
import LoadingComponent from "./component/dialog/loading/LoadingComponent";
import AlertDialogComponent from "./component/dialog/alert/AlertDialogComponent";
import { DependencyInjectionContext, ComponentContainer } from "./di/ComponentContainer";

import './App.css';
import AuthGuardComponent from './component/util/AuthGuardComponent';

const { useState } = React;

function App() {
  return (
    <div className="App">
      <DependencyInjectionContext.Provider value={ComponentContainer}>
        <LoadingComponent>
          <AlertDialogComponent>
            <Router>
              <Switch>
                <Route exact path="/login">
                  <AuthGuardComponent authRequired={false}>
                    <LoginComponent />
                  </AuthGuardComponent>
                </Route>
                <Route exact  path="/">
                  <AuthGuardComponent authRequired={true}>
                    This is the main page, you can navigate with these link to login page: <Link to="/login">Login</Link>
                  </AuthGuardComponent>
                </Route>
              </Switch>
            </Router>
          </AlertDialogComponent>
        </LoadingComponent>
      </DependencyInjectionContext.Provider>
    </div>

  );
}

export default App;
