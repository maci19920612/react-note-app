import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import { Request } from "express";
import { AuthService } from "src/service/AuthService";

@Injectable()
export class RolesGuard implements CanActivate{
    
    constructor(
        private authService: AuthService
    ){}

    async canActivate(context: ExecutionContext) : Promise<boolean>{
        let request = context.switchToHttp().getRequest<Request>();
        let authHeader = request.headers["authorization"].replace("Bearer ", "").trim();
        return await this.authService.validate(authHeader);
    }
}