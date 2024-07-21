import { CanActivate, ExecutionContext, ForbiddenException, Injectable, UnauthorizedException } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { JwtService } from "@nestjs/jwt";
import { APIError } from "../types";
import { createHmac } from "crypto";
import { env } from "../env";

@Injectable()
export class PaystackWebhookGuard implements CanActivate {
	constructor(private reflector: Reflector, private jwtService: JwtService) {
	}

	async canActivate(
	  context: ExecutionContext
	): Promise<boolean> {
		const request = context.switchToHttp().getRequest();
		let signature = request.headers["x-paystack-signature"] || request.headers["X-Paystack-Signature"];

		if (!signature || signature == "") throw new UnauthorizedException(APIError.UNAUTHORIZED);

		const expectedSignature = createHmac("sha512", env.PAYSTACK_SECRET_KEY).update(JSON.stringify(request.body)).digest("hex");

		if (!(signature === expectedSignature)) throw new ForbiddenException(APIError.UNAUTHORIZED);

		return true;
	}
}
