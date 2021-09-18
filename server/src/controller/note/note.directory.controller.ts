import {Controller, Get, Inject, Req, UseGuards} from "@nestjs/common";
import { ApiResponse } from "@nestjs/swagger";
import { NoteItemDTO } from "./dto/NoteItemDTO";
import {AuthGuard} from "@nestjs/passport";
import {Request} from "express";
import {User} from "../../datatbase/entity/User";

@Controller("note")
export class NoteController{
    constructor(){}
    @Get("/list/:parentDirectoryId")
    @ApiResponse({
        
    })
    list(parentDirectoryId: number) : Array<NoteItemDTO>{
        console.log("Parent ID: ", parentDirectoryId);
        return [];
    }

    @UseGuards(AuthGuard("jwt"))
    @Get("/test")
    async testAuthentication(@Req() req: Request & { user: User }): Promise<string>{
        return "test successful";
    }
}