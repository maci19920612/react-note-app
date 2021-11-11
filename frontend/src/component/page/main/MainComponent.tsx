import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import "./MainComponent.scss";
import VerticalAlignComponent from "../../util/VerticalAlignComponent";
import { ListItemVM } from "./subcomponents/list-item/model/ListItemVM";
import ListItem from "./subcomponents/list-item/ListItem";

const MainComponent: React.FunctionComponent = () => {
    let [width, setWidth] = useState(2);
    let content = `
        async function main(){
            console.log("Hello World!");
        }
        main().catch(error => console.error("Error happened in the main function ", error));
    `;

    let items: Array<ListItemVM> = [
        {
            id: 1,
            type: "directory",
            name: "Example directory",
            createdAt: "2021-11-21"
        },
        {
            id: 1,
            type: "note",
            name: "Example note",
            content: "Example content, lorem ipsum dolor sit amet",
            createdAt: "2021-11-22"
        }
    ]

    let listItems = items.map(item => {
        return (<ListItem  key={`${item.id}-${item.type}`} note={item} />);
    });

    return (
        <div className="page component-main">
            <Container fluid>
                <Row>
                    <Col></Col>
                </Row>
                <Row>
                    <Col md={{ span: width }}>
                        {listItems}
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