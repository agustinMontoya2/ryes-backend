export function PostgresqlConfig() {
  return {
    /**
     * ---------------------------------------------------
     * @description Nombre de la base de datos
     * @default 'branches'
     * ---------------------------------------------------
     */
    DB_NAME: process.env.DB_NAME || "branches",

    /**
     * ---------------------------------------------------
     * @description Host de la base de datos
     * @default 'localhost'
     * ---------------------------------------------------
     */
    DB_HOST: process.env.DB_HOST || "localhost",

    /**
     * ---------------------------------------------------
     * @description Puerto de la base de datos
     * @default 5434
     * ---------------------------------------------------
     */
    DB_PORT: Number(process.env.DB_PORT) || 5434,

    /**
     * ---------------------------------------------------
     * @description Usuario de la base de datos
     * @default 'postgres'
     * ---------------------------------------------------
     */
    DB_USER: process.env.DB_USER || "postgres",

    /**
     * ---------------------------------------------------
     * @description Contraseña de la base de datos
     * @default 'postgres'
     * ---------------------------------------------------
     */
    DB_PASS: process.env.DB_PASS || "postgres",

    /**
     * ---------------------------------------------------
     * @description Sincronizar esquema con las entidades de TypeORM
     * @default false
     * ---------------------------------------------------
     */
    DB_SYNCHRONIZE:
      process.env.DB_SYNCHRONIZE?.trim().toLowerCase() === "true" || false,

    /**
     * ---------------------------------------------------
     * @description Activar logging de TypeORM
     * @default false
     * ---------------------------------------------------
     */
    DB_LOGGING: process.env.DB_LOGGING?.trim().toLowerCase() === "true" || false,

    /**
     * ---------------------------------------------------
     * @description Eliminar el esquema al iniciar
     * @default false
     * ---------------------------------------------------
     */
    DB_DROP_SCHEMA:
      process.env.DB_DROP_SCHEMA?.trim().toLowerCase() === "true" || false,

    /**
     * ---------------------------------------------------
     * @description Usar conexión SSL
     * @default false
     * ---------------------------------------------------
     */
    DB_SSL: process.env.DB_SSL?.trim().toLowerCase() === "true" || false,
  };
}
