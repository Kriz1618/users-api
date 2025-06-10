export interface Config {
  env: string;
  logLevel: string;
  port: number;
  mongoDbUrl: string;
  jwtSecret: string;
  jwtExpiration: string | number;
}
