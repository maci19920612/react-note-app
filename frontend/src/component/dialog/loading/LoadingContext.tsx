import React from "react";

export const LoadingContext = React.createContext({
    showLoading: (isVisible: boolean) => {}
});