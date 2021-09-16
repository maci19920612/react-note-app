import {AuthGuard, PassportStrategy} from "@nestjs/passport";
import {Strategy} from "passport-local";
import {AuthService} from "../service/AuthService";
import {User} from "../datatbase/entity/User";
import {Injectable, UnauthorizedException} from "@nestjs/common";
import {Request} from "express";
import {CredentialsDTO} from "../controller/auth/dto/CredentialsDTO";

@Injectable()
export class LocalPassportStrategy extends PassportStrategy(Strategy) {
    constructor(
        private authService: AuthService
    ) {
        super()
    }

    authenticate(req: Request, options?: any) {
        let {email, password} = <CredentialsDTO>req.body
        this.authService.validateUser(email, password)
            .then(user => {
                if (user) {
                    this.success(user)
                } else {
                    this.fail(Strategy, 401)
                }
            })
    }
}