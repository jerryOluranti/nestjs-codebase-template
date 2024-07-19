import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { JwtService } from "@nestjs/jwt";
import { APIError, AppRoles } from "../../utils/types";

@Injectable()
export class RoleGuard implements CanActivate {
	constructor(private reflector: Reflector, private jwtService: JwtService) {
	}

	async canActivate(
	  context: ExecutionContext
	): Promise<boolean> {
		const request = context.switchToHttp().getRequest();
		let token = request.headers["authorization"] || request.headers["Authorization"];

		if (!token || token == "") throw new UnauthorizedException();

		if (token.startsWith("Bearer")) token = token.split(" ").at(-1);

		const allowedRole = this.reflector.get<AppRoles>("allowed", context.getHandler()) ?? this.reflector.get<AppRoles>("allowed", context.getClass());

		try {
			const payload = await this.jwtService.verifyAsync(
			  token,
			  {
				  secret: process.env.JWT_SECRET
			  }
			);

			if (allowedRole && payload?.role !== allowedRole) throw new UnauthorizedException(APIError.UNAUTHORIZED);

			request["user"] = payload;
		} catch (e) {
			throw new UnauthorizedException(APIError.UNAUTHORIZED);
		}

		return true;
	}
}
