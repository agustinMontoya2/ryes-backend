export function SwaggerConfig() {
  return {
    /**
     * ---------------------------------------------------
     * @description Ruta donde se expondrá la UI de Swagger
     * @default 'docs'
     * ---------------------------------------------------
     */
    SWAGGER_PATH: process.env.SWAGGER_PATH || "docs",

    /**
     * ---------------------------------------------------
     * @description Título de la documentación
     * @default 'Ryes API'
     * ---------------------------------------------------
     */
    SWAGGER_DOCS_TITLE: process.env.SWAGGER_DOCS_TITLE || "Ryes API",

    /**
     * ---------------------------------------------------
     * @description Descripción de la documentación
     * @default 'api-documentation-for-development'
     * ---------------------------------------------------
     */
    SWAGGER_DOCS_DESCRIPTION:
      process.env.SWAGGER_DOCS_DESCRIPTION || "api-documentation-for-development",

    /**
     * ---------------------------------------------------
     * @description Versión de la documentación
     * @default '1.0'
     * ---------------------------------------------------
     */
    SWAGGER_DOCS_VERSION: process.env.SWAGGER_DOCS_VERSION || "1.0",
  };
}
