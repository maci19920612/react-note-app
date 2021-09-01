import React from "react";
import { Container, Row, Col, InputGroup, FormLabel, FormControl, Card} from "react-bootstrap";

import VerticalAlignComponent from "../util/VerticalAlignComponent";

interface LoginComponentProperty{}

const LoginComponent : React.FunctionComponent<LoginComponentProperty> = (properties: LoginComponentProperty) => {
    
    return (
        <div className="page component-login">
            <VerticalAlignComponent horizontalAlign="center" verticalAlign="center">
                <Card>
                    <Card.Body>
                        This is the login card
                    </Card.Body>
                </Card>
            </VerticalAlignComponent>
        </div>
    );
};

export default LoginComponent;

