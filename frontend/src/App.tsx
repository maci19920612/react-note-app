import React, { useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Switch, Route, BrowserRouter as Router, Link } from "react-router-dom";
import { Container, Row, Col } from 'react-bootstrap';
import LoginComponent from './component/page/login/LoginComponent';
import LoadingComponent from "./component/dialog/loading/LoadingComponent";
import AlertDialogComponent from "./component/dialog/alert/AlertDialogComponent";
import { DependencyInjectionContext, ComponentContainer } from "./di/ComponentContainer";
import { Redirect } from "react-router-dom";

import './App.css';
import MainComponent from './component/page/main/MainComponent';
import { GuardedRoute, GuardProvider } from 'react-router-guards';

const ROLE_GUEST = "guest";
const ROLE_USER = "user";

const AuthGuard = (to, from, next) => {
  console.log("AuthGuard called");
  (async function (role) {
    let authManager = ComponentContainer.get().authManager;
    let isLoggedIn = await authManager.isLoggedIn();
    let cases = [
      [true, ROLE_GUEST, "/"],
      [false, ROLE_USER, "/login"]
    ];

    let targetCase = cases.find(item => item[0] == isLoggedIn && item[1] == role);
    console.log("TargetCase: ", targetCase);
    if (targetCase) {
      next.redirect(targetCase[2]);
    } else {
      next();
    }
  })(to.meta.role);
};

function App() {
  return (
    <div className="App">
      <DependencyInjectionContext.Provider value={ComponentContainer}>
        <LoadingComponent>
          <AlertDialogComponent>
            <Router>
              <GuardProvider guards={[AuthGuard]}>
                <Switch>
                  <GuardedRoute path="/login" component={LoginComponent} meta={{ role: ROLE_GUEST }} />
                  <GuardedRoute exact path="/" component={MainComponent} meta={{ role: ROLE_USER }} />
                </Switch>
              </GuardProvider>
            </Router>
          </AlertDialogComponent>
        </LoadingComponent>
      </DependencyInjectionContext.Provider>
    </div>

  );
}

export default App;
