import type { MigrationInterface, QueryRunner } from "typeorm";

export class AddUsersTables1787000000000 implements MigrationInterface {
  name = "AddUsersTables1787000000000";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE IF NOT EXISTS "users" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP WITH TIME ZONE, "email" character varying NOT NULL, "username" character varying NOT NULL, "password" character varying NOT NULL, "is_super_admin" boolean NOT NULL DEFAULT false, CONSTRAINT "UQ_users_email" UNIQUE ("email"), CONSTRAINT "UQ_users_username" UNIQUE ("username"), CONSTRAINT "PK_users" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE INDEX IF NOT EXISTS "IDX_users_email" ON "users" ("email")`,
    );
    await queryRunner.query(
      `CREATE INDEX IF NOT EXISTS "IDX_users_username" ON "users" ("username")`,
    );
    await queryRunner.query(
      `CREATE TABLE IF NOT EXISTS "user_branches" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "user_id" uuid NOT NULL, "branch_id" uuid NOT NULL, CONSTRAINT "UQ_user_branches" UNIQUE ("user_id", "branch_id"), CONSTRAINT "PK_user_branches" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `DO $$ BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_constraint WHERE conname = 'FK_user_branches_user_id' AND conrelid = '"user_branches"'::regclass) THEN
    ALTER TABLE "user_branches" ADD CONSTRAINT "FK_user_branches_user_id" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE NO ACTION;
  END IF;
END $$`,
    );
    await queryRunner.query(
      `DO $$ BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_constraint WHERE conname = 'FK_user_branches_branch_id' AND conrelid = '"user_branches"'::regclass) THEN
    ALTER TABLE "user_branches" ADD CONSTRAINT "FK_user_branches_branch_id" FOREIGN KEY ("branch_id") REFERENCES "branches"("id") ON DELETE CASCADE ON UPDATE NO ACTION;
  END IF;
END $$`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "user_branches" DROP CONSTRAINT IF EXISTS "FK_user_branches_branch_id"`,
    );
    await queryRunner.query(
      `ALTER TABLE "user_branches" DROP CONSTRAINT IF EXISTS "FK_user_branches_user_id"`,
    );
    await queryRunner.query(`DROP TABLE IF EXISTS "user_branches"`);
    await queryRunner.query(
      `DROP INDEX IF EXISTS "public"."IDX_users_username"`,
    );
    await queryRunner.query(
      `DROP INDEX IF EXISTS "public"."IDX_users_email"`,
    );
    await queryRunner.query(`DROP TABLE IF EXISTS "users"`);
  }
}
