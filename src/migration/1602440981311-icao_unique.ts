import {MigrationInterface, QueryRunner} from "typeorm";

export class icaoUnique1602440981311 implements MigrationInterface {
    name = 'icaoUnique1602440981311'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP INDEX "IDX_60779737a3b76270f6fa29a4d4"`);
        await queryRunner.query(`CREATE UNIQUE INDEX "IDX_60779737a3b76270f6fa29a4d4" ON "airport" ("icao") `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP INDEX "IDX_60779737a3b76270f6fa29a4d4"`);
        await queryRunner.query(`CREATE INDEX "IDX_60779737a3b76270f6fa29a4d4" ON "airport" ("icao") `);
    }

}
