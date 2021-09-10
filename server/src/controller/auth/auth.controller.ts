import {Controller, Post, Req} from "@nestjs/common";
import { Request } from "express";

@Controller()
export class AuthController{
    constructor(){}

    @Post("/login")
    async login(@Req() request: Request){
        let {email, password} = request.body;
    
    }
}