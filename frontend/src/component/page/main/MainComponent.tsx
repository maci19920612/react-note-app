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

    let items = [
        {
            name: "Example directory",
            type: "directory",
        },
        {
            name: "Example note",
            type: "note"
        }
    ]
    return (
        <div className="page component-main">
            <Container fluid>
                <Row>
                    <Col></Col>
                </Row>
                <Row>
                    <Col md={{ span: width }}>
                        <div className="list-item">
                            <div className="icon-container">
                                <div className="table-cell">
                                    <div className="circle w-40">
                                        <FontAwesomeIcon icon={faFolderOpen} />
                                    </div>
                                </div>
                            </div>
                            <div className="text-container">
                                <div className="name">
                                    Example diretory
                                </div>
                                <div className="date">
                                    Created at: 2021-11-10
                                </div>
                            </div>
                        </div>

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