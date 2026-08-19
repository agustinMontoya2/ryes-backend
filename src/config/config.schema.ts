import * as Joi from "joi";

import { Stages } from "./stages";

import type { MixedConfigsForEnvFile } from "./config.types";

export const configSchema = Joi.object<MixedConfigsForEnvFile>({
  STAGE: Joi.string().valid(...Object.keys(Stages)).optional(),
  PORT: Joi.number().integer().optional(),
  ACTIVATE_HELMET_SECURITY: Joi.boolean().optional(),
  ACTIVATE_VERSIONING: Joi.boolean().optional(),
  ACTIVATE_CORS: Joi.boolean().optional(),

  SWAGGER_PATH: Joi.string().optional(),
  SWAGGER_DOCS_TITLE: Joi.string().optional(),
  SWAGGER_DOCS_DESCRIPTION: Joi.string().optional(),
  SWAGGER_DOCS_VERSION: Joi.string().optional(),

  DB_NAME: Joi.string().optional(),
  DB_HOST: Joi.string().optional(),
  DB_PORT: Joi.number().optional(),
  DB_USER: Joi.string().optional(),
  DB_PASS: Joi.string().optional(),
  DB_SYNCHRONIZE: Joi.boolean().optional(),
  DB_LOGGING: Joi.boolean().optional(),
  DB_DROP_SCHEMA: Joi.boolean().optional(),
  DB_SSL: Joi.boolean().optional(),

  JWT_SECRET: Joi.string().optional(),
  JWT_EXPIRATION: Joi.string().optional(),
  REFRESH_TOKEN_EXPIRATION: Joi.string().optional(),
  BCRYPT_SALT_ROUNDS: Joi.number().integer().optional(),
  ADMIN_EMAIL: Joi.string().email().optional(),
  ADMIN_USERNAME: Joi.string().optional(),
  ADMIN_PASSWORD: Joi.string().optional(),

  RESEND_API_KEY: Joi.string().optional(),
  RESET_PASSWORD_URL: Joi.string().uri().optional(),
  EMAIL_FROM: Joi.string().email().optional(),
});
