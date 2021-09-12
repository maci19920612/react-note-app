import {Body, Controller, HttpCode, HttpException, HttpStatus, Post, Req} from "@nestjs/common";
import {Request} from "express";
import {CredentialsDTO} from "./dto/CredentialsDTO";
import {AuthService, InvalidCredentials, UserNotFound} from "../../service/AuthService";
import {TokenDTO} from "./dto/TokenDTO";
import {ApiResponse, ApiTags} from "@nestjs/swagger";
import {ErrorDTO} from "../_base/dto/ErrorDTO";

@ApiTags("auth")
@Controller("/auth")
export class AuthController {
    constructor(
        private authService: AuthService
    ) {
    }

    @ApiResponse({
        type: TokenDTO,
        status: 200,
        description: "The API returns a token which will used to another api's as a Authorization header"
    })
    @ApiResponse({
        type: ErrorDTO,
        status: 403,
        description: "Invalid credentials"
    })
    @Post("/login")
    async login(@Body() credentials: CredentialsDTO): Promise<TokenDTO> {
        let {email, password} = credentials;
        try {
            let {token} = await this.authService.login(email, password)
            console.log(`Newly created token: ${token}`);
            return <TokenDTO>{
                token
            };
        } catch (ex) {
            if (ex instanceof UserNotFound) {
                console.error(`User not found with this email: ${ex.email}`);
            } else if (ex instanceof InvalidCredentials) {
                console.error(`Invalid password for this email: ${ex.email}`);
            }
            throw new HttpException("Invalid credentials", HttpStatus.FORBIDDEN);
        }
    }

    @ApiResponse({
        status: 204,
        description: "The account was created, you should performer a login operation with the provided credentials"
    })
    @ApiResponse({
        status: 409,
        description: "The provided email address is already taken",
        type: ErrorDTO
    })
    @HttpCode(204)
    @Post("/register")
    async register(@Body() credentials: CredentialsDTO): Promise<void> {
        let {email, password} = credentials;
        try {
            await this.authService.register(email, password);
        } catch (ex) {
            throw new HttpException("This email address already taken", 409);
        }
    }

}