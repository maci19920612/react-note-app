import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Switch, Route, BrowserRouter as Router, Link} from "react-router-dom";
import { Container, Row, Col } from 'react-bootstrap';
import LoginComponent from './component/login/LoginComponent';
import './App.css';

function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route path="/login" component={LoginComponent}/>
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
