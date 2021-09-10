import { Injectable } from "@nestjs/common";
import { createHmac } from "crypto";

@Injectable()
export class PasswordUtils {
    hash(password) : string { 
        return createHmac("sha256", "LIoJYHX1O8V9C4PwFNwwtb6rY2yW").update(password).digest("base64")
    }
}