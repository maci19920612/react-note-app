import React from "react";
import "./MainComponent.scss";

const MainComponent : React.FunctionComponent = () => {
    return (
        <div className="page component-main">
            <div className="page-content-container">
                <div className="navigator"></div>
                <div className="note-content"></div>
            </div>
        </div>
    );
};

export default MainComponent;