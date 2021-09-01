import React from "react";
import { Container, Row, Col, InputGroup, FormLabel, FormControl, Card, FormGroup, Button, Form, Modal} from "react-bootstrap";
import VerticalAlignComponent from "../util/VerticalAlignComponent";

const { useState } = React;

interface LoginComponentProperty { }

const LoginComponent: React.FunctionComponent<LoginComponentProperty> = (properties: LoginComponentProperty) => {
    let [username, setUsername] = useState();
    let [password, setPassword] = useState();
    let [errorMessage, setErrorMessage] = useState();

    const onSubmitHandler = (event) => {
        console.log("This is an error");
        console.log(`Username: ${username}`);
        console.log(`Password: ${password}`);
        event.preventDefault();
    };


    return (
        <div className="page component-login">
            <Modal show={!!errorMessage} hide={() => {setErrorMessage(undefined)}}>
                <Modal.Title>Error during the login</Modal.Title>
                <Modal.Body>{errorMessage}</Modal.Body>
                <Modal.Footer>
                    <Button variant="primary">Ok</Button>
                </Modal.Footer>
            </Modal>
            <VerticalAlignComponent horizontalAlign="center" verticalAlign="center">
                <Container fluid>
                    <Row>
                        <Col md={{ span: 4, offset: 4 }}>
                            <Card>
                                <Card.Body>
                                    <Form onSubmit={onSubmitHandler}>
                                        <div className="d-grid gap-2">
                                            <Form.Group>
                                                <Form.Label>Username</Form.Label>
                                                <Form.Control onChange={(event: any) => setUsername(event.target.value)}></Form.Control>
                                            </Form.Group>
                                            <Form.Group>
                                                <Form.Label>Password</Form.Label>
                                                <Form.Control type="password" onChange={(event: any) => setPassword(event.target.value)}></Form.Control>
                                            </Form.Group>
                                            <Button type="submit" variant="primary">Login</Button>
                                            <Button type="button" variant="secondary">Skip login</Button>
                                            <Button type="button" variant="link">Registration</Button>
                                        </div>
                                    </Form>

                                </Card.Body>
                            </Card>
                        </Col>
                    </Row>
                </Container>
            </VerticalAlignComponent>
        </div>
    );
};

export default LoginComponent;