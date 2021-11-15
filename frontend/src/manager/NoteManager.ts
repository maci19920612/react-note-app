import {Note} from "../../../server/src/datatbase/entity/Note";
import {NoteItemDTO} from "../api/response/note/NoteItemDTO";
import {ApiManager} from "../api/ApiManager";
import {AuthManager} from "./AuthManager";

export class NoteManager {
    constructor(
        private authManager: AuthManager,
        private apiManager: ApiManager,
    ){}
    getNoteItems(directoryId: number|undefined): Promise<Array<NoteItemDTO>> {
        if(!directoryId){
            return this.apiManager.getRootItems();
        }else{
            return this.apiManager.getItems(directoryId);
        }
    }


}