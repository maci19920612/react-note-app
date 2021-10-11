import React, { useContext, useState } from "react";
import {DependencyInjectionContext} from "../../di/ComponentContainer";
import {Redirect} from "react-router-dom";

type AuthRequiredComponentProps = React.PropsWithChildren<{

}>;

const STATE_LOADING = 0;
const STATE_REDIRECT = 1;
const STATE_NOOP = 3;

const AuthRequiredComponent: React.FunctionComponent<AuthRequiredComponentProps> = (props: AuthRequiredComponentProps) => {
    let {authManager} =  useContext(DependencyInjectionContext).get();
    let [state, setState] = useState(STATE_LOADING);
    if(state == STATE_LOADING){
        return (<></>);
    }else if(state == STATE_REDIRECT){
        return (<Redirect to="/login" />);
    }else if(state == STATE_NOOP){
        return props.children;
    }else {
        throw new Error(`Invalid state AuthRequiredComponent`);
    }
};

export default AuthRequiredComponent;