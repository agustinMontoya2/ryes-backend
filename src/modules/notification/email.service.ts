import * as fs from "fs";
import * as path from "path";

import { Injectable, Logger } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { Resend } from "resend";

import config from "../../config/config";

import type { ConfigType } from "@nestjs/config";

@Injectable()
export class EmailService {
  private readonly resend: Resend;
  private readonly logger = new Logger(EmailService.name);
  private readonly templatesDir = path.join(__dirname, "templates");

  constructor(private readonly configService: ConfigService) {
    const { auth } = this.configService.get("config") as ConfigType<
      typeof config
    >;
    this.resend = new Resend(auth.RESEND_API_KEY);
  }

  private get authConfig() {
    const { auth } = this.configService.get("config") as ConfigType<
      typeof config
    >;
    return auth;
  }

  async sendResetPasswordEmail(to: string, token: string): Promise<void> {
    const resetUrl = `${this.authConfig.RESET_PASSWORD_URL}?token=${token}`;

    const template = fs.readFileSync(
      path.join(this.templatesDir, "reset-password.html"),
      "utf-8",
    );
    const html = template.replace(/\{\{reset_link\}\}/g, resetUrl);

    const { error } = await this.resend.emails.send({
      from: this.authConfig.EMAIL_FROM,
      to,
      subject: "Restablecer contraseña",
      html,
    });

    if (error) {
      this.logger.error(
        `Error enviando email de reseteo a ${to}: ${error.message}`,
      );
      throw error;
    }

    this.logger.log(`Email de reseteo enviado a ${to}`);
  }
}
