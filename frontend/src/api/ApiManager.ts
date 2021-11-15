import Axios, { AxiosAdapter, AxiosRequestConfig } from "axios";
import { NoteItemDTO } from "./response/note/NoteItemDTO";

Axios.create({
    transformRequest: (request: AxiosRequestConfig, headers) => {
        return {
            ...request,
            data: "random"
        }
    }
});

export class ApiManager {
    getRootItems(): Promise<Array<NoteItemDTO>> {
        return Promise.resolve(
            [
                {
                    id: 1,
                    type: "directory",
                    title: "Example directory"
                },
                {
                    id: 1,
                    type: "note",
                    title: "Root note",
                    content: `
                        ## Example header
                        
                        > This is an example content either 
                    `
                }
            ]
        );
    }

    getItems(directoryId: number): Promise<Array<NoteItemDTO>> {

        return Promise.resolve(
            [
                {
                    id: 2,
                    type: "note",
                    title: "Subdirectory's note",
                    content: `
                        # Example subdirectory header

                        > This is a subdirectory header, so we need to create some shit about this
                    `
                }
            ]
        );
    }
}