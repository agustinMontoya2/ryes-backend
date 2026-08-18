import type { MigrationInterface, QueryRunner } from "typeorm";

export class AddAuthTokensTable1787100000000
  implements MigrationInterface
{
  name = "AddAuthTokensTable1787100000000";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE IF NOT EXISTS "auth_tokens" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP WITH TIME ZONE, "user_id" uuid NOT NULL, "token" character varying NOT NULL, "type" character varying NOT NULL, "expires_at" TIMESTAMP WITH TIME ZONE NOT NULL, "used_at" TIMESTAMP WITH TIME ZONE, CONSTRAINT "PK_auth_tokens" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE UNIQUE INDEX IF NOT EXISTS "IDX_auth_tokens_token" ON "auth_tokens" ("token")`,
    );
    await queryRunner.query(
      `CREATE INDEX IF NOT EXISTS "IDX_auth_tokens_user_id" ON "auth_tokens" ("user_id")`,
    );
    await queryRunner.query(
      `DO $$ BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_constraint WHERE conname = 'FK_auth_tokens_user_id' AND conrelid = '"auth_tokens"'::regclass) THEN
    ALTER TABLE "auth_tokens" ADD CONSTRAINT "FK_auth_tokens_user_id" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE NO ACTION;
  END IF;
END $$`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "auth_tokens" DROP CONSTRAINT IF EXISTS "FK_auth_tokens_user_id"`,
    );
    await queryRunner.query(
      `DROP INDEX IF EXISTS "public"."IDX_auth_tokens_user_id"`,
    );
    await queryRunner.query(
      `DROP INDEX IF EXISTS "public"."IDX_auth_tokens_token"`,
    );
    await queryRunner.query(`DROP TABLE IF EXISTS "auth_tokens"`);
  }
}
