import React, { useContext, useEffect, useState } from "react";
import { DependencyInjectionContext } from "../../di/ComponentContainer";
import { Redirect } from "react-router-dom";

type AuthRequiredComponentProps = React.PropsWithChildren<{
    authRequired: boolean
}>;

const STATE_LOADING = 0;
const STATE_REDIRECT = 1;
const STATE_RENDER = 3;

const AuthGuardComponent: React.FunctionComponent<AuthRequiredComponentProps> = (props: AuthRequiredComponentProps) => {
    //AuthManager
    let { authManager } = useContext(DependencyInjectionContext).get();

    //States
    let [state, setState] = useState(STATE_LOADING);
    useEffect(() => {
        console.log("AuthGuard component useEffect is running");
        (async () => {
            console.log("AuthGuard inner component is running");
            let isLoggedIn = await authManager.isLoggedIn();
            if (isLoggedIn != props.authRequired) {
                setState(STATE_REDIRECT);
            } else {
                setState(STATE_RENDER)
            }
        })();
    }, []);
    
    if (state == STATE_LOADING) {
        return (<>AuthGuard is running...</>);
    } else if (state == STATE_REDIRECT) {
        return (<Redirect to="/login" />);
    } else if (state == STATE_RENDER) {
        return (<>{props.children}</>);
    } else {
        throw new Error(`Invalid state AuthRequiredComponent`);
    }
};

export default AuthGuardComponent;