import { Controller, Get } from "@nestjs/common";
import { ApiResponse } from "@nestjs/swagger";
import { NoteItemDTO } from "./dto/NoteItemDTO";

@Controller("note")
export class NoteController{
    @Get("/list/:parentDirectoryId")
    @ApiResponse({
        
    })
    list(parentDirectoryId: number) : Array<NoteItemDTO>{
        console.log("Parent ID: ", parentDirectoryId);
        return [];
    }
}