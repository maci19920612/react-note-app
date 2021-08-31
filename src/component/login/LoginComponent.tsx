import React from "react";
import { Container, Row, Col } from "react-bootstrap";

interface LoginComponentProperty{}

const LoginComponent : React.FunctionComponent<LoginComponentProperty> = (properties: LoginComponentProperty) => {
    
    return (
        <div className="page component-login">
            <Container fluid>
                <Row>
                    <Col>Example</Col>
                </Row>
            </Container>
        </div>
    );
};

export default LoginComponent;

