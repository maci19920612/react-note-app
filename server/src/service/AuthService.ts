import { Injectable } from "@nestjs/common";

export interface Token{
    token: string
}

@Injectable()
export class AuthService{
    async login(email, password): Token{
        
    }
}