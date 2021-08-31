import React from 'react';
import logo from './logo.svg';
import {Switch, Route, BrowserRouter as Router, Link} from "react-router-dom";
import { Container, Row, Col } from 'react-bootstrap';
import './App.css';

function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route path="/login">
            <div>
              Main page link
              <Link to="/">Main</Link>
            </div>
          </Route>
          <Route path="/">
          This is the main page, you can navigate with these link to login page: <Link to="/login">Login</Link>
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

const LoginPage = () => {
  return (<></>);
};

export default App;
