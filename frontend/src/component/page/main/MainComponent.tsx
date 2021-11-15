import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import React, {useCallback, useContext, useEffect, useMemo, useState} from "react";
import {Col, Container, Row} from "react-bootstrap";
import "./MainComponent.scss";
import VerticalAlignComponent from "../../util/VerticalAlignComponent";
import {ListItemVM} from "./subcomponents/list-item/model/ListItemVM";
import ListItem from "./subcomponents/list-item/ListItem";
import {DependencyInjectionContext} from "../../../di/ComponentContainer";
import MenuComponent from "./subcomponents/menu/MenuComponent";

const MainComponent: React.FunctionComponent = () => {
    let [width, setWidth] = useState(2);
    return (
        <div className="page component-main">
            <Container fluid>
                <Row>
                    <Col></Col>
                </Row>
                <Row>
                    <Col md={{span: width}}>
                        <MenuComponent />
                    </Col>
                    <Col className="note-content-container">
                        <h1>Example note</h1>
                        <p>This is an example note, I think we should not edit that, but I'm not sure!</p>
                    </Col>
                </Row>
            </Container>
            <div className="page-header-container">

            </div>
            <div className="page-content-container">
                <div className="navigator"></div>
                <div className="note-content"></div>
            </div>
        </div>
    );
};

export default MainComponent;