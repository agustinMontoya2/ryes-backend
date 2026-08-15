import type { MigrationInterface, QueryRunner } from "typeorm";

export class InitialTables1786732032548 implements MigrationInterface {
  name = "InitialTables1786732032548";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE IF NOT EXISTS "dentists" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP WITH TIME ZONE, "branch_id" uuid NOT NULL, "name" character varying NOT NULL, "lastname" character varying NOT NULL, CONSTRAINT "PK_ae1fbd6ec33d24fc0939c23325d" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE INDEX IF NOT EXISTS "IDX_2449f479ade3dfe672dd77d76b" ON "dentists" ("branch_id") `,
    );
    await queryRunner.query(
      `CREATE TABLE IF NOT EXISTS "job_reports" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "branch_id" uuid NOT NULL, "delivery_date" date NOT NULL, "total_price" integer NOT NULL, "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP WITH TIME ZONE, CONSTRAINT "PK_473b95d2edd59348f7ea1f4e992" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE INDEX IF NOT EXISTS "IDX_00db5cd42b035dda33bd243c67" ON "job_reports" ("branch_id") `,
    );
    await queryRunner.query(
      `CREATE TABLE IF NOT EXISTS "patients" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP WITH TIME ZONE, "branch_id" uuid NOT NULL, "fullname" character varying NOT NULL, "dni" integer NOT NULL, CONSTRAINT "UQ_9c09c391cfd1f3262b7afd1b01c" UNIQUE ("branch_id", "dni"), CONSTRAINT "PK_a7f0b9fcbb3469d5ec0b0aceaa7" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE INDEX IF NOT EXISTS "IDX_e985f37b0743f9a7bdda30910e" ON "patients" ("branch_id") `,
    );
    await queryRunner.query(
      `CREATE TABLE IF NOT EXISTS "services" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP WITH TIME ZONE, "branch_id" uuid NOT NULL, "name" character varying NOT NULL, "price" integer NOT NULL, CONSTRAINT "PK_ba2d347a3168a296416c6c5ccb2" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE INDEX IF NOT EXISTS "IDX_0225d2822d3a4a82c3b9bcc7b5" ON "services" ("branch_id") `,
    );
    await queryRunner.query(
      `DO $$ BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'orders_status_enum') THEN
    CREATE TYPE "public"."orders_status_enum" AS ENUM('pending', 'completed', 'submitted');
  END IF;
END $$`,
    );
    await queryRunner.query(
      `CREATE TABLE IF NOT EXISTS "orders" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP WITH TIME ZONE, "branch_id" uuid NOT NULL, "dispatch_date" date NOT NULL, "due_date" date NOT NULL, "lab" character varying, "status" "public"."orders_status_enum" NOT NULL DEFAULT 'pending', "patient_id" uuid NOT NULL, "dentist_id" uuid NOT NULL, CONSTRAINT "PK_710e2d4957aa5878dfe94e4ac2f" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE INDEX IF NOT EXISTS "IDX_16ca6b683862017de3f27acaa8" ON "orders" ("branch_id") `,
    );
    await queryRunner.query(
      `CREATE TABLE IF NOT EXISTS "job_report_orders" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "order_snapshot" jsonb NOT NULL, "report_id" uuid NOT NULL, "order_id" uuid NOT NULL, CONSTRAINT "PK_fc10f8760940858389e3b02f276" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE IF NOT EXISTS "branches" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "location" character varying NOT NULL, CONSTRAINT "PK_3e45eb46acc5223760118791762" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE IF NOT EXISTS "order_services" ("order_id" uuid NOT NULL, "service_id" uuid NOT NULL, CONSTRAINT "PK_2aab6bb6adc6d0dfbe143afaab9" PRIMARY KEY ("order_id", "service_id"))`,
    );
    await queryRunner.query(
      `CREATE INDEX IF NOT EXISTS "IDX_27d6c03c732a0db157792b8ece" ON "order_services" ("order_id") `,
    );
    await queryRunner.query(
      `CREATE INDEX IF NOT EXISTS "IDX_56254c5869655530d012504bc3" ON "order_services" ("service_id") `,
    );
    await queryRunner.query(
      `DO $$ BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_constraint WHERE conname = 'FK_31ac5021b328302fba17544ff9c' AND conrelid = '"orders"'::regclass) THEN
    ALTER TABLE "orders" ADD CONSTRAINT "FK_31ac5021b328302fba17544ff9c" FOREIGN KEY ("patient_id") REFERENCES "patients"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;
  END IF;
END $$`,
    );
    await queryRunner.query(
      `DO $$ BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_constraint WHERE conname = 'FK_da7d2bf28df092c0eb1e5e2a6db' AND conrelid = '"orders"'::regclass) THEN
    ALTER TABLE "orders" ADD CONSTRAINT "FK_da7d2bf28df092c0eb1e5e2a6db" FOREIGN KEY ("dentist_id") REFERENCES "dentists"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;
  END IF;
END $$`,
    );
    await queryRunner.query(
      `DO $$ BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_constraint WHERE conname = 'FK_672fab69491c07eb7ea6df04f5d' AND conrelid = '"job_report_orders"'::regclass) THEN
    ALTER TABLE "job_report_orders" ADD CONSTRAINT "FK_672fab69491c07eb7ea6df04f5d" FOREIGN KEY ("report_id") REFERENCES "job_reports"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;
  END IF;
END $$`,
    );
    await queryRunner.query(
      `DO $$ BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_constraint WHERE conname = 'FK_09c907d2823e28f0d1fd224a07e' AND conrelid = '"job_report_orders"'::regclass) THEN
    ALTER TABLE "job_report_orders" ADD CONSTRAINT "FK_09c907d2823e28f0d1fd224a07e" FOREIGN KEY ("order_id") REFERENCES "orders"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;
  END IF;
END $$`,
    );
    await queryRunner.query(
      `DO $$ BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_constraint WHERE conname = 'FK_27d6c03c732a0db157792b8ece9' AND conrelid = '"order_services"'::regclass) THEN
    ALTER TABLE "order_services" ADD CONSTRAINT "FK_27d6c03c732a0db157792b8ece9" FOREIGN KEY ("order_id") REFERENCES "orders"("id") ON DELETE CASCADE ON UPDATE CASCADE;
  END IF;
END $$`,
    );
    await queryRunner.query(
      `DO $$ BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_constraint WHERE conname = 'FK_56254c5869655530d012504bc39' AND conrelid = '"order_services"'::regclass) THEN
    ALTER TABLE "order_services" ADD CONSTRAINT "FK_56254c5869655530d012504bc39" FOREIGN KEY ("service_id") REFERENCES "services"("id") ON DELETE CASCADE ON UPDATE CASCADE;
  END IF;
END $$`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "order_services" DROP CONSTRAINT IF EXISTS "FK_56254c5869655530d012504bc39"`,
    );
    await queryRunner.query(
      `ALTER TABLE "order_services" DROP CONSTRAINT IF EXISTS "FK_27d6c03c732a0db157792b8ece9"`,
    );
    await queryRunner.query(
      `ALTER TABLE "job_report_orders" DROP CONSTRAINT IF EXISTS "FK_09c907d2823e28f0d1fd224a07e"`,
    );
    await queryRunner.query(
      `ALTER TABLE "job_report_orders" DROP CONSTRAINT IF EXISTS "FK_672fab69491c07eb7ea6df04f5d"`,
    );
    await queryRunner.query(
      `ALTER TABLE "orders" DROP CONSTRAINT IF EXISTS "FK_da7d2bf28df092c0eb1e5e2a6db"`,
    );
    await queryRunner.query(
      `ALTER TABLE "orders" DROP CONSTRAINT IF EXISTS "FK_31ac5021b328302fba17544ff9c"`,
    );
    await queryRunner.query(
      `DROP INDEX IF EXISTS "public"."IDX_56254c5869655530d012504bc3"`,
    );
    await queryRunner.query(
      `DROP INDEX IF EXISTS "public"."IDX_27d6c03c732a0db157792b8ece"`,
    );
    await queryRunner.query(`DROP TABLE IF EXISTS "order_services"`);
    await queryRunner.query(`DROP TABLE IF EXISTS "branches"`);
    await queryRunner.query(`DROP TABLE IF EXISTS "job_report_orders"`);
    await queryRunner.query(
      `DROP INDEX IF EXISTS "public"."IDX_16ca6b683862017de3f27acaa8"`,
    );
    await queryRunner.query(`DROP TABLE IF EXISTS "orders"`);
    await queryRunner.query(
      `DROP TYPE IF EXISTS "public"."orders_status_enum"`,
    );
    await queryRunner.query(
      `DROP INDEX IF EXISTS "public"."IDX_0225d2822d3a4a82c3b9bcc7b5"`,
    );
    await queryRunner.query(`DROP TABLE IF EXISTS "services"`);
    await queryRunner.query(
      `DROP INDEX IF EXISTS "public"."IDX_e985f37b0743f9a7bdda30910e"`,
    );
    await queryRunner.query(`DROP TABLE IF EXISTS "patients"`);
    await queryRunner.query(
      `DROP INDEX IF EXISTS "public"."IDX_00db5cd42b035dda33bd243c67"`,
    );
    await queryRunner.query(`DROP TABLE IF EXISTS "job_reports"`);
    await queryRunner.query(
      `DROP INDEX IF EXISTS "public"."IDX_2449f479ade3dfe672dd77d76b"`,
    );
    await queryRunner.query(`DROP TABLE IF EXISTS "dentists"`);
  }
}
