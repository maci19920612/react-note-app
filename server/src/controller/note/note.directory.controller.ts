import {Body, Controller, Delete, Get, HttpCode, Injectable, Param, Post, Put, Req} from "@nestjs/common";
import {AuthenticatedRequest} from "../../guards/model/AuthenticatedRequest";
import {NoteService} from "../../service/NoteService";
import {NoteItemDTO} from "./dto/NoteItemDTO";
import {ApiTags} from "@nestjs/swagger";

@ApiTags("note directory")
@Controller("api/note-directory")
export class NoteDirectoryController{
    constructor(
        private noteService: NoteService
    ){}

    @Post("/create/:parentDirectoryId?")
    async create(@Req() request: AuthenticatedRequest, @Param("parentDirectoryId") parentDirectoryId: number, @Body() noteItem: NoteItemDTO){
        let {title} = noteItem;
        let {user} = request;
        let parentDirectory = await this.noteService.getDirectoryById(user, parentDirectoryId);
        let createdDirectory = await this.noteService.createDirectory(user, title, parentDirectory);
        return {
            id: createdDirectory.id,
            title: createdDirectory.name,
            content: "",
            type: "directory"
        };
    }

    @Put("/update")
    async update(@Req() request: AuthenticatedRequest, @Body() noteItem: NoteItemDTO){
        let {id, title} = noteItem;
        let {user} = request;
        let updatedDirectory = await this.noteService.updateDirectory(user, id, title);
        return {
            id: updatedDirectory.id,
            title: updatedDirectory.name,
            content: "",
            type: "directory"
        };
    }

    @HttpCode(204)
    @Delete("/:directoryId")
    async delete(@Req() request: AuthenticatedRequest, @Param("directoryId") directoryId: number){
        let {user} = request;
        await this.noteService.removeDirectory(user, directoryId);
    }
}