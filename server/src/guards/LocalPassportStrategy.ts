import {PassportStrategy} from "@nestjs/passport";
import {Strategy} from "passport-local";
import {Request} from "express";
import {Injectable} from "@nestjs/common";
import {AuthService} from "../service/AuthService";

@Injectable()
export class LocalPassportStrategy extends PassportStrategy(Strategy) {

    constructor(private authService: AuthService) {
        super();
    }

    authenticate(req: Request, options?: any) {
        let {email, password} = req.body;
        this.authService.validateUser(email, password)
            .then(user => {
                if (user) {
                    this.success(user);
                } else {
                    this.fail(401);
                }
            })
            .catch(error => {
                console.error("Error happened during the login process: ", error);
                this.fail(500)
            });
    }

}