import React, { useContext } from "react";
import { Redirect } from "react-router-dom";
import { Container, Row, Col, InputGroup, FormLabel, FormControl, Card, FormGroup, Button, Form, Modal} from "react-bootstrap";
import VerticalAlignComponent from "../../util/VerticalAlignComponent";
import { LoadingContext } from "../../dialog/loading/LoadingContext";
import { useForm } from "react-hook-form";
import "./LoginComponent.scss";
import { DependencyInjectionContext } from "../../../di/ComponentContainer";
import { setConstantValue } from "typescript";
import { AlertContext } from "../../dialog/alert/AlertDialogComponent";

const { useState } = React;

interface LoginComponentProperty { }

const LoginComponent: React.FunctionComponent<LoginComponentProperty> = (properties: LoginComponentProperty) => {
    let [loggedIn, setLoggedIn] = useState(false);
    let {register, handleSubmit} = useForm();
    let loadingContext = useContext(LoadingContext);
    let alertContext = useContext(AlertContext);
    let { authManager } = useContext(DependencyInjectionContext).get()
    const onFormSubmitHandler = async (loginFormData) => {
        loadingContext.showLoading(true);
        try{
            await authManager.login(loginFormData.username, loginFormData.password);
            setLoggedIn(true);
        }catch(ex){
            alertContext.show({
                type: "error",
                message: ex.message,
                buttons: [
                    {
                        type: "danger",
                        text: "OK"
                    }
                ]
            });
        }
        loadingContext.showLoading(false);
    };
    if(loggedIn){
        return (<Redirect to="/"/>);
    }
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