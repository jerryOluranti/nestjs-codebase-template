import { AppMetadata, Nullable } from "./types";
import { InternalServerErrorException, Logger } from "@nestjs/common";
import { getFirestore } from "firebase-admin/firestore";
import { env } from "./env";

export class Config {
	private static APP_METADATA: Nullable<AppMetadata> = null;
	private static logger = new Logger();
	private static metadata_error_message = "";

	static async getAppMetadata(): Promise<AppMetadata> {
		
	}

	static async setAppMetadata(data: AppMetadata) {
		
	}
}
