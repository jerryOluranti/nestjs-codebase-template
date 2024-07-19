import { CanActivate, ExecutionContext, Injectable, SetMetadata } from "@nestjs/common";
import { getAuth } from "firebase-admin/auth";
import { AppRoles } from "../../utils/types";

@Injectable()
export class FirebaseAuthGuard implements CanActivate {
    async canActivate(
      context: ExecutionContext
    ): Promise<boolean> {
        const request = context.switchToHttp().getRequest();
        const token = request.headers["firebase-id-token"] || request.headers["Firebase-Id-Token"];

        if (!token || token == "") return false;

        try {
            const decoded = await getAuth().verifyIdToken(token.trim());

            request["user"] = decoded;

            return !!decoded?.uid;
        } catch (e) {
            console.error(e?.message);
            return false;
        }
    }
}

export const AllowOnly = (role: AppRoles) => SetMetadata<string, AppRoles>("allowed", role);
