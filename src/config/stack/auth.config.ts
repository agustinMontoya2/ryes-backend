import type { StringValue } from "ms";

export function AuthConfig() {
  return {
    JWT_SECRET: process.env.JWT_SECRET || "jwt-secret-key",
    JWT_EXPIRATION: (process.env.JWT_EXPIRATION || "15m") as StringValue,
    REFRESH_TOKEN_EXPIRATION: (process.env.REFRESH_TOKEN_EXPIRATION ||
      "7d") as StringValue,
    BCRYPT_SALT_ROUNDS: Number(process.env.BCRYPT_SALT_ROUNDS) || 10,
    ADMIN_EMAIL: process.env.ADMIN_EMAIL || "admin@email.com",
    ADMIN_USERNAME: process.env.ADMIN_USERNAME || "admin",
    ADMIN_PASSWORD: process.env.ADMIN_PASSWORD || "Admin123*",
    RESEND_API_KEY: process.env.RESEND_API_KEY || "",
    RESET_PASSWORD_URL:
      process.env.RESET_PASSWORD_URL || "http://localhost:3000/reset-password",
    EMAIL_FROM_NAME: process.env.EMAIL_FROM_NAME || "Lab Cv",
    EMAIL_FROM: process.env.EMAIL_FROM || "noreply@email.com",
  };
}
