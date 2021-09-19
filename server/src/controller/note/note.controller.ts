import {Body, Controller, Delete, Get, HttpCode, Param, Post, Put, Req, UseGuards} from "@nestjs/common";
import {NoteItemDTO} from "./dto/NoteItemDTO";
import {AuthGuard} from "@nestjs/passport";
import {User} from "../../datatbase/entity/User";
import {AuthenticatedRequest} from "../../guards/model/AuthenticatedRequest";
import {NoteService} from "../../service/NoteService";
import {NoteDirectory} from "../../datatbase/entity/NoteDirectory";
import {ApiTags} from "@nestjs/swagger";

@ApiTags("Note")
@UseGuards(AuthGuard("jwt"))
@Controller("note")
export class NoteController {
    constructor(
        private noteService: NoteService
    ) {
    }

    @Get("/list/:parentDirectoryId?")
    async list(@Req() request: AuthenticatedRequest, @Param("parentDirectoryId") parentDirectoryId: number): Promise<Array<NoteItemDTO>> {
        let {user} = request;
        console.log("Parent directory id: ", parentDirectoryId);
        let parentDirectory = await this.noteService.getDirectoryById(user, parentDirectoryId);
        return await this.getDirectoriesAndNotes(user, parentDirectory);
    }

    @Post("/create/:parentDirectoryId?")
    async createNote(@Req() request: AuthenticatedRequest, @Param("parentDirectoryId") parentDirectoryId: number, @Body() noteItem: NoteItemDTO): Promise<NoteItemDTO> {
        let {title, content} = noteItem;
        let {user} = request;
        let parentDirectory = await this.noteService.getDirectoryById(user, parentDirectoryId);
        let note = await this.noteService.createNote(user, title, content, parentDirectory)
        return {
            id: note.id,
            title: note.title,
            content: note.content,
            type: "note"
        };
    }

    @Put("/update")
    async updateNote(@Req() request: AuthenticatedRequest, @Body() noteItem: NoteItemDTO): Promise<NoteItemDTO> {
        let {id, title, content} = noteItem;
        let {user} = request;
        let note = await this.noteService.updateNote(user, id, title, content);
        return {
            id: note.id,
            title: note.title,
            content: note.content,
            type: "note"
        };
    }

    @HttpCode(204)
    @Delete("/:noteId")
    async deleteNote(@Req() request: AuthenticatedRequest, @Param("noteId") noteId: number) {
        let {user} = request;
        await this.noteService.removeNote(user, noteId);
    }

    private async getDirectoriesAndNotes(user: User, parentDirectory: NoteDirectory = undefined): Promise<Array<NoteItemDTO>> {
        let directories = await this.noteService.getDirectories(user, parentDirectory);
        let notes = await this.noteService.getNotesByDirectory(user, parentDirectory);
        return [
            ...directories.map(directory => (<NoteItemDTO>{
                id: directory.id,
                title: directory.name,
                content: "",
                type: "directory"
            })),
            ...notes.map(note => (<NoteItemDTO>{id: note.id, title: note.title, content: note.content, type: "note"}))
        ];
    }
}