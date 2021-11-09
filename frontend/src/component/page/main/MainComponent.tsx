import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { faFolderOpen } from '@fortawesome/free-solid-svg-icons'
import "./MainComponent.scss";
import VerticalAlignComponent from "../../util/VerticalAlignComponent";

const MainComponent: React.FunctionComponent = () => {
    let [width, setWidth] = useState(2);
    let content = `
        async function main(){
            console.log("Hello World!");
        }
        main().catch(error => console.error("Error happened in the main function ", error));
    `;
    return (
        <div className="page component-main">
            <Container fluid>
                <Row>
                    <Col></Col>
                </Row>
                <Row>
                    <Col md={{ span: width }}>
                        <Container className="list-item directory" fluid>
                            <Row>
                                <Col md="2" className="icon-container">
                                    <div className="icon circle w-39">
                                        <FontAwesomeIcon icon={faFolderOpen} />
                                    </div>
                                </Col>
                                <Col>
                                    <Container fluid>
                                        <Row>
                                            <Col className="name">
                                                Example folder
                                            </Col>
                                        </Row>
                                        <Row>
                                            <Col className="date">
                                                Created at: 2021-09-21
                                            </Col>
                                        </Row>
                                    </Container>
                                </Col>
                            </Row>
                        </Container>

                    </Col>
                    <Col className="note-content-container">
                        <h1>Example note</h1>
                        <p>This is an example note, I think we should not edit that, but I'm not sure!</p>
                        <code>{content}</code>
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