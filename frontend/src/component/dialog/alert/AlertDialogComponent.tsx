import Module from "module";
import React, { useState } from "react";
import { Modal, Button } from "react-bootstrap";
import { setConstantValue } from "typescript";


export interface ButtonModel {
    type: "danger" | "warning" | "primary" | "secondary" | "dark" | "light" | "success"
    text: string;
    onClick?: () => void;
}
export interface DialogModel {
    type: "error" | "warning" | "info",
    title?: string,
    message: string,
    buttons: Array<ButtonModel>
}

export const AlertContext = React.createContext({
    show(model: DialogModel): void {
        //Empty implementation
     }
});

const AlertDialogComponent: React.FunctionComponent = (props: React.PropsWithChildren<{}>) => {
    let [stack, setStack] = useState<Array<DialogModel>>([]);
    let addToStack = (model: DialogModel) => {
        setStack([...stack, model]);
    };

    let popStack = () => {
        if (stack.length == 0) {
            console.warn("The dialog stack was already empty!");
        }
        stack.pop();
        setStack([...stack]);
    };

    let topStackItem = null;
    if (stack.length > 0) {
        topStackItem = stack[stack.length - 1];
    }

    let getTitle: () => string = () => {
        if (stack.length == 0) {
            return null;
        }
        let topStackItem = stack[stack.length - 1];
        if (!!topStackItem.title) {
            return topStackItem.title;
        }
        switch (topStackItem.type) {
            case "error":
                return "Error";
            case "warning":
                return "Warning";
            case "info":
                return "Info";
            default:
                return "Unknown";
        }
    }

    let alertContextValue = {
        show(model: DialogModel) {
            addToStack(model);
        }
    };

    return (
        <AlertContext.Provider value={alertContextValue}>
            <div className="alert-dialog-component">
                <Modal show={stack.length != 0} animation={false}>
                    <Modal.Header>
                        <Modal.Title>{getTitle()}</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        {topStackItem?.message}
                    </Modal.Body>
                    <Modal.Footer>
                        {topStackItem?.buttons?.map(item => (
                            <Button variant={item.type} onClick={(() => {
                                if(item.onClick){
                                    item.onClick();
                                }
                                popStack();
                            })}>{item.text}</Button>
                        ))}
                    </Modal.Footer>
                </Modal>
                {props.children}
            </div></AlertContext.Provider >
    );
};


export default AlertDialogComponent;