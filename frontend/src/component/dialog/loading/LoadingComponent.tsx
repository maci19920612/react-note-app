import React from "react";

import { LoadingContext } from "./LoadingContext";

import "./LoadingComponent.scss"

const { useState } = React;

export type LoadingComponentProperties = React.PropsWithChildren<{}>;

const LoadingComponent: React.FunctionComponent<LoadingComponentProperties> = (props: LoadingComponentProperties) => {
    let [visible, setVisible] = useState(false);
    let loadingContextValue = {
        showLoading: (isVisible: boolean) => setVisible(isVisible)
    };
    return (
        <LoadingContext.Provider value={loadingContextValue}>
            {
                visible &&
                (
                    <div className="loading-component">
                        <div className="lds-ripple"><div></div><div></div></div>
                    </div>
                )
            }
            {props.children}
        </LoadingContext.Provider>
    );
};

export default LoadingComponent;