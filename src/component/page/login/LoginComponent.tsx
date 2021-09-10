import React, { useContext } from "react";
import { Container, Row, Col, InputGroup, FormLabel, FormControl, Card, FormGroup, Button, Form, Modal} from "react-bootstrap";
import VerticalAlignComponent from "../../util/VerticalAlignComponent";
import { LoadingContext } from "../../dialog/loading/LoadingContext";
import { useForm } from "react-hook-form";
import "./LoginComponent.scss"
import { DependencyInjectionContext } from "../../../di/ComponentContainer";

const { useState } = React;

interface LoginComponentProperty { }

const LoginComponent: React.FunctionComponent<LoginComponentProperty> = (properties: LoginComponentProperty) => {
    let {register, handleSubmit} = useForm();
    console.log("Register data: ", register);
    console.log("Handle submit data: ", handleSubmit);
    let loadingContext = useContext(LoadingContext);
    let { authManager } = useContext(DependencyInjectionContext).get()
    const onFormSubmitHandler = (loginFormData) => {
        loadingContext.showLoading(true);
        authManager.login(loginFormData.username, loginFormData.password)
    };
    return (
        <div className="page component-login">
            <VerticalAlignComponent horizontalAlign="center" verticalAlign="center">
                <Container fluid>
                    <Row>
                        <Col md={{ span: 4, offset: 4 }}>
                            <Card>
                                <Card.Body>
                                    <Form onSubmit={handleSubmit(onFormSubmitHandler)}>
                                        <div className="d-grid gap-2">
                                            <Form.Group>
                                                <Form.Label>Username</Form.Label>
                                                <Form.Control {...register("username")}></Form.Control>
                                            </Form.Group>
                                            <Form.Group>
                                                <Form.Label>Password</Form.Label>
                                                <Form.Control type="password" {...register("password")}></Form.Control>
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