import { Body, Controller, Get, Post, Put, UseGuards } from "@nestjs/common";
import { ApiCreatedResponse, ApiResponse } from "@nestjs/swagger";
import { builtinModules } from "module";
import { AuthRequiredGuard } from "src/guards/AuthRequiredGuard";
import { NoteItemDTO } from "./dto/NoteItemDTO";


@Controller("note")
export class NoteController{
    @ApiCreatedResponse({
        type: NoteItemDTO,
        isArray: true,
        status: 200,
        description: "Returns the notes and the directories which are in the subdirectories"
    })
    @Get("/list/:parentDirectoryId")
    async listChildItems(parentDirectoryId: number) : Promise<Array<NoteItemDTO>>{
        console.log("Parent ID: ", parentDirectoryId);
        return [];
    }
    @Get("/list")
    async listRootItems() : Promise<Array<NoteItemDTO>>{
        return [];
    }

    @ApiCreatedResponse({
        type: NoteItemDTO,
        status: 201,
        description: "Create a note or a directory item"
    })
    @Put("/create")
    async createNewNote(@Body() NoteItemDTO) : Promise<NoteItemDTO>{
        return null;
    }
}