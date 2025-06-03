import { MigrationInterface, QueryRunner } from "typeorm";

export class AddNewFields1748976877289 implements MigrationInterface {
    name = 'AddNewFields1748976877289'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "vehicle_listing" DROP COLUMN "status"`);
        await queryRunner.query(`DROP TYPE "public"."vehicle_listing_status_enum"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TYPE "public"."vehicle_listing_status_enum" AS ENUM('pending', 'approved', 'rejected')`);
        await queryRunner.query(`ALTER TABLE "vehicle_listing" ADD "status" "public"."vehicle_listing_status_enum" NOT NULL DEFAULT 'pending'`);
    }

}
