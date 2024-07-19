import * as z from "zod";
import { ZodError } from "zod";
import { ArgumentsHost, Catch, ExceptionFilter } from "@nestjs/common";

const login = z.object({
    email: z.string().email()
})

@Catch(ZodError)
export class ZodFilter<T extends ZodError> implements ExceptionFilter {
    catch(exception: T, host: ArgumentsHost) {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse();
        const status = 400;
        response.status(status).json({
            errors: exception.errors,
            message: exception.message,
            statusCode: status,
        });
    }
}
