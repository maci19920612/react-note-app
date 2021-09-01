import React from "react";
import "./VerticalAlignComponent.css"

export type VerticalAlignProperties = React.PropsWithChildren<{
    verticalAlign: "top"|"center"|"bottom",
    horizontalAlign: "left"|"center"|"right"
}>

const VerticalAlignComponent : React.FunctionComponent<VerticalAlignProperties> = (properties: VerticalAlignProperties) => {
    let containerInlineStyle = {
        alignItems: properties.verticalAlign,
        justifyContent: properties.horizontalAlign
    };
    return (
        <div className="table-container" style={containerInlineStyle}>
            {properties.children}
        </div>
    );
};
VerticalAlignComponent.defaultProps = {
    verticalAlign: "center",
    horizontalAlign: "center"
};

export default VerticalAlignComponent;