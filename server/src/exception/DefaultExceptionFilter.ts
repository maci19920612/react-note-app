import {ArgumentsHost, ExceptionFilter, HttpException} from "@nestjs/common";
import {Response} from "express";
import {ErrorDTO} from "../controller/_base/dto/ErrorDTO";

export class DefaultExceptionFilter implements ExceptionFilter {
    catch(exception: any, host: ArgumentsHost): any {
        let context = host.switchToHttp();
        let response = context.getResponse<Response>();
        let request = context.getRequest<Request>();
        let status = 500;
        if (exception instanceof HttpException) {
            status = exception.getStatus();
        }
        let stacktrace = undefined;
        // if (true /*isDebug*/) {
        //     stacktrace = parse(exception);
        // }
        response
            .status(status)
            .json(<ErrorDTO>{
                code: status,
                reason: exception.message,
                stacktrace
            });
    }

}