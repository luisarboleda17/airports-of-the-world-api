import {MigrationInterface, QueryRunner} from "typeorm";

export class remTimezone1601865564092 implements MigrationInterface {
    name = 'remTimezone1601865564092'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "airport" DROP COLUMN "databaseTimezone"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "airport" ADD "databaseTimezone" character varying NOT NULL`);
    }

}
