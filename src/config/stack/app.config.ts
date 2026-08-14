import { Stages } from "../stages";

export function AppConfig() {
  return {
    /**
     * ---------------------------------------------------
     * @description Ambiente donde se encuentra el aplicativo
     * @default 'local'
     * ---------------------------------------------------
     */
    STAGE: process.env.STAGE || Stages.local,

    /**
     * ---------------------------------------------------
     * @description Puerto donde se expondrá el servicio principal
     * @default 3000
     * ---------------------------------------------------
     */
    PORT: Number(process.env.PORT) || 3000,

    /**
     * ---------------------------------------------------
     * @description Activar seguridad de la API con Helmet
     * @default false
     * ---------------------------------------------------
     */
    ACTIVATE_HELMET_SECURITY:
      process.env.ACTIVATE_HELMET_SECURITY?.trim().toLowerCase() === "true" ||
      false,

    /**
     * ---------------------------------------------------
     * @description Activar versionamiento de la API
     * @default false
     * ---------------------------------------------------
     */
    ACTIVATE_VERSIONING:
      process.env.ACTIVATE_VERSIONING?.trim().toLowerCase() === "true" || false,

    /**
     * ---------------------------------------------------
     * @description Activar CORS para el servicio de backend
     * @default false
     * ---------------------------------------------------
     */
    ACTIVATE_CORS:
      process.env.ACTIVATE_CORS?.trim().toLowerCase() === "true" || false,
  };
}
