import { z } from 'zod';
import dotenv from 'dotenv';
import { Config } from 'types/Config';

dotenv.config();

const DEFAULT_PORT = 8080;
const DEFAULT_LOG_LEVEL = 'info';

const envVarsSchema = z
  .object({
    NODE_ENV: z.enum(['production', 'development', 'test'])
      .default('development'),
    PORT: z
      .string()
      .transform((val) => (val ? Number(val) : DEFAULT_PORT))
      .refine((val) => !Number.isNaN(val), 'PORT must be a number'),
    LOG_LEVEL: z
      .enum(['error', 'warn', 'info', 'verbose', 'debug', 'silly'])
      .default(DEFAULT_LOG_LEVEL),
    MONGODB_URL_STRING: z.string(),
    ACCESS_TOKEN_SECRET: z.string(),
    ACCESS_TOKEN_EXPIRES_IN: z.union([z.string(), z.number()]).default('1h'),
    ENABLE_RATE_LIMIT: z.string().default('false'),
  })
  .passthrough();

const envVars = envVarsSchema.parse(process.env);

export const isDevelopment = envVars.NODE_ENV === 'development';
export const isTest = envVars.NODE_ENV === 'test';
export const isProduction = envVars.NODE_ENV === 'production';
export const hasToApplyRateLimit =
  envVars.ENABLE_RATE_LIMIT.toLocaleLowerCase() === 'true';

export const config: Config = {
  env: envVars.NODE_ENV,
  logLevel: envVars.LOG_LEVEL,
  port: envVars.PORT || DEFAULT_PORT,
  mongoDbUrl: envVars.MONGODB_URL_STRING,
  jwtSecret: envVars.ACCESS_TOKEN_SECRET,
  jwtExpiration: envVars.ACCESS_TOKEN_EXPIRES_IN,
};
