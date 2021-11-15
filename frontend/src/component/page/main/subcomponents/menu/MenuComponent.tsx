import React, {useCallback, useContext, useEffect, useState} from "react";
import {ListItemVM} from "../list-item/model/ListItemVM";
import {DependencyInjectionContext} from "../../../../../di/ComponentContainer";
import ListItem from "../list-item/ListItem";

const MenuComponent: React.FunctionComponent = () => {
    let [directoryStack, setDirectoryStack] = useState<Array<number>>([]);
    let [noteItems, setNoteItems] = useState<Array<ListItemVM>>([]);
    let {noteManager} = useContext(DependencyInjectionContext).get();

    useEffect(() => {
        let currentDirectoryIndex: number | undefined = undefined;
        if (directoryStack.length > 0) {
            currentDirectoryIndex = directoryStack[directoryStack.length - 1];
        }
        (async (directoryIndex) => {
            let items = await noteManager.getNoteItems(directoryIndex);
            let listItemVMs: Array<ListItemVM> = items.map(item => ({
                id: item.id,
                createdAt: "---",
                type: item.type,
                name: item.title,
                content: item.content
            }));

            if (directoryIndex) {
                setNoteItems([
                    {
                        id: 0,
                        createdAt: "",
                        name: "",
                        type: "parent"
                    },
                    ...listItemVMs
                ]);
            } else {
                setNoteItems(listItemVMs);
            }

        })(currentDirectoryIndex);
    }, [directoryStack]);


    const onClickListener = useCallback((model: ListItemVM) => {
        switch (model.type) {
            case "directory": {
                setDirectoryStack([...directoryStack, model.id]);
                break;
            }
            case "note": {
                break;
            }
            case "parent": {
                directoryStack.pop();
                setDirectoryStack([...directoryStack]);
                break;
            }
        }
    }, []);
    let listItems = noteItems.map(item => {
        return (<ListItem key={`${item.id}-${item.type}`} note={item} onClick={onClickListener}/>);
    });

    return (<>{listItems}</>);
}

export default MenuComponent;