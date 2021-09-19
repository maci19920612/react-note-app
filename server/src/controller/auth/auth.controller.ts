import {BadRequestException, Body, Controller, HttpCode, HttpException, Post, Req, UseGuards} from "@nestjs/common";
import {Request} from "express";
import {CredentialsDTO} from "./dto/CredentialsDTO";
import {AuthService, RefreshToken} from "../../service/AuthService";
import {AccessTokenDTO, RefreshTokenDTO, TokenDTO} from "./dto/TokenDTO";
import {ApiResponse, ApiTags} from "@nestjs/swagger";
import {ErrorDTO} from "../_base/dto/ErrorDTO";
import {AuthGuard} from "@nestjs/passport";
import {User} from "../../datatbase/entity/User";

@ApiTags("auth")
@Controller("api/auth")
export class AuthController {
    constructor(
        private authService: AuthService
    ) {}

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
    @UseGuards(AuthGuard("local"))
    @Post("/login")
    async login(@Req() request: Request & { user: User }): Promise<TokenDTO> {
        return await this.authService.login(request.user);
    }

    @ApiResponse({
        type: AccessTokenDTO,
        status: 200,
        description: "Returns with a fresh access token"
    })
    @Post("/token-refresh")
    async tokenRefresh(@Body() refreshTokenDTO: RefreshTokenDTO): Promise<AccessTokenDTO> {
        let accessToken = await this.authService.refreshToken(refreshTokenDTO.refreshToken)
        return {
            accessToken
        };
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


    @Post("/logout")
    async logout(@Req() request: Request) {
        let accessToken = request.headers["authorization"];
        if(!accessToken){
            throw new BadRequestException();
        }
        await this.authService.logout(accessToken);
    }

}