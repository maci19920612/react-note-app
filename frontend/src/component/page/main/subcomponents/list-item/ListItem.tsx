import React from "react";
import { faFolder, faStickyNote, faFolderOpen } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import "./ListItem.scss";
import { ListItemVM } from "./model/ListItemVM";

export type ListItemProps = {
    note: ListItemVM;
    onClick: (note: ListItemVM) => void;
}

const ListItem: React.FunctionComponent<ListItemProps> = (params: ListItemProps) => {
    let { note } = params;
    let icon;
    switch(note.type){
        case "note": icon = faStickyNote; break;
        case "directory": icon = faFolder; break;
        case "parent": icon = faFolderOpen; break;
        default: throw new Error(`Note type note implemented in ListItem: ${note.type}`);
    }
    return (
        <div className="list-item" onClick={() => { params.onClick(note) }}>
            <div className="icon-container">
                <div className="table-cell">
                    <div className="circle w-40">
                        <FontAwesomeIcon icon={icon} />
                    </div>
                </div>
            </div>
            <div className="text-container">
                <div className="name">
                    {note.name}
                </div>
                <div className="date">
                    Created at: {note.createdAt}
                </div>
            </div>
        </div>
    );
};

export default ListItem;