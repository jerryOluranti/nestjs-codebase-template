import * as z from "zod";
import {config} from "dotenv";

config();

const EnvSchema = z.object({
	DATABASE_URL: z.string().url(),
	NODE_ENV: z.enum(
	  [
		  'development',
		  'test',
		  'production',
	  ]
	).default('development'),
	PORT: z.coerce
	  .number()
	  .positive()
	  .max(65536)
	  .default(3000),
	JWT_SECRET: z.string(),
	GOOGLE_APPLICATION_CREDENTIALS: z.string(),
	APP_VERSION: z.string(),
	PAYSTACK_SECRET_KEY: z.string(),
	APP_URL: z.string()
});

export const env = EnvSchema.parse(process.env);
