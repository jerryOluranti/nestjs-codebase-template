import { AppMetadata, Nullable } from "./types";
import { InternalServerErrorException, Logger } from "@nestjs/common";
import { getFirestore } from "firebase-admin/firestore";
import { env } from "./env";

export class Config {
	private static APP_METADATA: Nullable<AppMetadata> = null;
	private static logger = new Logger();
	private static metadata_error_message = "";

	static async getAppMetadata(): Promise<AppMetadata> {
		try {
			if (this.APP_METADATA) return this.APP_METADATA;

			const _metadata = (await getFirestore().collection(env.APP_VERSION).doc("config").get()).data() as AppMetadata

			if (!_metadata) {
				this.metadata_error_message = "unable to retrieve dependent information";
				throw new InternalServerErrorException();
			}
			await this.setAppMetadata(_metadata);

			return this.APP_METADATA
		} catch (e) {
			this.logger.error(e);
			throw new InternalServerErrorException(this.metadata_error_message);
		}
	}

	static async setAppMetadata(data: AppMetadata) {
		if (!data['BRANDING_PACKS'] || !data['BUSINESS_REG_AMOUNT'] || !data['COMPANY_REG_AMOUNT'] || !data['INCORPORATION_AMOUNT'] || !data['CORPORATE_ACCOUNT_AMOUNT']) {
			this.metadata_error_message = "failed to resolve app dependency";
			throw new InternalServerErrorException(this.metadata_error_message);
		}

		this.APP_METADATA = data;
	}
}
