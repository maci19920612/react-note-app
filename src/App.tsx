import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Switch, Route, BrowserRouter as Router, Link } from "react-router-dom";
import { Container, Row, Col } from 'react-bootstrap';
import LoginComponent from './component/login/LoginComponent';
import './App.css';

const { useState } = React;

export const LoadingContext = React.createContext({
  handler: (isLoading: Boolean) => {
    console.warn("LoadingContext.handler is not handled");
  }
});

function App() {
  let [loading, setLoading] = useState(false);
  const loadingContextValue = {
    handler: (isLoading: boolean) => {
      console.log(`Loading is called isLoading value: ${isLoading}`);
      setLoading(isLoading);
    }
  };

  let modalContainer = undefined;
  if (loading) {
    let loadingComponent = undefined;
    if (loading) {
      loadingComponent = (
        <div className="loadingComponent">
          <div className="lds-ripple"><div></div><div></div></div>
        </div>
      );
    }
    modalContainer = (<div className="modalContainer">
      {loadingComponent}
    </div>);
  }

  return (
    <LoadingContext.Provider value={loadingContextValue}>
      {modalContainer}
      <div className="App">
        <Router>
          <Switch>
            <Route path="/login" component={LoginComponent} />
            <Route path="/">
              This is the main page, you can navigate with these link to login page: <Link to="/login">Login</Link>
            </Route>
          </Switch>
        </Router>
      </div>
    </LoadingContext.Provider>
  );
}

const LoginPage = () => {
  return (<></>);
};

export default App;
