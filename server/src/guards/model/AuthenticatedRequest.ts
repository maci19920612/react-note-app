import {Request} from "express";
import {User} from "../../datatbase/entity/User";

export type AuthenticatedRequest = Request & {
    user: User
};